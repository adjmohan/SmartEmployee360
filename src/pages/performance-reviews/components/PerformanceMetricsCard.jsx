import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetricsCard = ({ title, value, change, icon, color = 'primary' }) => {
  const getColorClasses = (colorType) => {
    const colors = {
      primary: 'text-primary bg-primary/10',
      success: 'text-success bg-success/10',
      warning: 'text-warning bg-warning/10',
      error: 'text-error bg-error/10'
    };
    return colors[colorType] || colors.primary;
  };

  const getChangeColor = (changeValue) => {
    if (changeValue > 0) return 'text-success';
    if (changeValue < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = (changeValue) => {
    if (changeValue > 0) return 'TrendingUp';
    if (changeValue < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center space-x-1 mt-2 ${getChangeColor(change)}`}>
              <Icon name={getChangeIcon(change)} size={16} />
              <span className="text-sm font-medium">
                {Math.abs(change)}% from last month
              </span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(color)}`}>
          <Icon name={icon} size={24} />
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetricsCard;