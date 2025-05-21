/**
 * Gestion des rapports et KPI Google Ads
 * Fournit les fonctions pour récupérer les métriques par période
 * via le backend qui sert de proxy sécurisé
 */

import apiClient from './client';

// Types de périodes supportées par l'application
export type PeriodType = '30j' | '14j' | '7j' | '3j' | '24h';

/**
 * Récupère les KPI d'une campagne pour une période spécifique
 * @param campaignId ID de la campagne
 * @param period Période de temps (30j, 14j, 7j, 3j, 24h)
 * @returns Promise avec les KPI de la campagne pour la période
 */
export const getKPIByPeriod = async (campaignId: string, period: PeriodType) => {
  try {
    // Conversion du format de période pour correspondre au backend
    let backendPeriod: string;
    switch (period) {
      case '30j':
        backendPeriod = '30d';
        break;
      case '14j':
        backendPeriod = '7d'; // Utilise la période la plus proche disponible dans le backend
        break;
      case '7j':
        backendPeriod = '7d';
        break;
      case '3j':
        backendPeriod = '7d'; // Utilise la période la plus proche disponible dans le backend
        break;
      case '24h':
        backendPeriod = '7d'; // Utilise la période la plus proche disponible dans le backend
        break;
      default:
        backendPeriod = '30d';
    }
    
    // Requête vers le backend qui sert de proxy pour Google Ads
    const response = await apiClient.get(`/google-ads/reports/${campaignId}/${backendPeriod}`);
    
    // Si le backend renvoie directement les résultats de l'API Google Ads
    if (response.data.results) {
      // Traitement et agrégation des données
      const results = response.data.results || [];
      
      if (results.length === 0) {
        return {
          impressions: 0,
          clicks: 0,
          cost: 0,
          conversions: 0,
          conversionValue: 0,
          ctr: 0,
          cpc: 0,
          roas: 0,
          cpv: 0,
          views: 0,
          period,
        };
      }
      
      // Agréger les métriques sur la période
      const aggregatedMetrics = results.reduce((acc: any, item: any) => {
        const metrics = item.metrics;
        return {
          impressions: acc.impressions + Number(metrics.impressions || 0),
          clicks: acc.clicks + Number(metrics.clicks || 0),
          cost: acc.cost + Number(metrics.cost_micros || 0) / 1000000, // Conversion des micros en unités
          conversions: acc.conversions + Number(metrics.conversions || 0),
          conversionValue: acc.conversionValue + Number(metrics.conversions_value || 0),
          cpc: Number(metrics.average_cpc || 0) / 1000000, // Moyenne déjà calculée par Google
          ctr: Number(metrics.ctr || 0) * 100, // Conversion en pourcentage
          cpv: Number(metrics.average_cpv || 0) / 1000000,
          views: acc.views + Number(metrics.video_views || 0),
        };
      }, {
        impressions: 0,
        clicks: 0,
        cost: 0,
        conversions: 0,
        conversionValue: 0,
        cpc: 0,
        ctr: 0,
        cpv: 0,
        views: 0,
      });
      
      // Calcul du ROAS (Return on Ad Spend)
      const roas = aggregatedMetrics.cost > 0 
        ? aggregatedMetrics.conversionValue / aggregatedMetrics.cost 
        : 0;
      
      return {
        ...aggregatedMetrics,
        roas,
        period,
      };
    }
    
    // Si le backend a déjà transformé les données
    return {
      ...response.data,
      period,
    };
  } catch (error) {
    console.error(`Erreur lors de la récupération des KPI pour la campagne ${campaignId} (période: ${period}):`, error);
    throw error;
  }
};
