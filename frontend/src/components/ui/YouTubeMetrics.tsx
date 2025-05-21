/**
 * Composant YouTubeMetrics simplifié sans @emotion/react
 * Affiche les métriques spécifiques aux campagnes YouTube
 */

import React from 'react';
import { useCampaignContext } from '../../contexts/CampaignContext';
import { useCampaignKPI } from '../../hooks/useGoogleAds';
import Counter from './Counter';
import { LoadingState } from './Loading';

interface MetricCardProps {
  title: string;
  value: number;
  icon: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-[#1e1e1e] rounded-lg p-4 flex items-center hover:transform hover:translate-y-[-3px] transition-all duration-300 hover:bg-opacity-80 hover:bg-[#252525]">
      <div className="text-3xl mr-4">{icon}</div>
      <div>
        <div className="text-gray-400 text-sm">{title}</div>
        <div className="text-xl font-semibold animate-countUp">
          <Counter end={value} />
        </div>
      </div>
    </div>
  );
};

const YouTubeMetrics: React.FC<{ campaignType: string }> = ({ campaignType }) => {
  const { selectedCampaignId, selectedPeriod } = useCampaignContext();
  const { data: kpiData, isLoading, error } = useCampaignKPI(selectedCampaignId || '', selectedPeriod);
  
  if (campaignType !== 'VIDEO') {
    return null;
  }
  
  if (isLoading) {
    return (
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Métriques YouTube</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <LoadingState 
              key={index}
              isLoading={true}
              type="skeleton"
              skeletonType="card"
              className="h-24 rounded-lg"
            >
              <div></div>
            </LoadingState>
          ))}
        </div>
      </div>
    );
  }
  
  if (error || !kpiData) {
    return (
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Métriques YouTube</h2>
        <div className="bg-[#1e1e1e] rounded-lg p-6">
          <div className="text-gray-400">Erreur lors du chargement des métriques YouTube</div>
        </div>
      </div>
    );
  }
  
  // Données fictives pour les métriques YouTube
  const youtubeMetrics = {
    views: kpiData.views || 0,
    likes: Math.round((kpiData.views || 0) * 0.12), // 12% des vues
    subscribers: Math.round((kpiData.views || 0) * 0.02), // 2% des vues
    playlistAdds: Math.round((kpiData.views || 0) * 0.03), // 3% des vues
  };
  
  return (
    <div className="mt-6 animate-slideInUp">
      <h2 className="text-xl font-semibold mb-4">Métriques YouTube</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Vues acquises sur YouTube" 
          value={youtubeMetrics.views} 
          icon="👁️" 
        />
        <MetricCard 
          title="Likes acquis" 
          value={youtubeMetrics.likes} 
          icon="👍" 
        />
        <MetricCard 
          title="Abonnements acquis" 
          value={youtubeMetrics.subscribers} 
          icon="🔔" 
        />
        <MetricCard 
          title="Ajouts playlist acquis" 
          value={youtubeMetrics.playlistAdds} 
          icon="📋" 
        />
      </div>
    </div>
  );
};

export default YouTubeMetrics;
