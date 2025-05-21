# MDMC Music Ads Analyser

Application d'analyse de campagnes Google Ads avec architecture multi-agents IA pour MDMC Music.

## Structure du projet

Ce dépôt est organisé en deux parties principales :

- **`/frontend`** : Application React/TypeScript avec interface utilisateur moderne
- **`/backend`** : API Express servant de proxy sécurisé pour Google Ads et les services IA

## Fonctionnalités principales

- **Sélecteur de CID dynamique** : Basculez facilement entre différents comptes Google Ads
- **KPIs dynamiques** : Métriques adaptées au type de campagne (Performance Max, Vidéo, etc.)
- **Architecture multi-agents IA** : Six agents spécialisés travaillant ensemble
  - Agent Manager (synthèse globale)
  - Agent Stratège (connecté à Google Trends)
  - Agent Budget (optimisation budgétaire)
  - Agent Audience (analyse des segments)
  - Agent Concurrent (analyse concurrentielle)
  - Agent Prédictif (prévisions)
- **Interface moderne** : Design sombre avec effets UX avancés
- **Métriques YouTube** : Vues, likes, abonnements et ajouts aux playlists pour les campagnes vidéo
- **Page d'accueil backend avec monitoring** : Visualisation en temps réel du statut du serveur et des logs

## Installation et déploiement

### Prérequis

- Node.js 16+ et npm
- Clés API pour Google Ads, OpenAI, Gemini et SerpAPI

### Configuration du backend

1. Accédez au dossier backend :
```bash
cd backend
```

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env` avec les variables suivantes :
```
API_GEMINI_URL="votre_clé_gemini"
API_OPENAI_URL="votre_clé_openai"
API_GOOGLEADS="votre_clé_google_ads"
SERPAPI_KEY="votre_clé_serpapi"
PORT=3001
NODE_ENV=development
CORS_ORIGIN="*"
```

4. Démarrez le serveur :
```bash
npm run dev
```

### Configuration du frontend

1. Accédez au dossier frontend :
```bash
cd frontend
```

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env` avec les variables suivantes :
```
VITE_BACKEND_URL="http://localhost:3001"
```

4. Démarrez l'application :
```bash
npm run dev
```

## Déploiement en production

### Backend

1. Déployez le dossier `backend` sur votre serveur ou sur Railway
2. Configurez les variables d'environnement suivantes sur Railway ou votre plateforme de déploiement :
```
API_GEMINI_URL="votre_clé_gemini"
API_OPENAI_URL="votre_clé_openai"
API_GOOGLEADS="votre_clé_google_ads"
SERPAPI_KEY="votre_clé_serpapi"
PORT=3001
NODE_ENV=production
CORS_ORIGIN="https://votre-frontend-url.com"
```
3. Lancez avec `npm start`
4. **Accès au monitoring** : Une fois déployé, accédez à la racine de votre backend (https://votre-backend-url.com/) pour voir la page de monitoring avec :
   - Statut du serveur
   - Informations système
   - Configuration (sans les valeurs sensibles)
   - Liste des endpoints disponibles
   - Logs récents en temps réel

### Frontend

1. Générez la version de production :
```bash
cd frontend
npm run build
```

2. Déployez le contenu du dossier `dist` sur votre serveur statique ou sur Railway

3. **IMPORTANT** : Configurez les variables d'environnement suivantes sur Railway ou votre plateforme de déploiement :
```
VITE_BACKEND_URL="https://votre-backend-url.com"
```
Cette étape est cruciale pour que le frontend puisse communiquer avec le backend. Sans cette configuration, les boutons et sélecteurs de l'interface ne fonctionneront pas correctement.

## Déploiement sur Railway

Pour déployer cette application sur Railway, suivez ces étapes spécifiques :

1. **Backend** :
   - Créez un nouveau service en pointant vers le dossier `/backend`
   - Configurez toutes les variables d'environnement mentionnées ci-dessus
   - Utilisez la commande de démarrage `npm start`
   - Après déploiement, visitez l'URL racine du service pour accéder à la page de monitoring

2. **Frontend** :
   - Créez un nouveau service en pointant vers le dossier `/frontend`
   - Configurez la variable d'environnement `VITE_BACKEND_URL` avec l'URL complète de votre service backend déployé
   - Utilisez la commande de build `npm run build` et la commande de démarrage pour servir les fichiers statiques

## Utilisation

1. Accédez à l'application via votre navigateur
2. Saisissez un CID Google Ads dans le sélecteur en haut à droite
3. Sélectionnez une campagne dans le menu déroulant
4. Explorez les analyses fournies par les différents agents IA
5. Pour vérifier l'état du backend, accédez directement à son URL racine

## Monitoring et débogage

La page d'accueil du backend offre plusieurs fonctionnalités pour faciliter le monitoring et le débogage :

- **Statut du serveur** : Vérifiez rapidement si le backend est opérationnel
- **Informations système** : Consultez les ressources utilisées (CPU, mémoire)
- **Configuration** : Vérifiez quelles APIs sont correctement configurées
- **Endpoints disponibles** : Liste complète des routes API avec leur description
- **Logs récents** : Visualisez les 20 derniers logs du serveur avec rafraîchissement automatique

Cette page se rafraîchit automatiquement toutes les 30 secondes pour afficher les informations les plus récentes.

## Architecture technique

- **Frontend** : React, TypeScript, Vite, Tailwind CSS
- **Backend** : Node.js, Express
- **APIs externes** : Google Ads, OpenAI, Gemini, SerpAPI (Google Trends)

## Résolution des problèmes courants

- **Les boutons et sélecteurs ne fonctionnent pas** : Vérifiez que la variable d'environnement `VITE_BACKEND_URL` est correctement configurée dans votre déploiement frontend et qu'elle pointe vers l'URL complète de votre backend.
- **Erreur "No QueryClient set"** : Cette erreur est résolue dans la dernière version. Si elle persiste, vérifiez que vous utilisez la dernière version du code.
- **Erreur "Cannot GET /"** : Cette erreur ne devrait plus apparaître. La racine du backend affiche désormais une page de monitoring. Si vous voyez encore cette erreur, vérifiez que vous utilisez la dernière version du code.
- **Logs d'erreur sur la page de monitoring** : Consultez les logs affichés sur la page d'accueil du backend pour identifier les problèmes potentiels avec les APIs externes ou la configuration.
