import React from 'react';
import Icon from '../../../components/AppIcon';

const StudyHeatmap = () => {
  // Generate mock data for the last 12 weeks
  const generateHeatmapData = () => {
    const data = [];
    const today = new Date();
    const startDate = new Date(today.getTime() - (84 * 24 * 60 * 60 * 1000)); // 12 weeks ago
    
    for (let i = 0; i < 84; i++) {
      const date = new Date(startDate.getTime() + (i * 24 * 60 * 60 * 1000));
      const studyMinutes = Math.floor(Math.random() * 300); // 0-300 minutes
      data?.push({
        date: date?.toISOString()?.split('T')?.[0],
        minutes: studyMinutes,
        level: studyMinutes === 0 ? 0 : 
               studyMinutes < 60 ? 1 : 
               studyMinutes < 120 ? 2 : 
               studyMinutes < 180 ? 3 : 4
      });
    }
    return data;
  };

  const heatmapData = generateHeatmapData();
  const weeks = [];
  
  // Group data into weeks
  for (let i = 0; i < heatmapData?.length; i += 7) {
    weeks?.push(heatmapData?.slice(i, i + 7));
  }

  const getIntensityClass = (level) => {
    switch (level) {
      case 0: return 'bg-muted';
      case 1: return 'bg-primary/20';
      case 2: return 'bg-primary/40';
      case 3: return 'bg-primary/60';
      case 4: return 'bg-primary/80';
      default: return 'bg-muted';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatMinutes = (minutes) => {
    if (minutes === 0) return 'No study time';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Study Consistency</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Less</span>
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4]?.map(level => (
              <div 
                key={level}
                className={`w-3 h-3 rounded-sm ${getIntensityClass(level)}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="flex space-x-1 min-w-max">
          {weeks?.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col space-y-1">
              {week?.map((day, dayIndex) => (
                <div
                  key={day?.date}
                  className={`w-3 h-3 rounded-sm ${getIntensityClass(day?.level)} hover:ring-2 hover:ring-primary/50 cursor-pointer spring-transition`}
                  title={`${formatDate(day?.date)}: ${formatMinutes(day?.minutes)}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>12 weeks ago</span>
        <span>Today</span>
      </div>
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground">84 days tracked</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Flame" size={16} className="text-warning" />
          <span className="text-muted-foreground">7 day streak</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Target" size={16} className="text-success" />
          <span className="text-muted-foreground">68% consistency</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-primary" />
          <span className="text-muted-foreground">2.5h avg/day</span>
        </div>
      </div>
    </div>
  );
};

export default StudyHeatmap;