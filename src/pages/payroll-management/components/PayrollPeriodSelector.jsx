import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PayrollPeriodSelector = ({ selectedPeriod, onPeriodChange, processingStatus }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const payrollPeriods = [
    { value: '2024-12', label: 'December 2024' },
    { value: '2024-11', label: 'November 2024' },
    { value: '2024-10', label: 'October 2024' },
    { value: '2024-09', label: 'September 2024' },
    { value: '2024-08', label: 'August 2024' },
    { value: '2024-07', label: 'July 2024' }
  ];

  const statusConfig = {
    'draft': { color: 'text-warning', bg: 'bg-warning/10', icon: 'Edit' },
    'processing': { color: 'text-primary', bg: 'bg-primary/10', icon: 'Clock' },
    'approved': { color: 'text-success', bg: 'bg-success/10', icon: 'CheckCircle' },
    'completed': { color: 'text-success', bg: 'bg-success/10', icon: 'Check' },
    'error': { color: 'text-error', bg: 'bg-error/10', icon: 'AlertCircle' }
  };

  const currentStatus = statusConfig[processingStatus] || statusConfig.draft;

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Payroll Period</h3>
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
          <Select
            label="Select Period"
            options={payrollPeriods}
            value={selectedPeriod}
            onChange={onPeriodChange}
            placeholder="Choose payroll period"
          />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <div className={`flex items-center space-x-2 px-2 py-1 rounded-md ${currentStatus.bg}`}>
                <Icon name={currentStatus.icon} size={14} className={currentStatus.color} />
                <span className={`text-xs font-medium capitalize ${currentStatus.color}`}>
                  {processingStatus}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Pay Date:</span>
                <p className="font-medium text-foreground">Jan 31, 2025</p>
              </div>
              <div>
                <span className="text-muted-foreground">Cut-off:</span>
                <p className="font-medium text-foreground">Jan 25, 2025</p>
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Employees:</span>
                <span className="font-medium text-foreground">156</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-muted-foreground">Processed:</span>
                <span className="font-medium text-success">142</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-muted-foreground">Pending:</span>
                <span className="font-medium text-warning">14</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollPeriodSelector;