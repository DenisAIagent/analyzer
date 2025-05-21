/**
 * Hooks React Query pour l'intégration Google Ads
 * Gère les états de chargement, d'erreur et de données
 */

import { useQuery } from 'react-query';
import { getAllCampaigns, getCampaignDetails } from '../api/google-ads/campaigns';
import { getKPIByPeriod } from '../api/google-ads/reports';
import type { PeriodType } from '../api/google-ads/reports';

// Configuration des options de requête
const DEFAULT_STALE_TIME = 5 * 60 * 1000; // 5 minutes
const DEFAULT_RETRY = 2;

/**
 * Hook pour récupérer toutes les campagnes
 */
export const useCampaigns = () => {
  return useQuery(
    ['campaigns'], 
    () => getAllCampaigns(),
    {
      staleTime: DEFAULT_STALE_TIME,
      retry: DEFAULT_RETRY,
      refetchOnWindowFocus: false,
    }
  );
};

/**
 * Hook pour récupérer les détails d'une campagne
 * @param campaignId ID de la campagne
 */
export const useCampaignDetails = (campaignId: string) => {
  return useQuery(
    ['campaign', campaignId],
    () => getCampaignDetails(campaignId),
    {
      staleTime: DEFAULT_STALE_TIME,
      retry: DEFAULT_RETRY,
      enabled: !!campaignId, // Désactive la requête si l'ID n'est pas défini
    }
  );
};

/**
 * Hook pour récupérer les KPI d'une campagne par période
 * @param campaignId ID de la campagne
 * @param period Période de temps (30j, 14j, 7j, 3j, 24h)
 */
export const useCampaignKPI = (campaignId: string, period: PeriodType) => {
  return useQuery(
    ['campaignKPI', campaignId, period],
    () => getKPIByPeriod(campaignId, period),
    {
      staleTime: DEFAULT_STALE_TIME,
      retry: DEFAULT_RETRY,
      enabled: !!campaignId, // Désactive la requête si l'ID n'est pas défini
    }
  );
};
