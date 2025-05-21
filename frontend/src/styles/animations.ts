/**
 * Animations et effets UX avancés pour l'application MDMC Music Ads Analyzer
 */

import { keyframes, css } from '@emotion/react';

// Animation de fade-in
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Animation de slide-in depuis la droite
export const slideInRight = keyframes`
  from {
    transform: translateX(30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Animation de slide-in depuis la gauche
export const slideInLeft = keyframes`
  from {
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Animation de slide-in depuis le bas
export const slideInUp = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Animation de pulse pour attirer l'attention
export const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Animation de compteur pour les KPIs
export const countUp = keyframes`
  from {
    opacity: 0.3;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Animation de rotation pour les icônes de chargement
export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Animation d'ondulation pour les graphiques
export const wave = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
`;

// Animation de brillance pour les éléments importants
export const shine = keyframes`
  from {
    background-position: -200% center;
  }
  to {
    background-position: 200% center;
  }
`;

// Styles pour les animations de transition entre les pages
export const pageTransition = css`
  animation: ${fadeIn} 0.3s ease-out;
`;

// Styles pour les animations des KPIs
export const kpiAnimation = css`
  animation: ${slideInUp} 0.5s ease-out;
`;

// Styles pour les animations des graphiques
export const chartAnimation = css`
  animation: ${fadeIn} 0.8s ease-out;
`;

// Styles pour les animations des insights IA
export const insightAnimation = css`
  animation: ${slideInRight} 0.6s ease-out;
`;

// Styles pour les animations de la sidebar
export const sidebarAnimation = css`
  animation: ${slideInLeft} 0.4s ease-out;
`;

// Styles pour les animations des notifications toast
export const toastAnimation = css`
  animation: ${slideInUp} 0.3s ease-out, ${fadeIn} 0.3s ease-out;
`;

// Styles pour les animations de chargement
export const loadingAnimation = css`
  animation: ${rotate} 1s linear infinite;
`;

// Styles pour les animations de survol des boutons
export const buttonHoverAnimation = css`
  transition: all 0.2s ease-out;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

// Styles pour les animations des cartes
export const cardHoverAnimation = css`
  transition: all 0.3s ease-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

// Styles pour les animations des éléments de navigation
export const navItemAnimation = css`
  transition: all 0.2s ease-out;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    padding-left: 12px;
  }
`;

// Styles pour les animations des dropdowns
export const dropdownAnimation = css`
  transition: all 0.3s ease-out;
  transform-origin: top center;
  animation: ${slideInUp} 0.3s ease-out;
`;

// Styles pour les animations des badges
export const badgeAnimation = css`
  animation: ${pulse} 2s infinite;
`;

// Styles pour les animations des tooltips
export const tooltipAnimation = css`
  animation: ${fadeIn} 0.2s ease-out;
`;

// Styles pour les animations des modales
export const modalAnimation = css`
  animation: ${fadeIn} 0.3s ease-out;
  .modal-content {
    animation: ${slideInUp} 0.4s ease-out;
  }
`;

// Styles pour les animations des notifications
export const notificationAnimation = css`
  animation: ${slideInRight} 0.4s ease-out, ${fadeIn} 0.4s ease-out;
`;

// Styles pour les animations des compteurs
export const counterAnimation = css`
  animation: ${countUp} 2s ease-out;
`;

// Styles pour les animations des barres de progression
export const progressAnimation = css`
  transition: width 0.5s ease-out;
`;

// Styles pour les animations des switchs
export const switchAnimation = css`
  transition: all 0.3s ease-out;
`;

// Styles pour les animations des accordéons
export const accordionAnimation = css`
  .accordion-content {
    transition: max-height 0.3s ease-out;
  }
`;

// Styles pour les animations des tabs
export const tabAnimation = css`
  .tab-content {
    animation: ${fadeIn} 0.3s ease-out;
  }
`;

// Styles pour les animations des sliders
export const sliderAnimation = css`
  transition: all 0.3s ease-out;
`;

// Styles pour les animations des checkboxes et radios
export const checkboxAnimation = css`
  transition: all 0.2s ease-out;
`;

// Styles pour les animations des inputs
export const inputAnimation = css`
  transition: all 0.2s ease-out;
  &:focus {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

// Styles pour les animations des boutons d'action flottants
export const fabAnimation = css`
  transition: all 0.3s ease-out;
  &:hover {
    transform: scale(1.1) rotate(5deg);
  }
`;

// Styles pour les animations des cartes de KPI
export const kpiCardAnimation = css`
  transition: all 0.3s ease-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

// Styles pour les animations des valeurs de KPI
export const kpiValueAnimation = css`
  animation: ${countUp} 1.5s ease-out;
`;

// Styles pour les animations des graphiques de ligne
export const lineChartAnimation = css`
  .chart-line {
    animation: ${wave} 3s ease-in-out infinite;
  }
`;

// Styles pour les animations des graphiques à barres
export const barChartAnimation = css`
  .chart-bar {
    animation: ${slideInUp} 0.5s ease-out;
  }
`;

// Styles pour les animations des graphiques circulaires
export const pieChartAnimation = css`
  .chart-slice {
    animation: ${fadeIn} 0.5s ease-out;
  }
`;

// Styles pour les animations des insights IA
export const aiInsightAnimation = css`
  animation: ${slideInRight} 0.6s ease-out;
  transition: all 0.3s ease-out;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

// Styles pour les animations des métriques YouTube
export const youtubeMetricsAnimation = css`
  animation: ${slideInUp} 0.7s ease-out;
  .metric-card {
    animation: ${fadeIn} 0.5s ease-out;
    transition: all 0.3s ease-out;
    &:hover {
      transform: translateY(-3px);
      background-color: rgba(255, 255, 255, 0.08);
    }
  }
`;

// Styles pour les animations du logo
export const logoAnimation = css`
  transition: all 0.3s ease-out;
  &:hover {
    transform: scale(1.05);
  }
`;

// Styles pour les animations du sélecteur de période
export const periodSelectorAnimation = css`
  .period-button {
    transition: all 0.2s ease-out;
    &:hover {
      transform: translateY(-2px);
    }
    &.active {
      animation: ${pulse} 2s infinite;
    }
  }
`;

// Styles pour les animations du sélecteur de CID
export const cidSelectorAnimation = css`
  transition: all 0.3s ease-out;
  &:hover {
    transform: translateY(-2px);
  }
  .dropdown-content {
    animation: ${slideInUp} 0.3s ease-out;
  }
`;

// Styles pour les animations du sélecteur de campagne
export const campaignSelectorAnimation = css`
  transition: all 0.3s ease-out;
  &:hover {
    transform: translateY(-2px);
  }
  .dropdown-content {
    animation: ${slideInUp} 0.3s ease-out;
  }
`;

// Styles pour les animations du bouton d'export PDF
export const exportButtonAnimation = css`
  transition: all 0.3s ease-out;
  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

// Styles pour les animations des éléments de navigation
export const navItemHoverAnimation = css`
  transition: all 0.2s ease-out;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    padding-left: 12px;
  }
  &.active {
    animation: ${pulse} 2s infinite;
  }
`;

// Styles pour les animations des tooltips
export const tooltipHoverAnimation = css`
  transition: all 0.2s ease-out;
  animation: ${fadeIn} 0.2s ease-out;
`;

// Styles pour les animations des notifications toast
export const toastNotificationAnimation = css`
  animation: ${slideInUp} 0.3s ease-out, ${fadeIn} 0.3s ease-out;
  &.exit {
    animation: ${slideInUp} 0.3s ease-out reverse, ${fadeIn} 0.3s ease-out reverse;
  }
`;

// Styles pour les animations de chargement
export const loadingSpinnerAnimation = css`
  animation: ${rotate} 1s linear infinite;
`;

// Styles pour les animations de skeleton loading
export const skeletonLoadingAnimation = css`
  background: linear-gradient(90deg, #1e1e1e 25%, #252525 50%, #1e1e1e 75%);
  background-size: 200% 100%;
  animation: ${shine} 1.5s infinite;
`;

// Styles pour les animations des boutons d'action
export const actionButtonAnimation = css`
  transition: all 0.3s ease-out;
  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

// Styles pour les animations des cartes d'insight
export const insightCardAnimation = css`
  animation: ${slideInRight} 0.6s ease-out;
  transition: all 0.3s ease-out;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

// Styles pour les animations des métriques
export const metricAnimation = css`
  animation: ${countUp} 1.5s ease-out;
`;

// Styles pour les animations des graphiques
export const chartContainerAnimation = css`
  animation: ${fadeIn} 0.8s ease-out;
  transition: all 0.3s ease-out;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

// Styles pour les animations des éléments de navigation de la sidebar
export const sidebarNavItemAnimation = css`
  transition: all 0.2s ease-out;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    padding-left: 12px;
  }
  &.active {
    animation: ${pulse} 2s infinite;
  }
`;

// Styles pour les animations des badges
export const badgePulseAnimation = css`
  animation: ${pulse} 2s infinite;
`;

// Styles pour les animations des tooltips
export const tooltipFadeAnimation = css`
  animation: ${fadeIn} 0.2s ease-out;
`;

// Styles pour les animations des modales
export const modalFadeAnimation = css`
  animation: ${fadeIn} 0.3s ease-out;
  .modal-content {
    animation: ${slideInUp} 0.4s ease-out;
  }
`;

// Styles pour les animations des notifications
export const notificationSlideAnimation = css`
  animation: ${slideInRight} 0.4s ease-out, ${fadeIn} 0.4s ease-out;
`;

// Styles pour les animations des compteurs
export const counterFadeAnimation = css`
  animation: ${countUp} 2s ease-out;
`;

// Styles pour les animations des barres de progression
export const progressTransitionAnimation = css`
  transition: width 0.5s ease-out;
`;

// Styles pour les animations des switchs
export const switchTransitionAnimation = css`
  transition: all 0.3s ease-out;
`;

// Styles pour les animations des accordéons
export const accordionTransitionAnimation = css`
  .accordion-content {
    transition: max-height 0.3s ease-out;
  }
`;

// Styles pour les animations des tabs
export const tabFadeAnimation = css`
  .tab-content {
    animation: ${fadeIn} 0.3s ease-out;
  }
`;

// Styles pour les animations des sliders
export const sliderTransitionAnimation = css`
  transition: all 0.3s ease-out;
`;

// Styles pour les animations des checkboxes et radios
export const checkboxTransitionAnimation = css`
  transition: all 0.2s ease-out;
`;

// Styles pour les animations des inputs
export const inputTransitionAnimation = css`
  transition: all 0.2s ease-out;
  &:focus {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

// Styles pour les animations des boutons d'action flottants
export const fabTransitionAnimation = css`
  transition: all 0.3s ease-out;
  &:hover {
    transform: scale(1.1) rotate(5deg);
  }
`;

// Styles pour les animations des cartes de KPI
export const kpiCardTransitionAnimation = css`
  transition: all 0.3s ease-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

// Styles pour les animations des valeurs de KPI
export const kpiValueCountAnimation = css`
  animation: ${countUp} 1.5s ease-out;
`;

// Styles pour les animations des graphiques de ligne
export const lineChartWaveAnimation = css`
  .chart-line {
    animation: ${wave} 3s ease-in-out infinite;
  }
`;

// Styles pour les animations des graphiques à barres
export const barChartSlideAnimation = css`
  .chart-bar {
    animation: ${slideInUp} 0.5s ease-out;
  }
`;

// Styles pour les animations des graphiques circulaires
export const pieChartFadeAnimation = css`
  .chart-slice {
    animation: ${fadeIn} 0.5s ease-out;
  }
`;

// Styles pour les animations des insights IA
export const aiInsightSlideAnimation = css`
  animation: ${slideInRight} 0.6s ease-out;
  transition: all 0.3s ease-out;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

// Styles pour les animations des métriques YouTube
export const youtubeMetricsSlideAnimation = css`
  animation: ${slideInUp} 0.7s ease-out;
  .metric-card {
    animation: ${fadeIn} 0.5s ease-out;
    transition: all 0.3s ease-out;
    &:hover {
      transform: translateY(-3px);
      background-color: rgba(255, 255, 255, 0.08);
    }
  }
`;

// Styles pour les animations du logo
export const logoTransitionAnimation = css`
  transition: all 0.3s ease-out;
  &:hover {
    transform: scale(1.05);
  }
`;

// Styles pour les animations du sélecteur de période
export const periodSelectorTransitionAnimation = css`
  .period-button {
    transition: all 0.2s ease-out;
    &:hover {
      transform: translateY(-2px);
    }
    &.active {
      animation: ${pulse} 2s infinite;
    }
  }
`;

// Styles pour les animations du sélecteur de CID
export const cidSelectorTransitionAnimation = css`
  transition: all 0.3s ease-out;
  &:hover {
    transform: translateY(-2px);
  }
  .dropdown-content {
    animation: ${slideInUp} 0.3s ease-out;
  }
`;

// Styles pour les animations du sélecteur de campagne
export const campaignSelectorTransitionAnimation = css`
  transition: all 0.3s ease-out;
  &:hover {
    transform: translateY(-2px);
  }
  .dropdown-content {
    animation: ${slideInUp} 0.3s ease-out;
  }
`;

// Styles pour les animations du bouton d'export PDF
export const exportButtonTransitionAnimation = css`
  transition: all 0.3s ease-out;
  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

// Styles pour les animations des éléments de navigation
export const navItemTransitionAnimation = css`
  transition: all 0.2s ease-out;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    padding-left: 12px;
  }
  &.active {
    animation: ${pulse} 2s infinite;
  }
`;

// Styles pour les animations des tooltips
export const tooltipTransitionAnimation = css`
  transition: all 0.2s ease-out;
  animation: ${fadeIn} 0.2s ease-out;
`;

// Styles pour les animations des notifications toast
export const toastNotificationTransitionAnimation = css`
  animation: ${slideInUp} 0.3s ease-out, ${fadeIn} 0.3s ease-out;
  &.exit {
    animation: ${slideInUp} 0.3s ease-out reverse, ${fadeIn} 0.3s ease-out reverse;
  }
`;

// Styles pour les animations de chargement
export const loadingSpinnerRotateAnimation = css`
  animation: ${rotate} 1s linear infinite;
`;

// Styles pour les animations de skeleton loading
export const skeletonLoadingShineAnimation = css`
  background: linear-gradient(90deg, #1e1e1e 25%, #252525 50%, #1e1e1e 75%);
  background-size: 200% 100%;
  animation: ${shine} 1.5s infinite;
`;

// Styles pour les animations des boutons d'action
export const actionButtonTransitionAnimation = css`
  transition: all 0.3s ease-out;
  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

// Styles pour les animations des cartes d'insight
export const insightCardTransitionAnimation = css`
  animation: ${slideInRight} 0.6s ease-out;
  transition: all 0.3s ease-out;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

// Styles pour les animations des métriques
export const metricCountAnimation = css`
  animation: ${countUp} 1.5s ease-out;
`;

// Styles pour les animations des graphiques
export const chartContainerTransitionAnimation = css`
  animation: ${fadeIn} 0.8s ease-out;
  transition: all 0.3s ease-out;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

// Styles pour les animations des éléments de navigation de la sidebar
export const sidebarNavItemTransitionAnimation = css`
  transition: all 0.2s ease-out;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    padding-left: 12px;
  }
  &.active {
    animation: ${pulse} 2s infinite;
  }
`;

// Exporter toutes les animations
export default {
  fadeIn,
  slideInRight,
  slideInLeft,
  slideInUp,
  pulse,
  countUp,
  rotate,
  wave,
  shine,
  pageTransition,
  kpiAnimation,
  chartAnimation,
  insightAnimation,
  sidebarAnimation,
  toastAnimation,
  loadingAnimation,
  buttonHoverAnimation,
  cardHoverAnimation,
  navItemAnimation,
  dropdownAnimation,
  badgeAnimation,
  tooltipAnimation,
  modalAnimation,
  notificationAnimation,
  counterAnimation,
  progressAnimation,
  switchAnimation,
  accordionAnimation,
  tabAnimation,
  sliderAnimation,
  checkboxAnimation,
  inputAnimation,
  fabAnimation,
  kpiCardAnimation,
  kpiValueAnimation,
  lineChartAnimation,
  barChartAnimation,
  pieChartAnimation,
  aiInsightAnimation,
  youtubeMetricsAnimation,
  logoAnimation,
  periodSelectorAnimation,
  cidSelectorAnimation,
  campaignSelectorAnimation,
  exportButtonAnimation,
  navItemHoverAnimation,
  tooltipHoverAnimation,
  toastNotificationAnimation,
  loadingSpinnerAnimation,
  skeletonLoadingAnimation,
  actionButtonAnimation,
  insightCardAnimation,
  metricAnimation,
  chartContainerAnimation,
  sidebarNavItemAnimation,
  badgePulseAnimation,
  tooltipFadeAnimation,
  modalFadeAnimation,
  notificationSlideAnimation,
  counterFadeAnimation,
  progressTransitionAnimation,
  switchTransitionAnimation,
  accordionTransitionAnimation,
  tabFadeAnimation,
  sliderTransitionAnimation,
  checkboxTransitionAnimation,
  inputTransitionAnimation,
  fabTransitionAnimation,
  kpiCardTransitionAnimation,
  kpiValueCountAnimation,
  lineChartWaveAnimation,
  barChartSlideAnimation,
  pieChartFadeAnimation,
  aiInsightSlideAnimation,
  youtubeMetricsSlideAnimation,
  logoTransitionAnimation,
  periodSelectorTransitionAnimation,
  cidSelectorTransitionAnimation,
  campaignSelectorTransitionAnimation,
  exportButtonTransitionAnimation,
  navItemTransitionAnimation,
  tooltipTransitionAnimation,
  toastNotificationTransitionAnimation,
  loadingSpinnerRotateAnimation,
  skeletonLoadingShineAnimation,
  actionButtonTransitionAnimation,
  insightCardTransitionAnimation,
  metricCountAnimation,
  chartContainerTransitionAnimation,
  sidebarNavItemTransitionAnimation,
};
