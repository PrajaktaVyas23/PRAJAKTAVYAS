import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AuthHeader from './components/AuthHeader';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import LoadingOverlay from './components/LoadingOverlay';
import Image from '../../components/AppImage';

const AuthenticationPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (!savedLanguage) {
      localStorage.setItem('selectedLanguage', 'en');
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setLoadingMessage('Signing you in...');
    
    // Mock authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store user session
    localStorage.setItem('userSession', JSON.stringify({
      email: formData?.email,
      loginTime: new Date()?.toISOString(),
      rememberMe: formData?.rememberMe
    }));
    
    setIsLoading(false);
  };

  const handleRegister = async (formData) => {
    setIsLoading(true);
    setLoadingMessage('Creating your account...');
    
    // Mock registration delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store user session
    localStorage.setItem('userSession', JSON.stringify({
      name: formData?.name,
      email: formData?.email,
      registrationTime: new Date()?.toISOString()
    }));
    
    setIsLoading(false);
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setLoadingMessage(`Connecting to ${provider}...`);
    
    // Mock social login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl"></div>
      </div>
      {/* Main Content */}
      <div className="relative w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl shadow-elevation-3 p-6 lg:p-8 border border-border"
        >
          {/* Header */}
          <AuthHeader />

          {/* Tab Navigation */}
          <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />

          {/* Form Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'login' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {activeTab === 'login' ? (
              <LoginForm isLoading={isLoading} onSubmit={handleLogin} />
            ) : (
              <RegisterForm isLoading={isLoading} onSubmit={handleRegister} />
            )}

            {/* Social Login */}
            <SocialLogin isLoading={isLoading} onSocialLogin={handleSocialLogin} />
          </motion.div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our{' '}
              <button className="text-primary hover:underline">Terms of Service</button>
              {' '}and{' '}
              <button className="text-primary hover:underline">Privacy Policy</button>
            </p>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="hidden lg:block absolute -top-10 -right-10 w-20 h-20 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=100&fit=crop&crop=center"
            alt="Study books"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        
        <div className="hidden lg:block absolute -bottom-10 -left-10 w-16 h-16 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=100&h=100&fit=crop&crop=center"
            alt="Study materials"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      {/* Loading Overlay */}
      <LoadingOverlay isVisible={isLoading} message={loadingMessage} />
    </div>
  );
};

export default AuthenticationPage;