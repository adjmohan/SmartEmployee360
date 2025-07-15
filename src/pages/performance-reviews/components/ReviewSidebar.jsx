import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ReviewSidebar = ({ onCreateCycle, onManageTemplates, onExportData }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedCycle, setSelectedCycle] = useState('');

  const reviewTemplates = [
    { value: 'annual', label: 'Annual Review Template' },
    { value: 'quarterly', label: 'Quarterly Review Template' },
    { value: 'probation', label: 'Probation Review Template' },
    { value: '360', label: '360-Degree Review Template' },
    { value: 'custom', label: 'Custom Template' }
  ];

  const activeCycles = [
    { value: 'q4-2024', label: 'Q4 2024 Reviews' },
    { value: 'annual-2024', label: 'Annual 2024 Reviews' },
    { value: 'probation-jan', label: 'January Probation Reviews' }
  ];

  const quickFilters = [
    { id: 'pending', label: 'Pending Reviews', count: 23, color: 'warning' },
    { id: 'overdue', label: 'Overdue Reviews', count: 5, color: 'error' },
    { id: 'completed', label: 'Completed Reviews', count: 87, color: 'success' },
    { id: 'in_progress', label: 'In Progress', count: 12, color: 'primary' }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Review Completed',
      employee: 'Sarah Johnson',
      time: '2 hours ago',
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      id: 2,
      action: 'Review Started',
      employee: 'Michael Chen',
      time: '4 hours ago',
      icon: 'Play',
      color: 'primary'
    },
    {
      id: 3,
      action: 'Reminder Sent',
      employee: 'Emily Davis',
      time: '1 day ago',
      icon: 'Bell',
      color: 'warning'
    },
    {
      id: 4,
      action: 'Review Approved',
      employee: 'David Wilson',
      time: '2 days ago',
      icon: 'Shield',
      color: 'success'
    }
  ];

  const getFilterColor = (color) => {
    const colors = {
      primary: 'text-primary bg-primary/10 border-primary/20',
      success: 'text-success bg-success/10 border-success/20',
      warning: 'text-warning bg-warning/10 border-warning/20',
      error: 'text-error bg-error/10 border-error/20'
    };
    return colors[color] || colors.primary;
  };

  const getActivityColor = (color) => {
    const colors = {
      primary: 'text-primary',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="w-80 bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Review Management */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Review Management</h3>
          <div className="space-y-3">
            <Button
              variant="default"
              className="w-full justify-start"
              onClick={onCreateCycle}
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Create Review Cycle
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={onManageTemplates}
            >
              <Icon name="FileText" size={16} className="mr-2" />
              Manage Templates
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={onExportData}
            >
              <Icon name="Download" size={16} className="mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Template Selection */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Review Template</h4>
          <Select
            options={reviewTemplates}
            value={selectedTemplate}
            onChange={setSelectedTemplate}
            placeholder="Select template"
            className="w-full"
          />
        </div>

        {/* Active Cycle Selection */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Active Cycle</h4>
          <Select
            options={activeCycles}
            value={selectedCycle}
            onChange={setSelectedCycle}
            placeholder="Select cycle"
            className="w-full"
          />
        </div>

        {/* Quick Filters */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Quick Filters</h4>
          <div className="space-y-2">
            {quickFilters.map((filter) => (
              <button
                key={filter.id}
                className={`w-full p-3 rounded-lg border text-left transition-all hover:shadow-sm ${getFilterColor(filter.color)}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{filter.label}</span>
                  <span className="text-lg font-bold">{filter.count}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Recent Activity</h4>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                <Icon 
                  name={activity.icon} 
                  size={16} 
                  className={getActivityColor(activity.color)}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground truncate">{activity.employee}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-3">
            View All Activity
          </Button>
        </div>

        {/* Performance Insights */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Brain" size={16} className="text-primary" />
            <h4 className="text-sm font-medium text-foreground">AI Insights</h4>
          </div>
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">
              • 15% improvement in completion rates
            </div>
            <div className="text-xs text-muted-foreground">
              • Engineering team shows highest ratings
            </div>
            <div className="text-xs text-muted-foreground">
              • 3 employees at risk of attrition
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
            View Detailed Insights
          </Button>
        </div>

        {/* Help & Support */}
        <div className="border-t border-border pt-4">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <Icon name="HelpCircle" size={16} className="mr-2" />
            Help & Support
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <Icon name="Settings" size={16} className="mr-2" />
            Review Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSidebar;