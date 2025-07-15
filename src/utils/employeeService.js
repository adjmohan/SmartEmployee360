import { supabase } from './supabase';

class EmployeeService {
  // Get all employees with profiles and department info
  async getEmployees() {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select(`
          *,
          employee_profiles!inner (
            id,
            employee_id,
            designation,
            hire_date,
            salary,
            gender,
            date_of_birth,
            address,
            emergency_contact_name,
            emergency_contact_phone,
            employment_type,
            status,
            location,
            skills,
            notes,
            departments (
              id,
              name,
              location
            ),
            manager:manager_id (
              id,
              full_name,
              email
            )
          )
        `)
        .eq('employee_profiles.status', 'active');

      if (error) {
        return { success: false, error: error.message };
      }

      // Transform data to match frontend expectations
      const employees = data?.map(user => ({
        id: user.id,
        name: user.full_name,
        email: user.email,
        phone: user.phone,
        employeeId: user.employee_profiles?.[0]?.employee_id,
        department: user.employee_profiles?.[0]?.departments?.name || 'Not Assigned',
        designation: user.employee_profiles?.[0]?.designation,
        location: user.employee_profiles?.[0]?.location || user.employee_profiles?.[0]?.departments?.location || 'Not Specified',
        employmentType: user.employee_profiles?.[0]?.employment_type,
        status: user.employee_profiles?.[0]?.status,
        hireDate: user.employee_profiles?.[0]?.hire_date,
        salary: user.employee_profiles?.[0]?.salary,
        manager: user.employee_profiles?.[0]?.manager?.full_name || 'Not Assigned',
        avatar: user.avatar_url,
        gender: user.employee_profiles?.[0]?.gender,
        dateOfBirth: user.employee_profiles?.[0]?.date_of_birth,
        address: user.employee_profiles?.[0]?.address,
        emergencyContactName: user.employee_profiles?.[0]?.emergency_contact_name,
        emergencyContactPhone: user.employee_profiles?.[0]?.emergency_contact_phone,
        skills: user.employee_profiles?.[0]?.skills || [],
        notes: user.employee_profiles?.[0]?.notes,
        role: user.role
      })) || [];

      return { success: true, data: employees };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load employees.' };
    }
  }

  // Get employee by ID
  async getEmployeeById(id) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select(`
          *,
          employee_profiles (
            id,
            employee_id,
            designation,
            hire_date,
            salary,
            gender,
            date_of_birth,
            address,
            emergency_contact_name,
            emergency_contact_phone,
            employment_type,
            status,
            location,
            skills,
            notes,
            departments (
              id,
              name,
              location
            ),
            manager:manager_id (
              id,
              full_name,
              email
            )
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load employee.' };
    }
  }

  // Get departments
  async getDepartments() {
    try {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .order('name');

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load departments.' };
    }
  }

  // Create employee
  async createEmployee(employeeData) {
    try {
      const { data: userData, error: userError } = await supabase.auth.admin.createUser({
        email: employeeData.email,
        password: employeeData.password || 'temp123456',
        email_confirm: true,
        user_metadata: {
          full_name: employeeData.name,
          role: employeeData.role || 'employee'
        }
      });

      if (userError) {
        return { success: false, error: userError.message };
      }

      // Create employee profile
      const { data: profileData, error: profileError } = await supabase
        .from('employee_profiles')
        .insert({
          user_id: userData.user.id,
          employee_id: employeeData.employeeId,
          department_id: employeeData.departmentId,
          designation: employeeData.designation,
          manager_id: employeeData.managerId,
          hire_date: employeeData.hireDate,
          salary: employeeData.salary,
          gender: employeeData.gender,
          date_of_birth: employeeData.dateOfBirth,
          address: employeeData.address,
          emergency_contact_name: employeeData.emergencyContactName,
          emergency_contact_phone: employeeData.emergencyContactPhone,
          employment_type: employeeData.employmentType,
          status: employeeData.status || 'active',
          location: employeeData.location,
          skills: employeeData.skills || [],
          notes: employeeData.notes
        })
        .select()
        .single();

      if (profileError) {
        return { success: false, error: profileError.message };
      }

      return { success: true, data: { user: userData.user, profile: profileData } };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to create employee.' };
    }
  }

  // Update employee
  async updateEmployee(id, updates) {
    try {
      // Update user profile
      const { data: userProfile, error: userError } = await supabase
        .from('user_profiles')
        .update({
          full_name: updates.name,
          email: updates.email,
          phone: updates.phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (userError) {
        return { success: false, error: userError.message };
      }

      // Update employee profile
      const { data: empProfile, error: empError } = await supabase
        .from('employee_profiles')
        .update({
          designation: updates.designation,
          department_id: updates.departmentId,
          manager_id: updates.managerId,
          hire_date: updates.hireDate,
          salary: updates.salary,
          gender: updates.gender,
          date_of_birth: updates.dateOfBirth,
          address: updates.address,
          emergency_contact_name: updates.emergencyContactName,
          emergency_contact_phone: updates.emergencyContactPhone,
          employment_type: updates.employmentType,
          status: updates.status,
          location: updates.location,
          skills: updates.skills || [],
          notes: updates.notes,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', id)
        .select()
        .single();

      if (empError) {
        return { success: false, error: empError.message };
      }

      return { success: true, data: { userProfile, empProfile } };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to update employee.' };
    }
  }

  // Delete employee
  async deleteEmployee(id) {
    try {
      // Update employee status to inactive instead of deleting
      const { error } = await supabase
        .from('employee_profiles')
        .update({ 
          status: 'inactive',
          updated_at: new Date().toISOString()
        })
        .eq('user_id', id);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to delete employee.' };
    }
  }

  // Get employee statistics
  async getEmployeeStats() {
    try {
      const { data, error } = await supabase
        .from('employee_profiles')
        .select('status, employment_type, departments(name)');

      if (error) {
        return { success: false, error: error.message };
      }

      const stats = {
        total: data?.length || 0,
        active: data?.filter(emp => emp.status === 'active').length || 0,
        inactive: data?.filter(emp => emp.status === 'inactive').length || 0,
        onLeave: data?.filter(emp => emp.status === 'on-leave').length || 0,
        byDepartment: {},
        byEmploymentType: {}
      };

      // Count by department
      data?.forEach(emp => {
        const dept = emp.departments?.name || 'Not Assigned';
        stats.byDepartment[dept] = (stats.byDepartment[dept] || 0) + 1;
      });

      // Count by employment type
      data?.forEach(emp => {
        const type = emp.employment_type || 'Not Specified';
        stats.byEmploymentType[type] = (stats.byEmploymentType[type] || 0) + 1;
      });

      return { success: true, data: stats };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load employee statistics.' };
    }
  }
}

export default new EmployeeService();