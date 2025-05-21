/**
 * Hook pour l'analyse de campagne avec support multi-agents
 * Intégration avec OpenAI, Google AI et agents spécialisés
 */

import { useState, useEffect } from 'react';
import axios from 'axios';

// Types pour les analyses
interface AnalysisData {
  analysis: string;
  timestamp: string;
}

// Hook pour récupérer l'analyse d'une campagne
export const useCampaignAnalysis = (
  campaignId: string,
  period: string,
  agentType: string = 'manager',
  isVideo: boolean = false
) => {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!campaignId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        let endpoint = '';
        
        // Déterminer l'endpoint en fonction du type d'agent
        switch (agentType) {
          case 'openai':
            endpoint = `/api/openai/analyze?campaignId=${campaignId}&period=${period}&isVideo=${isVideo}`;
            break;
          case 'gemini':
            endpoint = `/api/google-ai/analyze?campaignId=${campaignId}&period=${period}&isVideo=${isVideo}`;
            break;
          case 'manager':
            endpoint = `/api/ai/manager/analyze?campaignId=${campaignId}&period=${period}&isVideo=${isVideo}`;
            break;
          case 'stratege':
            endpoint = `/api/ai/stratege/analyze?campaignId=${campaignId}&period=${period}&isVideo=${isVideo}`;
            break;
          case 'budget':
            endpoint = `/api/ai/budget/analyze?campaignId=${campaignId}&period=${period}&isVideo=${isVideo}`;
            break;
          case 'audience':
            endpoint = `/api/ai/audience/analyze?campaignId=${campaignId}&period=${period}&isVideo=${isVideo}`;
            break;
          case 'concurrent':
            endpoint = `/api/ai/concurrent/analyze?campaignId=${campaignId}&period=${period}&isVideo=${isVideo}`;
            break;
          case 'predictif':
            endpoint = `/api/ai/predictif/analyze?campaignId=${campaignId}&period=${period}&isVideo=${isVideo}`;
            break;
          default:
            endpoint = `/api/ai/manager/analyze?campaignId=${campaignId}&period=${period}&isVideo=${isVideo}`;
        }

        // Simuler une réponse pour le développement
        // Dans un environnement de production, cette partie serait remplacée par un vrai appel API
        setTimeout(() => {
          const mockData: AnalysisData = {
            analysis: getMockAnalysis(agentType, isVideo),
            timestamp: new Date().toISOString()
          };
          setData(mockData);
          setIsLoading(false);
        }, 1500);

        // Appel API réel (commenté pour le développement)
        /*
        const response = await axios.get(endpoint);
        setData(response.data);
        */
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [campaignId, period, agentType, isVideo]);

  // Fonction pour générer des analyses fictives selon le type d'agent
  const getMockAnalysis = (agent: string, isVideoFormat: boolean): string => {
    if (agent === 'manager') {
      return isVideoFormat
        ? "Synthèse : Les vues complètes ont progressé de 22% ce mois-ci. Les vidéos de moins de 30 secondes génèrent un taux d'engagement supérieur de 35% par rapport aux formats plus longs. Recommandation d'investir davantage dans le contenu court."
        : "Synthèse : Le taux de conversion a augmenté de 15% au cours des 30 derniers jours, en grande partie grâce à la nouvelle stratégie ciblée. Nous recommandons d'augmenter le budget sur les segments les plus performants et d'optimiser les enchères automatiques.";
    } else if (agent === 'stratege') {
      return "Analyse des tendances : Les recherches liées à votre secteur ont augmenté de 18% ce trimestre. Les mots-clés 'musique streaming' et 'playlist personnalisée' sont en forte hausse. Recommandation d'ajuster votre stratégie de contenu pour capitaliser sur ces tendances.";
    } else if (agent === 'budget') {
      return "Optimisation budgétaire : Réallouer 15% du budget des campagnes sous-performantes vers les campagnes à fort ROAS pourrait augmenter le retour global de 22%. Recommandation de réviser la distribution budgétaire hebdomadaire.";
    } else if (agent === 'audience') {
      return "Analyse d'audience : Le segment 25-34 ans urbain montre un taux d'engagement 40% supérieur à la moyenne. Opportunité d'expansion vers des segments similaires dans de nouvelles zones géographiques.";
    } else if (agent === 'concurrent') {
      return "Analyse concurrentielle : Votre part de voix a augmenté de 5% ce mois-ci, mais les concurrents investissent davantage dans les formats vidéo courts. Recommandation de renforcer votre présence sur ces formats pour maintenir votre avantage.";
    } else if (agent === 'predictif') {
      return "Prévisions : Selon nos modèles, une augmentation de 10% du budget pourrait générer 18% de conversions supplémentaires au cours du prochain trimestre, avec un ROAS stable. Recommandation d'augmenter progressivement les investissements.";
    } else if (agent === 'openai') {
      return "Analyse détaillée : Les performances marketing montrent une corrélation forte entre le temps de visionnage et le taux de conversion. Les utilisateurs qui regardent plus de 75% de la vidéo ont 3,2x plus de chances de convertir.";
    } else if (agent === 'gemini') {
      return "Analyse technique : Les métriques d'engagement présentent une distribution bimodale avec des pics à 10s et 45s de visionnage. Recommandation de placer les appels à l'action à ces moments précis pour maximiser l'impact.";
    }
    
    return "Aucune analyse disponible pour le moment.";
  };

  return { data, isLoading, error };
};

export default useCampaignAnalysis;
