import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatInput = ({ onSendMessage, onVoiceRecord, onAttachment, isLoading }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !isLoading) {
      onSendMessage(message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e?.target?.value);
    
    // Auto-resize textarea
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef?.current?.scrollHeight, 120)}px`;
    }
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    onVoiceRecord(!isRecording);
  };

  return (
    <div className="bg-card border-t border-border px-4 py-3">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Attachment Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onAttachment}
          className="w-10 h-10 flex-shrink-0"
          aria-label="Attach file"
        >
          <Icon name="Paperclip" size={20} />
        </Button>

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your study material..."
            className="w-full min-h-[44px] max-h-[120px] px-4 py-3 pr-12 bg-muted border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm placeholder:text-muted-foreground"
            disabled={isLoading}
            rows={1}
          />
          
          {/* Voice Recording Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleVoiceToggle}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 ${
              isRecording ? 'text-destructive' : 'text-muted-foreground'
            }`}
            aria-label={isRecording ? "Stop recording" : "Start voice recording"}
          >
            <Icon name={isRecording ? "Square" : "Mic"} size={16} />
          </Button>
        </div>

        {/* Send Button */}
        <Button
          type="submit"
          size="icon"
          disabled={!message?.trim() || isLoading}
          className="w-10 h-10 flex-shrink-0 rounded-full"
          aria-label="Send message"
        >
          {isLoading ? (
            <Icon name="Loader2" size={20} className="animate-spin" />
          ) : (
            <Icon name="Send" size={20} />
          )}
        </Button>
      </form>
      {/* Recording Indicator */}
      {isRecording && (
        <div className="flex items-center justify-center mt-2 text-destructive">
          <div className="w-2 h-2 bg-destructive rounded-full animate-pulse mr-2"></div>
          <span className="text-sm font-medium">Recording...</span>
        </div>
      )}
    </div>
  );
};

export default ChatInput;