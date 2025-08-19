import React, { useState, useEffect } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ProfileHeader from './components/ProfileHeader';
import TabNavigation from './components/TabNavigation';
import PersonalTab from './components/PersonalTab';
import JobDetailsTab from './components/JobDetailsTab';
import CompensationTab from './components/CompensationTab';
import DocumentsTab from './components/DocumentsTab';
import AssetsTab from './components/AssetsTab';
import AuditTrail from './components/AuditTrail';

const EmployeeProfileManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showAuditTrail, setShowAuditTrail] = useState(false);
  const [userRole, setUserRole] = useState('employee'); // Mock user role

  // Mock employee data
  const employee = {
    id: 'EMP-2024-001',
    employeeId: 'EMP001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 987-6543',
    alternatePhone: '+1 (555) 123-4567',
    personalEmail: 'john.doe.personal@gmail.com',
    dateOfBirth: '1990-05-15',
    gender: 'male',
    maritalStatus: 'married',
    nationality: 'American',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'us',
    jobTitle: 'Senior Software Developer',
    department: 'Engineering',
    division: 'Technology',
    location: 'New York Office',
    workLocation: 'hybrid',
    employmentType: 'full-time',
    employmentStatus: 'active',
    status: 'Active',
    joinDate: '2022-06-15',
    probationEndDate: '2022-12-15',
    reportsTo: 'Sarah Johnson',
    directReports: 0,
    costCenter: 'ENG-001',
    workSchedule: 'standard',
    timeZone: 'EST',
    workPhone: '+1 (555) 987-6543',
    workEmail: 'john.doe@company.com',
    yearsOfService: 2,
    profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    baseSalary: 85000,
    currency: 'USD',
    payFrequency: 'bi-weekly',
    effectiveDate: '2024-01-01',
    salaryGrade: 'Grade 5',
    salaryStep: 'Step 3',
    overtimeEligible: true,
    bonusEligible: true,
    commissionEligible: false,
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
    certifications: [
      {
        id: 1,
        name: 'AWS Solutions Architect',
        issuer: 'Amazon Web Services',
        issueDate: '2023-09-20',
        expiryDate: '2026-09-20'
      },
      {
        id: 2,
        name: 'Certified Scrum Master',
        issuer: 'Scrum Alliance',
        issueDate: '2023-03-15',
        expiryDate: null
      }
    ],
    emergencyContacts: [
      {
        id: 1,
        name: 'Jane Doe',
        relationship: 'spouse',
        phone: '+1 (555) 111-2222',
        email: 'jane.doe@gmail.com'
      },
      {
        id: 2,
        name: 'Robert Doe',
        relationship: 'parent',
        phone: '+1 (555) 333-4444',
        email: 'robert.doe@gmail.com'
      }
    ],
    isCurrentUser: true // Mock flag to determine if this is the current user's profile
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: 'Profile Update Required',
      message: 'Please update your emergency contact information.',
      type: 'warning',
      read: false,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      title: 'Document Expiring',
      message: 'Your passport copy will expire in 30 days.',
      type: 'warning',
      read: false,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
    }
  ];

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (tabData) => {
    // Handle save logic here
    console.log('Saving data:', tabData);
    setIsEditing(false);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Auto-save any pending changes when switching tabs
    if (isEditing) {
      setIsEditing(false);
    }
  };

  // Auto-save functionality
  useEffect(() => {
    let autoSaveTimer;
    if (isEditing) {
      autoSaveTimer = setTimeout(() => {
        // Auto-save logic here
        console.log('Auto-saving changes...');
      }, 30000); // Auto-save every 30 seconds
    }
    return () => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }
    };
  }, [isEditing]);

  // Custom breadcrumbs
  const breadcrumbs = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Employee Directory', path: '/employee-directory' },
    { label: `${employee?.firstName} ${employee?.lastName}`, path: '/employee-profile-management' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalTab
            employee={employee}
            isEditing={isEditing}
            onSave={handleSave}
            userRole={userRole}
          />
        );
      case 'job':
        return (
          <JobDetailsTab
            employee={employee}
            isEditing={isEditing}
            onSave={handleSave}
            userRole={userRole}
          />
        );
      case 'compensation':
        return (
          <CompensationTab
            employee={employee}
            isEditing={isEditing}
            onSave={handleSave}
            userRole={userRole}
          />
        );
      case 'documents':
        return (
          <DocumentsTab
            employee={employee}
            isEditing={isEditing}
            onSave={handleSave}
            userRole={userRole}
          />
        );
      case 'assets':
        return (
          <AssetsTab
            employee={employee}
            isEditing={isEditing}
            onSave={handleSave}
            userRole={userRole}
          />
        );
      default:
        return (
          <PersonalTab
            employee={employee}
            isEditing={isEditing}
            onSave={handleSave}
            userRole={userRole}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader
        onSidebarToggle={handleSidebarToggle}
        notifications={notifications}
      />

      {/* Sidebar Navigation */}
      <SidebarNavigation
        isCollapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
        userRole={userRole}
      />

      {/* Main Content */}
      <main className={`transition-layout ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      } pt-16`}>
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Breadcrumb Navigation */}
          <BreadcrumbNavigation customBreadcrumbs={breadcrumbs} />

          {/* Profile Header */}
          <ProfileHeader
            employee={employee}
            isEditing={isEditing}
            onEditToggle={handleEditToggle}
            userRole={userRole}
          />

          {/* Tab Navigation */}
          <TabNavigation
            activeTab={activeTab}
            onTabChange={handleTabChange}
            userRole={userRole}
          />

          {/* Tab Content */}
          <div className="mb-8">
            {renderTabContent()}
          </div>

          {/* Auto-save Indicator */}
          {isEditing && (
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-2 rounded-full shadow-elevated text-sm font-medium z-40">
              Changes will be auto-saved
            </div>
          )}
        </div>
      </main>

      {/* Audit Trail Sidebar */}
      <AuditTrail
        employee={employee}
        isVisible={showAuditTrail}
        onToggle={() => setShowAuditTrail(!showAuditTrail)}
        userRole={userRole}
      />

      {/* Overlay for mobile sidebar */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-[998] lg:hidden"
          onClick={handleSidebarToggle}
        />
      )}
    </div>
  );
};

export default EmployeeProfileManagement;