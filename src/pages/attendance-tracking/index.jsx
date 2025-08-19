import React, { useState, useEffect } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ClockInOutCard from './components/ClockInOutCard';
import AttendanceCalendar from './components/AttendanceCalendar';
import AttendanceSummary from './components/AttendanceSummary';
import ShiftSchedule from './components/ShiftSchedule';
import LocationMap from './components/LocationMap';
import BreakTracker from './components/BreakTracker';

const AttendanceTracking = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('out'); // 'in' or 'out'
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'calendar', 'schedule', 'location'

  // Mock user data
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'employee',
    employeeId: 'EMP001'
  };

  // Mock current shift
  const mockCurrentShift = {
    name: 'Morning Shift',
    startTime: '09:00',
    endTime: '17:00',
    breakTime: '12:00 - 13:00'
  };

  // Mock location data
  const mockLocationData = {
    lat: 40.7589,
    lng: -73.9851,
    address: '123 Business District, Downtown, NY 10001',
    accuracy: 15,
    timestamp: new Date()
  };

  // Mock notifications
  const mockNotifications = [
    {
      title: 'Shift Reminder',
      message: 'Your shift starts in 30 minutes',
      time: '30 minutes ago',
      read: false
    },
    {
      title: 'Break Time',
      message: 'Consider taking a break - you have been working for 3 hours',
      time: '1 hour ago',
      read: false
    }
  ];

  useEffect(() => {
    // Simulate location detection
    setCurrentLocation(mockLocationData);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleClockAction = async (action) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentStatus(action);
    
    // Reset break status when clocking out
    if (action === 'out') {
      setIsOnBreak(false);
    }
  };

  const handleBreakAction = async (action) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsOnBreak(action === 'start');
  };

  const handleLocationUpdate = (location) => {
    setCurrentLocation(location);
  };

  const isLocationVerified = currentLocation && currentLocation?.accuracy < 50;

  const tabItems = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'calendar', label: 'Calendar', icon: 'Calendar' },
    { id: 'schedule', label: 'Schedule', icon: 'Clock' },
    { id: 'location', label: 'Location', icon: 'MapPin' }
  ];

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
      {/* Main Content */}
      <main className={`transition-layout ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      } pt-16`}>
        <div className="p-6">
          {/* Breadcrumb Navigation */}
          <BreadcrumbNavigation />

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Attendance & Leave Management
            </h1>
            <p className="text-muted-foreground">
              Track attendance, manage breaks, request leave, and view team calendar
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
                  { id: 'calendar', label: 'Calendar', icon: 'Calendar' },
                  { id: 'leave', label: 'Leave Management', icon: 'Calendar' },
                  { id: 'schedule', label: 'Schedule', icon: 'Clock' }
                ].map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-micro ${
                      activeTab === tab?.id
                        ? 'border-accent text-accent' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <span className="text-base">
                      {tab?.label}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Clock In/Out and Break Tracker */}
              <div className="space-y-6">
                <ClockInOutCard
                  currentStatus={currentStatus}
                  onClockAction={handleClockAction}
                  currentShift={mockCurrentShift}
                  location={currentLocation}
                  isLocationVerified={isLocationVerified}
                />
                
                <BreakTracker
                  isOnBreak={isOnBreak}
                  onBreakAction={handleBreakAction}
                  breakHistory={[]}
                  dailyBreakLimit={60}
                />
              </div>

              {/* Middle Column - Attendance Summary */}
              <div>
                <AttendanceSummary />
              </div>

              {/* Right Column - Shift Schedule */}
              <div>
                <ShiftSchedule
                  shifts={[]}
                  currentShift={mockCurrentShift}
                />
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="max-w-4xl">
              <AttendanceCalendar
                attendanceData={[]}
                currentMonth={new Date()}
              />
            </div>
          )}

          {activeTab === 'leave' && (
            <div className="space-y-6">
              {/* Leave Balance Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { type: 'Vacation', available: 15, total: 20, color: 'bg-success' },
                  { type: 'Sick Leave', available: 8, total: 12, color: 'bg-warning' },
                  { type: 'Personal', available: 5, total: 8, color: 'bg-accent' }
                ].map((leave, index) => (
                  <div key={index} className="bg-card rounded-lg border border-border p-6 shadow-soft">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 ${leave.color} rounded-lg flex items-center justify-center`}>
                        <Icon name="Calendar" size={24} color="white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{leave.type}</h3>
                        <p className="text-sm text-muted-foreground">{leave.available} of {leave.total} days</p>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${leave.color}`}
                        style={{ width: `${(leave.available / leave.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Leave Request Form */}
              <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
                <h3 className="text-xl font-semibold text-foreground mb-6">Request Leave</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Leave Type"
                    options={[
                      { value: 'vacation', label: 'Vacation Leave' },
                      { value: 'sick', label: 'Sick Leave' },
                      { value: 'personal', label: 'Personal Leave' }
                    ]}
                    placeholder="Select leave type"
                  />
                  <Input label="Start Date" type="date" />
                  <Input label="End Date" type="date" />
                  <Select
                    label="Duration"
                    options={[
                      { value: 'full', label: 'Full Day' },
                      { value: 'half', label: 'Half Day' }
                    ]}
                    placeholder="Select duration"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-foreground mb-2">Reason</label>
                  <textarea
                    placeholder="Enter reason for leave..."
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="flex justify-end mt-6">
                  <Button iconName="Send" iconPosition="left">
                    Submit Request
                  </Button>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'schedule' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ShiftSchedule
                shifts={[]}
                currentShift={mockCurrentShift}
              />
              <BreakTracker
                isOnBreak={isOnBreak}
                onBreakAction={handleBreakAction}
                breakHistory={[]}
                dailyBreakLimit={60}
              />
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AttendanceTracking;