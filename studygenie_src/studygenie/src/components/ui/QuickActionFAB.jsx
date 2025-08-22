import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionFAB = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const getActionConfig = () => {
    const path = location?.pathname;
    
    if (path === '/dashboard' || path === '/') {
      return {
        primary: {
          icon: 'Plus',
          label: 'Quick Start',
          action: () => setIsExpanded(!isExpanded)
        },
        secondary: [
          {
            icon: 'Upload',
            label: 'Upload Material',
            action: () => navigate('/material-upload-processing')
          },
          {
            icon: 'MessageCircle',
            label: 'Ask AI Tutor',
            action: () => navigate('/ai-tutor-chat-interface')
          },
          {
            icon: 'BookOpen',
            label: 'Browse Library',
            action: () => navigate('/study-materials-library')
          }
        ]
      };
    }
    
    if (path?.includes('/study-materials-library')) {
      return {
        primary: {
          icon: 'Upload',
          label: 'Upload Material',
          action: () => navigate('/material-upload-processing')
        },
        secondary: []
      };
    }
    
    if (path?.includes('/material-upload-processing')) {
      return {
        primary: {
          icon: 'MessageCircle',
          label: 'Ask AI Tutor',
          action: () => navigate('/ai-tutor-chat-interface')
        },
        secondary: []
      };
    }
    
    if (path?.includes('/ai-tutor-chat-interface')) {
      return {
        primary: {
          icon: 'BookOpen',
          label: 'Study Materials',
          action: () => navigate('/study-materials-library')
        },
        secondary: []
      };
    }
    
    if (path?.includes('/progress-analytics-dashboard')) {
      return {
        primary: {
          icon: 'Target',
          label: 'Set Goal',
          action: () => {}
        },
        secondary: []
      };
    }
    
    return {
      primary: {
        icon: 'Plus',
        label: 'Quick Action',
        action: () => {}
      },
      secondary: []
    };
  };

  const config = getActionConfig();

  const handlePrimaryAction = () => {
    if (config?.secondary?.length > 0) {
      setIsExpanded(!isExpanded);
    } else {
      config?.primary?.action();
    }
  };

  const handleSecondaryAction = (action) => {
    action();
    setIsExpanded(false);
  };

  const handleBackdropClick = () => {
    setIsExpanded(false);
  };

  return (
    <>
      {/* Backdrop */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={handleBackdropClick}
        />
      )}
      {/* FAB Container */}
      <div className={`fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 ${className}`}>
        {/* Secondary Actions */}
        {isExpanded && config?.secondary?.length > 0 && (
          <div className="flex flex-col space-y-3 mb-3">
            {config?.secondary?.map((action, index) => (
              <div
                key={index}
                className="flex items-center justify-end space-x-3 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="bg-card text-card-foreground px-3 py-2 rounded-lg text-sm font-medium shadow-elevation-2 whitespace-nowrap">
                  {action?.label}
                </span>
                <Button
                  size="icon"
                  onClick={() => handleSecondaryAction(action?.action)}
                  className="w-12 h-12 rounded-full shadow-elevation-2 bg-secondary hover:bg-secondary/90"
                  aria-label={action?.label}
                >
                  <Icon name={action?.icon} size={20} className="text-secondary-foreground" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Primary FAB */}
        <div className="flex items-center justify-end space-x-3">
          {/* Desktop Label */}
          <span className="hidden lg:block bg-card text-card-foreground px-3 py-2 rounded-lg text-sm font-medium shadow-elevation-2 whitespace-nowrap">
            {config?.primary?.label}
          </span>
          
          <Button
            size="icon"
            onClick={handlePrimaryAction}
            className={`w-14 h-14 rounded-full shadow-elevation-3 spring-transition ${
              isExpanded && config?.secondary?.length > 0
                ? 'bg-muted hover:bg-muted/90 rotate-45' :'bg-primary hover:bg-primary/90'
            }`}
            aria-label={config?.primary?.label}
            aria-expanded={isExpanded}
          >
            <Icon 
              name={isExpanded && config?.secondary?.length > 0 ? 'X' : config?.primary?.icon} 
              size={24} 
              className={isExpanded && config?.secondary?.length > 0 ? 'text-muted-foreground' : 'text-primary-foreground'} 
            />
          </Button>
        </div>
      </div>
    </>
  );
};

export default QuickActionFAB;