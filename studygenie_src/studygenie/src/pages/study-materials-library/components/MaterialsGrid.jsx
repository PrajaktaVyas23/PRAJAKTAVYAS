import React from 'react';
import MaterialCard from './MaterialCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MaterialsGrid = ({ 
  materials, 
  viewMode, 
  loading,
  onStudyNow,
  onGenerateQuiz,
  onCreateFlashcards,
  onBookmark,
  onLoadMore,
  hasMore,
  className = '' 
}) => {
  if (loading && materials?.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Loading Skeleton */}
        {Array.from({ length: 6 })?.map((_, index) => (
          <div key={index} className={`bg-card border border-border rounded-lg overflow-hidden animate-pulse ${
            viewMode === 'grid' ? 'h-80' : 'h-24'
          }`}>
            {viewMode === 'grid' ? (
              <>
                <div className="h-32 bg-muted" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-2 bg-muted rounded w-full" />
                  <div className="space-y-2">
                    <div className="h-8 bg-muted rounded" />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-8 bg-muted rounded" />
                      <div className="h-8 bg-muted rounded" />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4 p-4">
                <div className="w-16 h-16 bg-muted rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-2 bg-muted rounded w-full" />
                </div>
                <div className="w-20 h-8 bg-muted rounded" />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (materials?.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="max-w-md mx-auto">
          <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No materials found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <Button
            variant="outline"
            onClick={() => window.location?.reload()}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Materials Grid/List */}
      <div className={
        viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-4'
      }>
        {materials?.map((material) => (
          <MaterialCard
            key={material?.id}
            material={material}
            viewMode={viewMode}
            onStudyNow={onStudyNow}
            onGenerateQuiz={onGenerateQuiz}
            onCreateFlashcards={onCreateFlashcards}
            onBookmark={onBookmark}
          />
        ))}
      </div>
      {/* Load More */}
      {hasMore && (
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={onLoadMore}
            loading={loading}
            iconName="ChevronDown"
            iconPosition="right"
          >
            {loading ? 'Loading...' : 'Load More Materials'}
          </Button>
        </div>
      )}
      {/* Loading More Indicator */}
      {loading && materials?.length > 0 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-2 text-muted-foreground">
            <div className="animate-spin">
              <Icon name="Loader2" size={16} />
            </div>
            <span className="text-sm">Loading more materials...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialsGrid;