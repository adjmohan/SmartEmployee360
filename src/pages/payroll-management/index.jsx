import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import AIChatbot from '../../components/ui/AIChatbot';
import PayrollPeriodSelector from './components/PayrollPeriodSelector';
import PayrollFilters from './components/PayrollFilters';
import PayrollSummaryCards from './components/PayrollSummaryCards';
import PayrollToolbar from './components/PayrollToolbar';
import PayrollTable from './components/PayrollTable';
import SalaryTrendChart from './components/SalaryTrendChart';
import PayrollDetailsModal from './components/PayrollDetailsModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PayrollManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-12');
  const [processingStatus, setProcessingStatus] = useState('draft');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    department: 'all',
    employmentType: 'all',
    status: 'all',
    search: ''
  });

  // Mock employee payroll data
  const mockEmployees = [
    {
      id: 1,
      name: 'Sarah Johnson',
      employeeId: 'EMP001',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      employmentType: 'Full-time',
      joinDate: 'Jan 15, 2022',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9a1b8e3?w=150',
      basicPay: 18000,
      allowances: 6000,
      deductions: 3950,
      tax: 5600,
      netPay: 14450,
      status: 'processed'
    },
    {
      id: 2,
      name: 'Michael Chen',
      employeeId: 'EMP002',
      department: 'Marketing',
      position: 'Marketing Manager',
      employmentType: 'Full-time',
      joinDate: 'Mar 10, 2021',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      basicPay: 16000,
      allowances: 5200,
      deductions: 3400,
      tax: 4800,
      netPay: 13000,
      status: 'approved'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      employeeId: 'EMP003',
      department: 'Sales',
      position: 'Sales Director',
      employmentType: 'Full-time',
      joinDate: 'Jun 5, 2020',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      basicPay: 20000,
      allowances: 7500,
      deductions: 4200,
      tax: 6300,
      netPay: 17000,
      status: 'processed'
    },
    {
      id: 4,
      name: 'David Thompson',
      employeeId: 'EMP004',
      department: 'Finance',
      position: 'Financial Analyst',
      employmentType: 'Full-time',
      joinDate: 'Sep 12, 2022',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      basicPay: 14000,
      allowances: 4500,
      deductions: 2800,
      tax: 4200,
      netPay: 11500,
      status: 'pending'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      employeeId: 'EMP005',
      department: 'HR',
      position: 'HR Manager',
      employmentType: 'Full-time',
      joinDate: 'Feb 20, 2021',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      basicPay: 15000,
      allowances: 4800,
      deductions: 3100,
      tax: 4500,
      netPay: 12200,
      status: 'error'
    },
    {
      id: 6,
      name: 'James Wilson',
      employeeId: 'EMP006',
      department: 'Operations',
      position: 'Operations Manager',
      employmentType: 'Full-time',
      joinDate: 'Nov 8, 2019',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      basicPay: 17000,
      allowances: 5500,
      deductions: 3600,
      tax: 5100,
      netPay: 13800,
      status: 'processed'
    }
  ];

  // Filter employees based on current filters
  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesDepartment = filters.department === 'all' || employee.department.toLowerCase() === filters.department;
    const matchesEmploymentType = filters.employmentType === 'all' || employee.employmentType.toLowerCase().replace('-', '') === filters.employmentType.replace('-', '');
    const matchesStatus = filters.status === 'all' || employee.status === filters.status;
    const matchesSearch = filters.search === '' || 
      employee.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesDepartment && matchesEmploymentType && matchesStatus && matchesSearch;
  });

  // Calculate summary data
  const summaryData = {
    totalPayroll: filteredEmployees.reduce((sum, emp) => sum + emp.netPay, 0),
    processedEmployees: filteredEmployees.filter(emp => emp.status === 'processed').length,
    totalEmployees: filteredEmployees.length,
    averageSalary: Math.round(filteredEmployees.reduce((sum, emp) => sum + emp.netPay, 0) / filteredEmployees.length),
    totalTax: filteredEmployees.reduce((sum, emp) => sum + emp.tax, 0)
  };

  const handleProcessPayroll = async () => {
    setProcessingStatus('processing');
    // Simulate processing time
    setTimeout(() => {
      setProcessingStatus('completed');
    }, 3000);
  };

  const handleBulkAdjustment = () => {
    console.log('Opening bulk adjustment modal...');
  };

  const handleExport = (format) => {
    console.log(`Exporting payroll data in ${format} format...`);
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setIsDetailsModalOpen(true);
  };

  const handleGenerateSlip = (employee) => {
    console.log(`Generating salary slip for ${employee.name}...`);
  };

  const handleBulkAction = (action, employeeIds) => {
    console.log(`Performing ${action} on employees:`, employeeIds);
  };

  const handleSaveEmployeeDetails = (updatedEmployee) => {
    console.log('Saving employee details:', updatedEmployee);
    setIsDetailsModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Payroll Management - SmartEmployee360</title>
        <meta name="description" content="Comprehensive payroll processing with automated calculations, tax compliance, and salary trend analysis" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Navigation />
        
        <div className="flex">
          {/* Left Sidebar */}
          <div className="hidden lg:block w-80 bg-card border-r border-border p-6 space-y-6 min-h-screen">
            <PayrollPeriodSelector
              selectedPeriod={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
              processingStatus={processingStatus}
            />
            
            <PayrollFilters
              filters={filters}
              onFiltersChange={setFilters}
            />

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Icon name="Calculator" size={14} className="mr-2" />
                  Tax Calculator
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Icon name="FileText" size={14} className="mr-2" />
                  Bulk Slip Generation
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Icon name="Settings" size={14} className="mr-2" />
                  Payroll Settings
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Icon name="History" size={14} className="mr-2" />
                  Audit Trail
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
              <span>Dashboard</span>
              <Icon name="ChevronRight" size={14} />
              <span className="text-foreground font-medium">Payroll Management</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Payroll Management</h1>
                <p className="text-muted-foreground">
                  Process payroll, manage deductions, and analyze salary trends
                </p>
              </div>
              
              {/* Mobile Filters Toggle */}
              <div className="lg:hidden mt-4">
                <Button variant="outline">
                  <Icon name="Filter" size={16} className="mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Summary Cards */}
            <PayrollSummaryCards summaryData={summaryData} />

            {/* Toolbar */}
            <PayrollToolbar
              onProcessPayroll={handleProcessPayroll}
              onBulkAdjustment={handleBulkAdjustment}
              onExport={handleExport}
              processingStatus={processingStatus}
            />

            {/* Main Table */}
            <div className="mb-6">
              <PayrollTable
                employees={filteredEmployees}
                onViewDetails={handleViewDetails}
                onGenerateSlip={handleGenerateSlip}
                onBulkAction={handleBulkAction}
              />
            </div>

            {/* Salary Trend Chart */}
            <SalaryTrendChart />
          </div>
        </div>

        {/* Modals */}
        <PayrollDetailsModal
          employee={selectedEmployee}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          onSave={handleSaveEmployeeDetails}
        />

        {/* AI Chatbot */}
        <AIChatbot />
      </div>
    </>
  );
};

export default PayrollManagement;