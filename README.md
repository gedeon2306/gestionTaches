# Application de gestion des tâches

Une application web full-stack moderne de gestion de tâches avec authentification OAuth et interface utilisateur réactive.

## Vue d'ensemble

Ce projet est une application de gestion de tâches complète construite avec une architecture moderne :

- **Backend** : Django 6.0.3 avec Django REST Framework
- **Frontend** : Next.js 16.2.4 avec TypeScript et Tailwind CSS v4
- **Authentification** : Support OAuth (Google, GitHub) via NextAuth.js v4
- **Base de données** : SQLite (facilement migrable vers PostgreSQL)
- **API Documentation** : OpenAPI/Swagger avec drf-spectacular

## Architecture

### Backend (Django)
- **Framework** : Django 6.0.3 avec Django REST Framework 3.17.1
- **Authentification** : JWT tokens via SimpleJWT 5.5.1
- **API Documentation** : drf-spectacular 0.29.0 (OpenAPI/Swagger)
- **Base de données** : SQLite avec migrations
- **Sécurité** : CORS configuré, throttling, validation des inputs
- **Configuration** : Variables d'environnement avec django-environ

### Frontend (Next.js)
- **Framework** : Next.js 16.2.4 avec App Router
- **Langage** : TypeScript 5
- **Styling** : Tailwind CSS v4
- **Authentification** : NextAuth.js v4.24.14
- **HTTP Client** : Axios 1.16.0
- **Animations** : Motion 12.38.0 (Framer Motion)
- **Notifications** : React Hot Toast 2.6.0
- **React Version** : React 19.2.4

## Fonctionnalités

### Authentification
- Inscription et connexion par email/mot de passe
- Authentification OAuth (Google, GitHub)
- Tokens JWT avec refresh tokens
- Gestion des comptes utilisateurs
- Session sécurisée avec NextAuth

### Interface Utilisateur
- Dashboard principal avec redirection automatique
- Pages de gestion des tâches
- Gestion de projets
- Calendrier
- Gestion d'équipe
- Profil utilisateur
- Paramètres
- Interface responsive et moderne
- Animations fluides avec Motion
- Notifications toast pour le feedback utilisateur

## Structure du Projet

```
gestionTaches/
├── backend/                 # API Django
│   ├── backend/            # Configuration Django
│   │   ├── settings.py    # Configuration principale
│   │   ├── urls.py        # Routes API
│   │   ├── asgi.py        # Configuration ASGI
│   │   └── __init__.py    # Initialisation Django
│   ├── task/              # Application principale
│   │   ├── models.py      # User, Account models
│   │   ├── views.py       # API endpoints
│   │   ├── serializers.py # DRF serializers
│   │   ├── admin.py       # Administration Django
│   │   ├── apps.py        # Configuration app
│   │   ├── migrations/    # Migrations base de données
│   │   └── templates/     # Templates Django
│   ├── env/               # Environnement virtuel Python
│   ├── requirements.txt   # Dépendances Python
│   ├── .env.example       # Exemple variables d'environnement
│   ├── .gitignore         # Fichiers ignorés par Git
│   └── manage.py         # Script Django
├── frontend/              # Application Next.js
│   ├── app/              # App Router
│   │   ├── auth/         # Pages d'authentification
│   │   ├── dashboard/    # Pages principales
│   │   ├── api/          # Routes API Next.js
│   │   ├── layout.tsx    # Layout principal
│   │   ├── page.tsx      # Page d'accueil
│   │   ├── globals.css   # Styles globaux
│   │   └── not-found.tsx # Page 404
│   ├── src/              # Code source
│   │   ├── components/   # Composants React
│   │   └── constants/    # Constantes
│   ├── public/           # Assets statiques
│   ├── .env.example      # Exemple variables d'environnement
│   ├── .gitignore        # Fichiers ignorés par Git
│   ├── eslint.config.mjs # Configuration ESLint
│   └── package.json      # Dépendances Node.js
├── .git/                 # Configuration Git
├── .sixth/               # Configuration Sixth
└── README.md            # Ce fichier
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

### Variables d'environnement (Backend)
```env
SECRET_KEY=votre_clé_secrète_django
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
FRONTEND_URL=http://localhost:3000
```

### Variables d'environnement (Frontend)
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre_secret_nextauth
GOOGLE_CLIENT_ID=votre_google_client_id
GOOGLE_CLIENT_SECRET=votre_google_client_secret
GITHUB_CLIENT_ID=votre_github_client_id
GITHUB_CLIENT_SECRET=votre_github_client_secret
```

## API Documentation

Une fois le backend démarré, accédez à :
- **Swagger UI** : `http://localhost:8000/api/docs/`
- **ReDoc** : `http://localhost:8000/api/redoc/`

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

- [ ] Ajout des fonctionnalités de gestion de tâches
- [ ] Notifications en temps réel avec WebSocket
- [ ] Mode offline avec Service Workers
- [ ] Application mobile (React Native)
- [ ] Intégration avec d'autres services (Slack, Teams, etc.)
- [ ] Tableaux de bord analytiques
- [ ] Système de notifications push
- [ ] Thèmes personnalisables
- [ ] Support multilingue

## Support

Pour toute question ou problème, veuillez :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement
- Consulter la documentation API

---
