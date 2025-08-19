import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginScreen from './pages/login-screen';
import Dashboard from './pages/dashboard';
import EmployeeDirectory from './pages/employee-directory';
import EmployeeProfileManagement from './pages/employee-profile-management';
import AttendanceTracking from './pages/attendance-tracking';
import LeaveManagement from './pages/leave-management';
import TimesheetsPerformance from './pages/timesheets-performance';
import AdminReports from './pages/admin-reports';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee-directory" element={<EmployeeDirectory />} />
        <Route path="/employee-profile-management" element={<EmployeeProfileManagement />} />
        <Route path="/attendance-tracking" element={<AttendanceTracking />} />
        <Route path="/leave-management" element={<LeaveManagement />} />
        <Route path="/timesheets-performance" element={<TimesheetsPerformance />} />
        <Route path="/admin-reports" element={<AdminReports />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
