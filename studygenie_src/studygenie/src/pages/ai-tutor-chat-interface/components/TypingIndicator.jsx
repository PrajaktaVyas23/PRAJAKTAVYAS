import React from 'react';
import Icon from '../../../components/AppIcon';

const TypingIndicator = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} className="text-primary-foreground" />
        </div>
        <div className="bg-muted rounded-2xl px-4 py-3">
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-xs text-muted-foreground ml-2">AI is thinking...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;