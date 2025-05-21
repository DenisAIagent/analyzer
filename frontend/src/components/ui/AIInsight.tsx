/**
 * Composant AIInsight simplifié sans @emotion/react
 * Avec analyse dynamique selon le type de campagne
 */

import React from 'react';
import { useCampaignContext } from '../../contexts/CampaignContext';
import { useCampaignAnalysis } from '../../hooks/useCampaignAnalysis';
import { LoadingState } from './Loading';

interface AIInsightProps {
  campaignType: string;
  agentType?: 'openai' | 'gemini' | 'manager' | 'stratege' | 'budget' | 'audience' | 'concurrent' | 'predictif';
  title?: string;
}

const AIInsight: React.FC<AIInsightProps> = ({ 
  campaignType, 
  agentType = 'manager',
  title = 'Aperçu IA'
}) => {
  const { selectedCampaignId, selectedPeriod } = useCampaignContext();
  const { data: analysisData, isLoading, error } = useCampaignAnalysis(selectedCampaignId || '', selectedPeriod, agentType);
  
  // Déterminer l'icône et la couleur selon le type d'agent
  const getAgentIcon = () => {
    switch (agentType) {
      case 'openai':
        return '🧠';
      case 'gemini':
        return '🔍';
      case 'manager':
        return '👨‍💼';
      case 'stratege':
        return '📊';
      case 'budget':
        return '💰';
      case 'audience':
        return '👥';
      case 'concurrent':
        return '🏆';
      case 'predictif':
        return '🔮';
      default:
        return '🤖';
    }
  };
  
  const getAgentName = () => {
    switch (agentType) {
      case 'openai':
        return 'OpenAI';
      case 'gemini':
        return 'Gemini';
      case 'manager':
        return 'Manager';
      case 'stratege':
        return 'Stratège';
      case 'budget':
        return 'Budget';
      case 'audience':
        return 'Audience';
      case 'concurrent':
        return 'Concurrent';
      case 'predictif':
        return 'Prédictif';
      default:
        return 'IA';
    }
  };
  
  const getAgentColor = () => {
    switch (agentType) {
      case 'openai':
        return 'bg-green-600';
      case 'gemini':
        return 'bg-blue-600';
      case 'manager':
        return 'bg-purple-600';
      case 'stratege':
        return 'bg-yellow-600';
      case 'budget':
        return 'bg-emerald-600';
      case 'audience':
        return 'bg-pink-600';
      case 'concurrent':
        return 'bg-orange-600';
      case 'predictif':
        return 'bg-indigo-600';
      default:
        return 'bg-gray-600';
    }
  };
  
  if (isLoading) {
    return (
      <div className="bg-[#1e1e1e] rounded-lg p-6 h-full">
        <div className="flex items-center mb-4">
          <div className={`w-8 h-8 rounded-full ${getAgentColor()} flex items-center justify-center mr-2`}>
            {getAgentIcon()}
          </div>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <LoadingState 
          isLoading={true} 
          type="skeleton" 
          skeletonType="text"
          className="h-4 mb-2 w-full"
        >
          <div></div>
        </LoadingState>
        <LoadingState 
          isLoading={true} 
          type="skeleton" 
          skeletonType="text"
          className="h-4 mb-2 w-3/4"
        >
          <div></div>
        </LoadingState>
        <LoadingState 
          isLoading={true} 
          type="skeleton" 
          skeletonType="text"
          className="h-4 w-5/6"
        >
          <div></div>
        </LoadingState>
      </div>
    );
  }
  
  if (error || !analysisData) {
    return (
      <div className="bg-[#1e1e1e] rounded-lg p-6 h-full">
        <div className="flex items-center mb-4">
          <div className={`w-8 h-8 rounded-full ${getAgentColor()} flex items-center justify-center mr-2`}>
            {getAgentIcon()}
          </div>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="text-gray-400">Impossible de charger l'analyse IA pour le moment.</div>
      </div>
    );
  }
  
  // Générer un insight fictif basé sur le type de campagne et d'agent
  const getInsight = () => {
    if (agentType === 'manager') {
      if (campaignType === "PERFORMANCE_MAX") {
        return "Synthèse : Le taux de conversion a augmenté de 15% au cours des 30 derniers jours, en grande partie grâce à la nouvelle stratégie ciblée. Nous recommandons d'augmenter le budget sur les segments les plus performants et d'optimiser les enchères automatiques.";
      } else if (campaignType === "VIDEO") {
        return "Synthèse : Les vues complètes ont progressé de 22% ce mois-ci. Les vidéos de moins de 30 secondes génèrent un taux d'engagement supérieur de 35% par rapport aux formats plus longs. Recommandation d'investir davantage dans le contenu court.";
      } else {
        return "Synthèse : Les performances de la campagne montrent une amélioration constante. Le coût par acquisition a diminué de 12% sur la période analysée. Nous recommandons de maintenir la stratégie actuelle.";
      }
    } else if (agentType === 'stratege') {
      return "Analyse des tendances : Les recherches liées à votre secteur ont augmenté de 18% ce trimestre. Les mots-clés 'musique streaming' et 'playlist personnalisée' sont en forte hausse. Recommandation d'ajuster votre stratégie de contenu pour capitaliser sur ces tendances.";
    } else if (agentType === 'budget') {
      return "Optimisation budgétaire : Réallouer 15% du budget des campagnes sous-performantes vers les campagnes à fort ROAS pourrait augmenter le retour global de 22%. Recommandation de réviser la distribution budgétaire hebdomadaire.";
    } else if (agentType === 'audience') {
      return "Analyse d'audience : Le segment 25-34 ans urbain montre un taux d'engagement 40% supérieur à la moyenne. Opportunité d'expansion vers des segments similaires dans de nouvelles zones géographiques.";
    } else if (agentType === 'concurrent') {
      return "Analyse concurrentielle : Votre part de voix a augmenté de 5% ce mois-ci, mais les concurrents investissent davantage dans les formats vidéo courts. Recommandation de renforcer votre présence sur ces formats pour maintenir votre avantage.";
    } else if (agentType === 'predictif') {
      return "Prévisions : Selon nos modèles, une augmentation de 10% du budget pourrait générer 18% de conversions supplémentaires au cours du prochain trimestre, avec un ROAS stable. Recommandation d'augmenter progressivement les investissements.";
    } else if (agentType === 'openai') {
      return "Analyse détaillée : Les performances marketing montrent une corrélation forte entre le temps de visionnage et le taux de conversion. Les utilisateurs qui regardent plus de 75% de la vidéo ont 3,2x plus de chances de convertir.";
    } else if (agentType === 'gemini') {
      return "Analyse technique : Les métriques d'engagement présentent une distribution bimodale avec des pics à 10s et 45s de visionnage. Recommandation de placer les appels à l'action à ces moments précis pour maximiser l'impact.";
    }
    
    return analysisData.analysis || "Aucune analyse disponible pour le moment.";
  };
  
  return (
    <div className="bg-[#1e1e1e] rounded-lg p-6 h-full animate-fadeIn hover:transform hover:translate-y-[-3px] transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center mb-4">
        <div className={`w-8 h-8 rounded-full ${getAgentColor()} flex items-center justify-center mr-2`}>
          {getAgentIcon()}
        </div>
        <h2 className="text-xl font-semibold">{title} - {getAgentName()}</h2>
      </div>
      <p className="text-gray-400">
        {analysisData.analysis || getInsight()}
      </p>
    </div>
  );
};

export default AIInsight;
