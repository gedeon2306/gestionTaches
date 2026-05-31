# Frontend - Application Next.js

L'interface utilisateur moderne et réactive de l'application de gestion de tâches construite avec Next.js 16.2.4 et TypeScript.

## Vue d'ensemble

Une application web moderne et professionnelle avec authentification sécurisée, gestion complète des utilisateurs et interface intuitive pour la gestion de tâches et de projets.

### Stack technologique
- **Framework** : Next.js 16.2.4 avec App Router
- **Langage** : TypeScript 5 + React 19.2.4
- **Styling** : Tailwind CSS v4 avec PostCSS
- **Authentification** : NextAuth.js v4.24.14
- **HTTP Client** : Axios 1.16.0
- **Animations** : Motion 12.38.0
- **Notifications** : React Hot Toast 2.6.0
- **Icons** : React Icons 5.6.0
- **Linting** : ESLint 9 + Next.js config

## Structure des dossiers

```
app/
├── auth/                           # Pages d'authentification (routes publiques)
│   ├── login/
│   │   └── page.tsx               # Connexion (email/password + OAuth)
│   ├── register/
│   │   └── page.tsx               # Inscription avec confirmation email
│   ├── confirm/
│   │   └── page.tsx               # Confirmation d'email
│   ├── email-send/
│   │   └── page.tsx               # Affichage du lien envoyé
│   ├── forgot-password/
│   │   └── page.tsx               # Demande de réinitialisation
│   └── reset-password/
│       └── page.tsx               # Réinitialisation du mot de passe
│
├── dashboard/                      # Pages protégées (authentification requise)
│   ├── page.tsx                   # Accueil du dashboard
│   ├── layout.tsx                 # Layout du dashboard
│   ├── tasks/
│   │   └── page.tsx               # Gestion des tâches
│   ├── projects/
│   │   └── page.tsx               # Gestion des projets
│   ├── teams/
│   │   └── page.tsx               # Gestion des équipes
│   ├── calendar/
│   │   └── page.tsx               # Calendrier
│   ├── profil/
│   │   └── page.tsx               # Profil utilisateur
│   ├── settings/
│   │   └── page.tsx               # Paramètres
│   └── searchUsers/
│       └── page.tsx               # Recherche d'utilisateurs
│
├── api/                           # Routes API Next.js (routes proxies)
│   ├── auth/                      # Endpoints NextAuth
│   │   ├── [...nextauth]/
│   │   │   └── route.ts           # Configuration NextAuth
│   │   └── ...
│   ├── register/
│   │   └── route.ts               # API registration
│   ├── confirm/
│   │   └── route.ts               # API confirmation
│   ├── forgot-password/
│   │   └── route.ts               # API password recovery
│   ├── resend-email/
│   │   └── route.ts               # API email resend
│   └── reset-password/
│       └── route.ts               # API password reset
│
├── layout.tsx                     # Layout root
├── page.tsx                       # Page d'accueil publique
├── not-found.tsx                  # Page 404
├── globals.css                    # Styles globaux
└── SessionWrapper.tsx             # Provider NextAuth

src/
├── components/
│   ├── auth/                      # Composants d'authentification
│   │   ├── AuthLayout.tsx         # Wrapper pour pages auth
│   │   ├── FormField.tsx          # Champ de formulaire réutilisable
│   │   ├── OAuthButtons.tsx       # Boutons Google/GitHub
│   │   ├── PasswordStrength.tsx   # Indicateur force mot de passe
│   │   └── Spinner.tsx            # Spinner de chargement
│   └── uxComponents/
│       ├── AuthSkeleton.tsx       # Skeleton loading pour auth
│       └── ... (autres composants UI)
│
└── constants/
    ├── api.ts                     # Base URLs et endpoints API
    └── routes.ts                  # Routes de l'application

public/                           # Assets statiques
├── manifest.json
└── ... (icons, images)

Configuration
├── package.json                   # Dépendances npm
├── tsconfig.json                 # Configuration TypeScript
├── next.config.ts                # Configuration Next.js
├── eslint.config.mjs             # Configuration ESLint
├── tailwind.config.ts            # Configuration Tailwind CSS
└── postcss.config.mjs            # Configuration PostCSS
```

## Authentification avec NextAuth

### Configuration (app/api/auth/[...nextauth]/route.ts)

NextAuth.js est configuré avec trois providers :

1. **Credentials** (Email/Password)
   - Authentification par email et mot de passe
   - Tokens JWT gérés par le backend Django
   - Refresh automatique des tokens

2. **Google**
   - OAuth avec Google
   - Liaison automatique ou création de compte
   - Stockage des comptes OAuth

3. **GitHub**
   - OAuth avec GitHub
   - Même flux que Google
   - Intégration profiles GitHub

### Session et Tokens

```typescript
// Stockage des tokens en session
interface JWT {
  accessToken: string;
  refreshToken: string;
  email: string;
}

// Utilisation dans les composants
const { data: session, status } = useSession();
// status: 'loading' | 'authenticated' | 'unauthenticated'
```

### Flow d'authentification client

1. **Inscription**
   - Formulaire signup → POST `/api/register`
   - Email de confirmation envoyé
   - Utilisateur clique le lien
   - Redirection vers login automatique

2. **Connexion Email/Password**
   - Formulaire login → signIn("credentials", {...})
   - Tokens JWT reçus
   - Session créée
   - Redirection dashboard

3. **OAuth (Google/GitHub)**
   - Clic bouton → signIn("google"|"github")
   - Redirection provider
   - Callback NextAuth
   - Auto-création/liaison compte
   - Session créée

4. **Protection des routes**
   - Pages auth redirects si authentifié
   - Pages dashboard nécessitent authentification
   - Loading state avec AuthSkeleton

## Pages et Composants

### Pages d'authentification (✓ Complètes)

#### Login (/auth/login)
- Email/password form
- OAuth buttons (Google, GitHub)
- Lien vers registration
- Lien mot de passe oublié
- Gestion des erreurs

#### Register (/auth/register)
- Formulaire inscription (nom, email, password)
- Indicateur force mot de passe
- Conditions d'utilisation
- Lien vers login
- Validation emails uniques

#### Confirm (/auth/confirm)
- Page de redirection après confirmation email
- Vérification du token
- Auto-login si valide
- Spinner de chargement
- Redirection automatique vers dashboard

#### Email Send (/auth/email-send)
- Affichage email envoyé
- Info délai d'expiration (10 min)
- Bouton renvoyer email
- Astuce dossier spam

#### Forgot Password (/auth/forgot-password)
- Formulaire email
- Envoi de lien de réinitialisation
- Redirection vers email-send

#### Reset Password (/auth/reset-password)
- Formulaire nouveau mot de passe
- Confirmation mot de passe
- Indicateur correspondance
- Validation forces mot de passe

### Pages du Dashboard (Structures créées)

Toutes les pages dashboard :
- Redirectent vers login si pas authentifié
- Affichent AuthSkeleton pendant chargement
- Accès réservé aux utilisateurs authentifiés

Pages :
- `/dashboard` - Accueil principal
- `/dashboard/tasks` - Gestion tâches
- `/dashboard/projects` - Gestion projets
- `/dashboard/teams` - Gestion équipes
- `/dashboard/calendar` - Calendrier
- `/dashboard/profil` - Profil utilisateur
- `/dashboard/settings` - Paramètres
- `/dashboard/searchUsers` - Recherche utilisateurs

## Composants réutilisables

### AuthLayout
Wrapper pour les pages d'authentification avec titre, sous-titre et footer.

### FormField
Champ de formulaire avec :
- Label et placeholder
- Support password toggle
- État focus
- Gestion des erreurs

### OAuthButtons
Boutons d'authentification pour Google et GitHub avec loading states.

### PasswordStrength
Indicateur visuel force du mot de passe avec critères.

### Spinner
Spinner de chargement personnalisé avec couleur configurable.

### AuthSkeleton
Skeleton loading pour pages d'authentification.

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+
- npm ou yarn
- Backend Django en cours d'exécution

### Installation

```bash
# 1. Naviguer vers le frontend
cd frontend

# 2. Installer les dépendances
npm install
# ou
yarn install

# 3. Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local :
# - NEXTAUTH_URL
# - NEXTAUTH_SECRET
# - NEXT_PUBLIC_API_URL
# - OAuth credentials (Google, GitHub)

# 4. Démarrer le serveur de développement
npm run dev
# ou
yarn dev

# 5. Ouvrir dans le navigateur
# http://localhost:3000
```

## 📦 Scripts NPM

```bash
# Développement
npm run dev              # Démarrer le serveur de dev (localhost:3000)

# Production
npm run build            # Build optimisée
npm run start            # Démarrer le serveur production

# Qualité du code
npm run lint             # Lancer ESLint
npm run lint --fix       # Corriger les erreurs ESLint

# Autres
npm run type-check       # Vérifier types TypeScript (si configuré)
```

## 🔗 API Integration

### Configuration API (src/constants/api.ts)

```typescript
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/auth/register/`,
    CONFIRM: `${API_BASE_URL}/api/auth/confirm-register/`,
    FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password/`,
    RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password-confirm/`,
    RESEND_EMAIL: `${API_BASE_URL}/api/auth/resend-email/`,
  },
  // ... autres endpoints
};
```

### Routes (src/constants/routes.ts)

```typescript
export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    CONFIRM: '/auth/confirm',
    EMAIL_SEND: '/auth/email-send',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  DASHBOARD: {
    ROOT: '/dashboard',
    TASKS: '/dashboard/tasks',
    PROJECTS: '/dashboard/projects',
    TEAMS: '/dashboard/teams',
    CALENDAR: '/dashboard/calendar',
    PROFIL: '/dashboard/profil',
    SETTINGS: '/dashboard/settings',
    SEARCH_USERS: '/dashboard/searchUsers',
  },
};
```

## 🎯 Appels API côté client

### Exemple avec Axios

```typescript
import axios from 'axios';
import { API_ENDPOINTS } from '@/src/constants/api';

// Inscription
const response = await axios.post(API_ENDPOINTS.AUTH.REGISTER, {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'SecurePassword123',
});

// Gestion des erreurs
try {
  // ...
} catch (error: any) {
  const errorMessage = error?.response?.data?.error;
  toast.error(errorMessage);
}
```

### Exemple avec NextAuth

```typescript
import { signIn, signOut, useSession } from 'next-auth/react';

// Connexion
const result = await signIn('credentials', {
  email: 'user@example.com',
  password: 'password',
  redirect: false,
});

// OAuth
signIn('google');
signIn('github');

// Déconnexion
signOut({ callbackUrl: '/' });
```

## 🧪 Tests

```bash
# Tests unitaires (si configuré)
npm run test

# Tests e2e (si configuré)
npm run test:e2e

# Coverage (si configuré)
npm run test:coverage
```

## 📚 Documentation

### NextAuth.js
- [Documentation officielle](https://next-auth.js.org/)
- [Configuration](https://next-auth.js.org/getting-started/example)

### Next.js
- [Documentation officielle](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)

### TypeScript + React
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

## 📋 Environment Variables (.env.local)

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here  # openssl rand -base64 32

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# OAuth Providers
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx

GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
```

## 🔒 Sécurité

- **NextAuth Session** : Sécurisée avec cookies signés
- **CSRF Protection** : NextAuth.js prend en charge
- **XSS Prevention** : React échappe les données par défaut
- **Secrets** : Jamais exposés côté client (prefixe NEXT_PUBLIC_)
- **Tokens JWT** : Stockés dans la session sécurisée

## 🐛 Dépannage

### Le backend n'est pas accessible
```bash
# Vérifier le backend en cours d'exécution
# Vérifier NEXT_PUBLIC_API_URL dans .env.local
# Vérifier CORS configuré sur Django
```

### Problèmes de session
```bash
# Vérifier NEXTAUTH_SECRET est défini
# Vérifier NEXTAUTH_URL correspond à l'URL actuelle
# Vider le cache des cookies
```

### Erreurs NextAuth
```bash
# Vérifier les credentials OAuth
# Vérifier les URLs de callback
# Vérifier la configuration dans .env.local
```

## 📦 Dépendances principales

Voir `package.json` pour la version exacte.

- **next** - Framework React full-stack
- **react / react-dom** - Bibliothèque UI
- **typescript** - Typage statique
- **next-auth** - Authentification
- **axios** - HTTP client
- **tailwindcss** - Framework CSS
- **motion** - Animations
- **react-hot-toast** - Notifications
- **react-icons** - Librairie d'icons
