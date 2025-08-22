import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'quiz_completed',
      title: 'Completed Chemistry Quiz',
      description: 'Organic Chemistry Basics - Score: 92%',
      timestamp: '2 hours ago',
      icon: 'CheckCircle',
      iconColor: 'text-success',
      iconBg: 'bg-success/10'
    },
    {
      id: 2,
      type: 'material_uploaded',
      title: 'Uploaded New Material',
      description: 'Physics Notes - Thermodynamics Chapter 3',
      timestamp: '5 hours ago',
      icon: 'Upload',
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10'
    },
    {
      id: 3,
      type: 'achievement_unlocked',
      title: 'Achievement Unlocked!',
      description: 'Week Warrior - 7 day study streak',
      timestamp: '1 day ago',
      icon: 'Trophy',
      iconColor: 'text-warning',
      iconBg: 'bg-warning/10'
    },
    {
      id: 4,
      type: 'ai_chat',
      title: 'AI Tutor Session',
      description: 'Discussed calculus integration methods',
      timestamp: '1 day ago',
      icon: 'MessageCircle',
      iconColor: 'text-accent',
      iconBg: 'bg-accent/10'
    },
    {
      id: 5,
      type: 'study_session',
      title: 'Study Session Completed',
      description: 'Mathematics - 45 minutes focused study',
      timestamp: '2 days ago',
      icon: 'Clock',
      iconColor: 'text-secondary',
      iconBg: 'bg-secondary/10'
    },
    {
      id: 6,
      type: 'flashcard_review',
      title: 'Flashcard Review',
      description: 'Biology Terms - 25 cards reviewed',
      timestamp: '2 days ago',
      icon: 'CreditCard',
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10'
    }
  ];

  const studyReminders = [
    {
      id: 1,
      title: 'Physics Quiz Due',
      description: 'Complete your weekly physics assessment',
      dueTime: 'Due in 2 hours',
      priority: 'high',
      icon: 'AlertCircle'
    },
    {
      id: 2,
      title: 'Review Chemistry Notes',
      description: 'Organic Chemistry chapter review scheduled',
      dueTime: 'Due tomorrow',
      priority: 'medium',
      icon: 'BookOpen'
    },
    {
      id: 3,
      title: 'Weekly Goal Check',
      description: 'You need 2 more hours to reach your weekly goal',
      dueTime: 'Due in 3 days',
      priority: 'low',
      icon: 'Target'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-muted-foreground bg-muted border-border';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Study Reminders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Study Reminders</h2>
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={16} className="mr-1" />
            Manage
          </Button>
        </div>
        
        <div className="space-y-3">
          {studyReminders?.map((reminder) => (
            <div 
              key={reminder?.id} 
              className={`border rounded-lg p-4 ${getPriorityColor(reminder?.priority)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-current/10 rounded-lg flex items-center justify-center">
                    <Icon name={reminder?.icon} size={16} className="text-current" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-current">{reminder?.title}</h3>
                    <p className="text-sm text-current/70 mt-1">{reminder?.description}</p>
                    <p className="text-xs text-current/60 mt-2">{reminder?.dueTime}</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-current hover:bg-current/10">
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
          <Button variant="ghost" size="sm">
            View All
            <Icon name="ArrowRight" size={16} className="ml-1" />
          </Button>
        </div>
        
        <div className="bg-card border border-border rounded-lg">
          <div className="divide-y divide-border">
            {activities?.map((activity, index) => (
              <div key={activity?.id} className="p-4 hover:bg-muted/50 spring-transition">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 ${activity?.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon name={activity?.icon} size={18} className={activity?.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground">{activity?.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{activity?.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">{activity?.timestamp}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    <Icon name="MoreHorizontal" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Study Streak */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Icon name="Flame" size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Keep it up!</h3>
              <p className="text-white/80">You're on a 7-day study streak</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">7</div>
            <div className="text-sm text-white/80">Days</div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-white/80">Study today to continue your streak</span>
          <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
            Start Studying
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;