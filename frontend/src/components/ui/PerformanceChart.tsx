/**
 * Composant PerformanceChart simplifié sans @emotion/react
 * Avec sélection de période et données dynamiques
 */

import React from 'react';
import { useCampaignContext } from '../../contexts/CampaignContext';
import { useCampaignKPI } from '../../hooks/useGoogleAds';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PerformanceChartProps {
  campaignType: string;
  metric?: string; // Métrique à afficher (impressions, clicks, etc.)
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  campaignType, 
  metric = 'impressions' 
}) => {
  const { selectedCampaignId, selectedPeriod, setSelectedPeriod } = useCampaignContext();
  const { data: kpiData, isLoading } = useCampaignKPI(selectedCampaignId || '', selectedPeriod);
  
  // Périodes disponibles
  const periods = ['30j', '14j', '7j', '3j', '24h'];
  
  // Données fictives pour le graphique (à remplacer par les vraies données)
  const generateChartData = () => {
    // Nombre de points selon la période
    const pointsCount = selectedPeriod === '30j' ? 30 : 
                        selectedPeriod === '14j' ? 14 : 
                        selectedPeriod === '7j' ? 7 : 
                        selectedPeriod === '3j' ? 3 : 7;
    
    // Générer des labels (dates)
    const labels = Array.from({ length: pointsCount }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (pointsCount - i - 1));
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric' });
    });
    
    // Générer des données fictives basées sur les KPIs réels
    let baseValue = 0;
    let variance = 0;
    
    if (metric === 'impressions' && kpiData) {
      baseValue = kpiData.impressions / pointsCount;
      variance = baseValue * 0.3; // 30% de variance
    } else if (metric === 'clicks' && kpiData) {
      baseValue = kpiData.clicks / pointsCount;
      variance = baseValue * 0.4; // 40% de variance
    } else if (metric === 'conversions' && kpiData) {
      baseValue = kpiData.conversions / pointsCount;
      variance = baseValue * 0.5; // 50% de variance
    } else if (metric === 'views' && kpiData && campaignType === 'VIDEO') {
      baseValue = (kpiData.views || 0) / pointsCount;
      variance = baseValue * 0.35; // 35% de variance
    } else {
      baseValue = 1000;
      variance = 300;
    }
    
    // Générer des données avec une tendance à la hausse
    const data = Array.from({ length: pointsCount }, (_, i) => {
      const trend = baseValue * (1 + (i / pointsCount) * 0.5); // Tendance à la hausse de 50%
      const random = Math.random() * variance * 2 - variance; // Variance aléatoire
      return Math.max(0, Math.round(trend + random));
    });
    
    return {
      labels,
      datasets: [
        {
          label: getMetricLabel(metric, campaignType),
          data,
          borderColor: '#ff3e33',
          backgroundColor: 'rgba(255, 62, 51, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 3,
          pointBackgroundColor: '#ff3e33',
        },
      ],
    };
  };
  
  // Obtenir le libellé de la métrique selon le type de campagne
  const getMetricLabel = (metricKey: string, type: string) => {
    if (metricKey === 'impressions') return 'Impressions';
    if (metricKey === 'clicks') return 'Clics';
    if (metricKey === 'conversions') return 'Conversions';
    if (metricKey === 'views' && type === 'VIDEO') return 'Vues';
    return metricKey.charAt(0).toUpperCase() + metricKey.slice(1);
  };
  
  // Options du graphique
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1e1e1e',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#333333',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#a0a0a0',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#a0a0a0',
        },
        beginAtZero: true,
      },
    },
  };
  
  // Déterminer quelle métrique afficher selon le type de campagne
  const getDefaultMetric = (type: string) => {
    if (type === 'PERFORMANCE_MAX') return 'conversions';
    if (type === 'VIDEO') return 'views';
    return 'impressions';
  };
  
  if (isLoading) {
    return (
      <div className="bg-[#1e1e1e] rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Performances des campagnes</h2>
        <div className="h-64 flex items-center justify-center">
          <span className="text-gray-400">Chargement des données...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-[#1e1e1e] rounded-lg p-6 animate-fadeIn hover:transform hover:translate-y-[-3px] transition-all duration-300 hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Performances des campagnes</h2>
      <div className="h-64">
        <Line data={generateChartData()} options={chartOptions} />
      </div>
      <div className="flex space-x-2 mt-4 justify-center">
        {periods.map(period => (
          <button 
            key={period}
            className={`px-3 py-1 rounded text-sm transition-all duration-200 hover:transform hover:translate-y-[-2px] ${period === selectedPeriod ? 'bg-[#ff3e33] text-white animate-pulse' : 'bg-[#252525] text-gray-400'}`}
            onClick={() => setSelectedPeriod(period as any)}
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PerformanceChart;
