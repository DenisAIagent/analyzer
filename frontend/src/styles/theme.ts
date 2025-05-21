/**
 * Styles et animations globales pour l'application
 * Définit les animations et transitions utilisées dans l'interface
 */

import { createGlobalStyle } from 'styled-components';

const GlobalAnimations = createGlobalStyle`
  /* Animations de base */
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  .animate-slide-up {
    animation: slideUp 0.5s ease-in-out;
  }
  
  .animate-pulse-slow {
    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  /* Animations pour les cartes et blocs */
  .card-hover {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .card-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  /* Animations pour les boutons */
  .btn-transition {
    transition: all 0.2s ease;
  }
  
  .btn-transition:hover {
    transform: translateY(-1px);
  }
  
  .btn-transition:active {
    transform: translateY(0);
  }
  
  /* Animations pour les graphiques */
  .graph-enter {
    opacity: 0;
    transform: scale(0.95);
  }
  
  .graph-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 300ms, transform 300ms;
  }
  
  /* Définition des keyframes */
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  @keyframes slideUp {
    0% { transform: translateY(20px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

export default GlobalAnimations;
