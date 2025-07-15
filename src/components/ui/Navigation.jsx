import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Navigation = () => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Real-time workforce analytics and insights'
    },
    {
      label: 'Employees',
      path: '/employee-management',
      icon: 'Users',
      tooltip: 'Manage employee profiles and information'
    },
    {
      label: 'Attendance',
      path: '/attendance-management',
      icon: 'Clock',
      tooltip: 'Track time and attendance patterns'
    },
    {
      label: 'Payroll',
      path: '/payroll-management',
      icon: 'DollarSign',
      tooltip: 'Process payroll and manage compensation'
    },
    {
      label: 'Performance',
      path: '/performance-reviews',
      icon: 'TrendingUp',
      tooltip: 'Conduct reviews and track performance'
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-card border-b border-border sticky top-16 z-100">
      <div className="px-6">
        <div className="flex space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 py-4 px-3 border-b-2 transition-all duration-200 hover:text-primary ${
                isActive(item.path)
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:border-primary/50'
              }`}
              title={item.tooltip}
            >
              <Icon 
                name={item.icon} 
                size={18} 
                className={`transition-colors duration-200 ${
                  isActive(item.path) ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;