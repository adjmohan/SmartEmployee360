import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PayrollTable = ({ employees, onViewDetails, onGenerateSlip, onBulkAction }) => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedEmployees(employees.map(emp => emp.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (employeeId, checked) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortConfig.key === 'netPay' || sortConfig.key === 'basicPay') {
      const aValue = parseFloat(a[sortConfig.key].toString().replace(/[$,]/g, ''));
      const bValue = parseFloat(b[sortConfig.key].toString().replace(/[$,]/g, ''));
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    const aValue = a[sortConfig.key].toString().toLowerCase();
    const bValue = b[sortConfig.key].toString().toLowerCase();
    
    if (sortConfig.direction === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const getStatusConfig = (status) => {
    const configs = {
      'processed': { color: 'text-success', bg: 'bg-success/10', icon: 'CheckCircle' },
      'pending': { color: 'text-warning', bg: 'bg-warning/10', icon: 'Clock' },
      'approved': { color: 'text-success', bg: 'bg-success/10', icon: 'Check' },
      'error': { color: 'text-error', bg: 'bg-error/10', icon: 'AlertCircle' }
    };
    return configs[status] || configs.pending;
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return (
      <Icon 
        name={sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={14} 
        className="text-primary" 
      />
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header Actions */}
      {selectedEmployees.length > 0 && (
        <div className="bg-primary/5 border-b border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">
              {selectedEmployees.length} employee{selectedEmployees.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('approve', selectedEmployees)}
              >
                <Icon name="Check" size={14} className="mr-1" />
                Approve
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('process', selectedEmployees)}
              >
                <Icon name="Play" size={14} className="mr-1" />
                Process
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('export', selectedEmployees)}
              >
                <Icon name="Download" size={14} className="mr-1" />
                Export
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4 w-12">
                <input
                  type="checkbox"
                  checked={selectedEmployees.length === employees.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Employee</span>
                  <SortIcon column="name" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('department')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Department</span>
                  <SortIcon column="department" />
                </button>
              </th>
              <th className="text-right p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('basicPay')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Basic Pay</span>
                  <SortIcon column="basicPay" />
                </button>
              </th>
              <th className="text-right p-4 font-medium text-muted-foreground">Allowances</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Deductions</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Tax</th>
              <th className="text-right p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('netPay')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Net Pay</span>
                  <SortIcon column="netPay" />
                </button>
              </th>
              <th className="text-center p-4 font-medium text-muted-foreground">Status</th>
              <th className="text-center p-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.map((employee) => {
              const statusConfig = getStatusConfig(employee.status);
              return (
                <tr key={employee.id} className="border-b border-border hover:bg-muted/30">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(employee.id)}
                      onChange={(e) => handleSelectEmployee(employee.id, e.target.checked)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-foreground">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-foreground">{employee.department}</span>
                  </td>
                  <td className="p-4 text-right font-medium text-foreground">
                    ${employee.basicPay.toLocaleString()}
                  </td>
                  <td className="p-4 text-right text-success">
                    +${employee.allowances.toLocaleString()}
                  </td>
                  <td className="p-4 text-right text-error">
                    -${employee.deductions.toLocaleString()}
                  </td>
                  <td className="p-4 text-right text-error">
                    -${employee.tax.toLocaleString()}
                  </td>
                  <td className="p-4 text-right font-semibold text-foreground">
                    ${employee.netPay.toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md ${statusConfig.bg}`}>
                      <Icon name={statusConfig.icon} size={12} className={statusConfig.color} />
                      <span className={`text-xs font-medium capitalize ${statusConfig.color}`}>
                        {employee.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewDetails(employee)}
                        title="View Details"
                      >
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onGenerateSlip(employee)}
                        title="Generate Slip"
                      >
                        <Icon name="FileText" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden">
        {sortedEmployees.map((employee) => {
          const statusConfig = getStatusConfig(employee.status);
          return (
            <div key={employee.id} className="border-b border-border p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(employee.id)}
                    onChange={(e) => handleSelectEmployee(employee.id, e.target.checked)}
                    className="rounded border-border mt-1"
                  />
                  <Image
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground">{employee.name}</p>
                    <p className="text-sm text-muted-foreground">{employee.employeeId}</p>
                    <p className="text-sm text-muted-foreground">{employee.department}</p>
                  </div>
                </div>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-md ${statusConfig.bg}`}>
                  <Icon name={statusConfig.icon} size={12} className={statusConfig.color} />
                  <span className={`text-xs font-medium capitalize ${statusConfig.color}`}>
                    {employee.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                <div>
                  <span className="text-muted-foreground">Basic Pay:</span>
                  <p className="font-medium text-foreground">${employee.basicPay.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Allowances:</span>
                  <p className="font-medium text-success">+${employee.allowances.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Deductions:</span>
                  <p className="font-medium text-error">-${employee.deductions.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Tax:</span>
                  <p className="font-medium text-error">-${employee.tax.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">Net Pay:</span>
                  <p className="text-lg font-semibold text-foreground">${employee.netPay.toLocaleString()}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(employee)}
                  >
                    <Icon name="Eye" size={14} className="mr-1" />
                    Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onGenerateSlip(employee)}
                  >
                    <Icon name="FileText" size={14} className="mr-1" />
                    Slip
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PayrollTable;