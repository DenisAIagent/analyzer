# Documentation de la restructuration de l'application MDMC Music Ads Analyser

## Résumé des modifications

L'application MDMC Music Ads Analyser a été restructurée pour adopter une architecture backend/frontend plus robuste et sécurisée. Cette restructuration résout les problèmes CORS rencontrés lors des appels directs aux APIs externes (Google Ads, OpenAI, Gemini) depuis le frontend.

## Architecture précédente

Dans l'architecture précédente, le frontend React appelait directement les APIs externes :
- Google Ads API pour les campagnes et KPIs
- OpenAI API pour l'analyse IA
- Google AI (Gemini) pour l'analyse IA croisée

Cette approche présentait plusieurs problèmes :
- Exposition des clés API dans le code frontend
- Problèmes de CORS lors des appels directs aux APIs externes
- Risques de sécurité liés à l'exposition des clés API

## Nouvelle architecture

La nouvelle architecture introduit un backend Express qui sert de proxy sécurisé entre le frontend et les APIs externes :

1. **Backend (Express.js)**
   - Gère l'authentification avec les APIs externes
   - Stocke de manière sécurisée les clés API
   - Expose des endpoints REST pour le frontend
   - Configure correctement les en-têtes CORS
   - Centralise la logique d'accès aux APIs externes
   - Accepte le CID (Customer ID) Google Ads dynamiquement via un header HTTP

2. **Frontend (React/TypeScript)**
   - Communique uniquement avec le backend
   - Ne stocke plus aucune clé API
   - Utilise les mêmes hooks et composants qu'auparavant, mais avec des endpoints différents
   - Inclut un sélecteur de CID Google Ads pour basculer facilement entre différents comptes

## Modifications techniques

### Backend

- Création d'endpoints REST pour :
  - `/api/google-ads/campaigns` : Liste des campagnes
  - `/api/google-ads/campaigns/:id` : Détails d'une campagne
  - `/api/google-ads/reports/:campaignId/:period` : KPIs par période
  - `/api/openai/analyze` : Analyse IA via OpenAI
  - `/api/google-ai/analyze` : Analyse IA via Google AI (Gemini)

- Configuration CORS pour permettre les requêtes du frontend
- Gestion sécurisée des clés API via variables d'environnement
- Gestion des erreurs et fallbacks

### Frontend

- Modification du client axios pour pointer vers le backend
- Adaptation des services API pour utiliser les nouveaux endpoints
- Suppression des références directes aux clés API
- Conservation de la même structure de hooks et composants

## Configuration requise

Pour finaliser l'intégration, les informations suivantes sont nécessaires :

- Token développeur Google Ads (déjà fourni)

Le token Google Ads est stocké dans le fichier `.env` du backend :

```
API_GOOGLEADS_KEY=votre-token-google-ads
```

Grâce au sélecteur de CID dynamique, vous n'avez plus besoin de configurer un ID client Google Ads fixe dans les variables d'environnement. Vous pouvez désormais saisir n'importe quel CID directement dans l'interface utilisateur.

## Déploiement

### Backend

Le backend doit être déployé sur Railway avec les variables d'environnement suivantes :

```
PORT=3000
FRONTEND_URL=https://analyzer-2-production.up.railway.app
API_GOOGLEADS_KEY=votre-token-google-ads
API_OPENAI_KEY=votre-token-openai
API_GEMINI_KEY=votre-token-gemini
SERPAPI_KEY=votre-token-serpapi
SENTRY_DSN=
ENABLE_SENTRY=false
APP_VERSION=1.0.0
```

Notez que vous n'avez plus besoin de configurer `GOOGLE_ADS_CUSTOMER_ID` car cette valeur est maintenant fournie dynamiquement par le frontend via le sélecteur de CID.

### Frontend

Le frontend doit être déployé sur Railway avec les variables d'environnement suivantes :

```
VITE_BACKEND_URL=https://mdmc-analyser-backend-production.up.railway.app
VITE_SENTRY_DSN=
VITE_ENABLE_SENTRY=false
VITE_APP_VERSION=1.0.0
```

Notez que les clés API ne sont plus nécessaires dans le frontend, car elles sont maintenant gérées exclusivement par le backend.

## Avantages de la nouvelle architecture

- **Sécurité renforcée** : Les clés API ne sont plus exposées dans le frontend
- **Résolution des problèmes CORS** : Le backend gère correctement les en-têtes CORS
- **Maintenance simplifiée** : Centralisation de la logique d'accès aux APIs externes
- **Évolutivité améliorée** : Possibilité d'ajouter facilement de nouvelles fonctionnalités côté backend
- **Performance optimisée** : Réduction du nombre de requêtes directes depuis le navigateur client
