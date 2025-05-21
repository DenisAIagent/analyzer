/**
 * Composant SelectCampaignDropdown
 * Permet à l'utilisateur de sélectionner une campagne Google Ads
 */

import React, { useState } from 'react';
import { useCampaigns } from '../../hooks/useGoogleAds';
import SkeletonLoader from './SkeletonLoader';
import FallbackNote from './FallbackNote';

interface SelectCampaignDropdownProps {
  onSelect: (campaignId: string) => void;
  selectedCampaignId?: string | null;
}

const SelectCampaignDropdown: React.FC<SelectCampaignDropdownProps> = ({ 
  onSelect, 
  selectedCampaignId 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: campaigns, isLoading, isError, refetch } = useCampaigns();

  const handleSelect = (campaignId: string) => {
    onSelect(campaignId);
    setIsOpen(false);
  };

  // Trouver le nom de la campagne sélectionnée
  const selectedCampaignName = selectedCampaignId 
    ? campaigns?.find((c: any) => c.id === selectedCampaignId)?.name 
    : 'Sélectionner une campagne';

  if (isLoading) {
    return <SkeletonLoader type="dropdown" />;
  }

  if (isError) {
    return (
      <FallbackNote 
        message="Erreur lors du chargement des campagnes" 
        suggestion="Impossible de récupérer la liste des campagnes Google Ads"
        retry={() => refetch()}
      />
    );
  }

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center">
          <span className="ml-3 block truncate">{selectedCampaignName}</span>
        </span>
        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm animate-fade-in">
          {campaigns && campaigns.length > 0 ? (
            campaigns.map((campaign: any) => (
              <div
                key={campaign.id}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 ${
                  selectedCampaignId === campaign.id ? 'bg-primary bg-opacity-10 text-primary' : ''
                }`}
                onClick={() => handleSelect(campaign.id)}
              >
                <div className="flex items-center">
                  <span className={`font-medium block truncate ${
                    selectedCampaignId === campaign.id ? 'font-semibold' : 'font-normal'
                  }`}>
                    {campaign.name}
                  </span>
                </div>

                <span className="text-xs text-gray-500 ml-2">
                  {campaign.isPerformanceMax ? 'Performance Max' : 
                   campaign.isVideo ? 'YouTube Ads' : 
                   campaign.type}
                </span>

                {selectedCampaignId === campaign.id && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </div>
            ))
          ) : (
            <div className="cursor-default select-none relative py-2 pl-3 pr-9">
              Aucune campagne disponible
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectCampaignDropdown;
