-- Location: supabase/migrations/20250715063845_smartemployee360_with_auth.sql
-- SmartEmployee360 Authentication & Employee Management System

-- 1. Types and Core Tables
CREATE TYPE public.user_role AS ENUM ('admin', 'manager', 'hr', 'employee');
CREATE TYPE public.employee_status AS ENUM ('active', 'inactive', 'on-leave', 'resigned');
CREATE TYPE public.employment_type AS ENUM ('full-time', 'part-time', 'contract', 'intern');
CREATE TYPE public.gender AS ENUM ('male', 'female', 'other', 'prefer-not-to-say');
CREATE TYPE public.leave_type AS ENUM ('sick', 'casual', 'annual', 'maternity', 'paternity', 'emergency');
CREATE TYPE public.leave_status AS ENUM ('pending', 'approved', 'rejected', 'cancelled');
CREATE TYPE public.attendance_status AS ENUM ('present', 'absent', 'late', 'half-day', 'on-leave');

-- Critical intermediary table for authentication
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'employee'::public.user_role,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Departments table
CREATE TABLE public.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    head_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    location TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Employee profiles table (extended employee information)
CREATE TABLE public.employee_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    employee_id TEXT NOT NULL UNIQUE,
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    designation TEXT NOT NULL,
    manager_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    hire_date DATE NOT NULL,
    salary DECIMAL(10,2),
    gender public.gender,
    date_of_birth DATE,
    address TEXT,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    employment_type public.employment_type DEFAULT 'full-time'::public.employment_type,
    status public.employee_status DEFAULT 'active'::public.employee_status,
    location TEXT,
    skills TEXT[],
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Attendance records table
CREATE TABLE public.attendance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    check_in_time TIMESTAMPTZ,
    check_out_time TIMESTAMPTZ,
    status public.attendance_status DEFAULT 'present'::public.attendance_status,
    hours_worked DECIMAL(4,2),
    break_duration DECIMAL(4,2),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Leave requests table
CREATE TABLE public.leave_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    leave_type public.leave_type NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    days_requested INTEGER NOT NULL,
    reason TEXT NOT NULL,
    status public.leave_status DEFAULT 'pending'::public.leave_status,
    approved_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Payroll records table
CREATE TABLE public.payroll_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    pay_period_start DATE NOT NULL,
    pay_period_end DATE NOT NULL,
    basic_salary DECIMAL(10,2) NOT NULL,
    allowances DECIMAL(10,2) DEFAULT 0,
    deductions DECIMAL(10,2) DEFAULT 0,
    tax_deductions DECIMAL(10,2) DEFAULT 0,
    net_salary DECIMAL(10,2) NOT NULL,
    overtime_hours DECIMAL(4,2) DEFAULT 0,
    overtime_pay DECIMAL(10,2) DEFAULT 0,
    processed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Performance reviews table
CREATE TABLE public.performance_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    review_period_start DATE NOT NULL,
    review_period_end DATE NOT NULL,
    overall_rating INTEGER CHECK (overall_rating >= 1 AND overall_rating <= 5),
    goals_achievement INTEGER CHECK (goals_achievement >= 1 AND goals_achievement <= 5),
    communication_skills INTEGER CHECK (communication_skills >= 1 AND communication_skills <= 5),
    technical_skills INTEGER CHECK (technical_skills >= 1 AND technical_skills <= 5),
    teamwork INTEGER CHECK (teamwork >= 1 AND teamwork <= 5),
    leadership INTEGER CHECK (leadership >= 1 AND leadership <= 5),
    comments TEXT,
    employee_feedback TEXT,
    goals_next_period TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_employee_profiles_user_id ON public.employee_profiles(user_id);
CREATE INDEX idx_employee_profiles_department_id ON public.employee_profiles(department_id);
CREATE INDEX idx_employee_profiles_manager_id ON public.employee_profiles(manager_id);
CREATE INDEX idx_employee_profiles_employee_id ON public.employee_profiles(employee_id);
CREATE INDEX idx_attendance_records_employee_id ON public.attendance_records(employee_id);
CREATE INDEX idx_attendance_records_date ON public.attendance_records(date);
CREATE INDEX idx_leave_requests_employee_id ON public.leave_requests(employee_id);
CREATE INDEX idx_leave_requests_status ON public.leave_requests(status);
CREATE INDEX idx_payroll_records_employee_id ON public.payroll_records(employee_id);
CREATE INDEX idx_performance_reviews_employee_id ON public.performance_reviews(employee_id);
CREATE INDEX idx_performance_reviews_reviewer_id ON public.performance_reviews(reviewer_id);

-- 3. RLS Setup
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_reviews ENABLE ROW LEVEL SECURITY;

-- 4. Helper Functions for RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'
)
$$;

CREATE OR REPLACE FUNCTION public.is_hr()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role IN ('admin', 'hr')
)
$$;

CREATE OR REPLACE FUNCTION public.is_manager()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role IN ('admin', 'manager', 'hr')
)
$$;

CREATE OR REPLACE FUNCTION public.is_employee_or_manager(employee_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.employee_profiles ep
    WHERE ep.user_id = employee_user_id 
    AND (ep.user_id = auth.uid() OR ep.manager_id = auth.uid() OR public.is_hr())
)
$$;

CREATE OR REPLACE FUNCTION public.can_view_employee_data(employee_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT (
    auth.uid() = employee_user_id OR 
    public.is_hr() OR 
    public.is_employee_or_manager(employee_user_id)
)
$$;

-- Functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'employee')::public.user_role
  );
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. RLS Policies
-- User profiles policies
CREATE POLICY "users_own_profile" ON public.user_profiles FOR ALL
USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "hr_can_view_all_profiles" ON public.user_profiles FOR SELECT
USING (public.is_hr());

-- Departments policies
CREATE POLICY "everyone_can_view_departments" ON public.departments FOR SELECT
TO authenticated USING (true);

CREATE POLICY "hr_can_manage_departments" ON public.departments FOR ALL
USING (public.is_hr()) WITH CHECK (public.is_hr());

-- Employee profiles policies
CREATE POLICY "employees_view_own_profile" ON public.employee_profiles FOR SELECT
USING (public.can_view_employee_data(user_id));

CREATE POLICY "hr_can_manage_employee_profiles" ON public.employee_profiles FOR ALL
USING (public.is_hr()) WITH CHECK (public.is_hr());

-- Attendance records policies
CREATE POLICY "employees_view_own_attendance" ON public.attendance_records FOR SELECT
USING (public.can_view_employee_data(employee_id));

CREATE POLICY "hr_can_manage_attendance" ON public.attendance_records FOR ALL
USING (public.is_hr()) WITH CHECK (public.is_hr());

CREATE POLICY "employees_can_checkin" ON public.attendance_records FOR INSERT
WITH CHECK (auth.uid() = employee_id);

-- Leave requests policies
CREATE POLICY "employees_manage_own_leave" ON public.leave_requests FOR ALL
USING (public.can_view_employee_data(employee_id)) 
WITH CHECK (auth.uid() = employee_id OR public.is_manager());

-- Payroll records policies
CREATE POLICY "employees_view_own_payroll" ON public.payroll_records FOR SELECT
USING (public.can_view_employee_data(employee_id));

CREATE POLICY "hr_can_manage_payroll" ON public.payroll_records FOR ALL
USING (public.is_hr()) WITH CHECK (public.is_hr());

-- Performance reviews policies
CREATE POLICY "review_participants_can_view" ON public.performance_reviews FOR SELECT
USING (
    auth.uid() = employee_id OR 
    auth.uid() = reviewer_id OR 
    public.is_hr()
);

CREATE POLICY "reviewers_can_manage_reviews" ON public.performance_reviews FOR ALL
USING (
    auth.uid() = reviewer_id OR 
    public.is_hr()
) WITH CHECK (
    auth.uid() = reviewer_id OR 
    public.is_hr()
);

-- 6. Sample Data for Testing
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    hr_uuid UUID := gen_random_uuid();
    manager_uuid UUID := gen_random_uuid();
    employee1_uuid UUID := gen_random_uuid();
    employee2_uuid UUID := gen_random_uuid();
    
    engineering_dept_id UUID := gen_random_uuid();
    hr_dept_id UUID := gen_random_uuid();
    marketing_dept_id UUID := gen_random_uuid();
    sales_dept_id UUID := gen_random_uuid();
    finance_dept_id UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@smartemployee360.com', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (hr_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'hr@smartemployee360.com', crypt('hr123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "HR Manager", "role": "hr"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (manager_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'manager@smartemployee360.com', crypt('manager123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Engineering Manager", "role": "manager"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (employee1_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'john.smith@smartemployee360.com', crypt('employee123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "John Smith", "role": "employee"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (employee2_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'sarah.johnson@smartemployee360.com', crypt('employee123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Sarah Johnson", "role": "employee"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create departments
    INSERT INTO public.departments (id, name, description, head_id, location) VALUES
        (engineering_dept_id, 'Engineering', 'Software development and technology', manager_uuid, 'San Francisco'),
        (hr_dept_id, 'Human Resources', 'Employee relations and talent management', hr_uuid, 'New York'),
        (marketing_dept_id, 'Marketing', 'Brand management and digital marketing', null, 'Los Angeles'),
        (sales_dept_id, 'Sales', 'Business development and client relations', null, 'Chicago'),
        (finance_dept_id, 'Finance', 'Financial planning and accounting', null, 'Boston');

    -- Create employee profiles
    INSERT INTO public.employee_profiles (
        user_id, employee_id, department_id, designation, manager_id, hire_date, 
        salary, gender, employment_type, status, location, skills
    ) VALUES
        (admin_uuid, 'EMP001', engineering_dept_id, 'Chief Technology Officer', null, '2020-01-15', 
         150000, 'male', 'full-time', 'active', 'San Francisco', '{"leadership", "strategy", "technology"}'),
        (hr_uuid, 'EMP002', hr_dept_id, 'HR Director', admin_uuid, '2020-03-20', 
         95000, 'female', 'full-time', 'active', 'New York', '{"hr-management", "recruitment", "employee-relations"}'),
        (manager_uuid, 'EMP003', engineering_dept_id, 'Engineering Manager', admin_uuid, '2021-06-10', 
         120000, 'male', 'full-time', 'active', 'San Francisco', '{"team-management", "software-architecture", "agile"}'),
        (employee1_uuid, 'EMP004', engineering_dept_id, 'Senior Software Engineer', manager_uuid, '2022-03-15', 
         95000, 'male', 'full-time', 'active', 'San Francisco', '{"javascript", "react", "node-js", "python"}'),
        (employee2_uuid, 'EMP005', marketing_dept_id, 'Marketing Specialist', hr_uuid, '2023-01-10', 
         65000, 'female', 'full-time', 'active', 'Los Angeles', '{"digital-marketing", "content-creation", "social-media"}');

    -- Create sample attendance records (last 30 days)
    INSERT INTO public.attendance_records (employee_id, date, check_in_time, check_out_time, status, hours_worked)
    SELECT 
        employee1_uuid,
        generate_series(CURRENT_DATE - INTERVAL '29 days', CURRENT_DATE, INTERVAL '1 day')::date,
        (generate_series(CURRENT_DATE - INTERVAL '29 days', CURRENT_DATE, INTERVAL '1 day') + TIME '09:00:00')::timestamptz,
        (generate_series(CURRENT_DATE - INTERVAL '29 days', CURRENT_DATE, INTERVAL '1 day') + TIME '18:00:00')::timestamptz,
        'present'::public.attendance_status,
        8.0;

    -- Create sample leave requests
    INSERT INTO public.leave_requests (employee_id, leave_type, start_date, end_date, days_requested, reason, status, approved_by, approved_at)
    VALUES
        (employee1_uuid, 'annual', CURRENT_DATE + INTERVAL '7 days', CURRENT_DATE + INTERVAL '9 days', 3, 'Family vacation', 'approved', manager_uuid, now()),
        (employee2_uuid, 'sick', CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE - INTERVAL '3 days', 3, 'Flu recovery', 'approved', hr_uuid, now() - INTERVAL '6 days');

    -- Create sample payroll records
    INSERT INTO public.payroll_records (employee_id, pay_period_start, pay_period_end, basic_salary, allowances, deductions, tax_deductions, net_salary)
    VALUES
        (employee1_uuid, CURRENT_DATE - INTERVAL '1 month', CURRENT_DATE, 7916.67, 500.00, 200.00, 1200.00, 7016.67),
        (employee2_uuid, CURRENT_DATE - INTERVAL '1 month', CURRENT_DATE, 5416.67, 300.00, 150.00, 800.00, 4766.67);

    -- Create sample performance reviews
    INSERT INTO public.performance_reviews (
        employee_id, reviewer_id, review_period_start, review_period_end, 
        overall_rating, goals_achievement, communication_skills, technical_skills, 
        teamwork, leadership, comments, goals_next_period
    ) VALUES
        (employee1_uuid, manager_uuid, CURRENT_DATE - INTERVAL '6 months', CURRENT_DATE - INTERVAL '1 day', 
         4, 4, 5, 5, 4, 3, 'Excellent technical skills and great team collaboration. Work on leadership development.', 
         'Lead a small team project and mentor junior developers'),
        (employee2_uuid, hr_uuid, CURRENT_DATE - INTERVAL '6 months', CURRENT_DATE - INTERVAL '1 day', 
         4, 4, 5, 4, 5, 4, 'Strong marketing skills and excellent communication. Great team player.', 
         'Develop advanced analytics skills and lead a marketing campaign');

END $$;