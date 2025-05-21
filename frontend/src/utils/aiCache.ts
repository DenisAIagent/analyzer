/**
 * Utilitaire de cache local pour les données IA
 * Gère le stockage et la récupération des analyses IA avec une durée de validité de 24h
 */

import { captureError } from './sentry';

// Durée de validité du cache (24h en millisecondes)
const CACHE_DURATION = 24 * 60 * 60 * 1000;

// Préfixe pour les clés de cache
const CACHE_PREFIX = 'mdmc_ai_analysis_';

/**
 * Interface pour les données de cache
 */
interface CacheData<T> {
  data: T;
  timestamp: number;
}

/**
 * Stocke des données dans le cache local
 * @param key Clé d'identification (sans préfixe)
 * @param data Données à stocker
 * @returns Booléen indiquant si le stockage a réussi
 */
export const storeInCache = <T>(key: string, data: T): boolean => {
  try {
    const cacheKey = `${CACHE_PREFIX}${key}`;
    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now(),
    };
    
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    return true;
  } catch (error) {
    captureError(error as Error, { context: 'cache_store', key });
    return false;
  }
};

/**
 * Récupère des données du cache local si elles sont encore valides
 * @param key Clé d'identification (sans préfixe)
 * @returns Données du cache ou null si invalides/inexistantes
 */
export const getFromCache = <T>(key: string): T | null => {
  try {
    const cacheKey = `${CACHE_PREFIX}${key}`;
    const cachedItem = localStorage.getItem(cacheKey);
    
    if (!cachedItem) {
      return null;
    }
    
    const cacheData: CacheData<T> = JSON.parse(cachedItem);
    const now = Date.now();
    
    // Vérifier si les données sont encore valides (moins de 24h)
    if (now - cacheData.timestamp < CACHE_DURATION) {
      return cacheData.data;
    }
    
    // Si les données sont expirées, les supprimer et retourner null
    localStorage.removeItem(cacheKey);
    return null;
  } catch (error) {
    captureError(error as Error, { context: 'cache_retrieve', key });
    return null;
  }
};

/**
 * Vérifie si des données valides existent dans le cache
 * @param key Clé d'identification (sans préfixe)
 * @returns Booléen indiquant si des données valides existent
 */
export const hasValidCache = (key: string): boolean => {
  try {
    const cacheKey = `${CACHE_PREFIX}${key}`;
    const cachedItem = localStorage.getItem(cacheKey);
    
    if (!cachedItem) {
      return false;
    }
    
    const cacheData: CacheData<any> = JSON.parse(cachedItem);
    const now = Date.now();
    
    return now - cacheData.timestamp < CACHE_DURATION;
  } catch (error) {
    captureError(error as Error, { context: 'cache_check', key });
    return false;
  }
};

/**
 * Récupère la date de dernière mise à jour du cache
 * @param key Clé d'identification (sans préfixe)
 * @returns Date de dernière mise à jour ou null
 */
export const getCacheTimestamp = (key: string): Date | null => {
  try {
    const cacheKey = `${CACHE_PREFIX}${key}`;
    const cachedItem = localStorage.getItem(cacheKey);
    
    if (!cachedItem) {
      return null;
    }
    
    const cacheData: CacheData<any> = JSON.parse(cachedItem);
    return new Date(cacheData.timestamp);
  } catch (error) {
    captureError(error as Error, { context: 'cache_timestamp', key });
    return null;
  }
};

/**
 * Supprime des données du cache local
 * @param key Clé d'identification (sans préfixe)
 * @returns Booléen indiquant si la suppression a réussi
 */
export const removeFromCache = (key: string): boolean => {
  try {
    const cacheKey = `${CACHE_PREFIX}${key}`;
    localStorage.removeItem(cacheKey);
    return true;
  } catch (error) {
    captureError(error as Error, { context: 'cache_remove', key });
    return false;
  }
};

/**
 * Nettoie tous les caches IA expirés
 * @returns Nombre d'éléments supprimés
 */
export const cleanExpiredCache = (): number => {
  try {
    let removedCount = 0;
    const now = Date.now();
    
    // Parcourir tous les éléments du localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      // Vérifier si c'est un élément de cache IA
      if (key && key.startsWith(CACHE_PREFIX)) {
        try {
          const cachedItem = localStorage.getItem(key);
          if (cachedItem) {
            const cacheData: CacheData<any> = JSON.parse(cachedItem);
            
            // Supprimer si expiré
            if (now - cacheData.timestamp >= CACHE_DURATION) {
              localStorage.removeItem(key);
              removedCount++;
            }
          }
        } catch (error) {
          // Ignorer les erreurs de parsing et continuer
          console.error(`Erreur lors du nettoyage du cache pour la clé ${key}:`, error);
        }
      }
    }
    
    return removedCount;
  } catch (error) {
    captureError(error as Error, { context: 'cache_clean' });
    return 0;
  }
};

export default {
  storeInCache,
  getFromCache,
  hasValidCache,
  getCacheTimestamp,
  removeFromCache,
  cleanExpiredCache,
};
