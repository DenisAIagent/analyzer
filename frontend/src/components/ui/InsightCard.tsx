/**
 * Composant InsightCard
 * Affiche une carte d'insight avec titre, description et indicateur d'importance
 */

import React, { useEffect, useState } from 'react';

interface InsightCardProps {
  title: string;
  campaignId?: string;
  type?: string;
  provider?: 'openai' | 'google';
  description?: string;
  impact?: 'high' | 'medium' | 'low';
  isAnomaly?: boolean;
  className?: string;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  campaignId,
  type = 'opportunities',
  provider = 'openai',
  description: propDescription,
  impact: propImpact = 'medium',
  isAnomaly = false,
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<{description: string; impact: 'high' | 'medium' | 'low'}[]>([]);
  
  // Effet pour charger les données d'insights si campaignId est fourni
  useEffect(() => {
    if (campaignId && type && provider) {
      setIsLoading(true);
      
      // Simulation de chargement de données
      const timer = setTimeout(() => {
        // Données simulées pour la démonstration
        let mockInsights;
        
        if (type === 'opportunities') {
          mockInsights = [
            {
              description: "Augmenter le budget sur les segments 25-34 ans qui montrent un ROI 40% supérieur à la moyenne",
              impact: 'high' as const
            },
            {
              description: "Optimiser les enchères sur mobile où le taux de conversion est 15% plus élevé",
              impact: 'medium' as const
            }
          ];
        } else if (type === 'recommendations') {
          mockInsights = [
            {
              description: "Implémenter une stratégie d'enchères temporelles avec +30% le weekend",
              impact: 'high' as const
            },
            {
              description: "Raccourcir les vidéos YouTube à moins de 30 secondes pour améliorer l'engagement",
              impact: 'medium' as const
            }
          ];
        }
        
        // Filtrer selon le provider
        if (provider === 'google') {
          mockInsights = mockInsights?.filter((_, index) => index % 2 === 1);
        } else {
          mockInsights = mockInsights?.filter((_, index) => index % 2 === 0);
        }
        
        setInsights(mockInsights || []);
        setIsLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [campaignId, type, provider]);

  // Définition des couleurs selon l'impact et si c'est une anomalie
  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    if (isAnomaly) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    
    switch (impact) {
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImpactIcon = (impact: 'high' | 'medium' | 'low') => {
    if (isAnomaly) {
      return (
        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
    }
    
    switch (impact) {
      case 'high':
        return (
          <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'medium':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        );
      case 'low':
        return (
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  // Si nous avons une description directe, l'utiliser
  if (propDescription) {
    return (
      <div className={`p-4 rounded-lg border ${getImpactColor(propImpact)} animate-fade-in ${className}`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getImpactIcon(propImpact)}
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium">{title}</h3>
            <div className="mt-2 text-sm opacity-90">
              <p>{propDescription}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm border border-gray-100 ${className}`}>
      <h3 className="text-sm font-medium text-gray-700 mb-4">{title}</h3>
      
      {isLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      ) : insights.length > 0 ? (
        <div className="space-y-3 animate-fade-in">
          {insights.map((insight, index) => (
            <div key={index} className={`p-3 rounded-lg border ${getImpactColor(insight.impact)}`}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {getImpactIcon(insight.impact)}
                </div>
                <div className="ml-3">
                  <div className="text-sm opacity-90">
                    <p>{insight.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          {campaignId ? "Aucun insight disponible pour cette campagne." : "Veuillez sélectionner une campagne pour voir les insights."}
        </div>
      )}
    </div>
  );
};

export default InsightCard;
export type { InsightCardProps };
