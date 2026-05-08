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