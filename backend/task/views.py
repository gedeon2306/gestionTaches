import requests

from django.shortcuts import render, redirect
from django.conf import settings
from django.db import models
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import serializers as drf_serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from drf_spectacular.utils import extend_schema, inline_serializer, OpenApiParameter
from drf_spectacular.types import OpenApiTypes

from .models import User, Account
from .serializers import RegisterSerializer, UserSerializer

from .tokens import email_confirmation_token_generator
from .email_utils import (
    send_login_email,
    send_confirmation_email, 
    send_password_reset_email, 
)


def landing_view(request):
    return render(request, "landing.html")


def _error_server():
    return Response({
        "error": "Une erreur est survenue, reesayez plus tard !"},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )


def _forbidden(texte):
    return Response(
        {"error": f"Vous n'avez pas les droits pour {texte}."},
        status=status.HTTP_403_FORBIDDEN,
    )


@extend_schema(
    tags=["Auth"],
    summary="Créer un compte utilisateur",
    description="Crée un nouvel utilisateur avec les données fournies. Envoie un email de confirmation pour activer le compte.",
    request=UserSerializer,
    responses={
        201: inline_serializer(
            name="RegisterSuccess",
            fields={
                "message": drf_serializers.CharField(),
                "user": inline_serializer(
                    name="RegisterUserInfo",
                    fields={
                        "email": drf_serializers.EmailField(),
                        "name": drf_serializers.CharField(),
                    }
                ),
            }
        ),
        400: inline_serializer(
            name="RegisterError",
            fields={
                "errors": drf_serializers.DictField(
                    child=drf_serializers.ListField(child=drf_serializers.CharField()),
                    help_text="Dictionnaire des erreurs par champ"
                )
            }
        ),
    },
)
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    
    if len(request.data.get('password', '')) < 8:
        return Response(
            {"error": "Le mot de passe doit contenir au moins 8 caractères."},
            status=status.HTTP_400_BAD_REQUEST
        )
        
    email_user = request.data.get('email', '').strip().lower()
    if not email_user:
        return Response({"email": "L'email est obligatoire."}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.filter(email=email_user).first()
    if user:
        if not user.is_active:
            send_confirmation_email(user)
            return Response({
                "message": "Vérifiez votre boîte mail pour confirmer votre identité.",
                "user": {"email": user.email, "name": user.name}
            }, status=status.HTTP_200_OK)
        
        return Response({"error": "Cet utilisateur est déjà actif."}, status=status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        
        user = serializer.save()
        
        try:
            send_confirmation_email(user)
        except:
            _error_server()
            
        return Response({
            "message": "Compte créé ! Vérifiez votre boîte mail pour votre identité.",
            "user": {"email": user.email, "name": user.name}
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    tags=["Auth"],
    summary="Confirmer l'email de l'utilisateur et le connecter automatiquement",
    description="Valide le jeton de confirmation. Si valide, active le compte et retourne une paire de jetons JWT (Access/Refresh).",
    responses={
        200: inline_serializer(
            name="ConfirmationSuccess",
            fields={
                "message": drf_serializers.CharField(),
                "access": drf_serializers.CharField(),
                "refresh": drf_serializers.CharField(),
            }
        ),
        400: inline_serializer(
            name="ConfirmationError",
            fields={
                "error": drf_serializers.CharField(),
                "email": drf_serializers.EmailField(required=False),
            }
        ),
    },
)
@api_view(['GET'])
@permission_classes([AllowAny])
def confirm_register(request, uidb64, token):
    
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return Response({"error": "Lien de confirmation invalide."}, status=status.HTTP_400_BAD_REQUEST)

    if not email_confirmation_token_generator.check_token(user, token):
        return Response({
            "error": "Lien de confirmation invalide ou expiré.",
            "email": user.email
        }, status=status.HTTP_400_BAD_REQUEST)

    if user.is_active:
        refresh = TokenObtainPairSerializer.get_token(user)
        return Response({
            "message": f"Bienvenue {user.name} !",
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        }, status=status.HTTP_200_OK)
        
    user.is_active = True
    user.save()

    refresh = TokenObtainPairSerializer.get_token(user)
    access = str(refresh.access_token)
    refresh_str = str(refresh)

    return Response({
        "message": f"Bienvenue {user.name} !",
        "access": str(refresh.access_token),
        "refresh": str(refresh)
    }, status=status.HTTP_200_OK)


@extend_schema(
    tags=["Auth"],
    summary="Connexion utilisateur avec envoi d'email",
    description="Valide les identifiants de l'utilisateur (email/mot de passe). Si valides, envoie un email de notification de connexion et retourne les jetons JWT (Access/Refresh).",
    request=inline_serializer(
        name="LoginRequest",
        fields={
            "email": drf_serializers.EmailField(),
            "password": drf_serializers.CharField(),
        }
    ),
    responses={
        200: inline_serializer(
            name="LoginSuccess",
            fields={
                "message": drf_serializers.CharField(),
                "access": drf_serializers.CharField(),
                "refresh": drf_serializers.CharField(),
            }
        ),
        400: inline_serializer(
            name="LoginError",
            fields={"error": drf_serializers.CharField()}
        ),
    },
)
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email', '').strip().lower()
    password = request.data.get('password', '')

    if not email or not password:
        return Response(
            {"error": "L'email et le mot de passe sont obligatoires."},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(request, username=email, password=password)
    if not user:
        return Response(
            {"error": "Email ou mot de passe incorrect."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    if not user.is_active:
        try:
            send_confirmation_email(user)
        except:
            _error_server()
            
        return Response(
            {"error": "Ce compte n'est pas activé. Vérifiez votre boîte mail."},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if not user.dfa:
        refresh = TokenObtainPairSerializer.get_token(user)
        return Response({
            "message": f"Connexion réussie, bienvenue {user.name} .",
            "dfa": user.dfa,
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        }, status=status.HTTP_200_OK)

    code = str(random.randint(100000, 999999))
    user.validate_code = code
    user.save()
    
    uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
    token = email_confirmation_token_generator.make_token(user)

    # Envoi de l'email de notification
    try:
        send_login_email(user)
    except:
        _error_server()

    return Response({
        "message": "Connexion réussie. Un email de confirmation a été envoyé.",
        "dfa": user.dfa,
        "uid": uidb64,
        "token": token
    }, status=status.HTTP_200_OK)


@extend_schema(
    tags=["Auth"],
    summary="Confirmer le code de connexion envoyé par email",
    description="Valide le code de connexion envoyé par email. Si valide, retourne les jetons JWT (Access/Refresh).",
    request=inline_serializer(
        name="LoginConfirmationRequest",
        fields={
            "uidb64": drf_serializers.CharField(),
            "token": drf_serializers.CharField(),
            "code": drf_serializers.CharField(),
        }
    ),
    responses={
        200: inline_serializer(
            name="LoginConfirmationSuccess",
            fields={
                "message": drf_serializers.CharField(),
                "access": drf_serializers.CharField(),
                "refresh": drf_serializers.CharField(),
            }
        ),
        400: inline_serializer(
            name="LoginConfirmationError",
            fields={
                "error": drf_serializers.CharField(),
            }
        ),
    },
)
@api_view(['POST'])
@permission_classes([AllowAny])
def confirm_login(request):
    uidb64 = request.data.get('uid', '')
    token = request.data.get('token', '')
    code = request.data.get('code', '')
    
    if not uidb64 or not token or not code:
        return Response({"error": "Données de confirmation manquantes."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return Response({"error": "Lien de confirmation invalide."}, status=status.HTTP_400_BAD_REQUEST)

    if not email_confirmation_token_generator.check_token(user, token):
        return Response({
            "error": "Lien de confirmation invalide ou expiré.",
            "email": user.email
        }, status=status.HTTP_400_BAD_REQUEST)
        
    if user.validate_code != code:
        return Response({"error": "Code de confirmation incorrect."}, status=status.HTTP_400_BAD_REQUEST)
    
    user.validate_code = ''
    user.save()

    if user.is_active:
        refresh = TokenObtainPairSerializer.get_token(user)
        return Response({
            "message": f"Connexion réussie, bienvenue {user.name} .",
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        }, status=status.HTTP_200_OK)
        
    user.is_active = True
    user.save()

    refresh = TokenObtainPairSerializer.get_token(user)
    access = str(refresh.access_token)
    refresh_str = str(refresh)

    return Response({
        "message": f"Connexion réussie, bienvenue {user.name} .", 
        "access": access, 
        "refresh": refresh_str
    }, status=status.HTTP_200_OK)


class OAuthView(APIView):
    """
    Reçoit les infos OAuth depuis Next.js après que NextAuth
    a terminé le flux avec Google/GitHub.
    Crée ou retrouve le user, lie le compte OAuth, retourne un JWT Django.
    """
    def post(self, request):
        provider = request.data.get('provider') # ex: 'google', 'github'
        provider_account_id = request.data.get('provider_account_id')
        access_token = request.data.get('access_token', '')
        refresh_token = request.data.get('refresh_token', '')
        expires_at = request.data.get('expires_at')
        token_type = request.data.get('token_type', '')
        scope = request.data.get('scope', '')
        id_token = request.data.get('id_token', '')
        email = request.data.get('email')
        name = request.data.get('name', '')
        image = request.data.get('image', '')

        if not email or not provider or not provider_account_id:
            return Response({'error': 'Données manquantes'}, status=status.HTTP_400_BAD_REQUEST)

        # 1. Ce compte OAuth existe déjà ?
        account = Account.objects.filter(
            provider=provider,
            provider_account_id=provider_account_id
        ).first()

        if account:
            # Compte connu → on met à jour les tokens et on retourne le user
            account.access_token = access_token
            account.refresh_token = refresh_token
            account.expires_at = expires_at
            account.save()
            user = account.user

        else:
            # Nouveau compte OAuth → cherche ou crée le user par email
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'name': name,
                    'image': image,
                }
            )
            # Lie ce provider au user
            Account.objects.create(
                user=user,
                type='oauth',
                provider=provider,
                provider_account_id=provider_account_id,
                access_token=access_token,
                refresh_token=refresh_token,
                expires_at=expires_at,
                token_type=token_type,
                scope=scope,
                id_token=id_token,
            )

        return Response(get_tokens(user))


# class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)