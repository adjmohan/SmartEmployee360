import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EmployeeTable = ({ 
  employees, 
  selectedEmployees, 
  onSelectEmployee, 
  onSelectAll, 
  onEditEmployee, 
  onDeleteEmployee, 
  onViewEmployee,
  sortConfig,
  onSort 
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

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

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const handleSort = (column) => {
    onSort(column);
  };

  const isAllSelected = employees.length > 0 && selectedEmployees.length === employees.length;
  const isIndeterminate = selectedEmployees.length > 0 && selectedEmployees.length < employees.length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={onSelectAll}
                />
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 hover:bg-transparent p-0"
                >
                  <span>Employee</span>
                  {getSortIcon('name')}
                </Button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('employeeId')}
                  className="flex items-center space-x-2 hover:bg-transparent p-0"
                >
                  <span>ID</span>
                  {getSortIcon('employeeId')}
                </Button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('department')}
                  className="flex items-center space-x-2 hover:bg-transparent p-0"
                >
                  <span>Department</span>
                  {getSortIcon('department')}
                </Button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('designation')}
                  className="flex items-center space-x-2 hover:bg-transparent p-0"
                >
                  <span>Designation</span>
                  {getSortIcon('designation')}
                </Button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Contact</th>
              <th className="text-left p-4 font-medium text-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-2 hover:bg-transparent p-0"
                >
                  <span>Status</span>
                  {getSortIcon('status')}
                </Button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('hireDate')}
                  className="flex items-center space-x-2 hover:bg-transparent p-0"
                >
                  <span>Hire Date</span>
                  {getSortIcon('hireDate')}
                </Button>
              </th>
              <th className="text-center p-4 font-medium text-foreground w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className={`border-b border-border hover:bg-muted/30 transition-colors duration-200 ${
                  selectedEmployees.includes(employee.id) ? 'bg-primary/5' : ''
                }`}
                onMouseEnter={() => setHoveredRow(employee.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="p-4">
                  <Checkbox
                    checked={selectedEmployees.includes(employee.id)}
                    onChange={() => onSelectEmployee(employee.id)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{employee.name}</div>
                      <div className="text-sm text-muted-foreground">{employee.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-mono text-sm text-foreground">{employee.employeeId}</span>
                </td>
                <td className="p-4">
                  <span className="text-foreground">{employee.department}</span>
                </td>
                <td className="p-4">
                  <span className="text-foreground">{employee.designation}</span>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="text-sm text-foreground">{employee.phone}</div>
                    <div className="text-sm text-muted-foreground">{employee.location}</div>
                  </div>
                </td>
                <td className="p-4">
                  {getStatusBadge(employee.status)}
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">
                    {new Date(employee.hireDate).toLocaleDateString()}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-1">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {employees.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No employees found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or add new employees to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;