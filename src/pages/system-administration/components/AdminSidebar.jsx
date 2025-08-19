import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AdminSidebar = ({ activeSection, onSectionChange, isCollapsed = false }) => {
  const adminSections = [
    {
      id: 'user-management',
      label: 'User Management',
      icon: 'Users',
      subsections: [
        { id: 'users', label: 'Users' },
        { id: 'roles', label: 'Roles & Permissions' },
        { id: 'groups', label: 'User Groups' },
        { id: 'bulk-operations', label: 'Bulk Operations' }
      ]
    },
    {
      id: 'security-settings',
      label: 'Security Settings',
      icon: 'Shield',
      subsections: [
        { id: 'password-policy', label: 'Password Policy' },
        { id: 'session-management', label: 'Session Management' },
        { id: 'two-factor-auth', label: 'Two-Factor Auth' },
        { id: 'security-monitoring', label: 'Security Monitoring' }
      ]
    },
    {
      id: 'system-configuration',
      label: 'System Configuration',
      icon: 'Settings',
      subsections: [
        { id: 'organization', label: 'Organization Settings' },
        { id: 'holidays', label: 'Holiday Calendar' },
        { id: 'workflows', label: 'Workflow Configuration' },
        { id: 'notifications', label: 'Notification Settings' }
      ]
    },
    {
      id: 'audit-logs',
      label: 'Audit Logs',
      icon: 'FileText',
      subsections: [
        { id: 'activity-logs', label: 'Activity Logs' },
        { id: 'login-logs', label: 'Login Logs' },
        { id: 'system-logs', label: 'System Logs' },
        { id: 'compliance-reports', label: 'Compliance Reports' }
      ]
    },
    {
      id: 'integration-management',
      label: 'Integration Management',
      icon: 'Link',
      subsections: [
        { id: 'sso-config', label: 'SSO Configuration' },
        { id: 'ldap-sync', label: 'LDAP Synchronization' },
        { id: 'api-management', label: 'API Management' },
        { id: 'webhooks', label: 'Webhooks' }
      ]
    },
    {
      id: 'backup-restore',
      label: 'Backup & Restore',
      icon: 'Database',
      subsections: [
        { id: 'backup-schedule', label: 'Backup Schedule' },
        { id: 'restore-points', label: 'Restore Points' },
        { id: 'data-integrity', label: 'Data Integrity' },
        { id: 'migration-tools', label: 'Migration Tools' }
      ]
    },
    {
      id: 'performance-monitoring',
      label: 'Performance Monitoring',
      icon: 'Activity',
      subsections: [
        { id: 'system-health', label: 'System Health' },
        { id: 'capacity-planning', label: 'Capacity Planning' },
        { id: 'optimization', label: 'Optimization' },
        { id: 'alerts', label: 'Alerts & Notifications' }
      ]
    }
  ];

  const [expandedSections, setExpandedSections] = React.useState(['user-management']);

  const toggleSection = (sectionId) => {
    if (isCollapsed) return;
    
    setExpandedSections(prev => 
      prev?.includes(sectionId) 
        ? prev?.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleSubsectionClick = (sectionId, subsectionId) => {
    onSectionChange(`${sectionId}-${subsectionId}`);
  };

  return (
    <div className={`bg-card border-r border-border h-full transition-layout ${
      isCollapsed ? 'w-16' : 'w-72'
    }`}>
      <div className="p-4 border-b border-border">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={20} color="white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-lg text-foreground">System Admin</h2>
              <p className="text-xs text-muted-foreground">Configuration & Management</p>
            </div>
          )}
        </div>
      </div>
      <nav className="p-2 space-y-1 overflow-y-auto h-full">
        {adminSections?.map((section) => (
          <div key={section?.id} className="relative group">
            <button
              onClick={() => toggleSection(section?.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-micro text-left ${
                activeSection?.startsWith(section?.id)
                  ? 'bg-accent text-accent-foreground'
                  : 'text-foreground hover:bg-muted'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Icon name={section?.icon} size={20} className="flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="font-medium flex-1">{section?.label}</span>
                  <Icon 
                    name="ChevronDown" 
                    size={16} 
                    className={`transition-transform ${
                      expandedSections?.includes(section?.id) ? 'rotate-180' : ''
                    }`}
                  />
                </>
              )}
            </button>

            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-elevated opacity-0 group-hover:opacity-100 transition-micro pointer-events-none whitespace-nowrap z-[1002]">
                {section?.label}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-popover"></div>
              </div>
            )}

            {/* Subsections */}
            {!isCollapsed && expandedSections?.includes(section?.id) && (
              <div className="ml-6 mt-1 space-y-1">
                {section?.subsections?.map((subsection) => (
                  <button
                    key={subsection?.id}
                    onClick={() => handleSubsectionClick(section?.id, subsection?.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md transition-micro text-left text-sm ${
                      activeSection === `${section?.id}-${subsection?.id}`
                        ? 'bg-secondary text-secondary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60" />
                    {subsection?.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;