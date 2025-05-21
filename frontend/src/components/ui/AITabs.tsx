/**
 * Composant AITabs
 * Affiche les onglets pour naviguer entre les différentes analyses IA
 */

import React, { useState, useEffect } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface AITabsProps {
  campaignId?: string;
  period?: string;
  activeProvider?: 'openai' | 'google';
  onProviderChange?: (provider: 'openai' | 'google') => void;
  tabs?: Tab[];
  defaultTabId?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

const AITabs: React.FC<AITabsProps> = ({
  campaignId,
  period,
  activeProvider = 'openai',
  onProviderChange,
  tabs: propTabs,
  defaultTabId,
  onTabChange,
  className = '',
}) => {
  // Définir les onglets par défaut si non fournis
  const defaultTabs: Tab[] = [
    { id: 'openai', label: 'Analyse OpenAI' },
    { id: 'google', label: 'Analyse Google AI' }
  ];
  
  const tabs = propTabs || defaultTabs;
  const [activeTabId, setActiveTabId] = useState(activeProvider || defaultTabId || (tabs.length > 0 ? tabs[0].id : ''));
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);

  // Effet pour simuler le chargement des données d'analyse
  useEffect(() => {
    if (campaignId && period) {
      setIsLoading(true);
      
      // Simulation de chargement de données
      const timer = setTimeout(() => {
        // Données simulées pour la démonstration
        const mockData = {
          openai: {
            summary: "L'analyse OpenAI montre une performance stable avec des opportunités d'optimisation sur les segments d'audience jeune.",
            details: "Les performances de la campagne sont globalement positives avec un ROI de 3.2. Les créatifs musicaux ont une résonance particulière auprès de l'audience 25-34 ans. Recommandation d'augmenter le budget sur les segments performants et d'optimiser les enchères sur mobile."
          },
          google: {
            summary: "L'analyse Google AI identifie des tendances de conversion plus élevées le weekend et suggère des ajustements d'enchères temporels.",
            details: "Les conversions sont 27% plus élevées pendant les weekends. Le taux d'engagement sur YouTube est particulièrement fort pour les vidéos de moins de 30 secondes. Suggestion d'implémenter une stratégie d'enchères plus agressive pendant les périodes de haute conversion."
          }
        };
        
        setAnalysisData(mockData);
        setIsLoading(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [campaignId, period, activeTabId]);

  const handleTabClick = (tabId: string) => {
    // Vérifier que tabId est bien 'openai' ou 'google' avant de l'assigner
    if (tabId === 'openai' || tabId === 'google') {
      setActiveTabId(tabId);
      
      // Appeler onProviderChange si fourni
      if (onProviderChange) {
        onProviderChange(tabId);
      }
    }
    
    // Appeler onTabChange si fourni
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className={`${className}`}>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTabId === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                transition-all duration-200 ease-in-out
              `}
              aria-current={activeTabId === tab.id ? 'page' : undefined}
            >
              <div className="flex items-center">
                {tab.icon && <span className="mr-2">{tab.icon}</span>}
                {tab.label}
              </div>
            </button>
          ))}
        </nav>
      </div>
      
      <div className="py-4">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ) : analysisData ? (
          <div className="prose max-w-none animate-fade-in">
            <p className="text-lg font-medium mb-2">
              {analysisData[activeTabId]?.summary || "Aucune analyse disponible"}
            </p>
            <p className="text-gray-600">
              {analysisData[activeTabId]?.details || "Veuillez sélectionner une campagne pour voir l'analyse détaillée."}
            </p>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            {campaignId ? "Chargement de l'analyse..." : "Veuillez sélectionner une campagne pour voir l'analyse."}
          </div>
        )}
      </div>
    </div>
  );
};

export default AITabs;
export type { AITabsProps };
