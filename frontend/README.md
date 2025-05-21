# MDMC Music Ads Analyser

Application d'analyse de campagnes publicitaires musicales avec intégration Google Ads et analyse IA croisée.

## 🎯 Présentation

MDMC Music Ads Analyser est une application web responsive, évolutive et robuste qui :
- Se connecte dynamiquement aux campagnes Google Ads (Performance Max, YouTube Ads...)
- Affiche des KPI adaptés par type de campagne, sur 5 périodes fixes (30j, 14j, 7j, 3j, 24h)
- Génère une analyse croisée via OpenAI (GPT-4) + Google AI Studio
- Propose une UI/UX fluide, animée et orientée décision
- Limite les appels API IA à 1 par campagne par jour

## 🚀 Installation

```bash
# Cloner le dépôt
git clone [URL_DU_REPO]
cd mdmc-analyser

# Installer les dépendances
npm install

# Créer un fichier .env à la racine avec les variables suivantes
VITE_API_GEMINI_KEY="votre_clé_gemini"
VITE_API_OPENAI_KEY="votre_clé_openai"
VITE_API_GOOGLEADS_KEY="votre_clé_googleads"
VITE_SENTRY_DSN="votre_dsn_sentry" # Optionnel
VITE_ENABLE_SENTRY=false # true pour activer Sentry en développement
VITE_APP_VERSION="1.0.0"

# Lancer l'application en développement
npm run dev
```

## 📂 Structure du projet

```
/src
  /api
    /google-ads      # Intégration Google Ads API
      client.ts      # Configuration de l'API
      campaigns.ts   # Récupération des campagnes
      reports.ts     # Récupération des KPI par période
    /ai              # Intégration IA
      openai.ts      # Analyse stratégique
      google-ai.ts   # Analyse segmentaire
  /components
    /ui              # Composants UI réutilisables
    /sections        # Sections de page
  /contexts          # Contextes React
  /hooks             # Hooks personnalisés
  /pages             # Pages de l'application
  /styles            # Styles globaux
  /types             # Types TypeScript
  /tests             # Tests automatisés
  /utils             # Utilitaires
  middleware.ts      # Middleware d'authentification
  main.tsx           # Point d'entrée
```

## 🔑 Variables d'environnement

| Variable | Description | Obligatoire |
|----------|-------------|-------------|
| VITE_API_GEMINI_KEY | Clé API Google AI Studio (Gemini) | Oui |
| VITE_API_OPENAI_KEY | Clé API OpenAI | Oui |
| VITE_API_GOOGLEADS_KEY | Clé API Google Ads | Oui |
| VITE_SENTRY_DSN | DSN Sentry pour le monitoring | Non |
| VITE_ENABLE_SENTRY | Activer Sentry en développement | Non |
| VITE_APP_VERSION | Version de l'application | Non |

## 📊 Fonctionnalités principales

### Module 1 - Intégration Google Ads
- Connexion dynamique aux campagnes Google Ads
- Récupération des KPI adaptés par type de campagne
- Affichage sur 5 périodes fixes (30j, 14j, 7j, 3j, 24h)
- Gestion des erreurs avec fallback stylisé

### Module 2 - Analyse IA croisée
- Analyse stratégique via OpenAI (GPT-4)
- Analyse segmentaire via Google AI Studio
- Fusion des analyses pour des insights complets
- Cache local 24h pour limiter les appels API

### Module 3 - UI/UX
- Interface responsive et animée
- Composants réutilisables et accessibles
- Expérience utilisateur fluide et intuitive
- Export PDF des analyses

## 🧪 Tests

```bash
# Lancer les tests
npm run test

# Lancer les tests avec couverture
npm run test:coverage
```

## 🔒 Sécurité

- Authentification avec fallback localStorage
- Middleware pour sécuriser les headers
- Protection contre les attaques XSS
- Monitoring avec Sentry

## 📱 Accessibilité

L'application est conçue pour être accessible selon les standards WCAG :
- Attributs ARIA pour tous les composants interactifs
- Tests d'accessibilité avec axe-core
- Support du clavier pour toutes les fonctionnalités

## 🛠️ Technologies utilisées

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Query
- OpenAI API
- Google AI Studio API
- Google Ads API
- Vitest & Testing Library
- Sentry

## 📄 Licence

Tous droits réservés © MDMC Music Ads 2025
