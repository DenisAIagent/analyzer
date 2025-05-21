/**
 * Hook pour utiliser le CID dans les requêtes API
 * Met à jour automatiquement les headers des requêtes
 */

import { useEffect } from 'react';
import { useCampaignContext } from '../contexts/CampaignContext';
import { setRequestCID } from '../api/google-ads/client';

export const useCIDHeader = () => {
  const { cid } = useCampaignContext();
  
  // Mettre à jour le header CID à chaque changement
  useEffect(() => {
    setRequestCID(cid);
  }, [cid]);
  
  return { cid };
};

export default useCIDHeader;
