import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuthHeader = () => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'en';
  });

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' }
  ];

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('selectedLanguage', langCode);
  };

  const getCurrentLanguage = () => {
    return languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];
  };

  const getLocalizedText = () => {
    const texts = {
      en: {
        welcome: 'Welcome to StudyGenie',
        subtitle: 'Transform your learning with AI-powered study materials'
      },
      hi: {
        welcome: 'StudyGenie में आपका स्वागत है',
        subtitle: 'AI-संचालित अध्ययन सामग्री के साथ अपनी शिक्षा को बदलें'
      },
      mr: {
        welcome: 'StudyGenie मध्ये आपले स्वागत आहे',
        subtitle: 'AI-चालित अभ्यास सामग्रीसह आपले शिक्षण बदला'
      }
    };
    return texts?.[currentLanguage] || texts?.en;
  };

  const text = getLocalizedText();

  return (
    <div className="text-center mb-8">
      {/* Logo and Language Selector */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Icon name="GraduationCap" size={24} className="text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">StudyGenie</span>
        </div>

        {/* Language Selector */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2"
          >
            <span className="text-lg">{getCurrentLanguage()?.flag}</span>
            <span className="text-sm font-medium">{getCurrentLanguage()?.name}</span>
            <Icon name="ChevronDown" size={16} />
          </Button>
        </div>
      </div>
      {/* Welcome Text */}
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          {text?.welcome}
        </h1>
        <p className="text-muted-foreground text-sm lg:text-base">
          {text?.subtitle}
        </p>
      </div>
    </div>
  );
};

export default AuthHeader;