/**
 * Modification du client API pour inclure le CID dynamique
 * Gère les requêtes vers le backend qui sert de proxy pour Google Ads
 */

import axios from 'axios';

// URL du backend, à configurer selon l'environnement
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3002';

// Configuration de base pour axios
const apiClient = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 secondes de timeout
});

// Fonction pour ajouter le CID aux requêtes
export const setRequestCID = (cid: string | null) => {
  if (cid) {
    apiClient.defaults.headers.common['X-Google-Ads-CID'] = cid;
  } else {
    delete apiClient.defaults.headers.common['X-Google-Ads-CID'];
  }
};

// Intercepteur pour gérer les erreurs de manière uniforme
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erreur API:', error.response?.data || error.message);
    
    // Personnalisation du message d'erreur pour l'utilisateur
    const errorMessage = error.response?.data?.error || 
                         'Erreur lors du chargement des données';
    
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status || 500,
      originalError: error
    });
  }
);

export default apiClient;
