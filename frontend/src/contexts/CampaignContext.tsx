/**
 * Contexte pour la gestion des campagnes
 * Fournit un état global pour les campagnes sélectionnées et leurs données
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { PeriodType } from '../api/google-ads/reports';

// Types pour le contexte
interface CampaignContextType {
  selectedCampaignId: string | null;
  setSelectedCampaignId: (id: string | null) => void;
  selectedPeriod: PeriodType;
  setSelectedPeriod: (period: PeriodType) => void;
  lastAnalysisDate: Date | null;
  setLastAnalysisDate: (date: Date | null) => void;
  cid: string | null;
  setCID: (cid: string) => void;
}

// Création du contexte avec valeurs par défaut
const CampaignContext = createContext<CampaignContextType>({
  selectedCampaignId: null,
  setSelectedCampaignId: () => {},
  selectedPeriod: '7j',
  setSelectedPeriod: () => {},
  lastAnalysisDate: null,
  setLastAnalysisDate: () => {},
  cid: null,
  setCID: () => {},
});

// Hook personnalisé pour utiliser le contexte
export const useCampaignContext = () => useContext(CampaignContext);

// Provider du contexte
interface CampaignProviderProps {
  children: ReactNode;
}

export const CampaignProvider: React.FC<CampaignProviderProps> = ({ children }) => {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('7j');
  const [lastAnalysisDate, setLastAnalysisDate] = useState<Date | null>(null);
  const [cid, setCID] = useState<string | null>(null);

  // Charger le CID depuis le localStorage au démarrage
  useEffect(() => {
    const savedCID = localStorage.getItem('currentCID');
    if (savedCID) {
      setCID(savedCID);
    }
  }, []);

  // Sauvegarder le CID dans localStorage à chaque changement
  useEffect(() => {
    if (cid) {
      localStorage.setItem('currentCID', cid);
    }
  }, [cid]);

  // Réinitialiser la campagne sélectionnée lorsque le CID change
  useEffect(() => {
    if (cid) {
      setSelectedCampaignId(null);
    }
  }, [cid]);

  const value = {
    selectedCampaignId,
    setSelectedCampaignId,
    selectedPeriod,
    setSelectedPeriod,
    lastAnalysisDate,
    setLastAnalysisDate,
    cid,
    setCID,
  };

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
};

export default CampaignContext;
