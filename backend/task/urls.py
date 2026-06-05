from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    register, 
    confirm_register,
    login,
    resend_email,
    forgot_password,
    confirm_password,
    reset_password_confirm,
    OAuthView,
    dashboard_view,
    # meView
)

urlpatterns = [
    ## Auth routes
    # Inscription (envoi d'un email de confirmation)
    path('auth/register/', register, name='register'),
    
    # Confirmation de l'email (lien cliqué dans le mail)
    path('auth/confirm-register/<str:uidb64>/<str:token>/', confirm_register, name='confirm_register'),
    
    # Connexion (envoi du mail avec le code de connexion)
    path('auth/login/', login, name='login'),
    
    # Rafraîchir le token (quand le premier expire)
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Renvoi de l'email de confirmation (si le lien(token) a expiré)
    path('auth/resend-email/', resend_email, name='resend_email'),
    
    # Mot de passe oublié
    path('auth/forgot-password/', forgot_password, name='forgot_password'),
    path('auth/confirm-password/<str:uidb64>/<str:token>/', confirm_password, name='confirm_password'),
    path('auth/reset-password-confirm/', reset_password_confirm, name='reset_password_confirm'),
    
    # OAuth (Google/GitHub)
    path('auth/oauth/', OAuthView.as_view()),
    
    # Dashboard
    path('dashboard/', dashboard_view, name='dashboard'),
    
    # # Profil
    # path('user/me/', meView),
]