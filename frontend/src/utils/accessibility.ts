/**
 * Utilitaire pour améliorer l'accessibilité de l'application
 * Intègre axe-core pour la vérification automatique des problèmes d'accessibilité
 */

import { captureError } from './sentry';

/**
 * Initialise axe-core pour la vérification d'accessibilité
 * À utiliser uniquement en développement ou en test
 */
export const initAccessibilityTesting = async () => {
  if (import.meta.env.DEV || import.meta.env.MODE === 'test') {
    try {
      const axe = await import('axe-core');
      // Injecter axe-core dans le DOM
      // @ts-ignore
      window.axe = axe;
      
      // Configurer axe-core
      axe.configure({
        rules: [
          // Règles personnalisées ou désactivation de règles spécifiques
          { id: 'color-contrast', enabled: true },
          { id: 'landmark-one-main', enabled: true },
          { id: 'region', enabled: true },
        ],
      });
      
      // Fonction pour exécuter les tests d'accessibilité
      // @ts-ignore
      window.runAccessibilityTests = () => {
        axe.run(document.body, {
          resultTypes: ['violations'],
        }, (err, results) => {
          if (err) {
            console.error('Erreur lors de l\'exécution des tests d\'accessibilité:', err);
            return;
          }
          
          if (results.violations.length) {
            console.group('Violations d\'accessibilité:');
            results.violations.forEach((violation) => {
              console.groupCollapsed(
                `${violation.impact} - ${violation.help} (${violation.id})`
              );
              console.log(violation.description);
              console.log('Éléments concernés:', violation.nodes);
              console.log('En savoir plus:', violation.helpUrl);
              console.groupEnd();
            });
            console.groupEnd();
          } else {
            console.log('Aucune violation d\'accessibilité détectée!');
          }
        });
      };
      
      console.log('Tests d\'accessibilité initialisés. Utilisez window.runAccessibilityTests() pour exécuter les tests.');
    } catch (error) {
      console.warn('Impossible d\'initialiser les tests d\'accessibilité:', error);
    }
  }
};

/**
 * Ajoute des attributs d'accessibilité à un élément
 * @param element Élément DOM à améliorer
 * @param options Options d'accessibilité
 */
export const enhanceAccessibility = (
  element: HTMLElement,
  options: {
    role?: string;
    label?: string;
    description?: string;
    isRequired?: boolean;
    hasPopup?: boolean;
    controls?: string;
    expanded?: boolean;
  }
) => {
  try {
    if (options.role) {
      element.setAttribute('role', options.role);
    }
    
    if (options.label) {
      element.setAttribute('aria-label', options.label);
    }
    
    if (options.description) {
      element.setAttribute('aria-description', options.description);
    }
    
    if (options.isRequired !== undefined) {
      element.setAttribute('aria-required', options.isRequired.toString());
    }
    
    if (options.hasPopup !== undefined) {
      element.setAttribute('aria-haspopup', options.hasPopup.toString());
    }
    
    if (options.controls) {
      element.setAttribute('aria-controls', options.controls);
    }
    
    if (options.expanded !== undefined) {
      element.setAttribute('aria-expanded', options.expanded.toString());
    }
  } catch (error) {
    captureError(error as Error, { context: 'accessibility_enhancement' });
  }
};

export default {
  initAccessibilityTesting,
  enhanceAccessibility,
};
