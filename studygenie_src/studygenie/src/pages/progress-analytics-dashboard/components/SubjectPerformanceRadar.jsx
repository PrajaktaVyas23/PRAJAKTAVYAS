import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const SubjectPerformanceRadar = () => {
  const subjectData = [
    { subject: 'Mathematics', score: 85, fullMark: 100 },
    { subject: 'Physics', score: 78, fullMark: 100 },
    { subject: 'Chemistry', score: 92, fullMark: 100 },
    { subject: 'Biology', score: 88, fullMark: 100 },
    { subject: 'English', score: 75, fullMark: 100 },
    { subject: 'History', score: 82, fullMark: 100 }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Subject Performance</h3>
        <div className="text-sm text-muted-foreground">
          Average: 83.3%
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={subjectData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <PolarGrid stroke="var(--color-border)" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }}
            />
            <Radar
              name="Performance"
              dataKey="score"
              stroke="var(--color-primary)"
              fill="var(--color-primary)"
              fillOpacity={0.1}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-2">
        {subjectData?.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground truncate">{item?.subject}</span>
            <span className={`font-medium ${
              item?.score >= 90 ? 'text-success' : 
              item?.score >= 80 ? 'text-primary' : 
              item?.score >= 70 ? 'text-warning' : 'text-destructive'
            }`}>
              {item?.score}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectPerformanceRadar;