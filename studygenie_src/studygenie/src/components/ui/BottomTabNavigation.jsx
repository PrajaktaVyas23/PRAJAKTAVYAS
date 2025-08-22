import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Home',
      path: '/dashboard',
      icon: 'Home',
      badge: null
    },
    {
      label: 'Study',
      path: '/study-materials-library',
      icon: 'BookOpen',
      badge: null
    },
    {
      label: 'Progress',
      path: '/progress-analytics-dashboard',
      icon: 'TrendingUp',
      badge: null
    },
    {
      label: 'Profile',
      path: '/authentication-login-register',
      icon: 'User',
      badge: null
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location?.pathname === '/dashboard' || location?.pathname === '/';
    }
    if (path === '/study-materials-library') {
      return location?.pathname?.includes('/study-materials-library') || 
             location?.pathname?.includes('/material-upload-processing') ||
             location?.pathname?.includes('/ai-tutor-chat-interface');
    }
    return location?.pathname === path;
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className={`lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 ${className}`}>
        <div className="flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
          {navigationItems?.map((item) => {
            const active = isActive(item?.path);
            return (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-2 rounded-lg spring-transition focus-ring ${
                  active
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                aria-label={item?.label}
              >
                <div className="relative">
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    className={active ? 'text-primary' : 'text-current'} 
                  />
                  {item?.badge && (
                    <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                      {item?.badge}
                    </span>
                  )}
                </div>
                <span className={`text-xs mt-1 font-medium truncate ${
                  active ? 'text-primary' : 'text-current'
                }`}>
                  {item?.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
      {/* Desktop Sidebar Navigation */}
      <nav className={`hidden lg:flex lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:w-64 lg:bg-card lg:border-r lg:border-border lg:z-40 ${className}`}>
        <div className="flex flex-col w-full">
          {/* Logo Section */}
          <div className="flex items-center px-6 py-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={20} className="text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">StudyGenie</span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 px-4 py-6 space-y-2">
            {navigationItems?.map((item) => {
              const active = isActive(item?.path);
              return (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg spring-transition focus-ring text-left ${
                    active
                      ? 'text-primary bg-primary/10 border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="relative">
                    <Icon 
                      name={item?.icon} 
                      size={20} 
                      className={active ? 'text-primary' : 'text-current'} 
                    />
                    {item?.badge && (
                      <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                        {item?.badge}
                      </span>
                    )}
                  </div>
                  <span className={`ml-3 font-medium ${
                    active ? 'text-primary' : 'text-current'
                  }`}>
                    {item?.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* User Section */}
          <div className="px-4 py-4 border-t border-border">
            <div className="flex items-center px-4 py-3 rounded-lg hover:bg-muted spring-transition">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-muted-foreground" />
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Student</p>
                <p className="text-xs text-muted-foreground truncate">Free Plan</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomTabNavigation;