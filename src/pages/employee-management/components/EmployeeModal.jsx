import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EmployeeModal = ({ isOpen, onClose, employee, onSave, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    employeeId: '',
    department: '',
    designation: '',
    location: '',
    employmentType: '',
    status: 'active',
    hireDate: '',
    salary: '',
    manager: '',
    avatar: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (employee && mode === 'edit') {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        phone: employee.phone || '',
        employeeId: employee.employeeId || '',
        department: employee.department || '',
        designation: employee.designation || '',
        location: employee.location || '',
        employmentType: employee.employmentType || '',
        status: employee.status || 'active',
        hireDate: employee.hireDate ? employee.hireDate.split('T')[0] : '',
        salary: employee.salary || '',
        manager: employee.manager || '',
        avatar: employee.avatar || ''
      });
    } else if (mode === 'add') {
      setFormData({
        name: '',
        email: '',
        phone: '',
        employeeId: '',
        department: '',
        designation: '',
        location: '',
        employmentType: '',
        status: 'active',
        hireDate: '',
        salary: '',
        manager: '',
        avatar: ''
      });
    }
    setErrors({});
  }, [employee, mode, isOpen]);

  const departmentOptions = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' }
  ];

  const locationOptions = [
    { value: 'new-york', label: 'New York' },
    { value: 'san-francisco', label: 'San Francisco' },
    { value: 'chicago', label: 'Chicago' },
    { value: 'austin', label: 'Austin' },
    { value: 'remote', label: 'Remote' }
  ];

  const employmentTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'intern', label: 'Intern' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'on-leave', label: 'On Leave' },
    { value: 'terminated', label: 'Terminated' }
  ];

  const managerOptions = [
    { value: 'john-doe', label: 'John Doe' },
    { value: 'jane-smith', label: 'Jane Smith' },
    { value: 'mike-johnson', label: 'Mike Johnson' },
    { value: 'sarah-wilson', label: 'Sarah Wilson' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.employmentType) newErrors.employmentType = 'Employment type is required';
    if (!formData.hireDate) newErrors.hireDate = 'Hire date is required';
    if (!formData.salary.trim()) newErrors.salary = 'Salary is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const employeeData = {
        ...formData,
        id: employee?.id || Date.now(),
        avatar: formData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
        salary: parseFloat(formData.salary)
      };

      await onSave(employeeData);
      onClose();
    } catch (error) {
      console.error('Error saving employee:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {mode === 'add' ? 'Add New Employee' : 'Edit Employee'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground mb-4">Personal Information</h3>
              
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors.name}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                error={errors.phone}
                required
              />

              <Input
                label="Avatar URL"
                type="url"
                placeholder="Enter avatar URL (optional)"
                value={formData.avatar}
                onChange={(e) => handleInputChange('avatar', e.target.value)}
                description="Leave empty for auto-generated avatar"
              />

              {formData.avatar && (
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={formData.avatar}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">Avatar preview</span>
                </div>
              )}
            </div>

            {/* Job Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground mb-4">Job Information</h3>
              
              <Input
                label="Employee ID"
                type="text"
                placeholder="Enter employee ID"
                value={formData.employeeId}
                onChange={(e) => handleInputChange('employeeId', e.target.value)}
                error={errors.employeeId}
                required
              />

              <Select
                label="Department"
                options={departmentOptions}
                value={formData.department}
                onChange={(value) => handleInputChange('department', value)}
                error={errors.department}
                required
              />

              <Input
                label="Designation"
                type="text"
                placeholder="Enter job title"
                value={formData.designation}
                onChange={(e) => handleInputChange('designation', e.target.value)}
                error={errors.designation}
                required
              />

              <Select
                label="Location"
                options={locationOptions}
                value={formData.location}
                onChange={(value) => handleInputChange('location', value)}
                error={errors.location}
                required
              />

              <Select
                label="Employment Type"
                options={employmentTypeOptions}
                value={formData.employmentType}
                onChange={(value) => handleInputChange('employmentType', value)}
                error={errors.employmentType}
                required
              />

              <Select
                label="Status"
                options={statusOptions}
                value={formData.status}
                onChange={(value) => handleInputChange('status', value)}
                required
              />

              <Input
                label="Hire Date"
                type="date"
                value={formData.hireDate}
                onChange={(e) => handleInputChange('hireDate', e.target.value)}
                error={errors.hireDate}
                required
              />

              <Input
                label="Annual Salary"
                type="number"
                placeholder="Enter annual salary"
                value={formData.salary}
                onChange={(e) => handleInputChange('salary', e.target.value)}
                error={errors.salary}
                required
              />

              <Select
                label="Reporting Manager"
                options={managerOptions}
                value={formData.manager}
                onChange={(value) => handleInputChange('manager', value)}
                placeholder="Select manager (optional)"
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/30">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            loading={isSubmitting}
            iconName="Save"
            iconPosition="left"
          >
            {mode === 'add' ? 'Add Employee' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;