from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    registerView, 
    # loginView, 
    OAuthView, 
    # meView
)

urlpatterns = [
    ## Auth routes
    # Inscription
    path('auth/register/', registerView),
    # Connexion
    # path('auth/login/', loginView),
    # OAuth (Google/GitHub)
    path('auth/oauth/', OAuthView.as_view()),
    # # Profil
    # path('user/me/', meView),
]