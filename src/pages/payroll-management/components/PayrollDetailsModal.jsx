import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PayrollDetailsModal = ({ employee, isOpen, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(employee || {});

  if (!isOpen || !employee) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'breakdown', label: 'Breakdown', icon: 'Calculator' },
    { id: 'deductions', label: 'Deductions', icon: 'Minus' },
    { id: 'history', label: 'History', icon: 'Clock' }
  ];

  const handleSave = () => {
    onSave(formData);
    setEditMode(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const payrollBreakdown = {
    basicPay: employee.basicPay,
    allowances: {
      housing: 2500,
      transport: 800,
      medical: 1200,
      performance: 1500
    },
    deductions: {
      federalTax: 3200,
      stateTax: 1800,
      socialSecurity: 1200,
      medicare: 400,
      insurance: 350,
      retirement: 1000
    },
    netPay: employee.netPay
  };

  const payrollHistory = [
    { month: 'Dec 2024', netPay: 15420, status: 'Paid' },
    { month: 'Nov 2024', netPay: 15380, status: 'Paid' },
    { month: 'Oct 2024', netPay: 15200, status: 'Paid' },
    { month: 'Sep 2024', netPay: 15100, status: 'Paid' },
    { month: 'Aug 2024', netPay: 14950, status: 'Paid' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <Image
              src={employee.avatar}
              alt={employee.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-foreground">{employee.name}</h2>
              <p className="text-sm text-muted-foreground">
                {employee.employeeId} • {employee.department}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={editMode ? 'default' : 'outline'}
              size="sm"
              onClick={() => editMode ? handleSave() : setEditMode(true)}
            >
              <Icon name={editMode ? 'Save' : 'Edit'} size={14} className="mr-1" />
              {editMode ? 'Save' : 'Edit'}
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-6 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Employee Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-muted-foreground">Position</label>
                      <p className="font-medium text-foreground">{employee.position || 'Senior Developer'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Employment Type</label>
                      <p className="font-medium text-foreground">{employee.employmentType || 'Full-time'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Join Date</label>
                      <p className="font-medium text-foreground">{employee.joinDate || 'Jan 15, 2022'}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Payroll Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Basic Pay</span>
                      <span className="font-medium text-foreground">${employee.basicPay.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Allowances</span>
                      <span className="font-medium text-success">+${employee.allowances.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Deductions</span>
                      <span className="font-medium text-error">-${employee.deductions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium text-error">-${employee.tax.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-border pt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold text-foreground">Net Pay</span>
                        <span className="font-bold text-lg text-foreground">${employee.netPay.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'breakdown' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Salary Breakdown</h3>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-foreground">Basic Pay</span>
                    <span className="text-lg font-semibold text-foreground">
                      ${payrollBreakdown.basicPay.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">Allowances</h4>
                <div className="space-y-2">
                  {Object.entries(payrollBreakdown.allowances).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-medium text-success">+${value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">Deductions</h4>
                <div className="space-y-2">
                  {Object.entries(payrollBreakdown.deductions).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-medium text-error">-${value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Final Net Pay</span>
                  <span className="text-2xl font-bold text-primary">
                    ${payrollBreakdown.netPay.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'deductions' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-foreground">Tax & Deduction Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Tax Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Federal Tax (22%)</span>
                      <span className="font-medium text-error">-$3,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">State Tax (12%)</span>
                      <span className="font-medium text-error">-$1,800</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Social Security (6.2%)</span>
                      <span className="font-medium text-error">-$1,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Medicare (1.45%)</span>
                      <span className="font-medium text-error">-$400</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Other Deductions</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Health Insurance</span>
                      <span className="font-medium text-error">-$350</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">401(k) Contribution</span>
                      <span className="font-medium text-error">-$1,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Life Insurance</span>
                      <span className="font-medium text-error">-$50</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-foreground">Payroll History</h3>
              
              <div className="space-y-3">
                {payrollHistory.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{record.month}</p>
                      <p className="text-sm text-muted-foreground">Regular Payroll</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">${record.netPay.toLocaleString()}</p>
                      <div className="flex items-center space-x-1">
                        <Icon name="CheckCircle" size={12} className="text-success" />
                        <span className="text-xs text-success">{record.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="default">
              <Icon name="FileText" size={14} className="mr-1" />
              Generate Slip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollDetailsModal;