import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const ContextualHeader = ({ className = '' }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const getHeaderConfig = () => {
    const path = location?.pathname;
    
    if (path === '/dashboard' || path === '/') {
      return {
        title: 'Dashboard',
        showSearch: false,
        actions: [
          { icon: 'Bell', label: 'Notifications', onClick: () => {} },
          { icon: 'Settings', label: 'Settings', onClick: () => {} }
        ]
      };
    }
    
    if (path?.includes('/study-materials-library') || 
        path?.includes('/material-upload-processing') || 
        path?.includes('/ai-tutor-chat-interface')) {
      return {
        title: 'Study Materials',
        showSearch: true,
        searchPlaceholder: 'Search materials, topics, or notes...',
        actions: [
          { icon: 'Filter', label: 'Filter', onClick: () => {} },
          { icon: 'Upload', label: 'Upload', onClick: () => {} },
          { icon: 'MoreHorizontal', label: 'More', onClick: () => {} }
        ]
      };
    }
    
    if (path?.includes('/progress-analytics-dashboard')) {
      return {
        title: 'Progress Analytics',
        showSearch: false,
        actions: [
          { icon: 'Calendar', label: 'Date Range', onClick: () => {} },
          { icon: 'Download', label: 'Export', onClick: () => {} },
          { icon: 'RefreshCw', label: 'Refresh', onClick: () => {} }
        ]
      };
    }
    
    if (path?.includes('/authentication-login-register')) {
      return {
        title: 'Profile',
        showSearch: false,
        actions: [
          { icon: 'Edit', label: 'Edit Profile', onClick: () => {} },
          { icon: 'Settings', label: 'Settings', onClick: () => {} }
        ]
      };
    }
    
    return {
      title: 'StudyGenie',
      showSearch: false,
      actions: []
    };
  };

  const config = getHeaderConfig();

  const handleSearchChange = (e) => {
    setSearchQuery(e?.target?.value);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery('');
    }
  };

  return (
    <header className={`bg-card border-b border-border sticky top-0 z-30 lg:ml-64 ${className}`}>
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        {/* Mobile Logo & Title */}
        <div className="flex items-center space-x-3 lg:hidden">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="GraduationCap" size={20} className="text-primary-foreground" />
          </div>
          <h1 className="text-lg font-semibold text-foreground">{config?.title}</h1>
        </div>

        {/* Desktop Title */}
        <div className="hidden lg:block">
          <h1 className="text-xl font-semibold text-foreground">{config?.title}</h1>
        </div>

        {/* Search Section */}
        {config?.showSearch && (
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <Input
                type="search"
                placeholder={config?.searchPlaceholder}
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Mobile Search Toggle */}
          {config?.showSearch && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearch}
              className="md:hidden"
              aria-label="Toggle search"
            >
              <Icon name="Search" size={20} />
            </Button>
          )}

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center space-x-2">
            {config?.actions?.slice(0, 3)?.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                onClick={action?.onClick}
                aria-label={action?.label}
              >
                <Icon name={action?.icon} size={20} />
              </Button>
            ))}
          </div>

          {/* Mobile More Menu */}
          {config?.actions?.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              aria-label="More options"
            >
              <Icon name="MoreVertical" size={20} />
            </Button>
          )}

          {/* User Avatar */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="User menu"
          >
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <Icon name="User" size={16} className="text-muted-foreground" />
            </div>
          </Button>
        </div>
      </div>
      {/* Mobile Search Bar */}
      {config?.showSearch && showSearch && (
        <div className="px-4 pb-4 md:hidden border-t border-border">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="search"
              placeholder={config?.searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 w-full"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default ContextualHeader;