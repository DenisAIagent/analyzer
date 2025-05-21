/**
 * Composant SkeletonLoader
 * Affiche un état de chargement pour les éléments de l'interface
 */

import React from 'react';

interface SkeletonLoaderProps {
  type: 'dropdown' | 'card' | 'graph' | 'text';
  count?: number;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  type, 
  count = 1, 
  className = '' 
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'dropdown':
        return (
          <div className="w-full h-10 bg-gray-200 rounded animate-pulse-slow"></div>
        );
      case 'card':
        return (
          <div className="w-full h-32 bg-gray-200 rounded-lg animate-pulse-slow"></div>
        );
      case 'graph':
        return (
          <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse-slow"></div>
        );
      case 'text':
        return (
          <div className="w-full">
            <div className="h-4 bg-gray-200 rounded animate-pulse-slow mb-2"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse-slow w-3/4"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-fade-in">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
