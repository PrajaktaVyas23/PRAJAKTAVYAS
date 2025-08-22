import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SortOptions = ({ 
  sortBy, 
  sortOrder, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  className = '' 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'dateCreated', label: 'Date Created' },
    { value: 'lastAccessed', label: 'Last Accessed' },
    { value: 'title', label: 'Title (A-Z)' },
    { value: 'progress', label: 'Progress' },
    { value: 'difficulty', label: 'Difficulty' },
    { value: 'wordCount', label: 'Word Count' }
  ];

  const handleSortChange = (value) => {
    onSortChange(value, sortOrder);
  };

  const handleSortOrderToggle = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(sortBy, newOrder);
  };

  const getSortOrderIcon = () => {
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getSortOrderLabel = () => {
    if (sortBy === 'title') return sortOrder === 'asc' ? 'A-Z' : 'Z-A';
    if (sortBy === 'dateCreated') return sortOrder === 'asc' ? 'Oldest' : 'Newest';
    if (sortBy === 'lastAccessed') return sortOrder === 'asc' ? 'Oldest' : 'Recent';
    if (sortBy === 'progress') return sortOrder === 'asc' ? 'Low' : 'High';
    if (sortBy === 'difficulty') return sortOrder === 'asc' ? 'Easy' : 'Hard';
    if (sortBy === 'wordCount') return sortOrder === 'asc' ? 'Short' : 'Long';
    return sortOrder === 'asc' ? 'Low' : 'High';
  };

  return (
    <div className={`flex items-center justify-between space-x-4 ${className}`}>
      {/* Sort Controls */}
      <div className="flex items-center space-x-2 flex-1">
        <div className="flex items-center space-x-2 min-w-0 flex-1 max-w-xs">
          <Icon name="ArrowUpDown" size={16} className="text-muted-foreground flex-shrink-0" />
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={handleSortChange}
            placeholder="Sort by"
            className="flex-1"
          />
        </div>

        {sortBy !== 'relevance' && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleSortOrderToggle}
            iconName={getSortOrderIcon()}
            iconPosition="left"
            className="whitespace-nowrap"
          >
            <span className="hidden sm:inline">{getSortOrderLabel()}</span>
          </Button>
        )}
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('grid')}
          className="px-3"
          aria-label="Grid view"
        >
          <Icon name="Grid3X3" size={16} />
          <span className="hidden sm:inline ml-2">Grid</span>
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('list')}
          className="px-3"
          aria-label="List view"
        >
          <Icon name="List" size={16} />
          <span className="hidden sm:inline ml-2">List</span>
        </Button>
      </div>
    </div>
  );
};

export default SortOptions;