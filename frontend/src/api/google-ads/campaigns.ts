/**
 * Gestion des campagnes Google Ads
 * Fournit les fonctions pour récupérer et manipuler les campagnes
 * via le backend qui sert de proxy sécurisé
 */

import apiClient from './client';

/**
 * Récupère toutes les campagnes Google Ads disponibles
 * @returns Promise avec la liste des campagnes
 */
export const getAllCampaigns = async () => {
  try {
    // Requête vers le backend qui sert de proxy pour Google Ads
    const response = await apiClient.get('/google-ads/campaigns');

    // Si le backend renvoie directement les résultats de l'API Google Ads
    if (response.data.results) {
      // Transformation des données pour l'application
      return response.data.results.map((item: any) => ({
        id: item.campaign.id,
        name: item.campaign.name,
        status: item.campaign.status,
        type: item.campaign.advertising_channel_type,
        biddingStrategy: item.campaign.bidding_strategy_type,
        // Ajout d'informations supplémentaires selon le type de campagne
        isPerformanceMax: item.campaign.advertising_channel_type === 'PERFORMANCE_MAX',
        isVideo: item.campaign.advertising_channel_type === 'VIDEO',
      }));
    }
    
    // Si le backend a déjà transformé les données
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des campagnes:', error);
    throw error; // Propager l'erreur pour la gestion dans les composants
  }
};

/**
 * Récupère les détails d'une campagne spécifique
 * @param campaignId ID de la campagne
 * @returns Promise avec les détails de la campagne
 */
export const getCampaignDetails = async (campaignId: string) => {
  try {
    const response = await apiClient.get(`/google-ads/campaigns/${campaignId}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des détails de la campagne ${campaignId}:`, error);
    throw error;
  }
};
