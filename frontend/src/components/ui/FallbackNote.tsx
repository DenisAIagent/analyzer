/**
 * Composant FallbackNote
 * Affiche un message d'erreur stylisé en cas d'échec de chargement des données
 */

import React from 'react';

interface FallbackNoteProps {
  message: string;
  suggestion?: string;
  retry?: () => void;
}

const FallbackNote: React.FC<FallbackNoteProps> = ({ 
  message, 
  suggestion = "Veuillez réessayer ultérieurement", 
  retry 
}) => {
  return (
    <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{message}</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{suggestion}</p>
          </div>
          {retry && (
            <div className="mt-4">
              <button
                type="button"
                onClick={retry}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Réessayer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FallbackNote;
