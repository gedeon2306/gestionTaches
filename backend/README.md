# Backend - API Django REST

L'API REST du système de gestion de tâches construit avec Django 6.0.3 et Django REST Framework.

## Vue d'ensemble

Ce backend fournit une API complète et sécurisée pour gérer les utilisateurs, les tâches, les projets et les équipes avec authentification JWT et OAuth intégrée.

### Stack technologique
- **Framework** : Django 6.0.3 + Django REST Framework 3.17.1
- **Authentification** : JWT tokens (SimpleJWT 5.5.1) + OAuth (Google, GitHub)
- **Documentation** : OpenAPI/Swagger (drf-spectacular 0.29.0)
- **Base de données** : SQLite en dev, PostgreSQL en production
- **Email** : Support SMTP pour confirmations et notifications
- **Sécurité** : CORS, throttling, validation, hachage de mots de passe

## Modèles de données

### User
- Modèle d'utilisateur personnalisé avec authentification par email
- UUIDs comme identifiants
- Timestamps (created_at, updated_at)
- Support des rôles (admin, utilisateur standard)

```python
Fields: id, email (unique), name, email_verified, image, is_active, created_at, updated_at
```

### Account (OAuth)
- Liaison des comptes OAuth avec les utilisateurs
- Support Google et GitHub
- Stockage des tokens et métadonnées

```python
Fields: id, user (FK), provider, provider_account_id, access_token, refresh_token, expires_at, etc.
Unique: (provider, provider_account_id)
```

### UserProfil
- Profil détaillé de l'utilisateur
- Liens sociaux et contacts
- Relation 1-to-1 avec User

```python
Fields: id, user (OneToOne), title, bio, phone, location, website, github, linkedin, twitter
```

### Skill
- Compétences par utilisateur
- Catégories (frontend, backend, language, database, devops, design, research)
- Niveaux (0-100%)

```python
Fields: id, user (FK), name, category, level
Ordering: -level
```

### Achievement
- Réalisations et certifications
- Dates et organisations
- Relation avec User

```python
Fields: id, user (FK), title, organization, date
```

### Event
- Événements et réunions
- Types multiples (meeting, deadline, review, deployment, etc.)
- Participants et localisation
- Timestamps

```python
Fields: id, creator (FK), title, type, color, start_at, end_at, location, description, attendees (M2M)
```

### Team
- Équipes de travail
- Statuts (active, inactive, archived)
- Leader et membres
- Métadonnées

```python
Fields: id, name, description, department, status, leader (FK), members (M2M via TeamMembership)
```

### TeamMembership
- Adhésion aux équipes
- Date d'adhésion
- Statut d'activité

```python
Fields: id, user (FK), team (FK), joined_at, is_active
Unique: (user, team)
```

### Project
- Projets de travail
- Statuts et priorités
- Deadline et équipe associée
- Relation avec Task

```python
Fields: id, name, description, status, priority, deadline, team (FK), tasks (relation inverse)
```

### Task
- Tâches individuelles
- Statuts (todo, inprogress, done)
- Priorités et assigné
- Dates limites

```python
Fields: id, project (FK), title, description, status, priority, assignee (FK), due_date
```

### Invitation
- Invitations d'équipe
- Types (invite, request)
- Statuts (pending, accepted, rejected)
- Timestamps

```python
Fields: id, team (FK), sender (FK), recipient (FK), type, status, message, created_at, responded_at
```

## Authentification

### Email/Mot de passe
1. **Inscription** : POST `/api/auth/register/`
   - Validation email/mot de passe
   - Email de confirmation envoyé
   - Lien valide 10 minutes
   
2. **Confirmation** : GET `/api/auth/confirm-register/<uidb64>/<token>/`
   - Vérification du token
   - Marquage email_verified
   - Création de session JWT
   
3. **Connexion** : POST `/api/auth/login/`
   - Authentification par email/mot de passe
   - Retour des tokens JWT (access + refresh)
   
4. **Refresh** : POST `/api/auth/refresh/`
   - Rafraîchir le token access expiré

### Récupération de mot de passe
1. **Demande** : POST `/api/auth/forgot-password/`
   - Email de réinitialisation
   
2. **Confirmation** : GET `/api/auth/confirm-password/<uidb64>/<token>/`
   - Vérification du lien
   
3. **Réinitialisation** : POST `/api/auth/reset-password-confirm/`
   - Définition du nouveau mot de passe

### OAuth (Google, GitHub)
- Endpoints Next.js dédiés à NextAuth
- Création automatique d'utilisateur
- Liaison de compte existant

### Tokens
- **Access Token** : JWT valide 1 heure (configurable)
- **Refresh Token** : JWT valide 7 jours (configurable)
- **Email Token** : Tokens de confirmation (10 minutes)

## Endpoints API

### Authentification (Implémentés ✓)
```
POST   /api/auth/register/              - Inscription
POST   /api/auth/confirm-register/      - Confirmation d'email
POST   /api/auth/login/                 - Connexion
POST   /api/auth/refresh/               - Rafraîchir les tokens
POST   /api/auth/resend-email/          - Renvoyer l'email
POST   /api/auth/forgot-password/       - Mot de passe oublié
POST   /api/auth/confirm-password/      - Confirmation du lien
POST   /api/auth/reset-password-confirm/- Réinitialisation
POST   /api/auth/oauth/                 - Authentification OAuth
```

### Utilisateurs (À venir)
```
GET    /api/user/me/                    - Profil actuel
PATCH  /api/user/me/                    - Mettre à jour le profil
GET    /api/user/                       - Lister les utilisateurs
GET    /api/user/<id>/                  - Détails utilisateur
```

### Tâches (À venir)
```
GET    /api/task/                       - Lister les tâches
POST   /api/task/                       - Créer une tâche
PATCH  /api/task/<id>/                  - Mettre à jour
DELETE /api/task/<id>/                  - Supprimer
```

### Projets (À venir)
```
GET    /api/project/                    - Lister les projets
POST   /api/project/                    - Créer un projet
PATCH  /api/project/<id>/               - Mettre à jour
DELETE /api/project/<id>/               - Supprimer
```

### Équipes (À venir)
```
GET    /api/team/                       - Lister les équipes
POST   /api/team/                       - Créer une équipe
PATCH  /api/team/<id>/                  - Mettre à jour
DELETE /api/team/<id>/                  - Supprimer
```

## Installation et Démarrage

### Prérequis
- Python 3.8+
- pip
- virtualenv (recommandé)

### Installation

```bash
# 1. Naviguer vers le backend
cd backend

# 2. Créer l'environnement virtuel
python -m venv env

# 3. Activer l'environnement
# Windows
env\Scripts\activate
# Linux/Mac
source env/bin/activate

# 4. Installer les dépendances
pip install -r requirements.txt

# 5. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos configurations

# 6. Appliquer les migrations
python manage.py migrate

# 7. Créer un superutilisateur (optional)
python manage.py createsuperuser

# 8. Démarrer le serveur
python manage.py runserver
```

L'API sera disponible sur `http://localhost:8000`
Documentation : `http://localhost:8000/api/docs/`

## 📝 Migrations

Migrations disponibles :
- `0001_initial.py` - Modèles initiaux (User, Account, UserProfil)
- `0002_project_achievement_event_skill_task_team_and_more.py` - Modèles métier (Task, Project, Team, etc.)
- `0003_user_dfa_user_validate_code.py` - Ajout de champs d'authentification
- `0004_remove_user_dfa_remove_user_validate_code.py` - Nettoyage

```bash
# Créer des migrations
python manage.py makemigrations

# Appliquer les migrations
python manage.py migrate

# Afficher le statut
python manage.py showmigrations
```

## 🧪 Tests

```bash
# Lancer tous les tests
python manage.py test

# Lancer les tests d'une app
python manage.py test task

# Lancer un test spécifique
python manage.py test task.tests.MyTestCase

# Tests avec verbosité
python manage.py test --verbosity=2
```

## 📚 Documentation

- **Swagger UI** : `http://localhost:8000/api/docs/`
- **ReDoc** : `http://localhost:8000/api/redoc/`
- **OpenAPI Schema** : `http://localhost:8000/api/schema/`

## 🔒 Sécurité

- **CORS** : Configuré pour localhost et domaines autorisés
- **Throttling** : Rate limiting par IP
- **Validation** : Validation complète des inputs
- **Hachage** : Mots de passe hachés avec PBKDF2
- **Tokens** : JWT signés avec clé secrète
- **CSRF** : Protection CSRF activée

## 🛠️ Commandes Django utiles

```bash
# Shell Django interactif
python manage.py shell

# Admin Django
python manage.py runserver

# Collecter les fichiers statiques
python manage.py collectstatic

# Vider le cache
python manage.py clear_cache

# Créer l'admin
python manage.py createsuperuser
```

## 📦 Dépendances principales

- **Django 6.0.3** - Framework web
- **djangorestframework 3.17.1** - REST API
- **djangorestframework-simplejwt 5.5.1** - JWT Auth
- **drf-spectacular 0.29.0** - OpenAPI/Swagger
- **django-cors-headers 4.9.0** - CORS support
- **django-environ 0.13.0** - Variables d'environnement

Voir `requirements.txt` pour la liste complète.