import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivities = () => {
  const activities = [
    {
      id: 1,
      type: 'employee_added',
      title: 'New Employee Added',
      description: 'Sarah Johnson joined Engineering team',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      icon: 'UserPlus',
      iconColor: 'bg-success'
    },
    {
      id: 2,
      type: 'leave_request',
      title: 'Leave Request Submitted',
      description: 'Michael Chen requested 3 days vacation',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      icon: 'Calendar',
      iconColor: 'bg-warning'
    },
    {
      id: 3,
      type: 'performance_review',
      title: 'Performance Review Completed',
      description: 'Q2 review completed for Alex Rodriguez',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      icon: 'TrendingUp',
      iconColor: 'bg-primary'
    },
    {
      id: 4,
      type: 'payroll_processed',
      title: 'Payroll Processed',
      description: 'July 2024 payroll successfully processed',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      icon: 'DollarSign',
      iconColor: 'bg-accent'
    },
    {
      id: 5,
      type: 'attendance_alert',
      title: 'Attendance Alert',
      description: 'Late arrival pattern detected for Team Beta',
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      icon: 'AlertTriangle',
      iconColor: 'bg-error'
    },
    {
      id: 6,
      type: 'system_update',
      title: 'System Update',
      description: 'AI prediction models updated successfully',
      timestamp: new Date(Date.now() - 18000000), // 5 hours ago
      icon: 'RefreshCw',
      iconColor: 'bg-secondary'
    }
  ];

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-colors duration-200">
            <div className={`w-8 h-8 rounded-full ${activity.iconColor} flex items-center justify-center flex-shrink-0`}>
              <Icon name={activity.icon} size={16} color="white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground text-sm">{activity.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
              <p className="text-xs text-muted-foreground mt-2">{formatTimestamp(activity.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;