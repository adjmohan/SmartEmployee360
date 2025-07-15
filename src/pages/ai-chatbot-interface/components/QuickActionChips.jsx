import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActionChips = ({ onActionClick, conversationContext }) => {
  const quickActions = [
    {
      id: 'leave_balance',
      label: 'Check Leave Balance',
      icon: 'Calendar',
      category: 'leave'
    },
    {
      id: 'apply_leave',
      label: 'Apply for Leave',
      icon: 'CalendarPlus',
      category: 'leave'
    },
    {
      id: 'timesheet_status',
      label: 'Timesheet Status',
      icon: 'Clock',
      category: 'attendance'
    },
    {
      id: 'pay_stub',
      label: 'View Pay Stub',
      icon: 'DollarSign',
      category: 'payroll'
    },
    {
      id: 'performance_review',
      label: 'Performance Review',
      icon: 'TrendingUp',
      category: 'performance'
    },
    {
      id: 'update_profile',
      label: 'Update Profile',
      icon: 'User',
      category: 'profile'
    },
    {
      id: 'company_policies',
      label: 'Company Policies',
      icon: 'FileText',
      category: 'policies'
    },
    {
      id: 'contact_hr',
      label: 'Contact HR',
      icon: 'MessageCircle',
      category: 'support'
    }
  ];

  // Filter actions based on conversation context
  const getRelevantActions = () => {
    if (!conversationContext || conversationContext.length === 0) {
      return quickActions.slice(0, 4); // Show first 4 for new conversations
    }

    const lastMessage = conversationContext[conversationContext.length - 1];
    const messageContent = lastMessage.content.toLowerCase();

    if (messageContent.includes('leave') || messageContent.includes('vacation')) {
      return quickActions.filter(action => action.category === 'leave');
    } else if (messageContent.includes('timesheet') || messageContent.includes('attendance')) {
      return quickActions.filter(action => action.category === 'attendance');
    } else if (messageContent.includes('pay') || messageContent.includes('salary')) {
      return quickActions.filter(action => action.category === 'payroll');
    } else if (messageContent.includes('performance') || messageContent.includes('review')) {
      return quickActions.filter(action => action.category === 'performance');
    } else {
      return quickActions.slice(0, 6); // Show 6 most common actions
    }
  };

  const relevantActions = getRelevantActions();

  return (
    <div className="px-4 py-2 border-t border-border bg-muted/30">
      <div className="flex items-center mb-2">
        <Icon name="Zap" size={14} className="text-muted-foreground mr-1" />
        <span className="text-xs text-muted-foreground font-medium">Quick Actions</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {relevantActions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            size="sm"
            onClick={() => onActionClick(action)}
            className="text-xs h-8 px-3 bg-background hover:bg-muted"
          >
            <Icon name={action.icon} size={12} className="mr-1" />
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionChips;