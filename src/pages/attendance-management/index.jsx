import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import AIChatbot from '../../components/ui/AIChatbot';
import AttendanceStats from './components/AttendanceStats';
import AttendanceCalendar from './components/AttendanceCalendar';
import AttendanceTable from './components/AttendanceTable';
import AttendanceFilters from './components/AttendanceFilters';
import AnomalyDetectionPanel from './components/AnomalyDetectionPanel';
import EmployeeAttendanceProfile from './components/EmployeeAttendanceProfile';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AttendanceManagement = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filters, setFilters] = useState({
    department: 'all',
    status: 'all',
    dateRange: { start: '', end: '' },
    searchTerm: ''
  });

  // Mock data
  const attendanceStats = {
    totalEmployees: 245,
    presentToday: 198,
    absentToday: 12,
    lateArrivals: 8,
    onLeave: 27,
    attendanceRate: 88.5
  };

  const departments = [
    { id: 'engineering', name: 'Engineering' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'sales', name: 'Sales' },
    { id: 'hr', name: 'Human Resources' },
    { id: 'finance', name: 'Finance' }
  ];

  const attendanceData = {
    '2025-01-15': 'present',
    '2025-01-14': 'present',
    '2025-01-13': 'late',
    '2025-01-12': 'leave',
    '2025-01-11': 'present',
    '2025-01-10': 'absent',
    '2025-01-09': 'present',
    '2025-01-08': 'present',
    '2025-01-07': 'present',
    '2025-01-06': 'holiday'
  };

  const attendanceRecords = [
    {
      id: 1,
      employeeName: 'John Smith',
      employeeId: 'EMP001',
      department: 'Engineering',
      date: '2025-01-15',
      checkIn: '09:15',
      checkOut: '18:30',
      status: 'present',
      lateMarks: 0,
      totalHours: 9.25
    },
    {
      id: 2,
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP002',
      department: 'Marketing',
      date: '2025-01-15',
      checkIn: '09:45',
      checkOut: '18:15',
      status: 'late',
      lateMarks: 1,
      totalHours: 8.5
    },
    {
      id: 3,
      employeeName: 'Michael Brown',
      employeeId: 'EMP003',
      department: 'Sales',
      date: '2025-01-15',
      checkIn: null,
      checkOut: null,
      status: 'leave',
      lateMarks: 0,
      totalHours: 0
    },
    {
      id: 4,
      employeeName: 'Emily Davis',
      employeeId: 'EMP004',
      department: 'HR',
      date: '2025-01-15',
      checkIn: '09:00',
      checkOut: '18:45',
      status: 'present',
      lateMarks: 0,
      totalHours: 9.75
    },
    {
      id: 5,
      employeeName: 'David Wilson',
      employeeId: 'EMP005',
      department: 'Finance',
      date: '2025-01-15',
      checkIn: null,
      checkOut: null,
      status: 'absent',
      lateMarks: 0,
      totalHours: 0
    }
  ];

  const anomalies = [
    {
      id: 1,
      type: 'suspicious_timing',
      employeeName: 'Alex Rodriguez',
      date: '2025-01-15',
      time: '02:30 AM',
      confidence: 85,
      description: 'Unusual check-in time detected outside normal working hours',
      algorithm: 'Time Pattern Analysis',
      firstDetected: '2025-01-15T02:30:00Z',
      recommendations: [
        'Verify employee location during check-in',
        'Review security footage if available',
        'Contact employee for explanation'
      ],
      relatedIncidents: [
        {
          description: 'Similar pattern detected last week',
          date: '2025-01-08'
        }
      ]
    },
    {
      id: 2,
      type: 'location_mismatch',
      employeeName: 'Lisa Chen',
      date: '2025-01-14',
      time: '09:15 AM',
      confidence: 72,
      description: 'Check-in location differs significantly from usual pattern',
      algorithm: 'Geolocation Anomaly Detection',
      firstDetected: '2025-01-14T09:15:00Z',
      recommendations: [
        'Verify employee work location',
        'Check for authorized remote work',
        'Update location permissions if needed'
      ],
      relatedIncidents: []
    },
    {
      id: 3,
      type: 'unusual_pattern',
      employeeName: 'Robert Taylor',
      date: '2025-01-13',
      time: '11:45 PM',
      confidence: 68,
      description: 'Consecutive late check-outs beyond normal overtime patterns',
      algorithm: 'Behavioral Pattern Analysis',
      firstDetected: '2025-01-13T23:45:00Z',
      recommendations: [
        'Review workload distribution',
        'Check for unauthorized overtime',
        'Discuss work-life balance with employee'
      ],
      relatedIncidents: [
        {
          description: 'Extended hours pattern for 5 consecutive days',
          date: '2025-01-09'
        }
      ]
    }
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleDateRangeChange = (dateRange) => {
    setFilters(prev => ({ ...prev, dateRange }));
  };

  const handleEditRecord = (record) => {
    const employee = {
      id: record.employeeId,
      name: record.employeeName,
      department: record.department,
      position: 'Software Engineer' // Mock position
    };
    setSelectedEmployee(employee);
  };

  const handleBulkAction = (action, recordIds) => {
    console.log(`Performing ${action} on records:`, recordIds);
    // Implement bulk action logic here
  };

  const handleExport = (format, currentFilters) => {
    console.log(`Exporting to ${format} with filters:`, currentFilters);
    // Implement export logic here
  };

  const handleBulkImport = () => {
    console.log('Opening bulk import dialog');
    // Implement bulk import logic here
  };

  const handleInvestigateAnomaly = (anomaly) => {
    console.log('Investigating anomaly:', anomaly);
    // Implement investigation logic here
  };

  const handleDismissAnomaly = (anomalyId) => {
    console.log('Dismissing anomaly:', anomalyId);
    // Implement dismiss logic here
  };

  const handleSaveEmployeeChanges = (employee) => {
    console.log('Saving changes for employee:', employee);
    setSelectedEmployee(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <main className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
            <p className="text-muted-foreground mt-2">
              Track and analyze employee attendance patterns with AI-powered insights
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Icon name="Calendar" size={16} className="mr-2" />
              Schedule Report
            </Button>
            <Button>
              <Icon name="Plus" size={16} className="mr-2" />
              Manual Entry
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mb-8">
          <AttendanceStats stats={attendanceStats} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Calendar */}
          <div className="xl:col-span-1">
            <AttendanceCalendar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              attendanceData={attendanceData}
            />
          </div>

          {/* Anomaly Detection */}
          <div className="xl:col-span-2">
            <AnomalyDetectionPanel
              anomalies={anomalies}
              onInvestigate={handleInvestigateAnomaly}
              onDismiss={handleDismissAnomaly}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <AttendanceFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onDateRangeChange={handleDateRangeChange}
            onExport={handleExport}
            onBulkImport={handleBulkImport}
            departments={departments}
          />
        </div>

        {/* Attendance Table */}
        <div className="mb-8">
          <AttendanceTable
            attendanceRecords={attendanceRecords}
            onEditRecord={handleEditRecord}
            onBulkAction={handleBulkAction}
          />
        </div>

        {/* Employee Profile Modal */}
        {selectedEmployee && (
          <EmployeeAttendanceProfile
            employee={selectedEmployee}
            onClose={() => setSelectedEmployee(null)}
            onSaveChanges={handleSaveEmployeeChanges}
          />
        )}
      </main>

      <AIChatbot />
    </div>
  );
};

export default AttendanceManagement;