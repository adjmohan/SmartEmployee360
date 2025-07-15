import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EmployeeReviewTable = ({ employees, onStartReview, onViewReview }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'not_started', label: 'Not Started' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      not_started: { color: 'bg-muted text-muted-foreground', label: 'Not Started' },
      in_progress: { color: 'bg-warning text-warning-foreground', label: 'In Progress' },
      completed: { color: 'bg-success text-success-foreground', label: 'Completed' },
      overdue: { color: 'bg-error text-error-foreground', label: 'Overdue' }
    };
    
    const config = statusConfig[status] || statusConfig.not_started;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getRatingDisplay = (rating) => {
    if (!rating) return <span className="text-muted-foreground">-</span>;
    
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name="Star"
          size={16}
          className={i <= rating ? 'text-warning fill-current' : 'text-muted'}
        />
      );
    }
    
    return (
      <div className="flex items-center space-x-1">
        <div className="flex">{stars}</div>
        <span className="text-sm font-medium text-foreground ml-2">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />;
    }
    return sortConfig.direction === 'asc' 
      ? <Icon name="ArrowUp" size={16} className="text-primary" />
      : <Icon name="ArrowDown" size={16} className="text-primary" />;
  };

  const filteredAndSortedEmployees = React.useMemo(() => {
    let filtered = employees.filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || employee.reviewStatus === statusFilter;
      const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
      
      return matchesSearch && matchesStatus && matchesDepartment;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        if (sortConfig.key === 'rating') {
          aValue = aValue || 0;
          bValue = bValue || 0;
        }
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [employees, searchTerm, statusFilter, departmentFilter, sortConfig]);

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Filters */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-4">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Filter by status"
              className="w-48"
            />
            <Select
              options={departmentOptions}
              value={departmentFilter}
              onChange={setDepartmentFilter}
              placeholder="Filter by department"
              className="w-48"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Employee</span>
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('department')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Department</span>
                  {getSortIcon('department')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Manager</th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('reviewStatus')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Status</span>
                  {getSortIcon('reviewStatus')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('dueDate')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Due Date</span>
                  {getSortIcon('dueDate')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('rating')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Rating</span>
                  {getSortIcon('rating')}
                </button>
              </th>
              <th className="text-right p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedEmployees.map((employee) => (
              <tr key={employee.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-foreground">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{employee.name}</div>
                      <div className="text-sm text-muted-foreground">{employee.employeeId}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-foreground">{employee.department}</span>
                </td>
                <td className="p-4">
                  <span className="text-foreground">{employee.manager}</span>
                </td>
                <td className="p-4">
                  {getStatusBadge(employee.reviewStatus)}
                </td>
                <td className="p-4">
                  <span className="text-foreground">{employee.dueDate}</span>
                </td>
                <td className="p-4">
                  {getRatingDisplay(employee.rating)}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    {employee.reviewStatus === 'completed' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewReview(employee.id)}
                      >
                        <Icon name="Eye" size={16} className="mr-2" />
                        View
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => onStartReview(employee.id)}
                      >
                        <Icon name="Play" size={16} className="mr-2" />
                        {employee.reviewStatus === 'in_progress' ? 'Continue' : 'Start'}
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedEmployees.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No employees found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeReviewTable;