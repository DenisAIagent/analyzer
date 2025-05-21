/**
 * Utilitaire d'export PDF
 * Permet de générer des rapports PDF à partir des analyses de campagnes
 */

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { captureError } from './sentry';

/**
 * Génère un PDF à partir d'un élément DOM
 * @param elementId ID de l'élément DOM à capturer
 * @param filename Nom du fichier PDF à générer
 * @param title Titre du rapport
 * @param campaignName Nom de la campagne
 * @param dateRange Période d'analyse
 */
export const generateCampaignReport = async (
  elementId: string,
  filename: string = 'rapport-campagne.pdf',
  title: string = 'Rapport d\'analyse de campagne',
  campaignName: string = '',
  dateRange: string = ''
): Promise<string> => {
  try {
    // Récupérer l'élément DOM
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Élément avec l'ID ${elementId} non trouvé`);
    }

    // Capturer l'élément en canvas
    const canvas = await html2canvas(element, {
      useCORS: true, // Permettre les images cross-origin
      logging: false, // Désactiver les logs
      allowTaint: true, // Permettre les éléments tainted
    });

    // Créer un nouveau document PDF (A4)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Dimensions de la page A4 en mm
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Ajouter un en-tête
    pdf.setFontSize(18);
    pdf.setTextColor(33, 33, 33);
    pdf.text(title, 14, 20);

    // Ajouter les informations de la campagne
    pdf.setFontSize(12);
    pdf.setTextColor(66, 66, 66);
    if (campaignName) {
      pdf.text(`Campagne: ${campaignName}`, 14, 30);
    }
    if (dateRange) {
      pdf.text(`Période: ${dateRange}`, 14, 36);
    }
    pdf.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, 14, 42);

    // Ajouter une ligne de séparation
    pdf.setDrawColor(200, 200, 200);
    pdf.line(14, 45, pageWidth - 14, 45);

    // Calculer les dimensions de l'image pour qu'elle tienne dans la page
    const imgWidth = pageWidth - 28; // Marges de 14mm de chaque côté
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Ajouter l'image du canvas au PDF
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 14, 50, imgWidth, imgHeight);

    // Si l'image est plus grande que la page, ajouter des pages supplémentaires
    let heightLeft = imgHeight;
    let position = 50; // Position initiale

    while (heightLeft > pageHeight - 60) { // 60mm pour l'en-tête et les marges
      position = position - (pageHeight - 60);
      heightLeft = heightLeft - (pageHeight - 60);
      
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 14, position, imgWidth, imgHeight);
    }

    // Ajouter un pied de page
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text(`MDMC Music Ads - Page ${i} sur ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }

    // Sauvegarder le PDF
    pdf.save(filename);
    
    return filename;
  } catch (error) {
    captureError(error as Error, { context: 'pdf_generation' });
    throw new Error(`Erreur lors de la génération du PDF: ${(error as Error).message}`);
  }
};

export default {
  generateCampaignReport,
};
