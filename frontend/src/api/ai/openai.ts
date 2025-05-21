/**
 * Configuration du client OpenAI API
 * Gère l'authentification et les requêtes vers l'API OpenAI
 */

import axios from 'axios';

// Récupération de la clé API depuis les variables d'environnement
const API_KEY = import.meta.env.VITE_API_OPENAI_KEY;

// Configuration de base pour axios
const openaiClient = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 secondes de timeout pour les requêtes IA
});

// Intercepteur pour gérer les erreurs de manière uniforme
openaiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erreur API OpenAI:', error.response?.data || error.message);
    
    // Personnalisation du message d'erreur pour l'utilisateur
    const errorMessage = error.response?.data?.error?.message || 
                         "Erreur lors de l'analyse IA stratégique";
    
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status || 500,
      originalError: error
    });
  }
);

/**
 * Génère une analyse stratégique basée sur les données de campagne
 * @param campaignData Données de la campagne à analyser
 * @returns Promise avec l'analyse stratégique
 */
export const generateStrategicAnalysis = async (campaignData: any) => {
  try {
    const response = await openaiClient.post('/chat/completions', {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Tu es un expert en marketing digital spécialisé dans l'analyse de campagnes publicitaires musicales. 
          Analyse les données de performance fournies et génère des insights stratégiques.
          Réponds uniquement au format JSON structuré comme suit:
          {
            "strategy": ["point stratégique 1", "point stratégique 2", "point stratégique 3"],
            "insights": [{ "kpi": "nom_du_kpi", "anomaly": "description de l'anomalie" }],
            "hypotheses": ["hypothèse 1", "hypothèse 2"],
            "recommendations": [{ "action": "action recommandée", "impact": "high/medium/low" }]
          }`
        },
        {
          role: 'user',
          content: `Voici les données de la campagne "${campaignData.name}" (${campaignData.type}):
          
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
          
          Analyse ces données et génère des insights stratégiques au format JSON demandé.`
        }
      ],
      temperature: 0.4,
      max_tokens: 1000,
    });

    // Extraction et parsing de la réponse JSON
    const content = response.data.choices[0].message.content;
    try {
      return JSON.parse(content);
    } catch (parseError) {
      console.error('Erreur de parsing JSON:', parseError);
      throw new Error('Format de réponse IA invalide');
    }
  } catch (error) {
    console.error('Erreur lors de la génération de l\'analyse stratégique:', error);
    throw error;
  }
};

export default openaiClient;
