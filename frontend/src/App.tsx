/**
 * Mise à jour du composant App pour intégrer l'architecture multi-agents IA
 */

import React, { useState, useEffect } from 'react';
import { useCampaignContext } from './contexts/CampaignContext';
import { useCampaigns } from './hooks/useGoogleAds';
import CIDSelector from './components/ui/CIDSelector';
import DynamicKPIGrid from './components/ui/DynamicKPIGrid';
import YouTubeMetrics from './components/ui/YouTubeMetrics';
import PerformanceChart from './components/ui/PerformanceChart';
import AIInsight from './components/ui/AIInsight';
import useCIDHeader from './hooks/useCIDHeader';
import './index.css';

// Import des icônes
import { FiFileText, FiBarChart2, FiSettings, FiChevronDown, FiDownload } from 'react-icons/fi';

const App: React.FC = () => {
  // Utiliser le hook pour mettre à jour le header CID
  useCIDHeader();
  
  const { cid, selectedCampaignId, setSelectedCampaignId } = useCampaignContext();
  const { data: campaigns } = useCampaigns();
  
  // État pour le type de campagne sélectionnée
  const [campaignType, setCampaignType] = useState<string>('');
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [showCampaignDropdown, setShowCampaignDropdown] = useState<boolean>(false);
  
  // Mettre à jour le type de campagne lorsque la campagne sélectionnée change
  useEffect(() => {
    if (selectedCampaignId && campaigns) {
      const selectedCampaign = campaigns.find((campaign: any) => campaign.id === selectedCampaignId);
      if (selectedCampaign) {
        setCampaignType(selectedCampaign.type);
      }
    }
  }, [selectedCampaignId, campaigns]);
  
  // Fonction pour exporter en PDF
  const handleExportPDF = () => {
    console.log('Exporting PDF...');
    // Logique d'export PDF à implémenter
  };
  
  // Fonction pour changer de campagne
  const handleCampaignChange = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setShowCampaignDropdown(false);
  };
  
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center border-b border-[#333333]">
        <div className="flex items-center space-x-3">
          <div className="text-[#ff3e33] text-3xl">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 10L20 20L5 30V10Z" fill="#ff3e33"/>
              <path d="M20 10L35 20L20 30V10Z" fill="#ff3e33"/>
            </svg>
          </div>
          <div className="text-2xl font-bold">MDMC <span className="font-normal">Music Ads Analyzer</span></div>
        </div>
        
        <div className="flex items-center space-x-4">
          <CIDSelector className="mr-2" />
          
          {/* Sélecteur de campagne */}
          <div className="relative">
            <button 
              className="flex items-center space-x-2 bg-[#1e1e1e] border border-[#333333] rounded px-4 py-2 min-w-[250px]"
              onClick={() => setShowCampaignDropdown(!showCampaignDropdown)}
            >
              <span className="text-gray-300">
                {selectedCampaignId && campaigns 
                  ? campaigns.find((c: any) => c.id === selectedCampaignId)?.name || 'Sélectionner une campagne'
                  : 'Sélectionner une campagne'
                }
              </span>
              <FiChevronDown className="text-gray-500" />
            </button>
            
            {/* Dropdown menu */}
            {showCampaignDropdown && campaigns && (
              <div className="absolute z-10 mt-1 w-full bg-[#1e1e1e] border border-[#333333] rounded shadow-lg">
                {campaigns.map((campaign: any) => (
                  <button
                    key={campaign.id}
                    className="block w-full text-left px-4 py-2 hover:bg-[#252525] text-gray-300"
                    onClick={() => handleCampaignChange(campaign.id)}
                  >
                    {campaign.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Bouton Export PDF */}
          <button 
            className="flex items-center space-x-2 bg-transparent border border-[#333333] rounded px-4 py-2 text-white hover:bg-[#333333]"
            onClick={handleExportPDF}
          >
            <FiDownload className="text-[#ff3e33]" />
            <span>Exporter PDF</span>
          </button>
        </div>
      </header>
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1a1a1a] min-h-[calc(100vh-64px)] p-4">
          <nav>
            <ul className="space-y-2">
              <li>
                <button 
                  className={`w-full text-left px-4 py-2 rounded ${activePage === 'dashboard' ? 'bg-[#333333] text-white' : 'text-gray-400 hover:bg-[#252525]'}`}
                  onClick={() => setActivePage('dashboard')}
                >
                  <div className="flex items-center space-x-3">
                    <FiBarChart2 />
                    <span>Tableau de bord</span>
                  </div>
                </button>
              </li>
              <li>
                <button 
                  className={`w-full text-left px-4 py-2 rounded ${activePage === 'reports' ? 'bg-[#333333] text-white' : 'text-gray-400 hover:bg-[#252525]'}`}
                  onClick={() => setActivePage('reports')}
                >
                  <div className="flex items-center space-x-3">
                    <FiFileText />
                    <span>Rapports IA</span>
                  </div>
                </button>
              </li>
              <li>
                <button 
                  className={`w-full text-left px-4 py-2 rounded ${activePage === 'settings' ? 'bg-[#333333] text-white' : 'text-gray-400 hover:bg-[#252525]'}`}
                  onClick={() => setActivePage('settings')}
                >
                  <div className="flex items-center space-x-3">
                    <FiSettings />
                    <span>Paramètres</span>
                  </div>
                </button>
              </li>
            </ul>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-6">
          {!cid ? (
            <div className="bg-[#1e1e1e] rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Veuillez sélectionner un ID client Google Ads</h2>
              <p className="text-gray-400 mb-4">Utilisez le sélecteur en haut à droite pour entrer votre CID</p>
            </div>
          ) : !selectedCampaignId ? (
            <div className="bg-[#1e1e1e] rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Veuillez sélectionner une campagne</h2>
              <p className="text-gray-400 mb-4">Utilisez le menu déroulant en haut pour choisir une campagne</p>
            </div>
          ) : (
            <>
              {/* KPI Grid dynamique selon le type de campagne */}
              <DynamicKPIGrid />
              
              {/* Métriques YouTube pour les campagnes vidéo */}
              {campaignType === 'VIDEO' && <YouTubeMetrics campaignType={campaignType} />}
              
              {/* Graphiques de performance */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-2">
                  <PerformanceChart 
                    campaignType={campaignType} 
                    metric={campaignType === 'VIDEO' ? 'views' : 'impressions'} 
                  />
                </div>
                
                <div>
                  <AIInsight 
                    campaignType={campaignType} 
                    agentType="manager"
                    title="Synthèse IA"
                  />
                </div>
              </div>
              
              {/* Agents IA spécialisés */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <AIInsight 
                  campaignType={campaignType} 
                  agentType="stratege"
                  title="Analyse des tendances"
                />
                <AIInsight 
                  campaignType={campaignType} 
                  agentType="budget"
                  title="Optimisation budgétaire"
                />
                <AIInsight 
                  campaignType={campaignType} 
                  agentType="audience"
                  title="Analyse d'audience"
                />
                <AIInsight 
                  campaignType={campaignType} 
                  agentType="concurrent"
                  title="Analyse concurrentielle"
                />
                <AIInsight 
                  campaignType={campaignType} 
                  agentType="predictif"
                  title="Prévisions"
                />
                <div className="grid grid-cols-1 gap-6">
                  <AIInsight 
                    campaignType={campaignType} 
                    agentType="openai"
                    title="Analyse détaillée"
                  />
                  <AIInsight 
                    campaignType={campaignType} 
                    agentType="gemini"
                    title="Analyse technique"
                  />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
