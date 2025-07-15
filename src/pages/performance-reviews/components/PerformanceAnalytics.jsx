import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PerformanceAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const periodOptions = [
    { value: 'current', label: 'Current Quarter' },
    { value: 'last', label: 'Last Quarter' },
    { value: 'ytd', label: 'Year to Date' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' }
  ];

  const performanceDistribution = [
    { name: 'Outstanding', value: 15, color: '#10B981' },
    { name: 'Exceeds Expectations', value: 35, color: '#F59E0B' },
    { name: 'Meets Expectations', value: 40, color: '#2563EB' },
    { name: 'Below Expectations', value: 10, color: '#EF4444' }
  ];

  const departmentPerformance = [
    { department: 'Engineering', avgRating: 4.2, employees: 45 },
    { department: 'Marketing', avgRating: 3.8, employees: 25 },
    { department: 'Sales', avgRating: 4.0, employees: 30 },
    { department: 'HR', avgRating: 4.1, employees: 15 },
    { department: 'Finance', avgRating: 3.9, employees: 20 }
  ];

  const performanceTrend = [
    { month: 'Jan', avgRating: 3.8, completionRate: 85 },
    { month: 'Feb', avgRating: 3.9, completionRate: 88 },
    { month: 'Mar', avgRating: 4.0, completionRate: 92 },
    { month: 'Apr', avgRating: 4.1, completionRate: 90 },
    { month: 'May', avgRating: 4.0, completionRate: 94 },
    { month: 'Jun', avgRating: 4.2, completionRate: 96 }
  ];

  const topPerformers = [
    { name: 'Sarah Johnson', department: 'Engineering', rating: 4.8, improvement: '+0.3' },
    { name: 'Michael Chen', department: 'Marketing', rating: 4.7, improvement: '+0.2' },
    { name: 'Emily Davis', department: 'Sales', rating: 4.6, improvement: '+0.4' },
    { name: 'David Wilson', department: 'Engineering', rating: 4.5, improvement: '+0.1' },
    { name: 'Lisa Anderson', department: 'HR', rating: 4.4, improvement: '+0.2' }
  ];

  const aiInsights = [
    {
      type: 'trend',
      title: 'Performance Improvement Trend',
      description: 'Overall performance ratings have increased by 8% compared to last quarter, with Engineering showing the highest improvement.',
      impact: 'positive'
    },
    {
      type: 'risk',
      title: 'Attrition Risk Alert',
      description: '3 high-performing employees in Sales department show declining engagement scores, indicating potential attrition risk.',
      impact: 'warning'
    },
    {
      type: 'opportunity',
      title: 'Development Opportunity',
      description: 'Leadership competency scores are consistently lower across all departments, suggesting need for leadership development programs.',
      impact: 'info'
    }
  ];

  const getInsightIcon = (type) => {
    switch (type) {
      case 'trend': return 'TrendingUp';
      case 'risk': return 'AlertTriangle';
      case 'opportunity': return 'Lightbulb';
      default: return 'Info';
    }
  };

  const getInsightColor = (impact) => {
    switch (impact) {
      case 'positive': return 'text-success bg-success/10 border-success/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      case 'info': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Performance Analytics</h2>
        <div className="flex gap-3">
          <Select
            options={periodOptions}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            className="w-48"
          />
          <Select
            options={departmentOptions}
            value={selectedDepartment}
            onChange={setSelectedDepartment}
            className="w-48"
          />
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Performance Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={performanceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {performanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {performanceDistribution.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Department Performance */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Department Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="department" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px'
                  }}
                />
                <Bar dataKey="avgRating" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Trend */}
        <div className="bg-card border border-border rounded-lg p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-foreground mb-4">Performance Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="avgRating" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="completionRate" 
                  stroke="var(--color-success)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Performers & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Top Performers</h3>
            <Button variant="outline" size="sm">
              <Icon name="Award" size={16} className="mr-2" />
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {topPerformers.map((performer, index) => (
              <div key={performer.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary-foreground">
                      {performer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{performer.name}</div>
                    <div className="text-sm text-muted-foreground">{performer.department}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">{performer.rating}</div>
                  <div className="text-sm text-success">{performer.improvement}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
            <Button variant="outline" size="sm">
              <Icon name="Brain" size={16} className="mr-2" />
              More Insights
            </Button>
          </div>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getInsightColor(insight.impact)}`}>
                <div className="flex items-start space-x-3">
                  <Icon name={getInsightIcon(insight.type)} size={20} />
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{insight.title}</h4>
                    <p className="text-sm opacity-90">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;