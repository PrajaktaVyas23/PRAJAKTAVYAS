import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, unit, trend, trendValue, icon, color = 'primary' }) => {
  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'bg-success/10 text-success border-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'destructive':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'secondary':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6 spring-transition hover:shadow-elevation-2">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${getColorClasses()}`}>
          <Icon name={icon} size={20} />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            <Icon name={getTrendIcon()} size={14} />
            <span className="text-xs font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-2xl lg:text-3xl font-bold text-foreground">
          {value}
          {unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
        </p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default MetricsCard;