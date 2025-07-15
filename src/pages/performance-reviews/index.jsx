import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import AIChatbot from '../../components/ui/AIChatbot';
import ReviewCycleCard from './components/ReviewCycleCard';
import PerformanceMetricsCard from './components/PerformanceMetricsCard';
import EmployeeReviewTable from './components/EmployeeReviewTable';
import ReviewModal from './components/ReviewModal';
import PerformanceAnalytics from './components/PerformanceAnalytics';
import ReviewSidebar from './components/ReviewSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PerformanceReviews = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Mock data for review cycles
  const reviewCycles = [
    {
      id: 1,
      name: 'Q4 2024 Performance Reviews',
      period: 'October - December 2024',
      status: 'active',
      totalReviews: 135,
      completedReviews: 87,
      pendingReviews: 43,
      overdueReviews: 5,
      dueDate: 'Dec 31, 2024'
    },
    {
      id: 2,
      name: 'Annual Performance Reviews 2024',
      period: 'January - December 2024',
      status: 'upcoming',
      totalReviews: 135,
      completedReviews: 0,
      pendingReviews: 135,
      overdueReviews: 0,
      dueDate: 'Jan 15, 2025'
    },
    {
      id: 3,
      name: 'Mid-Year Reviews 2024',
      period: 'January - June 2024',
      status: 'completed',
      totalReviews: 128,
      completedReviews: 128,
      pendingReviews: 0,
      overdueReviews: 0,
      dueDate: 'Jul 15, 2024'
    }
  ];

  // Mock data for performance metrics
  const performanceMetrics = [
    {
      title: 'Total Reviews',
      value: '135',
      change: 8,
      icon: 'FileText',
      color: 'primary'
    },
    {
      title: 'Completed Reviews',
      value: '87',
      change: 12,
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      title: 'Average Rating',
      value: '4.2',
      change: 5,
      icon: 'Star',
      color: 'warning'
    },
    {
      title: 'Overdue Reviews',
      value: '5',
      change: -15,
      icon: 'AlertTriangle',
      color: 'error'
    }
  ];

  // Mock data for employees
  const employees = [
    {
      id: 1,
      name: 'Sarah Johnson',
      employeeId: 'EMP001',
      department: 'Engineering',
      manager: 'John Smith',
      reviewStatus: 'completed',
      dueDate: 'Dec 15, 2024',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Michael Chen',
      employeeId: 'EMP002',
      department: 'Marketing',
      manager: 'Lisa Anderson',
      reviewStatus: 'in_progress',
      dueDate: 'Dec 20, 2024',
      rating: null
    },
    {
      id: 3,
      name: 'Emily Davis',
      employeeId: 'EMP003',
      department: 'Sales',
      manager: 'David Wilson',
      reviewStatus: 'overdue',
      dueDate: 'Dec 10, 2024',
      rating: null
    },
    {
      id: 4,
      name: 'David Wilson',
      employeeId: 'EMP004',
      department: 'Engineering',
      manager: 'John Smith',
      reviewStatus: 'completed',
      dueDate: 'Dec 12, 2024',
      rating: 4.2
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      employeeId: 'EMP005',
      department: 'Human Resources',
      manager: 'Robert Brown',
      reviewStatus: 'not_started',
      dueDate: 'Dec 25, 2024',
      rating: null
    },
    {
      id: 6,
      name: 'Robert Brown',
      employeeId: 'EMP006',
      department: 'Finance',
      manager: 'Maria Garcia',
      reviewStatus: 'completed',
      dueDate: 'Dec 18, 2024',
      rating: 3.8
    },
    {
      id: 7,
      name: 'Maria Garcia',
      employeeId: 'EMP007',
      department: 'Finance',
      manager: 'Robert Brown',
      reviewStatus: 'in_progress',
      dueDate: 'Dec 22, 2024',
      rating: null
    },
    {
      id: 8,
      name: 'James Wilson',
      employeeId: 'EMP008',
      department: 'Engineering',
      manager: 'John Smith',
      reviewStatus: 'not_started',
      dueDate: 'Dec 28, 2024',
      rating: null
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'reviews', label: 'Reviews', icon: 'FileText' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  const handleViewCycleDetails = (cycleId) => {
    console.log('View cycle details:', cycleId);
  };

  const handleManageCycle = (cycleId) => {
    console.log('Manage cycle:', cycleId);
  };

  const handleStartReview = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    setSelectedEmployee(employee);
    setIsReviewModalOpen(true);
  };

  const handleViewReview = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    setSelectedEmployee(employee);
    setIsReviewModalOpen(true);
  };

  const handleSaveReview = (reviewData) => {
    console.log('Save review:', reviewData);
    // Handle review save logic here
  };

  const handleCreateCycle = () => {
    console.log('Create new review cycle');
  };

  const handleManageTemplates = () => {
    console.log('Manage review templates');
  };

  const handleExportData = () => {
    console.log('Export review data');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {performanceMetrics.map((metric, index) => (
                <PerformanceMetricsCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  icon={metric.icon}
                  color={metric.color}
                />
              ))}
            </div>

            {/* Review Cycles */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Review Cycles</h2>
                <Button onClick={handleCreateCycle}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Create New Cycle
                </Button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {reviewCycles.map((cycle) => (
                  <ReviewCycleCard
                    key={cycle.id}
                    cycle={cycle}
                    onViewDetails={handleViewCycleDetails}
                    onManageCycle={handleManageCycle}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Employee Reviews</h2>
              <div className="flex space-x-3">
                <Button variant="outline">
                  <Icon name="Filter" size={16} className="mr-2" />
                  Advanced Filters
                </Button>
                <Button variant="outline">
                  <Icon name="Download" size={16} className="mr-2" />
                  Export Reviews
                </Button>
              </div>
            </div>
            <EmployeeReviewTable
              employees={employees}
              onStartReview={handleStartReview}
              onViewReview={handleViewReview}
            />
          </div>
        );

      case 'analytics':
        return <PerformanceAnalytics />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <div className="flex">
        {/* Sidebar */}
        {isSidebarOpen && (
          <ReviewSidebar
            onCreateCycle={handleCreateCycle}
            onManageTemplates={handleManageTemplates}
            onExportData={handleExportData}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <Icon name={isSidebarOpen ? 'PanelLeftClose' : 'PanelLeftOpen'} size={20} />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Performance Reviews</h1>
                  <p className="text-muted-foreground">Manage employee evaluations and performance tracking</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline">
                  <Icon name="Settings" size={16} className="mr-2" />
                  Settings
                </Button>
                <Button>
                  <Icon name="Plus" size={16} className="mr-2" />
                  New Review
                </Button>
              </div>
            </div>

            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
              <span>Dashboard</span>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground">Performance Reviews</span>
            </nav>

            {/* Tabs */}
            <div className="border-b border-border mb-6">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        employee={selectedEmployee}
        onSave={handleSaveReview}
      />

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default PerformanceReviews;