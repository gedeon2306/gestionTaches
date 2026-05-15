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


class UserProfil(models.Model):
    """Informations personnelles et réseaux sociaux (ProfilePage)"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    title = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    location = models.CharField(max_length=255, blank=True)
    website = models.URLField(blank=True)
    github = models.CharField(max_length=100, blank=True)
    linkedin = models.CharField(max_length=100, blank=True)
    twitter = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"Profil de {self.user.email}"


class Skill(models.Model):
    """Compétences avec niveau (barre de progression)"""
    CATEGORIES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('language', 'Language'),
        ('database', 'Database'),
        ('devops', 'DevOps'),
        ('design', 'Design'),
        ('research', 'Research'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORIES)
    level = models.PositiveSmallIntegerField(
        help_text="Niveau de 0 à 100"
    )

    class Meta:
        ordering = ['-level']

    def __str__(self):
        return f"{self.name} ({self.level}%)"


class Achievement(models.Model):
    """Réalisations et awards"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='achievements')
    title = models.CharField(max_length=255)
    organization = models.CharField(max_length=255)
    date = models.DateField()

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.title} — {self.organization}"


class Event(models.Model):
    TYPE_CHOICES = [
        ('meeting',      'Réunion'),
        ('deadline',     'Deadline'),
        ('review',       'Review'),
        ('deployment',   'Déploiement'),
        ('training',     'Formation'),
        ('presentation', 'Présentation'),
        ('other',        'Autre'),
    ]

    id          = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    creator     = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_events')
    title       = models.CharField(max_length=255)
    type        = models.CharField(max_length=50, choices=TYPE_CHOICES, default='other')
    color       = models.CharField(max_length=20, blank=True, default='#1a1a1a')
    start_at    = models.DateTimeField()
    end_at      = models.DateTimeField(null=True, blank=True)
    location    = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    attendees   = models.ManyToManyField(User, related_name='events', blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['start_at']

    def __str__(self):
        return f"{self.title} — {self.start_at.strftime('%d/%m/%Y %H:%M')}"


class Team(models.Model):
    STATUS_CHOICES = [
        ('active',   'Active'),
        ('inactive', 'Inactive'),
        ('archived', 'Archivée'),
    ]

    id           = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name         = models.CharField(max_length=255)
    description  = models.TextField(blank=True)
    department   = models.CharField(max_length=255, blank=True)
    status       = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    leader       = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='led_teams')
    members      = models.ManyToManyField(User, through='TeamMembership', related_name='teams')
    created_at   = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name


class TeamMembership(models.Model):
    """Table intermédiaire — porte le rôle et la date d'entrée dans l'équipe."""
    ROLE_CHOICES = [
        ('lead_designer',    'Lead Designer'),
        ('senior_developer', 'Senior Developer'),
        ('frontend_developer', 'Frontend Developer'),
        ('backend_developer',  'Backend Developer'),
        ('product_manager',  'Product Manager'),
        ('marketing_manager','Marketing Manager'),
        ('member',           'Membre'),
    ]

    id         = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user       = models.ForeignKey(User, on_delete=models.CASCADE, related_name='memberships')
    team       = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='memberships')
    role       = models.CharField(max_length=50, choices=ROLE_CHOICES, default='member')
    joined_at  = models.DateField()
    is_active  = models.BooleanField(default=True)

    class Meta:
        unique_together = ('user', 'team')
        ordering = ['joined_at']

    def __str__(self):
        return f"{self.user.email} → {self.team.name} ({self.role})"


class Project(models.Model):
    STATUS_CHOICES = [
        ('active',    'Actif'),
        ('planning',  'Planification'),
        ('completed', 'Terminé'),
        ('archived',  'Archivé'),
    ]
    PRIORITY_CHOICES = [
        ('haute',   'Haute'),
        ('moyenne', 'Moyenne'),
        ('basse',   'Basse'),
    ]

    id          = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name        = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status      = models.CharField(max_length=20, choices=STATUS_CHOICES, default='planning')
    priority    = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='moyenne')
    color       = models.CharField(max_length=20, blank=True, default='#1a1a1a')
    deadline    = models.DateField(null=True, blank=True)
    team        = models.ForeignKey('Team', on_delete=models.SET_NULL, null=True, blank=True, related_name='projects')
    members     = models.ManyToManyField(User, related_name='projects', blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    @property
    def progress(self):
        total = self.tasks.count()
        if total == 0:
            return 0
        done = self.tasks.filter(status='done').count()
        return round((done / total) * 100)

    def __str__(self):
        return self.name


class Task(models.Model):
    STATUS_CHOICES = [
        ('todo',       'À faire'),
        ('inprogress', 'En cours'),
        ('done',       'Terminé'),
    ]
    PRIORITY_CHOICES = [
        ('haute',   'Haute'),
        ('moyenne', 'Moyenne'),
        ('basse',   'Basse'),
    ]

    id          = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project     = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tasks')
    title       = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status      = models.CharField(max_length=20, choices=STATUS_CHOICES, default='todo')
    priority    = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='moyenne')
    assignee    = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_tasks')
    due_date    = models.DateField(null=True, blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['due_date', '-priority']

    def __str__(self):
        return f"{self.title} ({self.project.name})"

