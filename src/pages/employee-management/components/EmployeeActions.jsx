import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const EmployeeActions = ({ 
  selectedEmployees, 
  onAddEmployee, 
  onBulkAction, 
  viewMode, 
  onViewModeChange,
  onExport 
}) => {
  const [bulkAction, setBulkAction] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const bulkActionOptions = [
    { value: '', label: 'Bulk Actions' },
    { value: 'activate', label: 'Activate Selected' },
    { value: 'deactivate', label: 'Deactivate Selected' },
    { value: 'delete', label: 'Delete Selected' },
    { value: 'export-selected', label: 'Export Selected' }
  ];

  const handleBulkAction = () => {
    if (bulkAction && selectedEmployees.length > 0) {
      onBulkAction(bulkAction, selectedEmployees);
      setBulkAction('');
    }
  };

  const handleExport = async (format) => {
    setIsExporting(true);
    try {
      await onExport(format);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Primary Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Button
            onClick={onAddEmployee}
            iconName="Plus"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Add Employee
          </Button>

          {/* Bulk Actions */}
          <div className="flex items-center space-x-2">
            <Select
              options={bulkActionOptions}
              value={bulkAction}
              onChange={setBulkAction}
              disabled={selectedEmployees.length === 0}
              className="w-48"
            />
            <Button
              variant="outline"
              onClick={handleBulkAction}
              disabled={!bulkAction || selectedEmployees.length === 0}
              iconName="Play"
              iconPosition="left"
              size="sm"
            >
              Apply
            </Button>
          </div>

          {/* Selection Info */}
          {selectedEmployees.length > 0 && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="CheckCircle" size={16} className="text-primary" />
              <span>{selectedEmployees.length} selected</span>
            </div>
          )}
        </div>

        {/* Right Section - View Controls & Export */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('table')}
              className="px-3"
            >
              <Icon name="Table" size={16} />
            </Button>
            <Button
              variant={viewMode === 'card' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('card')}
              className="px-3"
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
          </div>

          {/* Export Options */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport('excel')}
              loading={isExporting}
              iconName="FileSpreadsheet"
              iconPosition="left"
            >
              Excel
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport('pdf')}
              loading={isExporting}
              iconName="FileText"
              iconPosition="left"
            >
              PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">156</div>
            <div className="text-sm text-muted-foreground">Total Employees</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">142</div>
            <div className="text-sm text-muted-foreground">Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">8</div>
            <div className="text-sm text-muted-foreground">On Leave</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-error">6</div>
            <div className="text-sm text-muted-foreground">Inactive</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeActions;