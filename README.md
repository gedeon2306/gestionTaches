# Application de gestion des tâches - GestionTaches

Une application web full-stack moderne et complète pour la gestion de tâches, de projets et d'équipes avec authentification sécurisée et interface utilisateur moderne et réactive.

## Vue d'ensemble

Ce projet est une application de gestion de tâches professionnelle construite avec une architecture moderne :

- **Backend** : Django 6.0.3 avec Django REST Framework 3.17.1
- **Frontend** : Next.js 16.2.4 avec TypeScript 5 et Tailwind CSS v4
- **Authentification** : Email/Password + OAuth (Google, GitHub) via NextAuth.js 4.24.14
- **Base de données** : SQLite en développement (migrations vers PostgreSQL prêtes)
- **API Documentation** : OpenAPI/Swagger avec drf-spectacular 0.29.0
- **Sécurité** : JWT tokens avec SimpleJWT 5.5.1, CORS configuré, rate limiting

## Architecture

### Backend (Django)
- **Framework** : Django 6.0.3 + Django REST Framework 3.17.1
- **Authentification** : 
  - Modèle `User` personnalisé avec authentification par email
  - JWT tokens avec SimpleJWT 5.5.1
  - OAuth integration (Google, GitHub) via modèle `Account`
  - Email confirmation tokens avec expiration
- **API Documentation** : drf-spectacular 0.29.0 (OpenAPI/Swagger)
- **Base de données** : SQLite avec migrations complètes (13+)
- **Modèles** : User, Account, UserProfil, Skill, Achievement, Event, Team, TeamMembership, Project, Task, Invitation
- **Sécurité** : CORS, throttling, validation des inputs, protection CSRF
- **Configuration** : Variables d'environnement avec django-environ

### Frontend (Next.js)
- **Framework** : Next.js 16.2.4 avec App Router
- **Langage** : TypeScript 5 + React 19.2.4
- **Styling** : Tailwind CSS v4 + postcss
- **Authentification** : NextAuth.js v4.24.14 avec providers (credentials, Google, GitHub)
- **HTTP Client** : Axios 1.16.0
- **Animations** : Motion 12.38.0 (alternative Framer Motion moderne)
- **Notifications** : React Hot Toast 2.6.0 pour le feedback utilisateur
- **Icons** : React Icons 5.6.0
- **ESLint** : Configuration Next.js intégrée pour la qualité du code

## Fonctionnalités

### Authentification (Complètement implémentée ✓)
- **Inscription** : Email/mot de passe avec confirmation par email
- **Connexion** : Email/mot de passe avec tokens JWT
- **OAuth** : Google et GitHub intégrés avec NextAuth.js
- **Gestion de session** : Session persistante avec refresh tokens
- **Sécurité** : Validation des emails, confirmation par lien, hashage des mots de passe
- **Récupération de mot de passe** : Réinitialisation par email avec lien expirant
- **Redirection** : Redirection automatique pour les utilisateurs authentifiés
- **SessionProvider** : État de session géré globalement (loading, authenticated, unauthenticated)

### Dashboard
- **Pages principales** : Accueil du dashboard avec redirection sécurisée
- **Gestion des tâches** : Pages dédiées (en développement)
- **Gestion de projets** : Pages dédiées (en développement)
- **Gestion d'équipes** : Pages dédiées (en développement)
- **Calendrier** : Intégration calendrier (en développement)
- **Profil utilisateur** : Gestion du profil personnel (en développement)
- **Paramètres** : Configuration utilisateur (en développement)
- **Recherche d'utilisateurs** : Recherche d'autres utilisateurs du système (en développement)

### Interface Utilisateur
- **Design moderne** : Interface épurée et professionnelle
- **Responsive** : Adapté desktop et mobile
- **Animations** : Transitions fluides avec Motion
- **Notifications** : Toast notifications pour le feedback utilisateur
- **Accessibilité** : Components bien structurés avec support clavier
- **Dark/Light** : Support des thèmes (en préparation)

## Structure du Projet

```
gestionTaches/
├── backend/                          # API Django + Models
│   ├── backend/                      # Configuration Django
│   │   ├── settings.py              # Configuration principale
│   │   ├── urls.py                  # Routeur d'API
│   │   ├── asgi.py                  # Configuration ASGI
│   │   └── __init__.py
│   ├── task/                        # Application Django
│   │   ├── models.py                # 11 modèles (User, Account, Project, Task, etc.)
│   │   ├── views.py                 # Endpoints d'authentification
│   │   ├── serializers.py           # Serializers DRF
│   │   ├── urls.py                  # Routes API
│   │   ├── admin.py                 # Administration Django
│   │   ├── apps.py                  # Configuration app
│   │   ├── email_utils.py           # Utilitaires d'email
│   │   ├── tokens.py                # Générateurs de tokens
│   │   ├── backends/
│   │   │   └── custom_email_backend.py  # Email backend personnalisé
│   │   ├── migrations/              # 4+ migrations de base de données
│   │   └── templates/
│   │       └── landing.html
│   ├── env/                         # Environnement virtuel Python
│   ├── db.sqlite3                   # Base de données SQLite
│   ├── requirements.txt             # Dépendances Python
│   ├── manage.py                    # CLI Django
│   └── README.md
├── frontend/                         # Application Next.js
│   ├── app/
│   │   ├── auth/                    # Pages d'authentification ✓
│   │   │   ├── login/              # Connexion (email/password + OAuth)
│   │   │   ├── register/           # Inscription
│   │   │   ├── confirm/            # Confirmation d'email
│   │   │   ├── email-send/         # Affichage du lien envoyé
│   │   │   ├── forgot-password/    # Récupération mot de passe
│   │   │   └── reset-password/     # Réinitialisation mot de passe
│   │   ├── dashboard/              # Pages protégées
│   │   │   ├── page.tsx           # Accueil du dashboard
│   │   │   ├── tasks/             # Gestion des tâches
│   │   │   ├── projects/          # Gestion des projets
│   │   │   ├── teams/             # Gestion d'équipes
│   │   │   ├── calendar/          # Calendrier
│   │   │   ├── profil/            # Profil utilisateur
│   │   │   ├── settings/          # Paramètres
│   │   │   └── searchUsers/       # Recherche d'utilisateurs
│   │   ├── api/                    # Routes API Next.js
│   │   │   ├── auth/              # Endpoints d'authentification
│   │   │   ├── register/          # Inscription API
│   │   │   ├── confirm/           # Confirmation API
│   │   │   ├── forgot-password/   # Récupération API
│   │   │   └── reset-password/    # Réinitialisation API
│   │   ├── layout.tsx              # Layout principal
│   │   ├── page.tsx                # Page d'accueil publique
│   │   ├── not-found.tsx          # Page 404
│   │   ├── globals.css             # Styles globaux
│   │   └── SessionWrapper.tsx       # Provider NextAuth
│   ├── src/
│   │   ├── components/             # Composants React réutilisables
│   │   │   ├── auth/              # Composants d'authentification
│   │   │   └── uxComponents/      # Composants UI/UX
│   │   └── constants/             # Constantes de l'app
│   │       ├── api.ts             # Base URLs API
│   │       └── routes.ts          # Routes de l'application
│   ├── public/                    # Assets statiques
│   ├── package.json               # Dépendances npm
│   ├── tsconfig.json             # Configuration TypeScript
│   ├── next.config.ts            # Configuration Next.js
│   ├── eslint.config.mjs         # Configuration ESLint
│   ├── tailwind.config.ts        # Configuration Tailwind
│   ├── postcss.config.mjs        # Configuration PostCSS
│   └── README.md
├── .git/                          # Historique Git
├── .gitignore                     # Fichiers ignorés
└── README.md                      # Ce fichier
```

## Installation et Démarrage

### Prérequis
- Python 3.8+
- Node.js 18+
- npm ou yarn
- Git

### Backend

1. **Cloner le projet et naviguer vers le backend**
   ```bash
   cd backend
   ```

2. **Créer l'environnement virtuel**
   ```bash
   python -m venv env
   # Windows
   env\Scripts\activate
   # Linux/Mac
   source env/bin/activate
   ```

3. **Installer les dépendances**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configurer les variables d'environnement**
   ```bash
   cp .env.example .env
   # Éditer .env avec vos configurations
   ```

5. **Appliquer les migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Créer un superutilisateur**
   ```bash
   python manage.py createsuperuser
   ```

7. **Démarrer le serveur**
   ```bash
   python manage.py runserver
   ```
   L'API sera disponible sur `http://localhost:8000`

### Frontend

1. **Naviguer vers le frontend**
   ```bash
   cd frontend
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configurer les variables d'environnement**
   ```bash
   cp .env.example .env.local
   # Éditer .env.local avec vos configurations OAuth
   ```

4. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```
   L'application sera disponible sur `http://localhost:3000`

## Configuration

### Variables d'environnement (Backend - .env)
```env
# Django
SECRET_KEY=votre_clé_secrète_django_complexe
DEBUG=False  # True en développement
ALLOWED_HOSTS=localhost,127.0.0.1,votre-domaine.com

# CORS & Frontend
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,https://votre-domaine.com
FRONTEND_URL=http://localhost:3000

# Email (pour confirmation d'inscription et réinitialisation)
EMAIL_BACKEND=your_email.backends.custom_email_backend.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=votre-email@gmail.com
EMAIL_HOST_PASSWORD=votre-mot-de-passe-app
DEFAULT_FROM_EMAIL=noreply@gestiontaches.com

# JWT & Tokens
JWT_ALGORITHM=HS256
JWT_EXPIRATION_DELTA=3600  # 1 heure
JWT_REFRESH_EXPIRATION_DELTA=604800  # 7 jours
TOKEN_EXPIRATION_MINUTES=10  # Pour tokens d'email

# Base de données
DB_ENGINE=django.db.backends.sqlite3  # ou postgresql
DB_NAME=db.sqlite3
```

### Variables d'environnement (Frontend - .env.local)
```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre-secret-nextauth-complexe  # openssl rand -base64 32

# API Backend
NEXT_PUBLIC_API_URL=http://localhost:8000

# OAuth Providers
GOOGLE_CLIENT_ID=votre-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=votre-google-client-secret

GITHUB_CLIENT_ID=votre-github-client-id
GITHUB_CLIENT_SECRET=votre-github-client-secret
```

### Flux d'authentification

#### Inscription (Register)
1. Utilisateur remplit le formulaire (nom, email, mot de passe)
2. POST `/api/register` → Validation et création d'utilisateur
3. Email de confirmation envoyé avec lien unique (valide 10 min)
4. Utilisateur clique le lien → Confirmation d'email
5. Session créée automatiquement avec JWT tokens
6. Redirection vers le dashboard

#### Connexion (Login)
1. Deux options : Email/Mot de passe OU OAuth (Google/GitHub)
2. **Email/Password** : Authentification directe avec NextAuth
3. **OAuth** : Redirection vers le provider, puis création/lien de compte
4. Tokens JWT stockés en session sécurisée
5. Redirection automatique vers le dashboard

#### Récupération de mot de passe
1. Utilisateur entre son email → POST `/api/forgot-password`
2. Email de réinitialisation envoyé (valide 10 min)
3. Utilisateur clique le lien → Page de réinitialisation
4. Nouveau mot de passe défini → POST `/api/reset-password`
5. Redirection vers la connexion

## API Documentation

Une fois le backend démarré, accédez à :
- **Swagger UI** : `http://localhost:8000/api/docs/`
- **ReDoc** : `http://localhost:8000/api/redoc/`
- **OpenAPI JSON** : `http://localhost:8000/api/schema/`

### Endpoints d'authentification (Implémentés ✓)
- `POST /api/auth/register/` - Inscription utilisateur
- `POST /api/auth/confirm-register/` - Confirmation d'email
- `POST /api/auth/login/` - Connexion utilisateur
- `POST /api/auth/refresh/` - Rafraîchir les tokens
- `POST /api/auth/resend-email/` - Renvoyer l'email de confirmation
- `POST /api/auth/forgot-password/` - Demander la réinitialisation
- `POST /api/auth/confirm-password/` - Vérifier le lien de réinitialisation
- `POST /api/auth/reset-password-confirm/` - Définir le nouveau mot de passe
- `POST /api/auth/oauth/` - Authentification OAuth

### Endpoints utilisateur (À venir)
- `GET /api/user/me/` - Profil utilisateur actuel
- `PATCH /api/user/me/` - Mettre à jour le profil
- `GET /api/user/` - Lister les utilisateurs (recherche)

## Tests

### Backend
```bash
cd backend
python manage.py test
```

### Frontend
```bash
cd frontend
npm test
# ou
yarn test
```

## Déploiement

### Production
- Configurer `DEBUG=False` dans les settings Django
- Utiliser une base de données PostgreSQL
- Configurer les variables d'environnement de production
- Servir les fichiers statiques avec un service comme Nginx
- Configurer HTTPS avec un certificat SSL

### Docker (Optionnel)
```bash
# Construction des images
docker-compose build

# Démarrage des services
docker-compose up -d
```

## Contribuer

1. Forker le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commiter les changements (`git commit -am 'Ajouter nouvelle fonctionnalité'`)
4. Pousser la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## License

Ce projet est sous licence MIT.

## Roadmap

### Phase 1 : Authentification (✓ Complète)
- [x] Inscription par email avec confirmation
- [x] Connexion par email/mot de passe
- [x] OAuth Google et GitHub
- [x] Réinitialisation de mot de passe
- [x] Gestion des sessions avec NextAuth
- [x] Tokens JWT avec refresh

### Phase 2 : Gestion des tâches (En cours)
- [ ] Création/édition/suppression de tâches
- [ ] Statuts et priorités des tâches
- [ ] Attribution des tâches
- [ ] Dates limites et notifications
- [ ] Vue liste et vue kanban

### Phase 3 : Gestion de projets (Planifiée)
- [ ] Création/gestion de projets
- [ ] Statuts des projets (planning, actif, terminé)
- [ ] Équipes par projet
- [ ] Dashboards de projet

### Phase 4 : Gestion d'équipes (Planifiée)
- [ ] Création/gestion d'équipes
- [ ] Invitations et demandes d'adhésion
- [ ] Rôles et permissions
- [ ] Calendrier d'équipe

### Phase 5 : Fonctionnalités avancées (Prévues)
- [ ] Notifications en temps réel avec WebSocket
- [ ] Fichiers et pièces jointes
- [ ] Commentaires et discussions
- [ ] Système de tags et catégories
- [ ] Recherche avancée
- [ ] Export de données (PDF, CSV)
- [ ] Intégration API tiers (Slack, Teams)
- [ ] Mode offline avec Service Workers
- [ ] Application mobile (React Native)
- [ ] Thèmes personnalisables
- [ ] Support multilingue (i18n)

## Support

Pour toute question ou problème, veuillez :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement
- Consulter la documentation API

---
