/**
 * Configuration du client Google AI Studio
 * Gère l'authentification et les requêtes vers l'API Google AI
 */

import axios from 'axios';

// Récupération de la clé API depuis les variables d'environnement
const API_KEY = import.meta.env.VITE_API_GEMINI_KEY;

// Configuration de base pour axios
const googleAIClient = axios.create({
  baseURL: 'https://generativelanguage.googleapis.com/v1beta',
  params: {
    key: API_KEY
  },
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 secondes de timeout pour les requêtes IA
});

// Intercepteur pour gérer les erreurs de manière uniforme
googleAIClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erreur API Google AI:', error.response?.data || error.message);
    
    // Personnalisation du message d'erreur pour l'utilisateur
    const errorMessage = error.response?.data?.error?.message || 
                         "Erreur lors de l'analyse IA segmentaire";
    
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status || 500,
      originalError: error
    });
  }
);

/**
 * Génère une analyse segmentaire basée sur les données de campagne
 * @param campaignData Données de la campagne à analyser
 * @returns Promise avec l'analyse segmentaire
 */
export const generateSegmentAnalysis = async (campaignData: any) => {
  try {
    const response = await googleAIClient.post('/models/gemini-pro:generateContent', {
      contents: [
        {
          parts: [
            {
              text: `Tu es un expert en segmentation d'audience pour les campagnes publicitaires musicales.
              Analyse les données de performance fournies et génère des insights sur les segments d'audience.
              Réponds uniquement au format JSON structuré comme suit:
              {
                "segments": ["segment 1", "segment 2", "segment 3"],
                "insights": [{ "segment": "nom_du_segment", "performance": "description de la performance" }],
                "opportunities": ["opportunité 1", "opportunité 2"],
                "recommendations": [{ "action": "action recommandée", "impact": "high/medium/low" }]
              }
              
              Voici les données de la campagne "${campaignData.name}" (${campaignData.type}):
              
              Période: ${campaignData.period}
              Impressions: ${campaignData.impressions}
              Clics: ${campaignData.clicks}
              CTR: ${campaignData.ctr}%
              Coût: ${campaignData.cost}€
              Conversions: ${campaignData.conversions}
              Valeur des conversions: ${campaignData.conversionValue}€
              ROAS: ${campaignData.roas}
              
              ${campaignData.isVideo ? `Vues: ${campaignData.views}
              CPV: ${campaignData.cpv}€` : ''}
              
              Historique des performances:
              ${JSON.stringify(campaignData.history)}
              
              Analyse ces données et génère des insights sur les segments d'audience au format JSON demandé.`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1000,
      }
    });

    // Extraction et parsing de la réponse JSON
    const content = response.data.candidates[0].content.parts[0].text;
    try {
      return JSON.parse(content);
    } catch (parseError) {
      console.error('Erreur de parsing JSON:', parseError);
      throw new Error('Format de réponse IA invalide');
    }
  } catch (error) {
    console.error('Erreur lors de la génération de l\'analyse segmentaire:', error);
    throw error;
  }
};

export default googleAIClient;
