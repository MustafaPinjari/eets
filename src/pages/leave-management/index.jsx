import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import NotificationPanel from '../../components/ui/NotificationPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import LeaveBalanceCard from './components/LeaveBalanceCard';
import LeaveRequestForm from './components/LeaveRequestForm';
import ApprovalWorkflow from './components/ApprovalWorkflow';
import LeaveHistoryTable from './components/LeaveHistoryTable';
import TeamLeaveCalendar from './components/TeamLeaveCalendar';
import LeaveStatistics from './components/LeaveStatistics';

const LeaveManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock user data
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'employee',
    avatar: '/assets/images/no_image.png'
  };

  // Mock leave balances
  const leaveBalances = {
    vacation: 15,
    sick: 8,
    personal: 5,
    maternity: 90,
    paternity: 15,
    bereavement: 3
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: 'Leave Request Approved',
      message: 'Your vacation leave request for Dec 25-29 has been approved.',
      type: 'success',
      read: false,
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: 2,
      title: 'Timesheet Reminder',
      message: 'Please submit your timesheet for the current week.',
      type: 'warning',
      read: false,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ];

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLeaveRequestSubmit = async (formData) => {
    // Mock API call
    console.log('Submitting leave request:', formData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message (in real app, this would be handled by a toast/notification system)
    alert('Leave request submitted successfully!');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'request', label: 'New Request', icon: 'Plus' },
    { id: 'history', label: 'History', icon: 'History' },
    { id: 'calendar', label: 'Team Calendar', icon: 'Calendar' },
    { id: 'statistics', label: 'Statistics', icon: 'BarChart3' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Leave Balance Cards */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Leave Balances</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <LeaveBalanceCard
                  leaveType="Vacation Leave"
                  available={leaveBalances?.vacation}
                  total={20}
                  accrualRate="1.67 days/month"
                  policyLink="/policies/vacation"
                  color="success"
                  icon="Palmtree"
                />
                <LeaveBalanceCard
                  leaveType="Sick Leave"
                  available={leaveBalances?.sick}
                  total={12}
                  accrualRate="1 day/month"
                  policyLink="/policies/sick"
                  color="warning"
                  icon="Heart"
                />
                <LeaveBalanceCard
                  leaveType="Personal Leave"
                  available={leaveBalances?.personal}
                  total={8}
                  accrualRate="0.67 days/month"
                  policyLink="/policies/personal"
                  color="accent"
                  icon="User"
                />
              </div>
            </div>
            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('request')}
                  iconName="Plus"
                  iconPosition="left"
                  fullWidth
                >
                  New Leave Request
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('history')}
                  iconName="History"
                  iconPosition="left"
                  fullWidth
                >
                  View History
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('calendar')}
                  iconName="Calendar"
                  iconPosition="left"
                  fullWidth
                >
                  Team Calendar
                </Button>
              </div>
            </div>
            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground">
                      Vacation leave request approved
                    </p>
                    <p className="text-xs text-muted-foreground">Dec 25-29, 2024 • Approved by Sarah Johnson</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <Icon name="Clock" size={20} className="text-warning" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground">
                      Personal leave request pending
                    </p>
                    <p className="text-xs text-muted-foreground">Oct 20, 2024 • Waiting for manager approval</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'request':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <LeaveRequestForm
                  onSubmit={handleLeaveRequestSubmit}
                  availableBalances={leaveBalances}
                />
              </div>
              <div>
                <ApprovalWorkflow />
              </div>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="space-y-8">
            <LeaveHistoryTable />
          </div>
        );

      case 'calendar':
        return (
          <div className="space-y-8">
            <TeamLeaveCalendar />
          </div>
        );

      case 'statistics':
        return (
          <div className="space-y-8">
            <LeaveStatistics />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Leave Management - Enterprise EMS</title>
        <meta name="description" content="Manage leave requests, view balances, and track team availability in the Enterprise Employee Management System." />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Global Header */}
        <GlobalHeader
          onSidebarToggle={handleSidebarToggle}
          user={mockUser}
          notifications={notifications}
        />

        {/* Sidebar Navigation */}
        <SidebarNavigation
          isCollapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
          userRole={mockUser?.role}
        />

        {/* Main Content */}
        <main className={`transition-layout ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
        } pt-16`}>
          <div className="p-6 max-w-7xl mx-auto">
            {/* Breadcrumb Navigation */}
            <BreadcrumbNavigation />

            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Leave Management</h1>
                <p className="text-muted-foreground mt-2">
                  Manage your time-off requests and view team availability
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  iconName="Bell"
                  iconPosition="left"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  Notifications
                </Button>
                <Button
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setActiveTab('request')}
                >
                  New Request
                </Button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-border mb-8">
              <nav className="flex space-x-8">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-micro ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    {tab?.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {renderTabContent()}
          </div>
        </main>

        {/* Notification Panel */}
        <NotificationPanel
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
          notifications={notifications}
          onMarkAsRead={(notificationId) => {
            console.log('Marking notification as read:', notificationId);
            // In a real app, this would update the notification state
          }}
          onMarkAllAsRead={() => {
            console.log('Marking all notifications as read');
            // In a real app, this would update all notifications state
          }}
          onNotificationClick={(notification) => {
            console.log('Notification clicked:', notification);
            // In a real app, this would handle notification click actions
          }}
        />
      </div>
    </>
  );
};

export default LeaveManagement;