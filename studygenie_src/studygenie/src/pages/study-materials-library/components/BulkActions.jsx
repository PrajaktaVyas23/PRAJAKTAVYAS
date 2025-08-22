import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ 
  selectedMaterials, 
  onClearSelection,
  onBulkAction,
  className = '' 
}) => {
  const bulkActionOptions = [
    { value: 'bookmark', label: 'Add to Bookmarks' },
    { value: 'unbookmark', label: 'Remove from Bookmarks' },
    { value: 'createFolder', label: 'Create Study Set' },
    { value: 'generateQuiz', label: 'Generate Quiz' },
    { value: 'createFlashcards', label: 'Create Flashcards' },
    { value: 'export', label: 'Export Materials' },
    { value: 'delete', label: 'Delete Materials' }
  ];

  const handleBulkAction = (actionType) => {
    onBulkAction(actionType, selectedMaterials);
  };

  if (selectedMaterials?.length === 0) {
    return null;
  }

  return (
    <div className={`bg-primary/10 border border-primary/20 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              {selectedMaterials?.length} material{selectedMaterials?.length !== 1 ? 's' : ''} selected
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear selection
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick Actions */}
          <div className="hidden sm:flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('bookmark')}
              iconName="Bookmark"
              iconPosition="left"
            >
              Bookmark
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('createFolder')}
              iconName="FolderPlus"
              iconPosition="left"
            >
              Create Set
            </Button>
          </div>

          {/* Bulk Actions Dropdown */}
          <Select
            options={bulkActionOptions}
            value=""
            onChange={handleBulkAction}
            placeholder="More actions"
            className="min-w-[140px]"
          />
        </div>
      </div>
      {/* Mobile Quick Actions */}
      <div className="sm:hidden mt-3 flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleBulkAction('bookmark')}
          iconName="Bookmark"
          iconPosition="left"
        >
          Bookmark
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleBulkAction('createFolder')}
          iconName="FolderPlus"
          iconPosition="left"
        >
          Create Set
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleBulkAction('generateQuiz')}
          iconName="HelpCircle"
          iconPosition="left"
        >
          Quiz
        </Button>
      </div>
    </div>
  );
};

export default BulkActions;