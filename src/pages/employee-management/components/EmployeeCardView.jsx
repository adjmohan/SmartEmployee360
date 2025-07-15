import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { Checkbox } from '../../../components/ui/Checkbox';

const EmployeeCardView = ({ 
  employees, 
  selectedEmployees, 
  onSelectEmployee, 
  onEditEmployee, 
  onDeleteEmployee, 
  onViewEmployee 
}) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success text-success-foreground', label: 'Active' },
      inactive: { color: 'bg-muted text-muted-foreground', label: 'Inactive' },
      'on-leave': { color: 'bg-warning text-warning-foreground', label: 'On Leave' },
      terminated: { color: 'bg-error text-error-foreground', label: 'Terminated' }
    };

    const config = statusConfig[status] || statusConfig.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (employees.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No employees found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search criteria or add new employees to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {employees.map((employee) => (
        <div
          key={employee.id}
          className={`bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 ${
            selectedEmployees.includes(employee.id) ? 'ring-2 ring-primary bg-primary/5' : ''
          }`}
        >
          {/* Header with Checkbox */}
          <div className="flex items-center justify-between mb-4">
            <Checkbox
              checked={selectedEmployees.includes(employee.id)}
              onChange={() => onSelectEmployee(employee.id)}
            />
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onViewEmployee(employee)}
                className="h-8 w-8 hover:bg-primary/10"
                title="View Details"
              >
                <Icon name="Eye" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEditEmployee(employee)}
                className="h-8 w-8 hover:bg-primary/10"
                title="Edit Employee"
              >
                <Icon name="Edit" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteEmployee(employee)}
                className="h-8 w-8 hover:bg-error/10 text-error"
                title="Delete Employee"
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          </div>

          {/* Avatar and Basic Info */}
          <div className="text-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted mx-auto mb-3">
              <Image
                src={employee.avatar}
                alt={employee.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-foreground text-lg mb-1">{employee.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{employee.designation}</p>
            <div className="flex justify-center">
              {getStatusBadge(employee.status)}
            </div>
          </div>

          {/* Employee Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">ID:</span>
              <span className="text-sm font-mono text-foreground">{employee.employeeId}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Department:</span>
              <span className="text-sm text-foreground">{employee.department}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Location:</span>
              <span className="text-sm text-foreground">{employee.location}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Hire Date:</span>
              <span className="text-sm text-foreground">
                {new Date(employee.hireDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Mail" size={14} className="text-muted-foreground" />
              <span className="text-sm text-foreground truncate">{employee.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={14} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{employee.phone}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewEmployee(employee)}
                className="flex-1"
                iconName="Eye"
                iconPosition="left"
              >
                View
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => onEditEmployee(employee)}
                className="flex-1"
                iconName="Edit"
                iconPosition="left"
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeCardView;