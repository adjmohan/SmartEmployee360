import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import AIChatbot from '../../components/ui/AIChatbot';
import MetricsCard from './components/MetricsCard';
import DepartmentChart from './components/DepartmentChart';
import SalaryTrendChart from './components/SalaryTrendChart';
import AttendanceHeatmap from './components/AttendanceHeatmap';
import QuickActions from './components/QuickActions';
import RecentActivities from './components/RecentActivities';
import AttritionPrediction from './components/AttritionPrediction';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Update current time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);

  const metricsData = [
    {
      title: 'Total Employees',
      value: '1,247',
      change: '+12 this month',
      changeType: 'positive',
      icon: 'Users',
      iconColor: 'bg-primary'
    },
    {
      title: 'Monthly Attrition',
      value: '2.3%',
      change: '-0.5% from last month',
      changeType: 'positive',
      icon: 'TrendingDown',
      iconColor: 'bg-success'
    },
    {
      title: 'On Leave Today',
      value: '23',
      change: '5 sick, 18 vacation',
      changeType: 'neutral',
      icon: 'Calendar',
      iconColor: 'bg-warning'
    },
    {
      title: 'Pending Reviews',
      value: '47',
      change: '12 overdue',
      changeType: 'negative',
      icon: 'FileText',
      iconColor: 'bg-error'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard - SmartEmployee360</title>
        <meta name="description" content="Comprehensive workforce analytics and real-time insights for HR administrators and managers" />
      </Helmet>

      <Header />
      <Navigation />

      <main className="px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Admin</h1>
              <p className="text-muted-foreground">
                Here's what's happening with your workforce today • {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">
                {currentTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
              <p className="text-sm text-muted-foreground">Current Time</p>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricsData.map((metric, index) => (
            <MetricsCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              iconColor={metric.iconColor}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <DepartmentChart />
              <SalaryTrendChart />
            </div>
            <AttendanceHeatmap />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            <QuickActions />
            <RecentActivities />
          </div>
        </div>

        {/* Attrition Prediction Section */}
        <div className="mb-8">
          <AttritionPrediction />
        </div>

        {/* Footer Stats */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">98.5%</p>
              <p className="text-sm text-muted-foreground">System Uptime</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">4.8/5</p>
              <p className="text-sm text-muted-foreground">Employee Satisfaction</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">15 mins</p>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
            </div>
          </div>
        </div>
      </main>

      <AIChatbot />
    </div>
  );
};

export default Dashboard;