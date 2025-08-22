import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ currentMaterial, onMaterialChange, onSettingsOpen }) => {
  return (
    <div className="bg-card border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Current Study Material Context */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="BookOpen" size={20} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-foreground truncate">
              {currentMaterial?.title || "General Study Session"}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {currentMaterial?.subject || "AI Tutor Available"}
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMaterialChange}
            className="w-8 h-8"
            aria-label="Change study material"
          >
            <Icon name="RefreshCw" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onSettingsOpen}
            className="w-8 h-8"
            aria-label="Chat settings"
          >
            <Icon name="Settings" size={16} />
          </Button>
        </div>
      </div>
      {/* Context Indicator */}
      {currentMaterial && (
        <div className="mt-2 flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span className="text-xs text-muted-foreground">
            Context: {currentMaterial?.type} • {currentMaterial?.pages} pages
          </span>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;