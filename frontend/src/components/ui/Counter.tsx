/**
 * Composant Counter simplifié sans @emotion/react
 * Utilisé pour animer les valeurs numériques des KPIs
 */

import React, { useState, useEffect, useRef } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  formatter?: (value: number) => string;
  className?: string;
}

const Counter: React.FC<CounterProps> = ({
  end,
  duration = 1500,
  decimals = 0,
  prefix = '',
  suffix = '',
  formatter,
  className = '',
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);

  // Fonction pour formater le nombre
  const formatValue = (value: number): string => {
    if (formatter) {
      return formatter(value);
    }
    
    // Formater avec k pour les milliers
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    
    return value.toFixed(decimals);
  };

  // Animation du compteur
  useEffect(() => {
    // Réinitialiser le compteur si la valeur finale change
    countRef.current = 0;
    startTimeRef.current = null;
    
    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Fonction d'easing pour une animation plus naturelle
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);
      
      const currentCount = easedProgress * end;
      countRef.current = currentCount;
      setCount(currentCount);
      
      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [end, duration]);

  return (
    <span className={`animate-fadeIn ${className}`}>
      {prefix}{formatValue(count)}{suffix}
    </span>
  );
};

export default Counter;
