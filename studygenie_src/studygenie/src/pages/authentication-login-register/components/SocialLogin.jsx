import React from 'react';
import Button from '../../../components/ui/Button';


const SocialLogin = ({ isLoading, onSocialLogin }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700 text-white'
    }
  ];

  const handleSocialLogin = (provider) => {
    onSocialLogin(provider);
    // Mock social login success
    setTimeout(() => {
      alert(`${provider} login would redirect to OAuth flow`);
    }, 1000);
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            onClick={() => handleSocialLogin(provider?.name)}
            disabled={isLoading}
            className={`w-full ${provider?.color}`}
            iconName={provider?.icon}
            iconPosition="left"
          >
            Continue with {provider?.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialLogin;