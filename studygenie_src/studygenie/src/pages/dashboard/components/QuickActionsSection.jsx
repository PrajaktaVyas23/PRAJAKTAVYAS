import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsSection = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      title: "Upload New Material",
      description: "Add PDFs, images, or notes",
      icon: "Upload",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      action: () => navigate('/material-upload-processing')
    },
    {
      id: 2,
      title: "Start Quiz",
      description: "Test your knowledge",
      icon: "Brain",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/20",
      action: () => navigate('/study-materials-library')
    },
    {
      id: 3,
      title: "Chat with Tutor",
      description: "Get instant help from AI",
      icon: "MessageCircle",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
      action: () => navigate('/ai-tutor-chat-interface')
    }
  ];

  const studyTools = [
    {
      id: 1,
      title: "Flashcards",
      icon: "CreditCard",
      count: "24 sets",
      action: () => navigate('/study-materials-library')
    },
    {
      id: 2,
      title: "Summaries",
      icon: "FileText",
      count: "12 docs",
      action: () => navigate('/study-materials-library')
    },
    {
      id: 3,
      title: "Practice Tests",
      icon: "CheckSquare",
      count: "8 tests",
      action: () => navigate('/study-materials-library')
    },
    {
      id: 4,
      title: "Study Notes",
      icon: "BookOpen",
      count: "15 notes",
      action: () => navigate('/study-materials-library')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions?.map((action) => (
            <Button
              key={action?.id}
              variant="outline"
              className={`h-auto p-6 flex flex-col items-center text-center space-y-3 ${action?.bgColor} ${action?.borderColor} hover:shadow-elevation-2`}
              onClick={action?.action}
            >
              <div className={`w-12 h-12 ${action?.bgColor} rounded-xl flex items-center justify-center`}>
                <Icon name={action?.icon} size={24} className={action?.color} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{action?.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{action?.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Study Tools */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Study Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {studyTools?.map((tool) => (
            <Button
              key={tool?.id}
              variant="ghost"
              className="h-auto p-4 flex flex-col items-center text-center space-y-2 bg-card border border-border hover:shadow-elevation-1"
              onClick={tool?.action}
            >
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Icon name={tool?.icon} size={20} className="text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground text-sm">{tool?.title}</h3>
                <p className="text-xs text-muted-foreground">{tool?.count}</p>
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Daily Challenge */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Icon name="Zap" size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Daily Challenge</h3>
              <p className="text-white/80">Complete 3 quizzes to earn bonus XP</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">1/3</div>
            <div className="text-sm text-white/80">Completed</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-white/20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full spring-transition" style={{ width: '33%' }} />
          </div>
          <div className="flex justify-between mt-2 text-sm text-white/80">
            <span>Progress</span>
            <span>+50 XP Reward</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsSection;