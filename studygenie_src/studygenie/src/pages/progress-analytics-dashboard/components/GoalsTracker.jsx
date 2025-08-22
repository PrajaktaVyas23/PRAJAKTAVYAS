import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GoalsTracker = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Complete 50 Math Quizzes',
      description: 'Master algebra and geometry concepts',
      current: 38,
      target: 50,
      deadline: '2025-09-15',
      category: 'Quiz',
      priority: 'high',
      status: 'active'
    },
    {
      id: 2,
      title: 'Study 100 Hours This Month',
      description: 'Maintain consistent daily study routine',
      current: 72,
      target: 100,
      deadline: '2025-08-31',
      category: 'Time',
      priority: 'medium',
      status: 'active'
    },
    {
      id: 3,
      title: 'Achieve 90% Average Score',
      description: 'Improve overall quiz performance',
      current: 85,
      target: 90,
      deadline: '2025-09-30',
      category: 'Performance',
      priority: 'high',
      status: 'active'
    },
    {
      id: 4,
      title: 'Complete Physics Syllabus',
      description: 'Cover all chapters before exam',
      current: 8,
      target: 12,
      deadline: '2025-10-15',
      category: 'Syllabus',
      priority: 'medium',
      status: 'active'
    },
    {
      id: 5,
      title: 'Maintain 30-Day Streak',
      description: 'Study consistently for a month',
      current: 30,
      target: 30,
      deadline: '2025-08-22',
      category: 'Streak',
      priority: 'low',
      status: 'completed'
    }
  ]);

  const achievements = [
    {
      id: 1,
      title: '7-Day Streak Master',
      description: 'Studied for 7 consecutive days',
      icon: 'Flame',
      date: '2025-08-15',
      rarity: 'common'
    },
    {
      id: 2,
      title: 'Quiz Champion',
      description: 'Scored 100% in 5 consecutive quizzes',
      icon: 'Trophy',
      date: '2025-08-10',
      rarity: 'rare'
    },
    {
      id: 3,
      title: 'Speed Learner',
      description: 'Completed 10 materials in one day',
      icon: 'Zap',
      date: '2025-08-05',
      rarity: 'epic'
    }
  ];

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Quiz': return 'FileText';
      case 'Time': return 'Clock';
      case 'Performance': return 'TrendingUp';
      case 'Syllabus': return 'BookOpen';
      case 'Streak': return 'Flame';
      default: return 'Target';
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-muted-foreground';
      case 'rare': return 'text-primary';
      case 'epic': return 'text-warning';
      case 'legendary': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const formatDeadline = (deadline) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays <= 7) return `${diffDays} days left`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const activeGoals = goals.filter(goal => goal.status === 'active');
  const completedGoals = goals.filter(goal => goal.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Active Goals */}
      <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Active Goals</h3>
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            Add Goal
          </Button>
        </div>
        
        <div className="space-y-4">
          {activeGoals.map((goal) => (
            <div key={goal.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 spring-transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={getCategoryIcon(goal.category)} size={16} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{goal.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                    {goal.priority.toUpperCase()}
                  </span>
                  <Icon name="MoreHorizontal" size={16} className="text-muted-foreground cursor-pointer" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">
                    {goal.current} / {goal.target}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full spring-transition"
                    style={{ width: `${getProgressPercentage(goal.current, goal.target)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-success font-medium">
                    {Math.round(getProgressPercentage(goal.current, goal.target))}% complete
                  </span>
                  <span className="text-muted-foreground">
                    {formatDeadline(goal.deadline)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Recent Achievements</h3>
          <button className="text-sm text-primary hover:text-primary/80 spring-transition">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="border border-border rounded-lg p-4 text-center hover:bg-muted/30 spring-transition">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                achievement.rarity === 'epic' ? 'bg-warning/10' :
                achievement.rarity === 'rare' ? 'bg-primary/10' : 'bg-muted'
              }`}>
                <Icon 
                  name={achievement.icon} 
                  size={20} 
                  className={getRarityColor(achievement.rarity)} 
                />
              </div>
              <h4 className="font-medium text-foreground mb-1">{achievement.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
              <span className="text-xs text-muted-foreground">{achievement.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Completed Goals</h3>
            <span className="text-sm text-success font-medium">
              {completedGoals.length} completed
            </span>
          </div>
          
          <div className="space-y-3">
            {completedGoals.map((goal) => (
              <div key={goal.id} className="flex items-center space-x-3 p-3 bg-success/5 border border-success/20 rounded-lg">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Check" size={16} className="text-success" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{goal.title}</h4>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                </div>
                <div className="text-sm text-success font-medium">
                  {goal.current}/{goal.target}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsTracker;