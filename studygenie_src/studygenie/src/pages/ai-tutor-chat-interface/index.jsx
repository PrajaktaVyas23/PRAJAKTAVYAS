import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ContextualHeader from '../../components/ui/ContextualHeader';
import StudyFlowBreadcrumb from '../../components/ui/StudyFlowBreadcrumb';
import QuickActionFAB from '../../components/ui/QuickActionFAB';

// Import components
import ChatHeader from './components/ChatHeader';
import MessageBubble from './components/MessageBubble';
import QuickSuggestions from './components/QuickSuggestions';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';
import ChatSettings from './components/ChatSettings';
import ConversationHistory from './components/ConversationHistory';

const AITutorChatInterface = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [chatSettings, setChatSettings] = useState({
    complexity: 'intermediate',
    language: 'en',
    tutoringStyle: 'interactive',
    showSteps: true,
    includeExamples: true,
    practiceQuestions: false
  });

  // Mock data
  const mockCurrentMaterial = {
    id: 1,
    title: "Organic Chemistry - Chapter 12",
    subject: "Chemistry",
    type: "PDF",
    pages: 45,
    uploadDate: new Date('2025-01-15')
  };

  const mockConversations = [
    {
      id: 1,
      title: "Organic Chemistry Reactions",
      preview: "Can you explain the mechanism of nucleophilic substitution reactions?",
      date: new Date('2025-01-20'),
      messageCount: 12,
      subject: "Chemistry"
    },
    {
      id: 2,
      title: "Physics - Motion Laws",
      preview: "Help me understand Newton\'s second law with examples",
      date: new Date('2025-01-19'),
      messageCount: 8,
      subject: "Physics"
    },
    {
      id: 3,
      title: "Mathematics - Calculus",
      preview: "Explain integration by parts method step by step",
      date: new Date('2025-01-18'),
      messageCount: 15,
      subject: "Mathematics"
    }
  ];

  const mockInitialMessages = [
    {
      id: 1,
      content: "Hello! I\'m your AI tutor. I can see you\'re studying Organic Chemistry - Chapter 12. How can I help you understand the concepts better today?",
      isUser: false,
      timestamp: new Date('2025-01-22T10:00:00'),
      type: 'text'
    }
  ];

  const quickSuggestions = [
    { text: "Explain this concept", icon: "💡" },
    { text: "Create practice questions", icon: "❓" },
    { text: "Simplify this topic", icon: "🔍" },
    { text: "Show examples", icon: "📝" },
    { text: "Break it down step-by-step", icon: "📋" },
    { text: "Test my understanding", icon: "🎯" }
  ];

  useEffect(() => {
    setCurrentMaterial(mockCurrentMaterial);
    setMessages(mockInitialMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageText) => {
    const userMessage = {
      id: Date.now(),
      content: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const generateAIResponse = (userMessage) => {
    const responses = {
      "explain this concept": {
        type: 'rich',
        sections: [
          {
            title: "Nucleophilic Substitution Reactions",
            content: "These are reactions where a nucleophile (electron-rich species) replaces a leaving group in a molecule."
          },
          {
            title: "Key Mechanism Steps:",
            steps: [
              "Nucleophile approaches the electrophilic carbon",
              "Bond formation begins while leaving group bond weakens",
              "Transition state formation",
              "Leaving group departs with electron pair",
              "Product formation with inverted stereochemistry"
            ]
          },
          {
            title: "Example Reaction:",
            code: "CH₃-CH₂-Br + OH⁻ → CH₃-CH₂-OH + Br⁻\n(Ethyl bromide + Hydroxide → Ethanol + Bromide)"
          }
        ]
      },
      "create practice questions": {
        type: 'rich',
        sections: [
          {
            title: "Practice Questions on Organic Chemistry:",
            content: "Here are some questions to test your understanding:"
          },
          {
            title: "Multiple Choice Questions:",
            steps: [
              "Which mechanism is favored for primary alkyl halides? (a) SN1 (b) SN2 (c) E1 (d) E2",
              "What is the rate law for SN2 reactions? (a) Rate = k[RX] (b) Rate = k[RX][Nu] (c) Rate = k[Nu] (d) Rate = k",
              "Which solvent favors SN2 reactions? (a) Protic (b) Aprotic (c) Both (d) Neither"
            ]
          }
        ]
      },
      "default": `Based on your study material "Organic Chemistry - Chapter 12", I can help you understand the concepts better.\n\nThe chapter covers important reaction mechanisms including nucleophilic substitutions, eliminations, and addition reactions. These form the foundation for understanding organic synthesis.\n\nWould you like me to explain any specific reaction mechanism or concept from this chapter?`
    };

    const responseKey = Object.keys(responses)?.find(key => 
      userMessage?.toLowerCase()?.includes(key)
    ) || 'default';

    return {
      id: Date.now() + 1,
      content: responses?.[responseKey],
      isUser: false,
      timestamp: new Date(),
      expandable: responseKey !== 'default'
    };
  };

  const handleSuggestionClick = (suggestionText) => {
    handleSendMessage(suggestionText);
  };

  const handleCopyMessage = (message) => {
    navigator.clipboard?.writeText(
      typeof message?.content === 'string' ? message?.content : JSON.stringify(message?.content)
    );
  };

  const handleRegenerateResponse = (messageId) => {
    // Find the user message that triggered this response
    const messageIndex = messages?.findIndex(m => m?.id === messageId);
    if (messageIndex > 0) {
      const userMessage = messages?.[messageIndex - 1];
      if (userMessage?.isUser) {
        handleSendMessage(userMessage?.content);
      }
    }
  };

  const handleVoiceRecord = (isRecording) => {
    // Voice recording functionality would be implemented here
    console.log('Voice recording:', isRecording);
  };

  const handleAttachment = () => {
    // File attachment functionality would be implemented here
    console.log('Attachment clicked');
  };

  const handleMaterialChange = () => {
    navigate('/study-materials-library');
  };

  const handleSelectConversation = (conversation) => {
    // Load selected conversation
    console.log('Selected conversation:', conversation);
  };

  return (
    <div className="min-h-screen bg-background">
      <ContextualHeader />
      <StudyFlowBreadcrumb />
      <div className="flex flex-col h-[calc(100vh-64px)] lg:ml-64">
        {/* Chat Header */}
        <ChatHeader
          currentMaterial={currentMaterial}
          onMaterialChange={handleMaterialChange}
          onSettingsOpen={() => setShowSettings(true)}
        />

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {/* Welcome Message */}
          {messages?.length <= 1 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Bot" size={32} className="text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                AI Tutor Ready
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                I'm here to help you understand your study materials. Ask me anything about the concepts, request explanations, or get practice questions.
              </p>
              
              {/* Quick Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHistory(true)}
                  iconName="History"
                  iconPosition="left"
                >
                  View History
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(true)}
                  iconName="Settings"
                  iconPosition="left"
                >
                  Settings
                </Button>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages?.map((message) => (
            <MessageBubble
              key={message?.id}
              message={message}
              isUser={message?.isUser}
              timestamp={message?.timestamp}
              onCopy={() => handleCopyMessage(message)}
              onRegenerate={() => handleRegenerateResponse(message?.id)}
            />
          ))}

          {/* Typing Indicator */}
          <TypingIndicator isVisible={isLoading} />

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions */}
        <QuickSuggestions
          suggestions={quickSuggestions}
          onSuggestionClick={handleSuggestionClick}
          isVisible={!isLoading && messages?.length > 0}
        />

        {/* Chat Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          onVoiceRecord={handleVoiceRecord}
          onAttachment={handleAttachment}
          isLoading={isLoading}
        />
      </div>
      {/* Settings Modal */}
      <ChatSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={chatSettings}
        onSettingsChange={setChatSettings}
      />
      {/* Conversation History Modal */}
      <ConversationHistory
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        conversations={mockConversations}
        onSelectConversation={handleSelectConversation}
      />
      {/* Navigation Components */}
      <BottomTabNavigation />
      <QuickActionFAB />
    </div>
  );
};

export default AITutorChatInterface;