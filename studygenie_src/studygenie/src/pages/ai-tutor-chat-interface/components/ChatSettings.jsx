import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ChatSettings = ({ isOpen, onClose, settings, onSettingsChange }) => {
  if (!isOpen) return null;

  const complexityOptions = [
    { value: 'simple', label: 'Simple (ELI5)', description: 'Kid-friendly explanations with analogies' },
    { value: 'intermediate', label: 'Intermediate', description: 'School-level explanations' },
    { value: 'advanced', label: 'Advanced', description: 'Exam-mode detailed definitions' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिंदी (Hindi)' },
    { value: 'mr', label: 'मराठी (Marathi)' }
  ];

  const tutoringStyleOptions = [
    { value: 'socratic', label: 'Socratic Method', description: 'Learning through questions' },
    { value: 'direct', label: 'Direct Teaching', description: 'Clear explanations and examples' },
    { value: 'interactive', label: 'Interactive', description: 'Engaging with practice questions' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-md max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Chat Settings</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8"
            aria-label="Close settings"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Settings Content */}
        <div className="p-6 space-y-6">
          {/* Explanation Complexity */}
          <div>
            <Select
              label="Explanation Complexity"
              description="Choose how detailed you want the explanations"
              options={complexityOptions}
              value={settings?.complexity}
              onChange={(value) => onSettingsChange({ ...settings, complexity: value })}
            />
          </div>

          {/* Preferred Language */}
          <div>
            <Select
              label="Preferred Language"
              description="Language for AI responses"
              options={languageOptions}
              value={settings?.language}
              onChange={(value) => onSettingsChange({ ...settings, language: value })}
            />
          </div>

          {/* Tutoring Style */}
          <div>
            <Select
              label="Tutoring Style"
              description="How the AI should teach you"
              options={tutoringStyleOptions}
              value={settings?.tutoringStyle}
              onChange={(value) => onSettingsChange({ ...settings, tutoringStyle: value })}
            />
          </div>

          {/* Additional Options */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Additional Options</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Show Step-by-Step</p>
                <p className="text-xs text-muted-foreground">Break down complex problems</p>
              </div>
              <Button
                variant={settings?.showSteps ? "default" : "outline"}
                size="sm"
                onClick={() => onSettingsChange({ ...settings, showSteps: !settings?.showSteps })}
              >
                {settings?.showSteps ? "On" : "Off"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Include Examples</p>
                <p className="text-xs text-muted-foreground">Add practical examples</p>
              </div>
              <Button
                variant={settings?.includeExamples ? "default" : "outline"}
                size="sm"
                onClick={() => onSettingsChange({ ...settings, includeExamples: !settings?.includeExamples })}
              >
                {settings?.includeExamples ? "On" : "Off"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Practice Questions</p>
                <p className="text-xs text-muted-foreground">Generate follow-up questions</p>
              </div>
              <Button
                variant={settings?.practiceQuestions ? "default" : "outline"}
                size="sm"
                onClick={() => onSettingsChange({ ...settings, practiceQuestions: !settings?.practiceQuestions })}
              >
                {settings?.practiceQuestions ? "On" : "Off"}
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatSettings;