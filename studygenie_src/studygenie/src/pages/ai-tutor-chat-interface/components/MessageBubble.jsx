import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageBubble = ({ message, isUser, timestamp, onCopy, onRegenerate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatTimestamp = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })?.format(date);
  };

  const renderContent = (content) => {
    // Handle different content types
    if (typeof content === 'string') {
      return content?.split('\n')?.map((line, index) => (
        <p key={index} className="mb-2 last:mb-0">{line}</p>
      ));
    }
    
    if (content?.type === 'rich') {
      return (
        <div className="space-y-3">
          {content?.sections?.map((section, index) => (
            <div key={index} className="space-y-2">
              {section?.title && (
                <h4 className="font-medium text-foreground">{section?.title}</h4>
              )}
              {section?.content && (
                <div className="text-sm">{section?.content}</div>
              )}
              {section?.code && (
                <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                  <code>{section?.code}</code>
                </pre>
              )}
              {section?.steps && (
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  {section?.steps?.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </div>
      );
    }

    return content;
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[85%] sm:max-w-[70%] ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Avatar for AI messages */}
        {!isUser && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Bot" size={16} className="text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className={`rounded-2xl px-4 py-3 ${
                isUser 
                  ? 'bg-primary text-primary-foreground ml-auto' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                <div className="text-sm">
                  {renderContent(message?.content)}
                </div>
              </div>
              
              {/* Message Actions for AI responses */}
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">
                  {formatTimestamp(timestamp)}
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={onCopy}
                    className="h-6 px-2"
                  >
                    <Icon name="Copy" size={12} className="mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={onRegenerate}
                    className="h-6 px-2"
                  >
                    <Icon name="RefreshCw" size={12} className="mr-1" />
                    Retry
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User messages */}
        {isUser && (
          <div className="flex justify-end">
            <div className="bg-primary text-primary-foreground rounded-2xl px-4 py-3">
              <div className="text-sm">
                {renderContent(message?.content)}
              </div>
            </div>
          </div>
        )}

        {/* Timestamp for user messages */}
        {isUser && (
          <div className="flex justify-end mt-1">
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(timestamp)}
            </span>
          </div>
        )}

        {/* Expandable sections for long AI responses */}
        {!isUser && message?.expandable && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 ml-11"
          >
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="mr-1" 
            />
            {isExpanded ? "Show less" : "Show more"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;