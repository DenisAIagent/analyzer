/**
 * Composant GraphCard
 * Affiche un graphique avec titre et données
 */

import React, { useEffect, useState } from 'react';
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
} from 'chart.js';
import type { ChartOptions } from 'chart.js';

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GraphCardProps {
  title: string;
  campaignId?: string;
  metrics?: string[];
  period?: string;
  data?: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  isLoading?: boolean;
  className?: string;
}

const GraphCard: React.FC<GraphCardProps> = ({
  title,
  campaignId,
  metrics,
  period,
  data: propData,
  isLoading: propIsLoading = false,
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(propIsLoading);
  const [data, setData] = useState(propData || {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Exemple de données',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }
    ],
  });

  // Effet pour charger les données réelles si campaignId et metrics sont fournis
  useEffect(() => {
    if (campaignId && metrics && metrics.length > 0) {
      setIsLoading(true);
      
      // Simulation de chargement de données
      const timer = setTimeout(() => {
        // Données simulées pour la démonstration
        const mockData = {
          labels: ['1 Mai', '8 Mai', '15 Mai', '22 Mai', '29 Mai', '5 Juin', '12 Juin'],
          datasets: metrics.map((metric, index) => {
            const colors = [
              { border: 'rgb(53, 162, 235)', bg: 'rgba(53, 162, 235, 0.5)' },
              { border: 'rgb(255, 99, 132)', bg: 'rgba(255, 99, 132, 0.5)' },
              { border: 'rgb(75, 192, 192)', bg: 'rgba(75, 192, 192, 0.5)' },
              { border: 'rgb(255, 159, 64)', bg: 'rgba(255, 159, 64, 0.5)' }
            ];
            
            return {
              label: metric.charAt(0).toUpperCase() + metric.slice(1),
              data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 1000)),
              borderColor: colors[index % colors.length].border,
              backgroundColor: colors[index % colors.length].bg,
            };
          })
        };
        
        setData(mockData);
        setIsLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [campaignId, metrics, period]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm border border-gray-100 ${className}`}>
      <h3 className="text-sm font-medium text-gray-700 mb-4">{title}</h3>
      
      {isLoading ? (
        <div className="h-64 w-full flex items-center justify-center">
          <div className="animate-pulse-slow w-full h-full bg-gray-200 rounded"></div>
        </div>
      ) : (
        <div className="h-64 animate-fade-in">
          <Line options={options} data={data} />
        </div>
      )}
    </div>
  );
};

export default GraphCard;
export type { GraphCardProps };
