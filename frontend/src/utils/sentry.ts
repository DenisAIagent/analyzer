/**
 * Configuration de Sentry pour le monitoring
 * Permet de suivre les erreurs et performances de l'application
 */

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

/**
 * Initialise Sentry pour le monitoring de l'application
 * @param environment Environnement d'exécution (development, production)
 */
export const initSentry = (environment = 'development') => {
  // Ne pas initialiser Sentry en développement local sauf si explicitement demandé
  if (environment === 'development' && !import.meta.env.VITE_ENABLE_SENTRY) {
    console.log('Sentry désactivé en environnement de développement');
    return;
  }

  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN || '',
    integrations: [new BrowserTracing()],
    environment,
    
    // Taux d'échantillonnage pour les transactions de performance
    // En production, on peut réduire à 0.1 (10%) pour limiter l'utilisation
    tracesSampleRate: environment === 'production' ? 0.1 : 1.0,
    
    // Ne pas envoyer les erreurs en développement sauf si explicitement demandé
    enabled: environment === 'production' || !!import.meta.env.VITE_ENABLE_SENTRY,
    
    // Ignorer certaines erreurs courantes non critiques
    ignoreErrors: [
      // Erreurs de réseau courantes
      'Network Error',
      'Failed to fetch',
      'Load failed',
      // Erreurs liées à l'annulation de requêtes
      'AbortError',
      'Request aborted',
      // Erreurs liées aux extensions navigateur
      'Extension context invalidated',
      // Erreurs liées à la fermeture de l'onglet
      'Document was unloaded',
    ],
    
    // Limiter la taille des payloads
    maxBreadcrumbs: 50,
    
    // Fonction de filtrage avant envoi
    beforeSend(event) {
      // Ne pas envoyer d'informations sensibles
      if (event.request && event.request.headers) {
        delete event.request.headers['Authorization'];
        delete event.request.headers['Cookie'];
      }
      
      // Filtrer les URLs sensibles dans les breadcrumbs
      if (event.breadcrumbs) {
        event.breadcrumbs = event.breadcrumbs.filter(breadcrumb => {
          if (breadcrumb.data && breadcrumb.data.url) {
            // Exclure les URLs contenant des tokens ou des informations sensibles
            return !breadcrumb.data.url.includes('token=') && 
                   !breadcrumb.data.url.includes('key=');
          }
          return true;
        });
      }
      
      return event;
    },
  });
  
  // Ajouter des informations contextuelles globales
  Sentry.setTag('app.version', import.meta.env.VITE_APP_VERSION || '1.0.0');
  Sentry.setTag('app.name', 'MDMC Music Ads Analyser');
};

/**
 * Capture une erreur avec contexte additionnel
 * @param error Erreur à capturer
 * @param context Contexte additionnel
 */
export const captureError = (error: Error | string, context?: Record<string, any>) => {
  if (typeof error === 'string') {
    Sentry.captureMessage(error, {
      level: 'error',
      ...(context && { extra: context }),
    });
  } else {
    Sentry.captureException(error, {
      ...(context && { extra: context }),
    });
  }
};

export default {
  initSentry,
  captureError,
};
