import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const PayrollFilters = ({ filters, onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' }
  ];

  const employmentTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'intern', label: 'Intern' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'processed', label: 'Processed' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'error', label: 'Error' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      department: 'all',
      employmentType: 'all',
      status: 'all',
      search: ''
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value && value !== 'all' && value !== ''
  ).length;

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-foreground">Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
        </Button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          <Input
            type="search"
            placeholder="Search employees..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />

          <Select
            label="Department"
            options={departmentOptions}
            value={filters.department}
            onChange={(value) => handleFilterChange('department', value)}
          />

          <Select
            label="Employment Type"
            options={employmentTypeOptions}
            value={filters.employmentType}
            onChange={(value) => handleFilterChange('employmentType', value)}
          />

          <Select
            label="Processing Status"
            options={statusOptions}
            value={filters.status}
            onChange={(value) => handleFilterChange('status', value)}
          />

          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              disabled={activeFiltersCount === 0}
              className="flex-1"
            >
              <Icon name="X" size={14} className="mr-1" />
              Clear
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex-1"
            >
              <Icon name="Filter" size={14} className="mr-1" />
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollFilters;