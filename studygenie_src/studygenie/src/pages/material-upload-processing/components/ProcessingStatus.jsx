import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingStatus = ({ currentStep, steps, className = '' }) => {
  const getStepIcon = (step, index) => {
    if (index < currentStep) return 'CheckCircle';
    if (index === currentStep) return 'Loader2';
    return 'Circle';
  };

  const getStepIconClass = (step, index) => {
    if (index < currentStep) return 'text-success';
    if (index === currentStep) return 'text-primary animate-spin';
    return 'text-muted-foreground';
  };

  return (
    <div className={`bg-card border border-border rounded-xl p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Processing Status
      </h3>
      <div className="space-y-4">
        {steps?.map((step, index) => (
          <div key={index} className="flex items-center space-x-4">
            {/* Step Icon */}
            <div className="flex-shrink-0">
              <Icon 
                name={getStepIcon(step, index)} 
                size={20} 
                className={getStepIconClass(step, index)} 
              />
            </div>

            {/* Step Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className={`font-medium ${
                  index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </h4>
                {index === currentStep && (
                  <span className="text-xs text-primary font-medium">
                    In Progress...
                  </span>
                )}
                {index < currentStep && (
                  <span className="text-xs text-success font-medium">
                    Completed
                  </span>
                )}
              </div>
              <p className={`text-sm mt-1 ${
                index <= currentStep ? 'text-muted-foreground' : 'text-muted-foreground/60'
              }`}>
                {step?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Overall Progress
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(((currentStep + 1) / steps?.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full spring-transition"
            style={{ width: `${((currentStep + 1) / steps?.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProcessingStatus;