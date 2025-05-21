/**
 * Composant NoAIDataMessage
 * Affiche un message clair lorsqu'aucune donnée d'analyse IA n'est disponible
 */

import React from 'react';

interface NoAIDataMessageProps {
  lastAnalysisDate?: Date | null;
  onRequestAnalysis?: () => void;
  className?: string;
}

const NoAIDataMessage: React.FC<NoAIDataMessageProps> = ({
  lastAnalysisDate,
  onRequestAnalysis,
  className = '',
}) => {
  // Formatage de la date de dernière analyse
  const formattedDate = lastAnalysisDate 
    ? new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(lastAnalysisDate)
    : null;

  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 animate-fade-in ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">
            {formattedDate 
              ? `Dernière analyse effectuée le ${formattedDate}`
              : 'Aucune analyse IA disponible'}
          </h3>
          <div className="mt-2 text-sm text-blue-700">
            <p>
              {formattedDate 
                ? 'Les analyses IA sont limitées à une par campagne par jour pour optimiser les ressources.'
                : 'Sélectionnez une campagne et une période pour obtenir une analyse IA croisée.'}
            </p>
          </div>
          {onRequestAnalysis && (
            <div className="mt-4">
              <button
                type="button"
                onClick={onRequestAnalysis}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Générer une nouvelle analyse
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoAIDataMessage;
