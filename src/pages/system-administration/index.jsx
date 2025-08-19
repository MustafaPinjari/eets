import React, { useState } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import AdminSidebar from './components/AdminSidebar';
import UserManagementPanel from './components/UserManagementPanel';
import SecuritySettingsPanel from './components/SecuritySettingsPanel';
import SystemConfigurationPanel from './components/SystemConfigurationPanel';
import AuditLogsPanel from './components/AuditLogsPanel';
import PerformanceMonitoringPanel from './components/PerformanceMonitoringPanel';
import Icon from '../../components/AppIcon';

const SystemAdministration = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [adminSidebarCollapsed, setAdminSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('user-management-users');

  // Mock user data
  const mockUser = {
    name: 'System Administrator',
    email: 'admin@company.com',
    role: 'admin'
  };

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      title: 'Security Alert',
      message: 'Multiple failed login attempts detected from IP 203.0.113.1',
      type: 'warning',
      read: false,
      timestamp: new Date(Date.now() - 10 * 60 * 1000)
    },
    {
      id: 2,
      title: 'System Update',
      message: 'Scheduled maintenance completed successfully',
      type: 'success',
      read: false,
      timestamp: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: 3,
      title: 'Backup Status',
      message: 'Daily backup completed with warnings',
      type: 'warning',
      read: true,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ];

  const customBreadcrumbs = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'System Administration', path: '/system-administration' }
  ];

  const renderMainContent = () => {
    // User Management sections
    if (activeSection?.startsWith('user-management')) {
      return <UserManagementPanel activeSubsection={activeSection} />;
    }
    
    // Security Settings sections
    if (activeSection?.startsWith('security-settings')) {
      return <SecuritySettingsPanel activeSubsection={activeSection} />;
    }
    
    // System Configuration sections
    if (activeSection?.startsWith('system-configuration')) {
      return <SystemConfigurationPanel activeSubsection={activeSection} />;
    }
    
    // Audit Logs sections
    if (activeSection?.startsWith('audit-logs')) {
      return <AuditLogsPanel activeSubsection={activeSection} />;
    }
    
    // Performance Monitoring sections
    if (activeSection?.startsWith('performance-monitoring')) {
      return <PerformanceMonitoringPanel activeSubsection={activeSection} />;
    }
    
    // Default view for other sections
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Icon name="Settings" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Feature Under Development</h3>
          <p className="text-muted-foreground">This administrative feature is currently being developed.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader
        onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        user={mockUser}
        notifications={mockNotifications}
      />
      {/* Main Layout */}
      <div className="flex pt-16">
        {/* Main Sidebar Navigation */}
        <SidebarNavigation
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          userRole={mockUser?.role}
        />

        {/* Admin Sidebar */}
        <div className={`transition-layout ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}`}>
          <AdminSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            isCollapsed={adminSidebarCollapsed}
          />
        </div>

        {/* Main Content Area */}
        <main className={`flex-1 transition-layout ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
        } ${adminSidebarCollapsed ? 'ml-16' : 'ml-72'}`}>
          <div className="p-6">
            {/* Breadcrumb Navigation */}
            <BreadcrumbNavigation customBreadcrumbs={customBreadcrumbs} />

            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Settings" size={24} color="white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">System Administration</h1>
                    <p className="text-muted-foreground">
                      Comprehensive system configuration and management tools
                    </p>
                  </div>
                </div>
                
                {/* Admin Sidebar Toggle */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAdminSidebarCollapsed(!adminSidebarCollapsed)}
                    className="p-2 rounded-lg border border-border hover:bg-muted transition-micro"
                    title={adminSidebarCollapsed ? 'Expand admin panel' : 'Collapse admin panel'}
                  >
                    <Icon 
                      name={adminSidebarCollapsed ? 'PanelLeftOpen' : 'PanelLeftClose'} 
                      size={20} 
                      className="text-muted-foreground"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* System Status Banner */}
            <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <div>
                  <p className="text-sm font-medium text-success">System Status: All Services Operational</p>
                  <p className="text-xs text-success/80">
                    Last updated: {new Date()?.toLocaleString()} | Uptime: 99.9% | Active Users: 247
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-card rounded-lg border border-border min-h-[600px]">
              <div className="p-6">
                {renderMainContent()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SystemAdministration;