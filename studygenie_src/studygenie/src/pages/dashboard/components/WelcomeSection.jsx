import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = () => {
  const currentHour = new Date()?.getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const userStats = {
    name: "Alex",
    streak: 7,
    xpPoints: 2450,
    level: 12
  };

  const achievements = [
    {
      id: 1,
      title: "Week Warrior",
      description: "7 day study streak",
      icon: "Flame",
      color: "text-orange-500",
      bgColor: "bg-orange-100",
      unlocked: true
    },
    {
      id: 2,
      title: "Quiz Master",
      description: "100% quiz accuracy",
      icon: "Trophy",
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
      unlocked: true
    },
    {
      id: 3,
      title: "Speed Reader",
      description: "Read 50 materials",
      icon: "BookOpen",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      unlocked: false
    }
  ];

  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">{getGreeting()}, {userStats?.name}! 👋</h1>
          <p className="text-white/80 mt-1">Ready to continue your learning journey?</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-white/80">Level {userStats?.level}</div>
          <div className="text-xl font-bold">{userStats?.xpPoints} XP</div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
          <Icon name="Flame" size={24} className="text-orange-300 mx-auto mb-2" />
          <div className="text-2xl font-bold">{userStats?.streak}</div>
          <div className="text-sm text-white/80">Day Streak</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
          <Icon name="Target" size={24} className="text-green-300 mx-auto mb-2" />
          <div className="text-2xl font-bold">85%</div>
          <div className="text-sm text-white/80">Weekly Goal</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center col-span-2 lg:col-span-1">
          <Icon name="Clock" size={24} className="text-blue-300 mx-auto mb-2" />
          <div className="text-2xl font-bold">2.5h</div>
          <div className="text-sm text-white/80">Today's Study</div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3">Recent Achievements</h3>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {achievements?.map((achievement) => (
            <div
              key={achievement?.id}
              className={`flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-lg p-3 min-w-[140px] ${
                achievement?.unlocked ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <div className={`w-8 h-8 ${achievement?.bgColor} rounded-full flex items-center justify-center mb-2`}>
                <Icon name={achievement?.icon} size={16} className={achievement?.color} />
              </div>
              <div className="text-sm font-medium">{achievement?.title}</div>
              <div className="text-xs text-white/70">{achievement?.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;