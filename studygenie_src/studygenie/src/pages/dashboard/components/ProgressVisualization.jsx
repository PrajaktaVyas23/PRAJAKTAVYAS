import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const ProgressVisualization = () => {
  const weeklyStudyData = [
    { day: 'Mon', hours: 2.5, target: 3 },
    { day: 'Tue', hours: 3.2, target: 3 },
    { day: 'Wed', hours: 1.8, target: 3 },
    { day: 'Thu', hours: 4.1, target: 3 },
    { day: 'Fri', hours: 2.7, target: 3 },
    { day: 'Sat', hours: 3.5, target: 3 },
    { day: 'Sun', hours: 2.2, target: 3 }
  ];

  const subjectPerformance = [
    { subject: 'Mathematics', score: 85, color: '#3B82F6' },
    { subject: 'Physics', score: 78, color: '#10B981' },
    { subject: 'Chemistry', score: 92, color: '#F59E0B' },
    { subject: 'Biology', score: 88, color: '#EF4444' },
    { subject: 'History', score: 76, color: '#8B5CF6' }
  ];

  const studyStats = [
    {
      label: "Total Study Time",
      value: "42.5h",
      change: "+12%",
      changeType: "positive",
      icon: "Clock"
    },
    {
      label: "Materials Completed",
      value: "28",
      change: "+5",
      changeType: "positive",
      icon: "CheckCircle"
    },
    {
      label: "Quiz Average",
      value: "84%",
      change: "+3%",
      changeType: "positive",
      icon: "Target"
    },
    {
      label: "Weak Areas",
      value: "3",
      change: "-2",
      changeType: "positive",
      icon: "AlertTriangle"
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-foreground">{`${label}: ${payload?.[0]?.value}h`}</p>
          <p className="text-xs text-muted-foreground">{`Target: ${payload?.[0]?.payload?.target}h`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Study Stats Grid */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Study Statistics</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {studyStats?.map((stat, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={stat?.icon} size={16} className="text-primary" />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat?.changeType === 'positive' ?'text-success bg-success/10' :'text-destructive bg-destructive/10'
                }`}>
                  {stat?.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
              <div className="text-sm text-muted-foreground">{stat?.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Weekly Study Time Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Weekly Study Time</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Actual</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-muted rounded-full"></div>
              <span className="text-muted-foreground">Target</span>
            </div>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyStudyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="day" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="hours" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" fill="var(--color-muted)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Subject Performance */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Subject Performance</h3>
        <div className="space-y-4">
          {subjectPerformance?.map((subject, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: subject?.color }}
                ></div>
                <span className="font-medium text-foreground">{subject?.subject}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full spring-transition"
                    style={{ 
                      width: `${subject?.score}%`,
                      backgroundColor: subject?.color
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground w-12 text-right">
                  {subject?.score}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Performance Insights */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Performance Insights</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-success/10 rounded-lg">
            <Icon name="TrendingUp" size={20} className="text-success mt-0.5" />
            <div>
              <p className="font-medium text-success">Great Progress!</p>
              <p className="text-sm text-muted-foreground">Your Chemistry scores improved by 15% this week</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-warning/10 rounded-lg">
            <Icon name="AlertCircle" size={20} className="text-warning mt-0.5" />
            <div>
              <p className="font-medium text-warning">Needs Attention</p>
              <p className="text-sm text-muted-foreground">Physics concepts need more practice - focus on Thermodynamics</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
            <Icon name="Lightbulb" size={20} className="text-primary mt-0.5" />
            <div>
              <p className="font-medium text-primary">Study Tip</p>
              <p className="text-sm text-muted-foreground">Try studying Mathematics in the morning when you're most focused</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressVisualization;