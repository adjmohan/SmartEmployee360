import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmployeeFilters = ({ onFilterChange, onClearFilters }) => {
  const [filters, setFilters] = useState({
    department: '',
    location: '',
    employmentType: '',
    status: '',
    dateRange: '',
    searchTerm: ''
  });

  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'new-york', label: 'New York' },
    { value: 'san-francisco', label: 'San Francisco' },
    { value: 'chicago', label: 'Chicago' },
    { value: 'austin', label: 'Austin' },
    { value: 'remote', label: 'Remote' }
  ];

  const employmentTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'intern', label: 'Intern' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'on-leave', label: 'On Leave' },
    { value: 'terminated', label: 'Terminated' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'last-year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      department: '',
      location: '',
      employmentType: '',
      status: '',
      dateRange: '',
      searchTerm: ''
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="w-80 bg-card border-r border-border p-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={16} className="mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <Input
            label="Search Employees"
            type="search"
            placeholder="Search by name, ID, or email..."
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            className="mb-4"
          />
        </div>

        {/* Department Filter */}
        <div>
          <Select
            label="Department"
            options={departmentOptions}
            value={filters.department}
            onChange={(value) => handleFilterChange('department', value)}
            className="mb-4"
          />
        </div>

        {/* Location Filter */}
        <div>
          <Select
            label="Location"
            options={locationOptions}
            value={filters.location}
            onChange={(value) => handleFilterChange('location', value)}
            className="mb-4"
          />
        </div>

        {/* Employment Type Filter */}
        <div>
          <Select
            label="Employment Type"
            options={employmentTypeOptions}
            value={filters.employmentType}
            onChange={(value) => handleFilterChange('employmentType', value)}
            className="mb-4"
          />
        </div>

        {/* Status Filter */}
        <div>
          <Select
            label="Status"
            options={statusOptions}
            value={filters.status}
            onChange={(value) => handleFilterChange('status', value)}
            className="mb-4"
          />
        </div>

        {/* Date Range Filter */}
        <div>
          <Select
            label="Hire Date"
            options={dateRangeOptions}
            value={filters.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
            className="mb-4"
          />
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-foreground mb-3">Active Filters</h4>
            <div className="space-y-2">
              {Object.entries(filters).map(([key, value]) => {
                if (!value) return null;
                
                const getFilterLabel = (key, value) => {
                  switch (key) {
                    case 'department':
                      return departmentOptions.find(opt => opt.value === value)?.label || value;
                    case 'location':
                      return locationOptions.find(opt => opt.value === value)?.label || value;
                    case 'employmentType':
                      return employmentTypeOptions.find(opt => opt.value === value)?.label || value;
                    case 'status':
                      return statusOptions.find(opt => opt.value === value)?.label || value;
                    case 'dateRange':
                      return dateRangeOptions.find(opt => opt.value === value)?.label || value;
                    case 'searchTerm':
                      return `"${value}"`;
                    default:
                      return value;
                  }
                };

                return (
                  <div
                    key={key}
                    className="flex items-center justify-between bg-muted px-3 py-2 rounded-md"
                  >
                    <span className="text-xs text-muted-foreground">
                      {getFilterLabel(key, value)}
                    </span>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleFilterChange(key, '')}
                      className="h-4 w-4 p-0 hover:bg-background"
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeFilters;