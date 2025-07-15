import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AttendanceFilters = ({ 
  filters, 
  onFilterChange, 
  onDateRangeChange, 
  onExport, 
  onBulkImport,
  departments 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'present', label: 'Present' },
    { value: 'absent', label: 'Absent' },
    { value: 'late', label: 'Late' },
    { value: 'leave', label: 'On Leave' },
    { value: 'holiday', label: 'Holiday' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    ...departments.map(dept => ({ value: dept.id, label: dept.name }))
  ];

  const exportOptions = [
    { value: 'excel', label: 'Export to Excel' },
    { value: 'pdf', label: 'Export to PDF' },
    { value: 'csv', label: 'Export to CSV' }
  ];

  const handleExport = (format) => {
    onExport(format, filters);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Filters & Actions</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onFilterChange({ 
            department: 'all', 
            status: 'all', 
            dateRange: { start: '', end: '' },
            searchTerm: '' 
          })}
        >
          <Icon name="RotateCcw" size={14} className="mr-1" />
          Reset Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Date Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Start Date</label>
          <Input
            type="date"
            value={filters.dateRange?.start || ''}
            onChange={(e) => onDateRangeChange({ 
              ...filters.dateRange, 
              start: e.target.value 
            })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">End Date</label>
          <Input
            type="date"
            value={filters.dateRange?.end || ''}
            onChange={(e) => onDateRangeChange({ 
              ...filters.dateRange, 
              end: e.target.value 
            })}
          />
        </div>

        {/* Department Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Department</label>
          <Select
            options={departmentOptions}
            value={filters.department || 'all'}
            onChange={(value) => onFilterChange({ ...filters, department: value })}
            placeholder="Select department"
          />
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Status</label>
          <Select
            options={statusOptions}
            value={filters.status || 'all'}
            onChange={(value) => onFilterChange({ ...filters, status: value })}
            placeholder="Select status"
          />
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search by employee name or ID..."
          value={filters.searchTerm || ''}
          onChange={(e) => onFilterChange({ ...filters, searchTerm: e.target.value })}
          className="max-w-md"
        />
      </div>

      {/* Quick Date Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const today = new Date().toISOString().split('T')[0];
            onDateRangeChange({ start: today, end: today });
          }}
        >
          Today
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const dateStr = yesterday.toISOString().split('T')[0];
            onDateRangeChange({ start: dateStr, end: dateStr });
          }}
        >
          Yesterday
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay());
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            onDateRangeChange({ 
              start: weekStart.toISOString().split('T')[0], 
              end: weekEnd.toISOString().split('T')[0] 
            });
          }}
        >
          This Week
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            onDateRangeChange({ 
              start: monthStart.toISOString().split('T')[0], 
              end: monthEnd.toISOString().split('T')[0] 
            });
          }}
        >
          This Month
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => handleExport('excel')}
          >
            <Icon name="Download" size={14} className="mr-1" />
            Export Excel
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('pdf')}
          >
            <Icon name="FileText" size={14} className="mr-1" />
            Export PDF
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('csv')}
          >
            <Icon name="Table" size={14} className="mr-1" />
            Export CSV
          </Button>
        </div>

        <div className="flex items-center space-x-2 ml-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={onBulkImport}
          >
            <Icon name="Upload" size={14} className="mr-1" />
            Bulk Import
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log('Generate report')}
          >
            <Icon name="BarChart3" size={14} className="mr-1" />
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceFilters;