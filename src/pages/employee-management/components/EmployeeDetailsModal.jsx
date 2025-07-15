import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EmployeeDetailsModal = ({ isOpen, onClose, employee }) => {
  if (!isOpen || !employee) return null;

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success text-success-foreground', label: 'Active' },
      inactive: { color: 'bg-muted text-muted-foreground', label: 'Inactive' },
      'on-leave': { color: 'bg-warning text-warning-foreground', label: 'On Leave' },
      terminated: { color: 'bg-error text-error-foreground', label: 'Terminated' }
    };

    const config = statusConfig[status] || statusConfig.active;
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const calculateTenure = (hireDate) => {
    const hire = new Date(hireDate);
    const now = new Date();
    const diffTime = Math.abs(now - hire);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
    }
    return `${months} month${months > 1 ? 's' : ''}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
              <Image
                src={employee.avatar}
                alt={employee.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{employee.name}</h2>
              <p className="text-muted-foreground">{employee.designation}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {getStatusBadge(employee.status)}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-muted"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="User" size={20} className="mr-2" />
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <span className="text-sm font-medium text-muted-foreground">Full Name:</span>
                    <span className="col-span-2 text-sm text-foreground">{employee.name}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <span className="text-sm font-medium text-muted-foreground">Employee ID:</span>
                    <span className="col-span-2 text-sm font-mono text-foreground">{employee.employeeId}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <span className="text-sm font-medium text-muted-foreground">Email:</span>
                    <span className="col-span-2 text-sm text-foreground">{employee.email}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <span className="text-sm font-medium text-muted-foreground">Phone:</span>
                    <span className="col-span-2 text-sm text-foreground">{employee.phone}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <span className="text-sm font-medium text-muted-foreground">Location:</span>
                    <span className="col-span-2 text-sm text-foreground">{employee.location}</span>
                  </div>
                </div>
              </div>

              {/* Employment Details */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="Briefcase" size={20} className="mr-2" />
                  Employment Details
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <span className="text-sm font-medium text-muted-foreground">Department:</span>
                    <span className="col-span-2 text-sm text-foreground">{employee.department}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <span className="text-sm font-medium text-muted-foreground">Designation:</span>
                    <span className="col-span-2 text-sm text-foreground">{employee.designation}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <span className="text-sm font-medium text-muted-foreground">Employment Type:</span>
                    <span className="col-span-2 text-sm text-foreground">{employee.employmentType}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <span className="text-sm font-medium text-muted-foreground">Hire Date:</span>
                    <span className="col-span-2 text-sm text-foreground">
                      {new Date(employee.hireDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <span className="text-sm font-medium text-muted-foreground">Tenure:</span>
                    <span className="col-span-2 text-sm text-foreground">
                      {calculateTenure(employee.hireDate)}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <span className="text-sm font-medium text-muted-foreground">Manager:</span>
                    <span className="col-span-2 text-sm text-foreground">
                      {employee.manager || 'Not assigned'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance & Statistics */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="BarChart3" size={20} className="mr-2" />
                  Quick Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">95%</div>
                    <div className="text-sm text-muted-foreground">Attendance</div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-success">4.2</div>
                    <div className="text-sm text-muted-foreground">Performance</div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-warning">12</div>
                    <div className="text-sm text-muted-foreground">Leave Days</div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground">3</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                </div>
              </div>

              {/* Compensation */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="DollarSign" size={20} className="mr-2" />
                  Compensation
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <span className="text-sm font-medium text-muted-foreground">Annual Salary:</span>
                    <span className="col-span-2 text-sm font-semibold text-foreground">
                      {formatCurrency(employee.salary)}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <span className="text-sm font-medium text-muted-foreground">Monthly Gross:</span>
                    <span className="col-span-2 text-sm text-foreground">
                      {formatCurrency(employee.salary / 12)}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <span className="text-sm font-medium text-muted-foreground">Last Increment:</span>
                    <span className="col-span-2 text-sm text-foreground">8% (Jan 2024)</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="Activity" size={20} className="mr-2" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Performance Review Completed</div>
                      <div className="text-xs text-muted-foreground">2 days ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <Icon name="Calendar" size={16} className="text-primary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Leave Request Approved</div>
                      <div className="text-xs text-muted-foreground">1 week ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <Icon name="Award" size={16} className="text-warning" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Employee of the Month</div>
                      <div className="text-xs text-muted-foreground">2 weeks ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/30">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button iconName="Edit" iconPosition="left">
            Edit Employee
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsModal;