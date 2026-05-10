# Application de gestion des tâches

Une application web full-stack de gestion de tâches moderne avec authentification OAuth et interface utilisateur réactive.

## 📋 Vue d'ensemble

Ce projet est une application de gestion de tâches complète construite avec :
- **Backend** : Django REST Framework avec authentification JWT
- **Frontend** : Next.js 16 avec TypeScript et Tailwind CSS
- **Authentification** : Support OAuth (Google, GitHub) via NextAuth
- **Base de données** : SQLite (configuré pour passer facilement à PostgreSQL)

## 🏗️ Architecture

### Backend (Django)
- **Framework** : Django 6.0.3 avec Django REST Framework
- **Authentification** : JWT tokens via SimpleJWT
- **API Documentation** : drf-spectacular (OpenAPI/Swagger)
- **Base de données** : SQLite avec migrations
- **Sécurité** : CORS configuré, throttling, validation des inputs

### Frontend (Next.js)
- **Framework** : Next.js 16.2.4 avec App Router
- **Langage** : TypeScript
- **Styling** : Tailwind CSS v4
- **Authentification** : NextAuth.js v4
- **HTTP Client** : Axios
- **Animations** : Motion (Framer Motion)
- **Notifications** : React Hot Toast
- **Icônes** : React Icons

## 🚀 Fonctionnalités

### Authentification
- Inscription et connexion par email/mot de passe
- Authentification OAuth (Google, GitHub)
- Tokens JWT avec refresh tokens
- Gestion des comptes utilisateurs

### Interface Utilisateur
- Dashboard principal avec redirection automatique
- Pages de gestion des tâches
- Gestion de projets
- Calendrier
- Gestion d'équipe
- Profil utilisateur
- Paramètres

## 📁 Structure du Projet

```
gestionTaches/
├── backend/                 # API Django
│   ├── backend/            # Configuration Django
│   │   ├── settings.py    # Configuration principale
│   │   ├── urls.py        # Routes API
│   │   └── ...
│   ├── task/              # Application principale
│   │   ├── models.py      # User, Account models
│   │   ├── views.py       # API endpoints
│   │   ├── serializers.py # DRF serializers
│   │   └── ...
│   ├── requirements.txt   # Dépendances Python
│   └── manage.py         # Script Django
├── frontend/              # Application Next.js
│   ├── app/              # App Router
│   │   ├── auth/         # Pages d'authentification
│   │   ├── dashboard/    # Pages principales
│   │   ├── layout.tsx    # Layout principal
│   │   └── page.tsx      # Page d'accueil
│   ├── src/              # Code source
│   │   ├── components/   # Composants React
│   │   └── constants/    # Constantes
│   ├── public/           # Assets statiques
│   └── package.json      # Dépendances Node.js
└── README.md            # Ce fichier
```

## 🛠️ Installation et Démarrage

### Prérequis
- Python 3.8+
- Node.js 18+
- npm ou yarn

### Backend

1. **Créer l'environnement virtuel**
   ```bash
   cd backend
   python -m venv env
   # Windows
   env\Scripts\activate
   # Linux/Mac
   source env/bin/activate
   ```

2. **Installer les dépendances**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configurer les variables d'environnement**
   ```bash
   cp .env.example .env
   # Éditer .env avec vos configurations
   ```

4. **Appliquer les migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Créer un superutilisateur**
   ```bash
   python manage.py createsuperuser
   ```

6. **Démarrer le serveur**
   ```bash
   python manage.py runserver
   ```
   L'API sera disponible sur `http://localhost:8000`

### Frontend

1. **Installer les dépendances**
   ```bash
   cd frontend
   npm install
   ```

2. **Configurer les variables d'environnement**
   ```bash
   cp .env.example .env.local
   # Éditer .env.local avec vos configurations
   ```

3. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```
   L'application sera disponible sur `http://localhost:3000`

## 🔧 Configuration

### Variables d'environnement (Backend)
```env
SECRET_KEY=votre_clé_secrète
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
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

## 📚 API Documentation

Une fois le backend démarré, accédez à :
- **Swagger UI** : `http://localhost:8000/api/docs/`
- **ReDoc** : `http://localhost:8000/api/redoc/`

## 🧪 Tests

### Backend
```bash
cd backend
python manage.py test
```

### Frontend
```bash
cd frontend
npm test
```

## 🚀 Déploiement

### Production
- Configurer `DEBUG=False` dans les settings Django
- Utiliser une base de données PostgreSQL
- Configurer les variables d'environnement de production
- Servir les fichiers statiques avec un service comme Nginx

## 🤝 Contribuer

1. Forker le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commiter les changements (`git commit -am 'Ajouter nouvelle fonctionnalité'`)
4. Pousser la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## 📝 License

Ce projet est sous licence MIT.

## 🔮 Roadmap

- [ ] Ajout des fonctionnalités de gestion de tâches
- [ ] Notifications en temps réel
- [ ] Mode offline
- [ ] Application mobile
- [ ] Intégration avec d'autres services (Slack, etc.)