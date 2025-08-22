import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const QuizAnalytics = () => {
  const quizData = [
    { week: 'Week 1', accuracy: 65, avgTime: 45, quizzes: 8 },
    { week: 'Week 2', accuracy: 72, avgTime: 42, quizzes: 12 },
    { week: 'Week 3', accuracy: 68, avgTime: 38, quizzes: 15 },
    { week: 'Week 4', accuracy: 78, avgTime: 35, quizzes: 18 },
    { week: 'Week 5', accuracy: 82, avgTime: 32, quizzes: 22 },
    { week: 'Week 6', accuracy: 85, avgTime: 30, quizzes: 25 },
    { week: 'Week 7', accuracy: 88, avgTime: 28, quizzes: 28 },
    { week: 'Week 8', accuracy: 91, avgTime: 26, quizzes: 32 }
  ];

  const recentQuizzes = [
    { subject: 'Mathematics', score: 92, questions: 20, time: '15:30', date: '2025-08-22' },
    { subject: 'Physics', score: 88, questions: 15, time: '12:45', date: '2025-08-21' },
    { subject: 'Chemistry', score: 95, questions: 25, time: '18:20', date: '2025-08-21' },
    { subject: 'Biology', score: 85, questions: 18, time: '14:15', date: '2025-08-20' },
    { subject: 'English', score: 78, questions: 12, time: '10:30', date: '2025-08-20' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-sm text-primary">
            Accuracy: {payload?.[0]?.value}%
          </p>
          <p className="text-sm text-secondary">
            Avg Time: {payload?.[1]?.value}s
          </p>
          <p className="text-sm text-muted-foreground">
            Quizzes: {payload?.[0]?.payload?.quizzes}
          </p>
        </div>
      );
    }
    return null;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-primary';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBadge = (score) => {
    if (score >= 90) return 'bg-success/10 text-success border-success/20';
    if (score >= 80) return 'bg-primary/10 text-primary border-primary/20';
    if (score >= 70) return 'bg-warning/10 text-warning border-warning/20';
    return 'bg-destructive/10 text-destructive border-destructive/20';
  };

  return (
    <div className="space-y-6">
      {/* Performance Trends */}
      <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Quiz Performance Trends</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Accuracy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
              <span className="text-muted-foreground">Avg Time</span>
            </div>
          </div>
        </div>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={quizData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="week" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                yAxisId="left"
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: 'Time (s)', angle: 90, position: 'insideRight' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="accuracy"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avgTime"
                stroke="var(--color-secondary)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Recent Quiz Results */}
      <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Recent Quiz Results</h3>
          <button className="text-sm text-primary hover:text-primary/80 spring-transition">
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          {recentQuizzes?.map((quiz, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 spring-transition">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={16} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{quiz?.subject}</p>
                  <p className="text-sm text-muted-foreground">
                    {quiz?.questions} questions • {quiz?.time} • {quiz?.date}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getScoreBadge(quiz?.score)}`}>
                  {quiz?.score}%
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Target" size={16} className="text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">91%</p>
          <p className="text-sm text-muted-foreground">Best Score</p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Clock" size={16} className="text-secondary" />
          </div>
          <p className="text-2xl font-bold text-foreground">26s</p>
          <p className="text-sm text-muted-foreground">Avg Time</p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="TrendingUp" size={16} className="text-warning" />
          </div>
          <p className="text-2xl font-bold text-foreground">+15%</p>
          <p className="text-sm text-muted-foreground">Improvement</p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Award" size={16} className="text-success" />
          </div>
          <p className="text-2xl font-bold text-foreground">138</p>
          <p className="text-sm text-muted-foreground">Total Quizzes</p>
        </div>
      </div>
    </div>
  );
};

export default QuizAnalytics;