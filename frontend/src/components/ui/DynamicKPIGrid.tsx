/**
 * Mise à jour du composant DynamicKPIGrid avec animations
 * Affiche différentes métriques selon le type de campagne avec effets UX avancés
 */

import React from 'react';
import { useCampaignContext } from '../../contexts/CampaignContext';
import { useCampaignKPI } from '../../hooks/useGoogleAds';
import Counter from './Counter';
import { LoadingState } from './Loading';

interface KPIBlockProps {
  title: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
}

const KPIBlock: React.FC<KPIBlockProps> = ({ title, value, suffix, prefix }) => {
  return (
    <div className="kpi-card hover:transform hover:translate-y-[-5px] transition-all duration-300 hover:shadow-lg hover:bg-opacity-10 hover:bg-white">
      <div className="kpi-title">{title}</div>
      <div className="kpi-value animate-fadeIn">
        {typeof value === 'number' ? (
          <Counter 
            end={value} 
            prefix={prefix || ''} 
            suffix={suffix || ''} 
            formatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(val >= 10000 ? 0 : 1)}` : val.toFixed(val >= 10 ? 0 : 1)}
          />
        ) : (
          <>{prefix}{value}{suffix}</>
        )}
      </div>
    </div>
  );
};

const DynamicKPIGrid: React.FC = () => {
  const { selectedCampaignId, selectedPeriod } = useCampaignContext();
  const { data: kpiData, isLoading, error } = useCampaignKPI(selectedCampaignId || '', selectedPeriod);
  
  // Récupérer les détails de la campagne pour connaître son type
  const campaignType = "VIDEO"; // À remplacer par la vraie donnée de type de campagne
  
  if (isLoading) {
    return (
      <div className="kpi-grid">
        {Array.from({ length: 6 }).map((_, index) => (
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
    );
  }
  
  if (error || !kpiData) {
    return <div className="kpi-grid">Erreur lors du chargement des KPIs</div>;
  }
  
  // Métriques communes à tous les types de campagnes
  const commonKPIs = [
    { title: "Coût", value: kpiData.cost, prefix: "", suffix: " €" },
    { title: "Conversions", value: kpiData.conversions, prefix: "", suffix: "" },
  ];
  
  // Métriques spécifiques selon le type de campagne
  let specificKPIs: Array<{ title: string; value: number | string; prefix?: string; suffix?: string }> = [];
  
  if (campaignType === "PERFORMANCE_MAX") {
    specificKPIs = [
      { title: "Impressions", value: kpiData.impressions, prefix: "", suffix: "" },
      { title: "Clics", value: kpiData.clicks, prefix: "", suffix: "" },
      { title: "Taux de conversion", value: kpiData.conversions > 0 && kpiData.clicks > 0 ? 
        (kpiData.conversions / kpiData.clicks) * 100 : 0, prefix: "", suffix: " %" },
      { title: "ROAS", value: kpiData.roas, prefix: "", suffix: "" },
      { title: "Coût par conversion", value: kpiData.conversions > 0 ? 
        kpiData.cost / kpiData.conversions : 0, prefix: "", suffix: " €" },
    ];
  } else if (campaignType === "VIDEO") {
    specificKPIs = [
      { title: "Impressions", value: kpiData.impressions, prefix: "", suffix: "" },
      { title: "Vues", value: kpiData.views || 0, prefix: "", suffix: "" },
      { title: "Taux de vue", value: kpiData.impressions > 0 ? 
        ((kpiData.views || 0) / kpiData.impressions) * 100 : 0, prefix: "", suffix: " %" },
      { title: "Taux de conversion", value: (kpiData.views || 0) > 0 ? 
        (kpiData.conversions / (kpiData.views || 1)) * 100 : 0, prefix: "", suffix: " %" },
      { title: "Coût par conversion", value: kpiData.conversions > 0 ? 
        kpiData.cost / kpiData.conversions : 0, prefix: "", suffix: " €" },
    ];
  } else {
    // Métriques par défaut pour les autres types de campagnes
    specificKPIs = [
      { title: "Impressions", value: kpiData.impressions, prefix: "", suffix: "" },
      { title: "Clics", value: kpiData.clicks, prefix: "", suffix: "" },
      { title: "CTR", value: kpiData.ctr, prefix: "", suffix: " %" },
      { title: "CPC", value: kpiData.cpc, prefix: "", suffix: " €" },
      { title: "ROAS", value: kpiData.roas, prefix: "", suffix: "" },
    ];
  }
  
  // Combiner les métriques communes et spécifiques
  const allKPIs = [...specificKPIs, ...commonKPIs];
  
  return (
    <div className="kpi-grid">
      {allKPIs.map((kpi, index) => (
        <KPIBlock 
          key={index}
          title={kpi.title}
          value={kpi.value}
          prefix={kpi.prefix}
          suffix={kpi.suffix}
        />
      ))}
    </div>
  );
};

export default DynamicKPIGrid;
