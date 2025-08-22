import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StudyTimeChart = () => {
  const studyData = [
    { day: 'Mon', hours: 2.5, target: 3 },
    { day: 'Tue', hours: 3.2, target: 3 },
    { day: 'Wed', hours: 1.8, target: 3 },
    { day: 'Thu', hours: 4.1, target: 3 },
    { day: 'Fri', hours: 2.9, target: 3 },
    { day: 'Sat', hours: 5.2, target: 3 },
    { day: 'Sun', hours: 3.8, target: 3 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-foreground">{`${label}`}</p>
          <p className="text-sm text-primary">
            Study Time: {`${payload?.[0]?.value}h`}
          </p>
          <p className="text-sm text-muted-foreground">
            Target: {`${payload?.[0]?.payload?.target}h`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
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
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={studyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="day" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              label={{ value: 'Hours', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="hours" 
              fill="var(--color-primary)" 
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudyTimeChart;