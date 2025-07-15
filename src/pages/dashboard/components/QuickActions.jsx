import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const quickActions = [
    {
      title: 'Add Employee',
      description: 'Register new team member',
      icon: 'UserPlus',
      color: 'bg-primary',
      link: '/employee-management'
    },
    {
      title: 'Generate Report',
      description: 'Create analytics report',
      icon: 'FileText',
      color: 'bg-success',
      link: '/dashboard'
    },
    {
      title: 'Payroll Processing',
      description: 'Process monthly payroll',
      icon: 'DollarSign',
      color: 'bg-warning',
      link: '/payroll-management'
    },
    {
      title: 'Performance Review',
      description: 'Conduct employee reviews',
      icon: 'TrendingUp',
      color: 'bg-accent',
      link: '/performance-reviews'
    },
    {
      title: 'Attendance Tracking',
      description: 'Monitor attendance patterns',
      icon: 'Clock',
      color: 'bg-secondary',
      link: '/attendance-management'
    },
    {
      title: 'AI Assistant',
      description: 'Get intelligent insights',
      icon: 'Bot',
      color: 'bg-primary',
      link: '/ai-chatbot-interface'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="block p-3 rounded-lg border border-border hover:bg-muted transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                <Icon name={action.icon} size={20} color="white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground text-sm">{action.title}</h4>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;