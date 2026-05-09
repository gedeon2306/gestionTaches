import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError("L'email est obligatoire")
        user = self.model(
            email=self.normalize_email(email),
            name=name
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password):
        user = self.create_user(email, name, password)
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    email_verified = models.DateTimeField(null=True, blank=True)
    image = models.CharField(max_length=500, blank=True, default="")
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email

    # Requis par Django admin
    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin


class Account(models.Model):
    PROVIDER_CHOICES = [
        ('google', 'Google'),
        ('github', 'GitHub'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='accounts')
    type = models.CharField(max_length=255)
    provider = models.CharField(max_length=255, choices=PROVIDER_CHOICES)
    provider_account_id = models.CharField(max_length=255)
    refresh_token = models.TextField(blank=True, default="")
    access_token = models.TextField(blank=True, default="")
    expires_at = models.BigIntegerField(null=True, blank=True)
    token_type = models.CharField(max_length=255, blank=True, default="")
    scope = models.CharField(max_length=255, blank=True, default="")
    id_token = models.TextField(blank=True, default="")
    session_state = models.CharField(max_length=255, blank=True, default="")

    class Meta:
        unique_together = ('provider', 'provider_account_id')

    def __str__(self):
        return f"{self.user.email} — {self.provider}"