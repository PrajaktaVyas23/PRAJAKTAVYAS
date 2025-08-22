import React from 'react';
import Button from '../../../components/ui/Button';

const QuickSuggestions = ({ suggestions, onSuggestionClick, isVisible }) => {
  if (!isVisible || !suggestions?.length) return null;

  return (
    <div className="px-4 py-2 border-t border-border bg-background">
      <div className="flex flex-wrap gap-2">
        {suggestions?.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSuggestionClick(suggestion?.text)}
            className="text-xs h-8 px-3 rounded-full"
          >
            {suggestion?.icon && (
              <span className="mr-1">{suggestion?.icon}</span>
            )}
            {suggestion?.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickSuggestions;