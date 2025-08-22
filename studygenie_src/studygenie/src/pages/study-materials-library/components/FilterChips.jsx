import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ 
  selectedFilters, 
  onFilterChange, 
  onClearAll,
  className = '' 
}) => {
  const filterCategories = [
    {
      id: 'subjects',
      label: 'Subjects',
      options: [
        { id: 'mathematics', label: 'Mathematics', count: 24 },
        { id: 'physics', label: 'Physics', count: 18 },
        { id: 'chemistry', label: 'Chemistry', count: 15 },
        { id: 'biology', label: 'Biology', count: 12 },
        { id: 'english', label: 'English', count: 20 },
        { id: 'history', label: 'History', count: 8 },
        { id: 'computer-science', label: 'Computer Science', count: 16 }
      ]
    },
    {
      id: 'contentTypes',
      label: 'Content Types',
      options: [
        { id: 'summaries', label: 'Summaries', count: 45 },
        { id: 'flashcards', label: 'Flashcards', count: 38 },
        { id: 'quizzes', label: 'Quizzes', count: 29 },
        { id: 'notes', label: 'Notes', count: 52 }
      ]
    },
    {
      id: 'languages',
      label: 'Languages',
      options: [
        { id: 'english', label: 'English', count: 89 },
        { id: 'hindi', label: 'Hindi', count: 23 },
        { id: 'marathi', label: 'Marathi', count: 12 }
      ]
    },
    {
      id: 'difficulty',
      label: 'Difficulty',
      options: [
        { id: 'beginner', label: 'Beginner', count: 34 },
        { id: 'intermediate', label: 'Intermediate', count: 56 },
        { id: 'advanced', label: 'Advanced', count: 24 }
      ]
    }
  ];

  const handleFilterToggle = (categoryId, optionId) => {
    const currentFilters = selectedFilters?.[categoryId] || [];
    const isSelected = currentFilters?.includes(optionId);
    
    const updatedFilters = isSelected
      ? currentFilters?.filter(id => id !== optionId)
      : [...currentFilters, optionId];
    
    onFilterChange(categoryId, updatedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters)?.reduce((total, filters) => total + filters?.length, 0);
  };

  return (
    <div className={`bg-card border-b border-border ${className}`}>
      <div className="px-4 lg:px-6 py-4">
        {/* Filter Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">Filters</h3>
            {getActiveFilterCount() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Filter Categories */}
        <div className="space-y-4">
          {filterCategories?.map((category) => (
            <div key={category?.id} className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {category?.label}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category?.options?.map((option) => {
                  const isSelected = selectedFilters?.[category?.id]?.includes(option?.id) || false;
                  return (
                    <button
                      key={option?.id}
                      onClick={() => handleFilterToggle(category?.id, option?.id)}
                      className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium spring-transition focus-ring ${
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                      }`}
                    >
                      <span>{option?.label}</span>
                      <span className={`text-xs ${
                        isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'
                      }`}>
                        {option?.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterChips;