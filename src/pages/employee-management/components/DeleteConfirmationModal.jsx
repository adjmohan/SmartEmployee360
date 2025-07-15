import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DeleteConfirmationModal = ({ isOpen, onClose, employee, onConfirm, isDeleting }) => {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-error" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Delete Employee</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted"
            disabled={isDeleting}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={employee.avatar}
                alt={employee.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium text-foreground">{employee.name}</div>
              <div className="text-sm text-muted-foreground">{employee.designation}</div>
              <div className="text-sm text-muted-foreground">ID: {employee.employeeId}</div>
            </div>
          </div>

          <div className="bg-error/5 border border-error/20 rounded-lg p-4 mb-4">
            <p className="text-sm text-foreground mb-2">
              Are you sure you want to delete this employee record? This action cannot be undone.
            </p>
            <p className="text-sm text-error font-medium">
              All associated data including attendance records, performance reviews, and payroll history will be permanently removed.
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-foreground mb-2">What will be deleted:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center space-x-2">
                <Icon name="User" size={14} />
                <span>Employee profile and personal information</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Clock" size={14} />
                <span>Attendance and time tracking records</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="DollarSign" size={14} />
                <span>Payroll and compensation history</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={14} />
                <span>Performance reviews and ratings</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/30">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            loading={isDeleting}
            iconName="Trash2"
            iconPosition="left"
          >
            {isDeleting ? 'Deleting...' : 'Delete Employee'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;