/**
 * Composant Toast simplifié sans @emotion/react
 * Utilisé pour afficher des messages de succès, d'erreur, etc.
 */

import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'info', 
  duration = 3000, 
  onClose 
}) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        setTimeout(onClose, 300); // Attendre la fin de l'animation avant de fermer
      }
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="text-green-500" />;
      case 'error':
        return <FiAlertCircle className="text-red-500" />;
      case 'warning':
        return <FiAlertCircle className="text-yellow-500" />;
      case 'info':
      default:
        return <FiInfo className="text-blue-500" />;
    }
  };
  
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-900 bg-opacity-20 border-green-500';
      case 'error':
        return 'bg-red-900 bg-opacity-20 border-red-500';
      case 'warning':
        return 'bg-yellow-900 bg-opacity-20 border-yellow-500';
      case 'info':
      default:
        return 'bg-blue-900 bg-opacity-20 border-blue-500';
    }
  };
  
  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 animate-slideInUp`}
    >
      <div className={`flex items-center p-4 rounded-lg border-l-4 ${getBackgroundColor()} shadow-lg`}>
        <div className="mr-3">
          {getIcon()}
        </div>
        <div className="mr-8 text-white">
          {message}
        </div>
        <button 
          onClick={() => {
            setVisible(false);
            if (onClose) {
              setTimeout(onClose, 300);
            }
          }}
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          <FiX />
        </button>
      </div>
    </div>
  );
};

export default Toast;
