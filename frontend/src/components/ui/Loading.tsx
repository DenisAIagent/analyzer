/**
 * Composant Loading simplifié sans @emotion/react
 * Utilisé pour indiquer le chargement des données
 */

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = '#ff3e33' 
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 'w-4 h-4';
      case 'large':
        return 'w-10 h-10';
      case 'medium':
      default:
        return 'w-6 h-6';
    }
  };
  
  return (
    <div 
      className={`${getSize()} border-2 rounded-full animate-spin`}
      style={{
        borderColor: color,
        borderTopColor: 'transparent'
      }}
    ></div>
  );
};

interface SkeletonLoaderProps {
  type?: 'text' | 'card' | 'circle' | 'button';
  width?: string;
  height?: string;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  type = 'text', 
  width = '100%', 
  height = '1rem',
  className = ''
}) => {
  const getStyles = () => {
    switch (type) {
      case 'circle':
        return 'rounded-full';
      case 'card':
        return 'rounded-lg';
      case 'button':
        return 'rounded-md';
      case 'text':
      default:
        return 'rounded';
    }
  };
  
  return (
    <div 
      className={`${getStyles()} ${className} animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%]`}
      style={{
        width,
        height
      }}
    ></div>
  );
};

interface LoadingStateProps {
  isLoading: boolean;
  children: React.ReactNode;
  type?: 'spinner' | 'skeleton';
  skeletonType?: 'text' | 'card' | 'circle' | 'button';
  spinnerSize?: 'small' | 'medium' | 'large';
  spinnerColor?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  isLoading,
  children,
  type = 'spinner',
  skeletonType = 'text',
  spinnerSize = 'medium',
  spinnerColor = '#ff3e33',
  className = ''
}) => {
  if (!isLoading) {
    return <>{children}</>;
  }
  
  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      {type === 'spinner' ? (
        <LoadingSpinner size={spinnerSize} color={spinnerColor} />
      ) : (
        <SkeletonLoader type={skeletonType} />
      )}
    </div>
  );
};

export default {
  LoadingSpinner,
  SkeletonLoader,
  LoadingState
};
