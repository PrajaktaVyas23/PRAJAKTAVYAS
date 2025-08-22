import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterControls = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    dateRange: 'last30days',
    subject: 'all',
    metric: 'all'
  });

  const [showFilters, setShowFilters] = useState(false);

  const dateRangeOptions = [
    { value: 'last7days', label: 'Last 7 days' },
    { value: 'last30days', label: 'Last 30 days' },
    { value: 'last3months', label: 'Last 3 months' },
    { value: 'last6months', label: 'Last 6 months' },
    { value: 'lastyear', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'english', label: 'English' },
    { value: 'history', label: 'History' }
  ];

  const metricOptions = [
    { value: 'all', label: 'All Metrics' },
    { value: 'studytime', label: 'Study Time' },
    { value: 'quizscores', label: 'Quiz Scores' },
    { value: 'completion', label: 'Completion Rate' },
    { value: 'consistency', label: 'Study Consistency' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      dateRange: 'last30days',
      subject: 'all',
      metric: 'all'
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const exportData = () => {
    // Mock export functionality
    console.log('Exporting data with filters:', filters);
  };

  const hasActiveFilters = filters?.subject !== 'all' || filters?.metric !== 'all' || filters?.dateRange !== 'last30days';

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Analytics Filters</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            iconName={showFilters ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
            className="lg:hidden"
          >
            Filters
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportData}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
      <div className={`space-y-4 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
        {/* Date Range Filter */}
        <div>
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
            className="w-full"
          />
        </div>

        {/* Subject Filter */}
        <div>
          <Select
            label="Subject"
            options={subjectOptions}
            value={filters?.subject}
            onChange={(value) => handleFilterChange('subject', value)}
            className="w-full"
          />
        </div>

        {/* Metric Filter */}
        <div>
          <Select
            label="Metric Type"
            options={metricOptions}
            value={filters?.metric}
            onChange={(value) => handleFilterChange('metric', value)}
            className="w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-end space-x-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              iconName="RotateCcw"
              iconPosition="left"
              className="flex-1 lg:flex-none"
            >
              Reset
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location?.reload()}
            iconName="RefreshCw"
            iconPosition="left"
            className="flex-1 lg:flex-none"
          >
            Refresh
          </Button>
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            
            {filters?.dateRange !== 'last30days' && (
              <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                <Icon name="Calendar" size={12} />
                <span>{dateRangeOptions?.find(opt => opt?.value === filters?.dateRange)?.label}</span>
                <button
                  onClick={() => handleFilterChange('dateRange', 'last30days')}
                  className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {filters?.subject !== 'all' && (
              <div className="flex items-center space-x-1 bg-secondary/10 text-secondary px-2 py-1 rounded-md text-sm">
                <Icon name="BookOpen" size={12} />
                <span>{subjectOptions?.find(opt => opt?.value === filters?.subject)?.label}</span>
                <button
                  onClick={() => handleFilterChange('subject', 'all')}
                  className="ml-1 hover:bg-secondary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {filters?.metric !== 'all' && (
              <div className="flex items-center space-x-1 bg-warning/10 text-warning px-2 py-1 rounded-md text-sm">
                <Icon name="BarChart3" size={12} />
                <span>{metricOptions?.find(opt => opt?.value === filters?.metric)?.label}</span>
                <button
                  onClick={() => handleFilterChange('metric', 'all')}
                  className="ml-1 hover:bg-warning/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;