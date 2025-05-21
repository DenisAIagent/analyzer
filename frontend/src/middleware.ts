/**
 * Middleware pour la gestion de l'authentification
 * Sécurise les requêtes API et gère le fallback localStorage
 */

import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';
import { captureError } from './utils/sentry';

// Clé de stockage du token dans localStorage
const AUTH_TOKEN_KEY = 'mdmc_auth_token';

/**
 * Configure les intercepteurs axios pour l'authentification
 */
export const setupAuthInterceptors = () => {
  // Intercepteur de requête pour ajouter le token d'authentification
  axios.interceptors.request.use(
    (config: any) => {
      // Récupérer le token depuis localStorage
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      
      // Si un token existe et que la requête a des headers
      if (token && config.headers) {
        // Ajouter le token à l'en-tête Authorization
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      
      return config;
    },
    (error: AxiosError) => {
      captureError(error, { context: 'auth_interceptor_request' });
      return Promise.reject(error);
    }
  );

  // Intercepteur de réponse pour gérer les erreurs d'authentification
  axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      // Si l'erreur est 401 (non autorisé) ou 403 (interdit)
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // Supprimer le token invalide
        localStorage.removeItem(AUTH_TOKEN_KEY);
        
        // Rediriger vers la page de connexion ou afficher un message
        // window.location.href = '/login'; // Décommentez pour rediriger
        
        captureError('Erreur d\'authentification', { 
          status: error.response.status,
          url: error.config?.url
        });
      }
      
      return Promise.reject(error);
    }
  );
};

/**
 * Stocke le token d'authentification de manière sécurisée
 * @param token Token d'authentification
 */
export const storeAuthToken = (token: string) => {
  try {
    // Stockage du token dans localStorage
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    
    // Définir une date d'expiration (exemple: 24h)
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 24);
    localStorage.setItem(`${AUTH_TOKEN_KEY}_expiration`, expiration.toISOString());
    
    return true;
  } catch (error) {
    captureError('Erreur lors du stockage du token', { error });
    return false;
  }
};

/**
 * Vérifie si l'utilisateur est authentifié
 * @returns Booléen indiquant si l'utilisateur est authentifié
 */
export const isAuthenticated = (): boolean => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const expiration = localStorage.getItem(`${AUTH_TOKEN_KEY}_expiration`);
    
    if (!token || !expiration) {
      return false;
    }
    
    // Vérifier si le token n'est pas expiré
    const expirationDate = new Date(expiration);
    const now = new Date();
    
    return expirationDate > now;
  } catch (error) {
    captureError('Erreur lors de la vérification d\'authentification', { error });
    return false;
  }
};

/**
 * Déconnecte l'utilisateur en supprimant le token
 */
export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(`${AUTH_TOKEN_KEY}_expiration`);
};

export default {
  setupAuthInterceptors,
  storeAuthToken,
  isAuthenticated,
  logout
};
