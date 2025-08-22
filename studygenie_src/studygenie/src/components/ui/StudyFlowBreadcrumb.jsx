import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const StudyFlowBreadcrumb = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getBreadcrumbConfig = () => {
    const path = location?.pathname;
    
    if (path?.includes('/material-upload-processing')) {
      return {
        show: true,
        steps: [
          { label: 'Study Materials', path: '/study-materials-library', completed: true },
          { label: 'Upload Material', path: '/material-upload-processing', active: true },
          { label: 'Processing', path: null, upcoming: true }
        ]
      };
    }
    
    if (path?.includes('/ai-tutor-chat-interface')) {
      return {
        show: true,
        steps: [
          { label: 'Study Materials', path: '/study-materials-library', completed: true },
          { label: 'AI Tutor Chat', path: '/ai-tutor-chat-interface', active: true }
        ]
      };
    }
    
    // Show breadcrumb for deep navigation within study materials
    if (path?.includes('/study-materials-library') && path !== '/study-materials-library') {
      return {
        show: true,
        steps: [
          { label: 'Study Materials', path: '/study-materials-library', completed: true },
          { label: 'Material Details', path: path, active: true }
        ]
      };
    }
    
    return { show: false, steps: [] };
  };

  const config = getBreadcrumbConfig();

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!config?.show) {
    return null;
  }

  return (
    <div className={`bg-background border-b border-border lg:ml-64 ${className}`}>
      <div className="flex items-center px-4 lg:px-6 py-3">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="mr-3 -ml-2"
          aria-label="Go back"
        >
          <Icon name="ArrowLeft" size={16} className="mr-1" />
          <span className="hidden sm:inline">Back</span>
        </Button>

        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-1 overflow-x-auto">
          {config?.steps?.map((step, index) => (
            <div key={index} className="flex items-center space-x-1 whitespace-nowrap">
              {index > 0 && (
                <Icon name="ChevronRight" size={14} className="text-muted-foreground mx-1" />
              )}
              
              <button
                onClick={() => handleNavigation(step?.path)}
                disabled={!step?.path || step?.upcoming}
                className={`text-sm font-medium spring-transition focus-ring rounded px-2 py-1 ${
                  step?.active
                    ? 'text-primary bg-primary/10'
                    : step?.completed && step?.path
                    ? 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    : step?.upcoming
                    ? 'text-muted-foreground/50 cursor-not-allowed'
                    : 'text-muted-foreground'
                }`}
              >
                <div className="flex items-center space-x-1">
                  {step?.completed && (
                    <Icon name="Check" size={12} className="text-success" />
                  )}
                  {step?.active && (
                    <Icon name="Circle" size={8} className="text-primary fill-current" />
                  )}
                  {step?.upcoming && (
                    <Icon name="Clock" size={12} className="text-muted-foreground/50" />
                  )}
                  <span>{step?.label}</span>
                </div>
              </button>
            </div>
          ))}
        </nav>

        {/* Progress Indicator */}
        <div className="hidden md:flex ml-auto">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>
              Step {config?.steps?.findIndex(s => s?.active) + 1} of {config?.steps?.length}
            </span>
            <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary spring-transition"
                style={{ 
                  width: `${((config?.steps?.findIndex(s => s?.active) + 1) / config?.steps?.length) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyFlowBreadcrumb;