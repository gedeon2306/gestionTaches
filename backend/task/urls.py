from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView, 
    LoginView, 
    OAuthView, 
    MeView
)

urlpatterns = [
    ## Auth routes
    # Inscription
    path('auth/register/', RegisterView.as_view()),
    # Connexion
    path('auth/login/', LoginView.as_view()),
    # OAuth (Google/GitHub)
    path('auth/oauth/', OAuthView.as_view()),
    # Profil
    path('user/me/', MeView.as_view()),
]