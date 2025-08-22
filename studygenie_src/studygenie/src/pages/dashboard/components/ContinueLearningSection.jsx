import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ContinueLearningSection = () => {
  const navigate = useNavigate();

  const recentMaterials = [
    {
      id: 1,
      title: "Organic Chemistry Basics",
      subject: "Chemistry",
      progress: 75,
      lastAccessed: "2 hours ago",
      thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop",
      type: "PDF",
      timeRemaining: "15 min left"
    },
    {
      id: 2,
      title: "Calculus Integration",
      subject: "Mathematics",
      progress: 45,
      lastAccessed: "Yesterday",
      thumbnail: "https://images.pexels.com/photos/6256/mathematics-blackboard-education-school.jpg?w=400&h=300&fit=crop",
      type: "Notes",
      timeRemaining: "30 min left"
    },
    {
      id: 3,
      title: "World War II Timeline",
      subject: "History",
      progress: 90,
      lastAccessed: "3 days ago",
      thumbnail: "https://images.pixabay.com/photo/2016/11/29/13/14/books-1868068_1280.jpg?w=400&h=300&fit=crop",
      type: "Flashcards",
      timeRemaining: "5 min left"
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: "Physics Quiz",
      subject: "Physics",
      scheduledTime: "Today, 3:00 PM",
      duration: "30 min",
      type: "quiz",
      icon: "Brain"
    },
    {
      id: 2,
      title: "Chemistry Review",
      subject: "Chemistry",
      scheduledTime: "Tomorrow, 10:00 AM",
      duration: "45 min",
      type: "review",
      icon: "RefreshCw"
    }
  ];

  const aiRecommendations = [
    {
      id: 1,
      title: "Practice Weak Topics",
      description: "Focus on Thermodynamics and Kinematics",
      action: "Start Practice",
      icon: "Target",
      priority: "high"
    },
    {
      id: 2,
      title: "Review Yesterday\'s Quiz",
      description: "Improve your understanding of missed questions",
      action: "Review Now",
      icon: "RotateCcw",
      priority: "medium"
    }
  ];

  const handleContinueStudy = (materialId) => {
    navigate('/study-materials-library');
  };

  const handleStartSession = (sessionId) => {
    navigate('/ai-tutor-chat-interface');
  };

  const handleAIRecommendation = (recommendationId) => {
    navigate('/study-materials-library');
  };

  return (
    <div className="space-y-6">
      {/* Continue Learning */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Continue Learning</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/study-materials-library')}
          >
            View All
            <Icon name="ArrowRight" size={16} className="ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentMaterials?.map((material) => (
            <div key={material?.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 spring-transition">
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={material?.thumbnail}
                  alt={material?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {material?.type}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {material?.subject}
                  </span>
                  <span className="text-xs text-muted-foreground">{material?.lastAccessed}</span>
                </div>
                
                <h3 className="font-medium text-foreground mb-2 line-clamp-2">{material?.title}</h3>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground font-medium">{material?.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full spring-transition"
                      style={{ width: `${material?.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{material?.timeRemaining}</span>
                  <Button
                    size="sm"
                    onClick={() => handleContinueStudy(material?.id)}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Upcoming Sessions */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Upcoming Sessions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingSessions?.map((session) => (
            <div key={session?.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Icon name={session?.icon} size={20} className="text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{session?.title}</h3>
                    <p className="text-sm text-muted-foreground">{session?.subject}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Icon name="Clock" size={12} className="mr-1" />
                        {session?.scheduledTime}
                      </span>
                      <span className="flex items-center">
                        <Icon name="Timer" size={12} className="mr-1" />
                        {session?.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStartSession(session?.id)}
                >
                  Start
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* AI Recommendations */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">AI Recommendations</h2>
        <div className="space-y-3">
          {aiRecommendations?.map((recommendation) => (
            <div key={recommendation?.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    recommendation?.priority === 'high' ?'bg-destructive/10' :'bg-warning/10'
                  }`}>
                    <Icon 
                      name={recommendation?.icon} 
                      size={20} 
                      className={recommendation?.priority === 'high' ? 'text-destructive' : 'text-warning'} 
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{recommendation?.title}</h3>
                    <p className="text-sm text-muted-foreground">{recommendation?.description}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={recommendation?.priority === 'high' ? 'default' : 'outline'}
                  onClick={() => handleAIRecommendation(recommendation?.id)}
                >
                  {recommendation?.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContinueLearningSection;