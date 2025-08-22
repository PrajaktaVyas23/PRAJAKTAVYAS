import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import StudyFlowBreadcrumb from '../../components/ui/StudyFlowBreadcrumb';
import QuickActionFAB from '../../components/ui/QuickActionFAB';
import MetricsCard from './components/MetricsCard';
import StudyTimeChart from './components/StudyTimeChart';
import SubjectPerformanceRadar from './components/SubjectPerformanceRadar';
import StudyHeatmap from './components/StudyHeatmap';
import QuizAnalytics from './components/QuizAnalytics';
import GoalsTracker from './components/GoalsTracker';
import FilterControls from './components/FilterControls';
import Icon from '../../components/AppIcon';

const ProgressAnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState({
    dateRange: 'last30days',
    subject: 'all',
    metric: 'all'
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp' },
    { id: 'subjects', label: 'Subjects', icon: 'BookOpen' },
    { id: 'goals', label: 'Goals', icon: 'Target' }
  ];

  const overviewMetrics = [
    {
      title: 'Total Study Time',
      value: '127',
      unit: 'hours',
      trend: 'up',
      trendValue: '+12%',
      icon: 'Clock',
      color: 'primary'
    },
    {
      title: 'Materials Completed',
      value: '43',
      unit: null,
      trend: 'up',
      trendValue: '+8',
      icon: 'BookOpen',
      color: 'success'
    },
    {
      title: 'Quiz Accuracy',
      value: '88',
      unit: '%',
      trend: 'up',
      trendValue: '+5%',
      icon: 'Target',
      color: 'warning'
    },
    {
      title: 'Current Streak',
      value: '7',
      unit: 'days',
      trend: 'up',
      trendValue: '+2',
      icon: 'Flame',
      color: 'destructive'
    }
  ];

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to data
    console.log('Filters updated:', newFilters);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {overviewMetrics?.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric?.title}
                  value={metric?.value}
                  unit={metric?.unit}
                  trend={metric?.trend}
                  trendValue={metric?.trendValue}
                  icon={metric?.icon}
                  color={metric?.color}
                />
              ))}
            </div>
            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StudyTimeChart />
              <SubjectPerformanceRadar />
            </div>
            {/* Study Heatmap */}
            <StudyHeatmap />
          </div>
        );

      case 'performance':
        return <QuizAnalytics />;

      case 'subjects':
        return (
          <div className="space-y-6">
            <SubjectPerformanceRadar />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StudyTimeChart />
              <StudyHeatmap />
            </div>
          </div>
        );

      case 'goals':
        return <GoalsTracker />;

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Progress Analytics Dashboard - StudyGenie</title>
        <meta name="description" content="Track your learning progress with comprehensive analytics, performance insights, and goal tracking." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <ContextualHeader />
        <StudyFlowBreadcrumb />
        
        <main className="lg:ml-64 pb-20 lg:pb-6">
          <div className="px-4 lg:px-6 py-6">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Progress Analytics
              </h1>
              <p className="text-muted-foreground">
                Track your learning journey with detailed insights and performance metrics
              </p>
            </div>

            {/* Filter Controls */}
            <FilterControls onFiltersChange={handleFiltersChange} />

            {/* Tab Navigation */}
            <div className="mb-6">
              <div className="border-b border-border">
                <nav className="flex space-x-8 overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap spring-transition ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {renderTabContent()}
            </div>

            {/* Summary Stats */}
            <div className="mt-8 bg-card border border-border rounded-lg p-4 lg:p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Summary</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">15</p>
                  <p className="text-sm text-muted-foreground">Active Goals</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">92%</p>
                  <p className="text-sm text-muted-foreground">Goal Completion</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-warning">3.2h</p>
                  <p className="text-sm text-muted-foreground">Daily Average</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">24</p>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <BottomTabNavigation />
        <QuickActionFAB />
      </div>
    </>
  );
};

export default ProgressAnalyticsDashboard;