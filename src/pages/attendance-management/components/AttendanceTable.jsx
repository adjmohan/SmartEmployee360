import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AttendanceTable = ({ attendanceRecords, onEditRecord, onBulkAction }) => {
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'present', label: 'Present' },
    { value: 'absent', label: 'Absent' },
    { value: 'late', label: 'Late' },
    { value: 'leave', label: 'On Leave' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      present: { color: 'bg-success/10 text-success border-success/20', icon: 'CheckCircle' },
      absent: { color: 'bg-error/10 text-error border-error/20', icon: 'XCircle' },
      late: { color: 'bg-warning/10 text-warning border-warning/20', icon: 'Clock' },
      leave: { color: 'bg-secondary/10 text-secondary border-secondary/20', icon: 'Calendar' }
    };

    const config = statusConfig[status] || statusConfig.absent;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        <Icon name={config.icon} size={12} className="mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatTime = (timeString) => {
    if (!timeString) return '-';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const calculateHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return '-';
    const start = new Date(`2000-01-01T${checkIn}`);
    const end = new Date(`2000-01-01T${checkOut}`);
    const diff = (end - start) / (1000 * 60 * 60);
    return `${diff.toFixed(1)}h`;
  };

  const filteredRecords = attendanceRecords
    .filter(record => {
      const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRecords(filteredRecords.map(record => record.id));
    } else {
      setSelectedRecords([]);
    }
  };

  const handleSelectRecord = (recordId, checked) => {
    if (checked) {
      setSelectedRecords(prev => [...prev, recordId]);
    } else {
      setSelectedRecords(prev => prev.filter(id => id !== recordId));
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header with filters and actions */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <h3 className="text-lg font-semibold text-foreground">Attendance Records</h3>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Input
              type="search"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
            
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Filter by status"
              className="w-full sm:w-48"
            />
          </div>
        </div>

        {/* Bulk actions */}
        {selectedRecords.length > 0 && (
          <div className="mt-4 flex items-center space-x-2 p-3 bg-primary/5 rounded-lg">
            <span className="text-sm text-foreground">
              {selectedRecords.length} record(s) selected
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('approve', selectedRecords)}
            >
              <Icon name="Check" size={14} className="mr-1" />
              Approve
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('reject', selectedRecords)}
            >
              <Icon name="X" size={14} className="mr-1" />
              Reject
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('export', selectedRecords)}
            >
              <Icon name="Download" size={14} className="mr-1" />
              Export
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedRecords.length === filteredRecords.length && filteredRecords.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="p-4 text-left">
                <button
                  onClick={() => handleSort('employeeName')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Employee</span>
                  <Icon name={getSortIcon('employeeName')} size={14} />
                </button>
              </th>
              <th className="p-4 text-left">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Date</span>
                  <Icon name={getSortIcon('date')} size={14} />
                </button>
              </th>
              <th className="p-4 text-left text-sm font-medium text-foreground">Check In</th>
              <th className="p-4 text-left text-sm font-medium text-foreground">Check Out</th>
              <th className="p-4 text-left text-sm font-medium text-foreground">Hours</th>
              <th className="p-4 text-left text-sm font-medium text-foreground">Status</th>
              <th className="p-4 text-left text-sm font-medium text-foreground">Late Marks</th>
              <th className="p-4 text-left text-sm font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedRecords.includes(record.id)}
                    onChange={(e) => handleSelectRecord(record.id, e.target.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{record.employeeName}</p>
                      <p className="text-xs text-muted-foreground">{record.employeeId}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-foreground">
                  {new Date(record.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </td>
                <td className="p-4 text-sm text-foreground">{formatTime(record.checkIn)}</td>
                <td className="p-4 text-sm text-foreground">{formatTime(record.checkOut)}</td>
                <td className="p-4 text-sm text-foreground">
                  {calculateHours(record.checkIn, record.checkOut)}
                </td>
                <td className="p-4">{getStatusBadge(record.status)}</td>
                <td className="p-4">
                  {record.lateMarks > 0 ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning border border-warning/20">
                      <Icon name="AlertTriangle" size={12} className="mr-1" />
                      {record.lateMarks}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">-</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditRecord(record)}
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => console.log('View details:', record.id)}
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRecords.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No attendance records found</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceTable;