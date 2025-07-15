import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      change: '+2.5%',
      changeType: 'positive',
      icon: 'Users',
      color: 'bg-primary/10 text-primary border-primary/20'
    },
    {
      title: 'Present Today',
      value: stats.presentToday,
      change: '+5.2%',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'bg-success/10 text-success border-success/20'
    },
    {
      title: 'Absent Today',
      value: stats.absentToday,
      change: '-12.3%',
      changeType: 'negative',
      icon: 'XCircle',
      color: 'bg-error/10 text-error border-error/20'
    },
    {
      title: 'Late Arrivals',
      value: stats.lateArrivals,
      change: '-8.1%',
      changeType: 'negative',
      icon: 'Clock',
      color: 'bg-warning/10 text-warning border-warning/20'
    },
    {
      title: 'On Leave',
      value: stats.onLeave,
      change: '+15.7%',
      changeType: 'positive',
      icon: 'Calendar',
      color: 'bg-secondary/10 text-secondary border-secondary/20'
    },
    {
      title: 'Attendance Rate',
      value: `${stats.attendanceRate}%`,
      change: '+3.2%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'bg-accent/10 text-accent border-accent/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${stat.color}`}>
              <Icon name={stat.icon} size={24} />
            </div>
            <div className={`
              flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded-full
              ${stat.changeType === 'positive' ?'bg-success/10 text-success' :'bg-error/10 text-error'
              }
            `}>
              <Icon 
                name={stat.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={12} 
              />
              <span>{stat.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceStats;