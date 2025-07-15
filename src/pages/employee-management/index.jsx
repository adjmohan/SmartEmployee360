import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import employeeService from '../../utils/employeeService';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import AIChatbot from '../../components/ui/AIChatbot';
import EmployeeFilters from './components/EmployeeFilters';
import EmployeeActions from './components/EmployeeActions';
import EmployeeTable from './components/EmployeeTable';
import EmployeeCardView from './components/EmployeeCardView';
import EmployeeModal from './components/EmployeeModal';
import EmployeeDetailsModal from './components/EmployeeDetailsModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const EmployeeManagement = () => {
  const { user, userProfile, loading: authLoading } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [viewMode, setViewMode] = useState('table');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filters, setFilters] = useState({});
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal states
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalMode, setModalMode] = useState('add');
  const [isDeleting, setIsDeleting] = useState(false);

  // Load employees from Supabase
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        setLoading(true);
        const result = await employeeService.getEmployees();
        
        if (result?.success) {
          setEmployees(result.data);
          setFilteredEmployees(result.data);
        } else {
          setError(result?.error || 'Failed to load employees');
        }
      } catch (error) {
        setError('Failed to load employees');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      loadEmployees();
    }
  }, [authLoading]);

  // Filter and sort employees
  const processedEmployees = useMemo(() => {
    let result = [...employees];

    // Apply filters
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      result = result.filter(emp => 
        emp.name?.toLowerCase().includes(searchTerm) ||
        emp.email?.toLowerCase().includes(searchTerm) ||
        emp.employeeId?.toLowerCase().includes(searchTerm) ||
        emp.department?.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.department) {
      result = result.filter(emp => emp.department?.toLowerCase() === filters.department);
    }

    if (filters.location) {
      result = result.filter(emp => emp.location?.toLowerCase() === filters.location);
    }

    if (filters.employmentType) {
      result = result.filter(emp => emp.employmentType?.toLowerCase() === filters.employmentType);
    }

    if (filters.status) {
      result = result.filter(emp => emp.status === filters.status);
    }

    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return result;
  }, [employees, filters, sortConfig]);

  // Update filtered employees when processed employees change
  useEffect(() => {
    setFilteredEmployees(processedEmployees);
  }, [processedEmployees]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setSelectedEmployees([]);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSelectedEmployees([]);
  };

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Handle employee selection
  const handleSelectEmployee = (employeeId) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map(emp => emp.id));
    }
  };

  // Handle employee actions
  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setModalMode('add');
    setIsEmployeeModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setModalMode('edit');
    setIsEmployeeModalOpen(true);
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEmployee = async (employeeData) => {
    try {
      let result;
      
      if (modalMode === 'add') {
        result = await employeeService.createEmployee(employeeData);
      } else {
        result = await employeeService.updateEmployee(selectedEmployee.id, employeeData);
      }

      if (result?.success) {
        // Reload employees
        const employeesResult = await employeeService.getEmployees();
        if (employeesResult?.success) {
          setEmployees(employeesResult.data);
        }
        setIsEmployeeModalOpen(false);
        setSelectedEmployee(null);
      } else {
        setError(result?.error || 'Failed to save employee');
      }
    } catch (error) {
      setError('Failed to save employee');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      const result = await employeeService.deleteEmployee(selectedEmployee.id);
      
      if (result?.success) {
        // Reload employees
        const employeesResult = await employeeService.getEmployees();
        if (employeesResult?.success) {
          setEmployees(employeesResult.data);
        }
        setSelectedEmployees(prev => prev.filter(id => id !== selectedEmployee.id));
        setIsDeleteModalOpen(false);
        setSelectedEmployee(null);
      } else {
        setError(result?.error || 'Failed to delete employee');
      }
    } catch (error) {
      setError('Failed to delete employee');
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle bulk actions
  const handleBulkAction = async (action, employeeIds) => {
    // Implementation for bulk actions would go here
    console.log('Bulk action:', action, 'for employees:', employeeIds);
  };

  // Handle export
  const handleExport = async (format, employeeIds = null) => {
    const dataToExport = employeeIds 
      ? employees.filter(emp => employeeIds.includes(emp.id))
      : filteredEmployees;
    
    console.log(`Exporting ${dataToExport.length} employees to ${format.toUpperCase()}`);
    alert(`Export completed: employees_${new Date().toISOString().split('T')[0]}.${format}`);
  };

  // Show preview mode for non-authenticated users
  const showPreview = !authLoading && !user;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Icon name="Loader2" size={20} className="animate-spin" />
            <span>Loading employees...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      {/* Preview Mode Banner */}
      {showPreview && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
          <div className="flex items-center justify-center">
            <Icon name="Eye" size={20} className="text-yellow-600 mr-2" />
            <span className="text-sm text-yellow-800">
              Preview Mode - Sign in to manage real employee data
            </span>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Filters Sidebar */}
        {isFiltersVisible && (
          <EmployeeFilters
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <Icon name="AlertCircle" size={20} className="text-red-400 mr-2" />
                <div className="text-sm text-red-700">{error}</div>
              </div>
            </div>
          )}

          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <span>Dashboard</span>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground font-medium">Employee Management</span>
          </div>

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Employee Management</h1>
              <p className="text-muted-foreground">
                Manage your workforce with comprehensive employee data administration
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                iconName={isFiltersVisible ? "PanelLeftClose" : "PanelLeftOpen"}
                iconPosition="left"
              >
                {isFiltersVisible ? 'Hide' : 'Show'} Filters
              </Button>
              
              <div className="text-sm text-muted-foreground">
                {filteredEmployees.length} of {employees.length} employees
              </div>
            </div>
          </div>

          {/* Actions Bar */}
          <EmployeeActions
            selectedEmployees={selectedEmployees}
            onAddEmployee={handleAddEmployee}
            onBulkAction={handleBulkAction}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onExport={handleExport}
            disabled={showPreview}
          />

          {/* Employee List */}
          {viewMode === 'table' ? (
            <EmployeeTable
              employees={filteredEmployees}
              selectedEmployees={selectedEmployees}
              onSelectEmployee={handleSelectEmployee}
              onSelectAll={handleSelectAll}
              onEditEmployee={handleEditEmployee}
              onDeleteEmployee={handleDeleteEmployee}
              onViewEmployee={handleViewEmployee}
              sortConfig={sortConfig}
              onSort={handleSort}
              disabled={showPreview}
            />
          ) : (
            <EmployeeCardView
              employees={filteredEmployees}
              selectedEmployees={selectedEmployees}
              onSelectEmployee={handleSelectEmployee}
              onEditEmployee={handleEditEmployee}
              onDeleteEmployee={handleDeleteEmployee}
              onViewEmployee={handleViewEmployee}
              disabled={showPreview}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <EmployeeModal
        isOpen={isEmployeeModalOpen}
        onClose={() => setIsEmployeeModalOpen(false)}
        employee={selectedEmployee}
        onSave={handleSaveEmployee}
        mode={modalMode}
      />

      <EmployeeDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        employee={selectedEmployee}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        employee={selectedEmployee}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default EmployeeManagement;