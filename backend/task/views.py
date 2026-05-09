import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User, Account
from .serializers import RegisterSerializer, UserSerializer


def get_tokens(user):
    refresh = RefreshToken.for_user(user)
    return {
        'access': str(refresh.access_token),
        'refresh': str(refresh),
    }


def landing_view(request):
    return render(request, "landing.html")


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()
        return Response(get_tokens(user), status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, username=email, password=password)
        if not user:
            return Response({'error': 'Identifiants incorrects'}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(get_tokens(user))


class OAuthView(APIView):
    """
    Reçoit les infos OAuth depuis Next.js après que NextAuth
    a terminé le flux avec Google/GitHub.
    Crée ou retrouve le user, lie le compte OAuth, retourne un JWT Django.
    """
    def post(self, request):
        provider            = request.data.get('provider')           # 'google' ou 'github'
        provider_account_id = request.data.get('provider_account_id')
        access_token        = request.data.get('access_token', '')
        refresh_token       = request.data.get('refresh_token', '')
        expires_at          = request.data.get('expires_at')
        token_type          = request.data.get('token_type', '')
        scope               = request.data.get('scope', '')
        id_token            = request.data.get('id_token', '')
        email               = request.data.get('email')
        name                = request.data.get('name', '')
        image               = request.data.get('image', '')

        if not email or not provider or not provider_account_id:
            return Response({'error': 'Données manquantes'}, status=status.HTTP_400_BAD_REQUEST)

        # 1. Ce compte OAuth existe déjà ?
        account = Account.objects.filter(
            provider=provider,
            provider_account_id=provider_account_id
        ).first()

        if account:
            # Compte connu → on met à jour les tokens et on retourne le user
            account.access_token  = access_token
            account.refresh_token = refresh_token
            account.expires_at    = expires_at
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


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)