import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const EmployeeAttendanceProfile = ({ employee, onClose, onSaveChanges }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for charts
  const attendanceTrend = [
    { month: 'Jan', attendance: 95, hours: 168 },
    { month: 'Feb', attendance: 92, hours: 160 },
    { month: 'Mar', attendance: 98, hours: 172 },
    { month: 'Apr', attendance: 89, hours: 156 },
    { month: 'May', attendance: 94, hours: 165 },
    { month: 'Jun', attendance: 96, hours: 170 }
  ];

  const weeklyPattern = [
    { day: 'Mon', avgCheckIn: '09:15', avgCheckOut: '18:30', hours: 9.25 },
    { day: 'Tue', avgCheckIn: '09:05', avgCheckOut: '18:45', hours: 9.67 },
    { day: 'Wed', avgCheckIn: '09:20', avgCheckOut: '18:15', hours: 8.92 },
    { day: 'Thu', avgCheckIn: '09:10', avgCheckOut: '18:40', hours: 9.5 },
    { day: 'Fri', avgCheckIn: '09:25', avgCheckOut: '18:00', hours: 8.58 }
  ];

  const recentActivity = [
    {
      date: '2025-01-14',
      checkIn: '09:15',
      checkOut: '18:30',
      status: 'present',
      hours: 9.25,
      notes: 'Regular day'
    },
    {
      date: '2025-01-13',
      checkIn: '09:45',
      checkOut: '18:15',
      status: 'late',
      hours: 8.5,
      notes: 'Traffic delay'
    },
    {
      date: '2025-01-12',
      checkIn: '-',
      checkOut: '-',
      status: 'leave',
      hours: 0,
      notes: 'Sick leave'
    },
    {
      date: '2025-01-11',
      checkIn: '09:00',
      checkOut: '18:45',
      status: 'present',
      hours: 9.75,
      notes: 'Overtime work'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      present: { color: 'bg-success/10 text-success border-success/20', icon: 'CheckCircle' },
      absent: { color: 'bg-error/10 text-error border-error/20', icon: 'XCircle' },
      late: { color: 'bg-warning/10 text-warning border-warning/20', icon: 'Clock' },
      leave: { color: 'bg-secondary/10 text-secondary border-secondary/20', icon: 'Calendar' }
    };

    const config = statusConfig[status] || statusConfig.absent;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        <Icon name={config.icon} size={12} className="mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'trends', label: 'Trends', icon: 'TrendingUp' },
    { id: 'patterns', label: 'Patterns', icon: 'Calendar' },
    { id: 'history', label: 'History', icon: 'Clock' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={32} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">{employee.name}</h2>
                <p className="text-muted-foreground">{employee.id} • {employee.department}</p>
                <p className="text-sm text-muted-foreground">{employee.position}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 py-4 px-2 border-b-2 transition-all duration-200
                  ${activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-primary/50'
                  }
                `}
              >
                <Icon name={tab.icon} size={16} />
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Calendar" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">This Month</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">22/23</p>
                  <p className="text-xs text-muted-foreground">Days Present</p>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Clock" size={16} className="text-success" />
                    <span className="text-sm font-medium text-foreground">Avg Hours</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">8.5h</p>
                  <p className="text-xs text-muted-foreground">Per Day</p>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="AlertTriangle" size={16} className="text-warning" />
                    <span className="text-sm font-medium text-foreground">Late Marks</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-xs text-muted-foreground">This Month</p>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="TrendingUp" size={16} className="text-accent" />
                    <span className="text-sm font-medium text-foreground">Performance</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">96%</p>
                  <p className="text-xs text-muted-foreground">Attendance Rate</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.slice(0, 5).map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-foreground">
                          {new Date(activity.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        {getStatusBadge(activity.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{activity.checkIn} - {activity.checkOut}</span>
                        <span>{activity.hours}h</span>
                        <span>{activity.notes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Attendance Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={attendanceTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="attendance" 
                        stroke="var(--color-primary)" 
                        strokeWidth={2}
                        dot={{ fill: 'var(--color-primary)' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Hours</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={attendanceTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="hours" fill="var(--color-accent)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'patterns' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Pattern</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 text-sm font-medium text-foreground">Day</th>
                        <th className="text-left p-3 text-sm font-medium text-foreground">Avg Check-in</th>
                        <th className="text-left p-3 text-sm font-medium text-foreground">Avg Check-out</th>
                        <th className="text-left p-3 text-sm font-medium text-foreground">Avg Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weeklyPattern.map((day, index) => (
                        <tr key={index} className="border-b border-border hover:bg-muted/30">
                          <td className="p-3 text-sm font-medium text-foreground">{day.day}</td>
                          <td className="p-3 text-sm text-foreground">{day.avgCheckIn}</td>
                          <td className="p-3 text-sm text-foreground">{day.avgCheckOut}</td>
                          <td className="p-3 text-sm text-foreground">{day.hours}h</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Attendance History</h3>
                <div className="space-y-2">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-foreground">
                          {new Date(activity.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        {getStatusBadge(activity.status)}
                      </div>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <p className="text-muted-foreground">Check-in</p>
                          <p className="font-medium text-foreground">{activity.checkIn}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">Check-out</p>
                          <p className="font-medium text-foreground">{activity.checkOut}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">Hours</p>
                          <p className="font-medium text-foreground">{activity.hours}h</p>
                        </div>
                        <div className="text-center min-w-[120px]">
                          <p className="text-muted-foreground">Notes</p>
                          <p className="font-medium text-foreground">{activity.notes}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => onSaveChanges(employee)}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendanceProfile;