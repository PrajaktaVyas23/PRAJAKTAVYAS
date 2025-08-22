import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import QuickActionFAB from '../../components/ui/QuickActionFAB';
import WelcomeSection from './components/WelcomeSection';
import ContinueLearningSection from './components/ContinueLearningSection';
import QuickActionsSection from './components/QuickActionsSection';
import ProgressVisualization from './components/ProgressVisualization';
import ActivityFeed from './components/ActivityFeed';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const SkeletonCard = ({ className = "" }) => (
    <div className={`bg-card border border-border rounded-lg p-4 animate-pulse ${className}`}>
      <div className="h-4 bg-muted rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-muted rounded w-2/3"></div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Dashboard - StudyGenie</title>
          <meta name="description" content="Your personalized learning dashboard with study progress, quick actions, and AI-powered recommendations." />
        </Helmet>
        <ContextualHeader />
        <main className="lg:ml-64 pb-20 lg:pb-6">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
            {/* Skeleton Welcome Section */}
            <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 mb-6 animate-pulse">
              <div className="h-8 bg-white/20 rounded w-1/2 mb-4"></div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3]?.map((i) => (
                  <div key={i} className="bg-white/10 rounded-lg p-4 h-20"></div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column - Skeleton */}
              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-4">
                  <div className="h-6 bg-muted rounded w-1/4"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3]?.map((i) => (
                      <SkeletonCard key={i} className="h-64" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Skeleton */}
              <div className="lg:col-span-4 space-y-6">
                <SkeletonCard className="h-32" />
                <SkeletonCard className="h-48" />
                <SkeletonCard className="h-64" />
              </div>
            </div>
          </div>
        </main>
        <BottomTabNavigation />
        <QuickActionFAB />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard - StudyGenie</title>
        <meta name="description" content="Your personalized learning dashboard with study progress, quick actions, and AI-powered recommendations." />
        <meta name="keywords" content="study dashboard, learning progress, AI tutor, study materials, quiz, flashcards" />
      </Helmet>
      <ContextualHeader />
      <main className="lg:ml-64 pb-20 lg:pb-6">
        {/* Pull to Refresh Indicator */}
        {refreshing && (
          <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-elevation-2 flex items-center space-x-2">
            <Icon name="RefreshCw" size={16} className="animate-spin" />
            <span className="text-sm font-medium">Refreshing...</span>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Welcome Section */}
          <WelcomeSection />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-8 space-y-8">
              <ContinueLearningSection />
              <QuickActionsSection />
              <ProgressVisualization />
            </div>

            {/* Sidebar - Right Column */}
            <div className="lg:col-span-4 space-y-6">
              <ActivityFeed />
            </div>
          </div>
        </div>

        {/* Pull to Refresh Handler */}
        <div 
          className="absolute top-0 left-0 w-full h-20 -z-10"
          onTouchStart={(e) => {
            const startY = e?.touches?.[0]?.clientY;
            const handleTouchMove = (e) => {
              const currentY = e?.touches?.[0]?.clientY;
              const diff = currentY - startY;
              if (diff > 100 && window.scrollY === 0) {
                handleRefresh();
                document.removeEventListener('touchmove', handleTouchMove);
              }
            };
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', () => {
              document.removeEventListener('touchmove', handleTouchMove);
            }, { once: true });
          }}
        />
      </main>
      <BottomTabNavigation />
      <QuickActionFAB />
    </div>
  );
};

export default Dashboard;