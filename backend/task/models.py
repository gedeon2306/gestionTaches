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
    
class User(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    emailVerified = models.EmailField(unique=True)
    image = models.CharField(max_length=255, default="")

class Account(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    userID = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_account')
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
    
class Session(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sessionToken = models.CharField(max_length=255)
    userID = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_session')
    expires = models.DateField()

