import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AttendanceTracking from './pages/attendance-tracking';
import LeaveManagement from './pages/leave-management';
import LoginScreen from './pages/login-screen';
import SystemAdministration from './pages/system-administration';
import Dashboard from './pages/dashboard';
import EmployeeProfileManagement from './pages/employee-profile-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AttendanceTracking />} />
        <Route path="/attendance-tracking" element={<AttendanceTracking />} />
        <Route path="/leave-management" element={<LeaveManagement />} />
        <Route path="/login-screen" element={<LoginScreen />} />
        <Route path="/system-administration" element={<SystemAdministration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee-profile-management" element={<EmployeeProfileManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
