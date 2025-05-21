/**
 * Composant KPIBlock
 * Affiche un bloc de KPI avec titre, valeur et variation
 */

import React from 'react';

interface KPIBlockProps {
  title: string;
  value: string | number;
  change?: string;
  period?: string;
  campaignId?: string;
  metric?: string;
  isPercentage?: boolean;
  isCurrency?: boolean;
  unit?: string;
  variation?: {
    value: number;
    isPositive: boolean;
  };
  isLoading?: boolean;
  className?: string;
}

const KPIBlock: React.FC<KPIBlockProps> = ({
  title,
  value,
  change,
  unit = '',
  variation,
  isLoading = false,
  className = '',
  isPercentage = false,
  isCurrency = false,
}) => {
  // Formatage de la valeur selon le type
  const formattedValue = typeof value === 'number' 
    ? new Intl.NumberFormat('fr-FR', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
      }).format(value)
    : value;

  // Déterminer si le changement est positif
  const isPositive = change ? !change.startsWith('-') : false;

  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm border border-gray-100 ${className} ${isLoading ? 'animate-pulse' : 'animate-fade-in'}`}>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">
          {isLoading ? '-' : formattedValue}
          {unit && <span className="text-sm font-medium text-gray-500 ml-1">{unit}</span>}
          {isPercentage && <span className="text-sm font-medium text-gray-500 ml-1">%</span>}
          {isCurrency && <span className="text-sm font-medium text-gray-500 ml-1">€</span>}
        </p>
        
        {change && !isLoading && (
          <span className={`ml-2 text-sm font-medium ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? '↑' : '↓'} {change.replace(/[+-]/, '')}
          </span>
        )}
        
        {variation && !isLoading && (
          <span className={`ml-2 text-sm font-medium ${
            variation.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {variation.isPositive ? '↑' : '↓'} {Math.abs(variation.value).toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default KPIBlock;
export type { KPIBlockProps };
