import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MaterialCard = ({ 
  material, 
  onStudyNow, 
  onGenerateQuiz, 
  onCreateFlashcards,
  onBookmark,
  viewMode = 'grid',
  className = '' 
}) => {
  const getSubjectIcon = (subject) => {
    const iconMap = {
      'mathematics': 'Calculator',
      'physics': 'Zap',
      'chemistry': 'TestTube',
      'biology': 'Leaf',
      'english': 'BookOpen',
      'history': 'Clock',
      'computer-science': 'Monitor'
    };
    return iconMap?.[subject] || 'Book';
  };

  const getContentTypeColor = (type) => {
    const colorMap = {
      'summary': 'bg-blue-100 text-blue-800',
      'flashcards': 'bg-green-100 text-green-800',
      'quiz': 'bg-purple-100 text-purple-800',
      'notes': 'bg-orange-100 text-orange-800'
    };
    return colorMap?.[type] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty) => {
    const colorMap = {
      'beginner': 'text-green-600',
      'intermediate': 'text-yellow-600',
      'advanced': 'text-red-600'
    };
    return colorMap?.[difficulty] || 'text-gray-600';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date?.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  if (viewMode === 'list') {
    return (
      <div className={`bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 spring-transition ${className}`}>
        <div className="flex items-center space-x-4">
          {/* Thumbnail */}
          <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-lg overflow-hidden">
            <Image
              src={material?.thumbnail}
              alt={material?.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-foreground truncate">
                  {material?.title}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Icon name={getSubjectIcon(material?.subject)} size={14} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{material?.subject}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getContentTypeColor(material?.type)}`}>
                    {material?.type}
                  </span>
                </div>
                <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                  <span>{material?.wordCount} words</span>
                  <span className={getDifficultyColor(material?.difficulty)}>
                    {material?.difficulty}
                  </span>
                  <span>{formatDate(material?.createdAt)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-1 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onBookmark(material?.id)}
                  className="w-8 h-8"
                >
                  <Icon 
                    name={material?.isBookmarked ? 'Bookmark' : 'BookmarkPlus'} 
                    size={16} 
                    className={material?.isBookmarked ? 'text-primary' : 'text-muted-foreground'} 
                  />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onStudyNow(material)}
                >
                  Study Now
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            {material?.progress > 0 && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>{material?.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full spring-transition"
                    style={{ width: `${material?.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 spring-transition ${className}`}>
      {/* Thumbnail */}
      <div className="relative h-32 bg-muted overflow-hidden">
        <Image
          src={material?.thumbnail}
          alt={material?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onBookmark(material?.id)}
            className="w-8 h-8 bg-background/80 backdrop-blur-sm hover:bg-background"
          >
            <Icon 
              name={material?.isBookmarked ? 'Bookmark' : 'BookmarkPlus'} 
              size={16} 
              className={material?.isBookmarked ? 'text-primary' : 'text-muted-foreground'} 
            />
          </Button>
        </div>
        <div className="absolute top-2 left-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getContentTypeColor(material?.type)}`}>
            {material?.type}
          </span>
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-medium text-foreground line-clamp-2 flex-1">
            {material?.title}
          </h3>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <Icon name={getSubjectIcon(material?.subject)} size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground capitalize">{material?.subject}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className={`text-xs ${getDifficultyColor(material?.difficulty)}`}>
            {material?.difficulty}
          </span>
        </div>

        {/* Progress */}
        {material?.progress > 0 && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{material?.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div 
                className="bg-primary h-1.5 rounded-full spring-transition"
                style={{ width: `${material?.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span>{formatDate(material?.createdAt)}</span>
          <span>{material?.wordCount} words</span>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => onStudyNow(material)}
            className="w-full"
            iconName="Play"
            iconPosition="left"
          >
            Study Now
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onGenerateQuiz(material)}
              iconName="HelpCircle"
              iconPosition="left"
            >
              Quiz
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCreateFlashcards(material)}
              iconName="Layers"
              iconPosition="left"
            >
              Cards
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;