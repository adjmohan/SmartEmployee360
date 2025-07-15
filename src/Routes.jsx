import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Dashboard from "pages/dashboard";
import AiChatbotInterface from "pages/ai-chatbot-interface";
import PayrollManagement from "pages/payroll-management";
import AttendanceManagement from "pages/attendance-management";
import PerformanceReviews from "pages/performance-reviews";
import EmployeeManagement from "pages/employee-management";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import ForgotPassword from "pages/auth/ForgotPassword";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Application routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-chatbot-interface" element={<AiChatbotInterface />} />
        <Route path="/payroll-management" element={<PayrollManagement />} />
        <Route path="/attendance-management" element={<AttendanceManagement />} />
        <Route path="/performance-reviews" element={<PerformanceReviews />} />
        <Route path="/employee-management" element={<EmployeeManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;