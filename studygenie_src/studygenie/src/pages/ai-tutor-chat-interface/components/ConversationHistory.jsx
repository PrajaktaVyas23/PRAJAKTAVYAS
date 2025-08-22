import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConversationHistory = ({ isOpen, onClose, conversations, onSelectConversation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredConversations = conversations?.filter(conv =>
    conv?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    conv?.preview?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    
    return date?.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Conversation History</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8"
            aria-label="Close history"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-border">
          <Input
            type="search"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredConversations?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchQuery ? 'No conversations found' : 'No conversation history yet'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredConversations?.map((conversation) => (
                <div
                  key={conversation?.id}
                  onClick={() => {
                    onSelectConversation(conversation);
                    onClose();
                  }}
                  className="p-4 border border-border rounded-lg hover:bg-muted cursor-pointer spring-transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate mb-1">
                        {conversation?.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {conversation?.preview}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{formatDate(conversation?.date)}</span>
                        <span>{conversation?.messageCount} messages</span>
                        {conversation?.subject && (
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                            {conversation?.subject}
                          </span>
                        )}
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-muted-foreground ml-2" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationHistory;