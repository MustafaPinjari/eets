import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import NotificationPanel from '../../components/ui/NotificationPanel';
import WelcomeCard from './components/WelcomeCard';
import QuickActionsCard from './components/QuickActionsCard';
import StatsCard from './components/StatsCard';
import AttendanceWidget from './components/AttendanceWidget';
import LeaveBalanceWidget from './components/LeaveBalanceWidget';
import RecentActivityWidget from './components/RecentActivityWidget';
import TeamOverviewWidget from './components/TeamOverviewWidget';
import AnnouncementsWidget from './components/AnnouncementsWidget';
import UpcomingEventsWidget from './components/UpcomingEventsWidget';

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock user data - in real app this would come from auth context
  const mockUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "manager", // employee, manager, hr, admin
    department: "Engineering",
    avatar: "/assets/images/no_image.png"
  };

  // Mock attendance data
  const mockAttendanceData = {
    status: 'present',
    clockIn: new Date(new Date().setHours(9, 15, 0, 0)),
    clockOut: null
  };

  // Mock leave balance data
  const mockLeaveData = {
    annual: { available: 18, total: 25 },
    sick: { available: 8, total: 12 },
    personal: { available: 3, total: 5 }
  };

  // Mock team data for managers/HR/admin
  const mockTeamData = {
    present: 24,
    late: 3,
    absent: 2,
    onLeave: 4,
    members: [
      { name: "John Smith", department: "Engineering", status: "present" },
      { name: "Emily Davis", department: "Engineering", status: "late" },
      { name: "Michael Brown", department: "Design", status: "present" },
      { name: "Lisa Wilson", department: "QA", status: "on_leave" },
      { name: "David Miller", department: "Engineering", status: "present" },
      { name: "Anna Taylor", department: "Design", status: "absent" },
      { name: "James Anderson", department: "Engineering", status: "present" },
      { name: "Maria Garcia", department: "QA", status: "present" }
    ]
  };

  // Mock recent activities
  const mockActivities = [
    {
      type: 'leave_approved',
      title: 'Leave Request Approved',
      description: 'Your vacation leave for Dec 25-29 has been approved.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      type: 'attendance_marked',
      title: 'Attendance Marked',
      description: 'You clocked in at 9:15 AM today.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      type: 'profile_updated',
      title: 'Profile Updated',
      description: 'Emergency contact information updated successfully.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      type: 'document_uploaded',
      title: 'Document Uploaded',
      description: 'Tax declaration form uploaded for review.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
  ];

  // Mock announcements
  const mockAnnouncements = [
    {
      id: 1,
      title: 'Holiday Schedule Update',
      content: `Please note the updated holiday schedule for the upcoming festive season. The office will be closed from December 24th to January 2nd.\n\nAll employees are requested to complete their pending tasks before the holiday period. Emergency contacts will be available during this time.`,
      author: 'HR Department',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      priority: 'high'
    },
    {
      id: 2,
      title: 'New Employee Wellness Program',
      content: `We're excited to announce our new employee wellness program starting next month. This includes gym memberships, mental health support, and flexible working hours.\n\nRegistration opens next week. More details will be shared via email.`,
      author: 'People Operations',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      priority: 'medium'
    },
    {
      id: 3,
      title: 'System Maintenance Notice',
      content: `Scheduled system maintenance will occur this weekend from 2:00 AM to 6:00 AM on Saturday. All systems will be temporarily unavailable during this time.\n\nPlease save your work and log out before the maintenance window.`,
      author: 'IT Department',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      priority: 'low'
    }
  ];

  // Mock upcoming events
  const mockEvents = [
    {
      id: 1,
      title: 'Team Standup Meeting',
      date: new Date(),
      time: '10:00 AM',
      location: 'Conference Room A',
      type: 'meeting',
      isToday: true
    },
    {
      id: 2,
      title: 'Christmas Holiday',
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      time: 'All Day',
      location: 'Company Wide',
      type: 'holiday'
    },
    {
      id: 3,
      title: 'React Training Workshop',
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      time: '2:00 PM',
      location: 'Training Room',
      type: 'training'
    },
    {
      id: 4,
      title: 'Project Deadline',
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      time: '5:00 PM',
      location: 'Development Team',
      type: 'deadline'
    },
    {
      id: 5,
      title: 'John Smith Birthday',
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      time: '12:00 PM',
      location: 'Office Cafeteria',
      type: 'birthday'
    }
  ];

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      title: 'Leave Request Approved',
      message: 'Your vacation leave request for Dec 25-29 has been approved by your manager.',
      type: 'success',
      read: false,
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: 2,
      title: 'Timesheet Reminder',
      message: 'Please submit your timesheet for the current week by Friday.',
      type: 'warning',
      read: false,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ];

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleClockAction = () => {
    // Mock clock in/out action
    console.log('Clock action triggered');
    // In real app, this would make API call to clock in/out
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
    setShowNotifications(false);
  };

  const getStatsData = () => {
    switch (mockUser?.role) {
      case 'admin': case'hr':
        return [
          {
            title: 'Total Employees',
            value: '247',
            subtitle: 'Active employees',
            icon: 'Users',
            trend: 'up',
            trendValue: '+5.2%',
            color: 'primary'
          },
          {
            title: 'Present Today',
            value: '231',
            subtitle: '93.5% attendance',
            icon: 'CheckCircle',
            trend: 'up',
            trendValue: '+2.1%',
            color: 'success'
          },
          {
            title: 'Pending Approvals',
            value: '12',
            subtitle: 'Leave requests',
            icon: 'Clock',
            trend: 'neutral',
            trendValue: '0%',
            color: 'warning'
          },
          {
            title: 'New Hires',
            value: '8',
            subtitle: 'This month',
            icon: 'UserPlus',
            trend: 'up',
            trendValue: '+33%',
            color: 'accent'
          }
        ];
      case 'manager':
        return [
          {
            title: 'Team Size',
            value: '12',
            subtitle: 'Direct reports',
            icon: 'Users',
            color: 'primary'
          },
          {
            title: 'Present Today',
            value: '11',
            subtitle: '91.7% attendance',
            icon: 'CheckCircle',
            trend: 'up',
            trendValue: '+5%',
            color: 'success'
          },
          {
            title: 'Pending Reviews',
            value: '3',
            subtitle: 'Performance reviews',
            icon: 'FileText',
            color: 'warning'
          },
          {
            title: 'Team Utilization',
            value: '87%',
            subtitle: 'Current sprint',
            icon: 'TrendingUp',
            trend: 'up',
            trendValue: '+3%',
            color: 'accent'
          }
        ];
      default: // employee
        return [
          {
            title: 'Working Hours',
            value: '7.5h',
            subtitle: 'Today',
            icon: 'Clock',
            color: 'primary'
          },
          {
            title: 'Leave Balance',
            value: '18',
            subtitle: 'Days remaining',
            icon: 'Calendar',
            color: 'success'
          },
          {
            title: 'Tasks Completed',
            value: '24',
            subtitle: 'This week',
            icon: 'CheckSquare',
            trend: 'up',
            trendValue: '+12%',
            color: 'accent'
          },
          {
            title: 'Performance',
            value: '4.2',
            subtitle: 'Rating (out of 5)',
            icon: 'Star',
            color: 'secondary'
          }
        ];
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader
        onSidebarToggle={handleSidebarToggle}
        user={mockUser}
        notifications={mockNotifications}
      />
      {/* Sidebar Navigation */}
      <SidebarNavigation
        isCollapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
        userRole={mockUser?.role}
      />
      {/* Notification Panel */}
      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={mockNotifications}
        onNotificationClick={handleNotificationClick}
        onMarkAsRead={() => {}}
        onMarkAllAsRead={() => {}}
      />
      {/* Main Content */}
      <main className={`pt-16 transition-layout ${
        sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-72'
      }`}>
        <div className="p-6">
          {/* Breadcrumb */}
          <BreadcrumbNavigation />

          {/* Welcome Section */}
          <div className="mb-8">
            <WelcomeCard user={mockUser} currentTime={currentTime} />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {getStatsData()?.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat?.title}
                value={stat?.value}
                subtitle={stat?.subtitle}
                icon={stat?.icon}
                trend={stat?.trend}
                trendValue={stat?.trendValue}
                color={stat?.color}
              />
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <QuickActionsCard userRole={mockUser?.role} />

              {/* Team Overview (for managers/HR/admin only) */}
              <TeamOverviewWidget teamData={mockTeamData} userRole={mockUser?.role} />

              {/* Recent Activity */}
              <RecentActivityWidget activities={mockActivities} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Attendance Widget */}
              <AttendanceWidget
                attendanceData={mockAttendanceData}
                onClockAction={handleClockAction}
              />

              {/* Leave Balance */}
              <LeaveBalanceWidget leaveData={mockLeaveData} />

              {/* Announcements */}
              <AnnouncementsWidget announcements={mockAnnouncements} />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Events */}
            <UpcomingEventsWidget events={mockEvents} />

            {/* Additional widget space for future features */}
            <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded w-32 animate-pulse" />
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-muted rounded w-full animate-pulse" />
                <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">More features coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;