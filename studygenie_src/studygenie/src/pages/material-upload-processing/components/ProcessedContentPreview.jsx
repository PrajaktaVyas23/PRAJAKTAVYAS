import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessedContentPreview = ({ extractedText, confidenceScore, onContinue, className = '' }) => {
  const [showFullText, setShowFullText] = useState(false);

  const getConfidenceColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getConfidenceBg = (score) => {
    if (score >= 90) return 'bg-success/10 border-success/20';
    if (score >= 70) return 'bg-warning/10 border-warning/20';
    return 'bg-destructive/10 border-destructive/20';
  };

  const truncatedText = extractedText?.length > 500 
    ? extractedText?.substring(0, 500) + '...' 
    : extractedText;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Processing Complete!
          </h2>
          <p className="text-muted-foreground mt-1">
            Your study material has been successfully processed and is ready for use.
          </p>
        </div>
      </div>
      {/* Confidence Score */}
      <div className={`p-4 border rounded-lg ${getConfidenceBg(confidenceScore)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Target" size={20} className={getConfidenceColor(confidenceScore)} />
            <div>
              <p className="font-medium text-foreground">
                Extraction Confidence
              </p>
              <p className="text-sm text-muted-foreground">
                Text recognition accuracy
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-lg font-bold ${getConfidenceColor(confidenceScore)}`}>
              {confidenceScore}%
            </p>
            <p className="text-xs text-muted-foreground">
              {confidenceScore >= 90 ? 'Excellent' : 
               confidenceScore >= 70 ? 'Good' : 'Fair'}
            </p>
          </div>
        </div>
      </div>
      {/* Extracted Text Preview */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">
              Extracted Content Preview
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFullText(!showFullText)}
              iconName={showFullText ? 'ChevronUp' : 'ChevronDown'}
              iconPosition="right"
            >
              {showFullText ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="bg-muted/30 rounded-lg p-4 max-h-64 overflow-y-auto">
            <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
              {showFullText ? extractedText : truncatedText}
            </pre>
          </div>
          
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <span>
              {extractedText?.length || 0} characters extracted
            </span>
            <span>
              Ready for AI processing
            </span>
          </div>
        </div>
      </div>
      {/* Next Steps */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-2">
          What's Next?
        </h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center space-x-2">
            <Icon name="Sparkles" size={14} className="text-primary" />
            <span>AI will generate summaries and key points</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="Brain" size={14} className="text-primary" />
            <span>Create interactive flashcards for memorization</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="HelpCircle" size={14} className="text-primary" />
            <span>Generate practice quizzes and questions</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="MessageCircle" size={14} className="text-primary" />
            <span>Chat with AI tutor about the content</span>
          </li>
        </ul>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          onClick={onContinue}
          iconName="ArrowRight"
          iconPosition="right"
          className="flex-1"
        >
          Continue to Study Materials
        </Button>
        <Button
          variant="outline"
          onClick={() => window.location?.reload()}
          iconName="Upload"
          iconPosition="left"
          className="flex-1 sm:flex-initial"
        >
          Upload More Files
        </Button>
      </div>
    </div>
  );
};

export default ProcessedContentPreview;