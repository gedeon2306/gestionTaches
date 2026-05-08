import uuid
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Manager pour gérer la création des utilisateurs
class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError("L'email est obligatoire")
        user = self.model(email=self.normalize_email(email), name=name)
        user.set_password(password)
        user.save(using=self._db)
        return user

class Account(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    userID = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    provider = models.CharField(max_length=255)
    providerAccountId = models.CharField(max_length=255)
    refresh_token = models.TextField()
    access_token = models.TextField()
    expires_at = models.CharField(max_length=255)
    token_type = models.CharField(max_length=255)
    scope = models.CharField(max_length=255)
    id_token = models.TextField()
    session_state = models.CharField(max_length=255)