/**
 * Composant CIDSelector simplifié sans @emotion/react
 * Permet de sélectionner ou saisir un CID Google Ads
 */

import React, { useState } from 'react';
import { useCampaignContext } from '../../contexts/CampaignContext';

interface CIDSelectorProps {
  className?: string;
}

const CIDSelector: React.FC<CIDSelectorProps> = ({ className = '' }) => {
  const { cid, setCID } = useCampaignContext();
  const [inputValue, setInputValue] = useState(cid || '');
  const [isEditing, setIsEditing] = useState(false);
  const [recentCIDs, setRecentCIDs] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentCIDs');
    return saved ? JSON.parse(saved) : [];
  });
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Gérer la soumission du CID
  const handleSubmit = () => {
    if (inputValue.trim()) {
      setCID(inputValue.trim());
      
      // Ajouter à la liste des CIDs récents s'il n'y est pas déjà
      if (!recentCIDs.includes(inputValue.trim())) {
        const updatedCIDs = [inputValue.trim(), ...recentCIDs].slice(0, 5);
        setRecentCIDs(updatedCIDs);
        localStorage.setItem('recentCIDs', JSON.stringify(updatedCIDs));
      }
      
      setIsEditing(false);
    }
  };
  
  // Gérer la sélection d'un CID récent
  const handleSelectRecentCID = (selectedCID: string) => {
    setInputValue(selectedCID);
    setCID(selectedCID);
    setShowDropdown(false);
  };
  
  return (
    <div className={`relative ${className} transition-all duration-300 hover:transform hover:translate-y-[-2px]`}>
      {isEditing ? (
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-[#252525] border border-[#333333] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#ff3e33] focus:border-transparent transition-all duration-200 transform focus:translate-y-[-2px]"
            placeholder="Entrez un CID Google Ads"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              } else if (e.key === 'Escape') {
                setIsEditing(false);
                setInputValue(cid || '');
              }
            }}
            autoFocus
          />
          <button
            onClick={handleSubmit}
            className="ml-2 bg-[#ff3e33] text-white px-3 py-2 rounded hover:bg-opacity-80 transition-colors duration-200"
          >
            OK
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-[#252525] border border-[#333333] rounded px-3 py-2 text-gray-300 hover:bg-[#333333] transition-colors duration-200"
          >
            {cid ? `CID: ${cid}` : 'Sélectionner un CID'}
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="ml-2 bg-[#252525] border border-[#333333] rounded px-3 py-2 text-gray-300 hover:bg-[#333333] transition-colors duration-200"
          >
            Modifier
          </button>
        </div>
      )}
      
      {showDropdown && recentCIDs.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-[#1e1e1e] border border-[#333333] rounded shadow-lg animate-slideInUp">
          <div className="py-1">
            <div className="px-4 py-2 text-xs text-gray-500">CIDs récents</div>
            {recentCIDs.map((recentCID) => (
              <button
                key={recentCID}
                className="block w-full text-left px-4 py-2 hover:bg-[#252525] text-gray-300 transition-colors duration-200"
                onClick={() => handleSelectRecentCID(recentCID)}
              >
                {recentCID}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CIDSelector;
