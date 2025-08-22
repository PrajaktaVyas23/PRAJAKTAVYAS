import React from 'react';
import Select from '../../../components/ui/Select';

const LanguageSelector = ({ selectedLanguage, onLanguageChange, detectedLanguage, className = '' }) => {
  const languageOptions = [
    { value: 'auto', label: 'Auto-detect' },
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi (हिंदी)' },
    { value: 'mr', label: 'Marathi (मराठी)' },
    { value: 'bn', label: 'Bengali (বাংলা)' },
    { value: 'ta', label: 'Tamil (தமிழ்)' },
    { value: 'te', label: 'Telugu (తెలుగు)' },
    { value: 'gu', label: 'Gujarati (ગુજરાતી)' },
    { value: 'kn', label: 'Kannada (ಕನ್ನಡ)' },
    { value: 'ml', label: 'Malayalam (മലയാളം)' },
    { value: 'pa', label: 'Punjabi (ਪੰਜਾਬੀ)' },
    { value: 'or', label: 'Odia (ଓଡ଼ିଆ)' },
    { value: 'as', label: 'Assamese (অসমীয়া)' }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <Select
          label="Content Language"
          description={detectedLanguage ? `Detected: ${detectedLanguage}` : 'Select the language of your study material'}
          options={languageOptions}
          value={selectedLanguage}
          onChange={onLanguageChange}
          searchable
          className="w-full"
        />
      </div>

      {detectedLanguage && detectedLanguage !== selectedLanguage && (
        <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <div className="w-4 h-4 rounded-full bg-warning flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-warning-foreground">
                Language Mismatch Detected
              </p>
              <p className="text-xs text-warning-foreground/80 mt-1">
                We detected {detectedLanguage} but you selected {selectedLanguage}. 
                This might affect processing accuracy.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;