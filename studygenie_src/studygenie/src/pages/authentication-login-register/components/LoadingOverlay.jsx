import React from 'react';


const LoadingOverlay = ({ isVisible, message = "Signing you in..." }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card rounded-lg p-6 shadow-elevation-3 flex flex-col items-center space-y-4 max-w-sm mx-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-primary/20 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-foreground font-medium">{message}</p>
          <p className="text-muted-foreground text-sm mt-1">Please wait...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;