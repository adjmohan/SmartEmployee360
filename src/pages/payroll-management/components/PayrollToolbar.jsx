import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PayrollToolbar = ({ onProcessPayroll, onBulkAdjustment, onExport, processingStatus }) => {
  const [exportFormat, setExportFormat] = useState('excel');
  const [isProcessing, setIsProcessing] = useState(false);

  const exportOptions = [
    { value: 'excel', label: 'Excel (.xlsx)' },
    { value: 'pdf', label: 'PDF Report' },
    { value: 'csv', label: 'CSV Data' },
    { value: 'json', label: 'JSON Export' }
  ];

  const handleProcessPayroll = async () => {
    setIsProcessing(true);
    try {
      await onProcessPayroll();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = () => {
    onExport(exportFormat);
  };

  const canProcess = processingStatus === 'draft' || processingStatus === 'error';

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Main Actions */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <Button
            variant={canProcess ? 'default' : 'secondary'}
            onClick={handleProcessPayroll}
            disabled={!canProcess || isProcessing}
            loading={isProcessing}
            iconName="Play"
            iconPosition="left"
          >
            {isProcessing ? 'Processing...' : 'Process Payroll'}
          </Button>

          <Button
            variant="outline"
            onClick={onBulkAdjustment}
            iconName="Settings"
            iconPosition="left"
          >
            Bulk Adjustment
          </Button>

          <Button
            variant="outline"
            iconName="Calculator"
            iconPosition="left"
          >
            Tax Calculator
          </Button>
        </div>

        {/* Right Section - Export and Utilities */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <div className="flex items-center space-x-2">
            <Select
              options={exportOptions}
              value={exportFormat}
              onChange={setExportFormat}
              placeholder="Export format"
              className="w-40"
            />
            <Button
              variant="outline"
              onClick={handleExport}
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              title="Refresh Data"
            >
              <Icon name="RefreshCw" size={16} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              title="Print Report"
            >
              <Icon name="Printer" size={16} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              title="Settings"
            >
              <Icon name="Settings" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Processing Status Bar */}
      {processingStatus === 'processing' && (
        <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-md">
          <div className="flex items-center space-x-3">
            <div className="animate-spin">
              <Icon name="Loader2" size={16} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Processing payroll...</p>
              <div className="w-full bg-muted rounded-full h-2 mt-1">
                <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '65%' }}></div>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">65% complete</span>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="text-center p-2 bg-muted/30 rounded-md">
          <p className="text-muted-foreground">This Month</p>
          <p className="font-semibold text-foreground">$2.4M</p>
        </div>
        <div className="text-center p-2 bg-muted/30 rounded-md">
          <p className="text-muted-foreground">Last Month</p>
          <p className="font-semibold text-foreground">$2.3M</p>
        </div>
        <div className="text-center p-2 bg-muted/30 rounded-md">
          <p className="text-muted-foreground">YTD Total</p>
          <p className="font-semibold text-foreground">$28.8M</p>
        </div>
        <div className="text-center p-2 bg-muted/30 rounded-md">
          <p className="text-muted-foreground">Avg/Employee</p>
          <p className="font-semibold text-foreground">$15,385</p>
        </div>
      </div>
    </div>
  );
};

export default PayrollToolbar;