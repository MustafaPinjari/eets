import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TeamLeaveCalendar = ({ teamLeaves = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // month, week

  const mockTeamLeaves = teamLeaves?.length > 0 ? teamLeaves : [
    {
      id: 1,
      employeeName: 'John Smith',
      employeeId: 'EMP001',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      leaveType: 'Vacation',
      startDate: '2024-12-25',
      endDate: '2024-12-29',
      status: 'approved',
      color: 'bg-success'
    },
    {
      id: 2,
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP002',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
      leaveType: 'Sick Leave',
      startDate: '2024-12-20',
      endDate: '2024-12-21',
      status: 'approved',
      color: 'bg-warning'
    },
    {
      id: 3,
      employeeName: 'Mike Davis',
      employeeId: 'EMP003',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      leaveType: 'Personal',
      startDate: '2024-12-30',
      endDate: '2024-12-31',
      status: 'pending',
      color: 'bg-accent'
    }
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)?.getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)?.getDay();
  };

  const formatMonthYear = (date) => {
    return date?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const isDateInRange = (date, startDate, endDate) => {
    const checkDate = new Date(date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    checkDate?.setHours(0, 0, 0, 0);
    start?.setHours(0, 0, 0, 0);
    end?.setHours(0, 0, 0, 0);
    
    return checkDate >= start && checkDate <= end;
  };

  const getLeavesForDate = (date) => {
    return mockTeamLeaves?.filter(leave => 
      isDateInRange(date, leave?.startDate, leave?.endDate)
    );
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate?.setMonth(prev?.getMonth() + direction);
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days?.push(
        <div key={`empty-${i}`} className="h-24 border border-border bg-muted/20"></div>
      );
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const leavesForDay = getLeavesForDate(date);
      const isToday = new Date()?.toDateString() === date?.toDateString();
      
      days?.push(
        <div
          key={day}
          className={`h-24 border border-border bg-card hover:bg-muted/30 transition-micro relative ${
            isToday ? 'ring-2 ring-primary' : ''
          }`}
        >
          <div className={`p-2 text-sm font-medium ${
            isToday ? 'text-primary' : 'text-card-foreground'
          }`}>
            {day}
          </div>
          
          {leavesForDay?.length > 0 && (
            <div className="absolute inset-x-1 bottom-1 space-y-1">
              {leavesForDay?.slice(0, 2)?.map((leave, index) => (
                <div
                  key={`${leave?.id}-${index}`}
                  className={`text-xs px-1 py-0.5 rounded text-white truncate ${leave?.color}`}
                  title={`${leave?.employeeName} - ${leave?.leaveType}`}
                >
                  {leave?.employeeName?.split(' ')?.[0]}
                </div>
              ))}
              {leavesForDay?.length > 2 && (
                <div className="text-xs px-1 py-0.5 bg-muted text-muted-foreground rounded">
                  +{leavesForDay?.length - 2} more
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  const getLeaveTypeColor = (type) => {
    const colors = {
      'Vacation': 'bg-success',
      'Sick Leave': 'bg-warning',
      'Personal': 'bg-accent',
      'Maternity': 'bg-secondary',
      'Paternity': 'bg-primary'
    };
    return colors?.[type] || 'bg-muted';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">Team Leave Calendar</h2>
              <p className="text-sm text-muted-foreground">View team availability and conflicts</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              onClick={() => navigateMonth(-1)}
            />
            <h3 className="text-lg font-semibold text-card-foreground min-w-[200px] text-center">
              {formatMonthYear(currentDate)}
            </h3>
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              onClick={() => navigateMonth(1)}
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
        </div>
      </div>
      {/* Calendar Grid */}
      <div className="p-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-0 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-0 border border-border rounded-lg overflow-hidden">
          {renderCalendarDays()}
        </div>
      </div>
      {/* Legend */}
      <div className="p-6 border-t border-border">
        <h4 className="font-medium text-card-foreground mb-3">Leave Types</h4>
        <div className="flex flex-wrap gap-4">
          {[
            { type: 'Vacation', color: 'bg-success' },
            { type: 'Sick Leave', color: 'bg-warning' },
            { type: 'Personal', color: 'bg-accent' },
            { type: 'Maternity', color: 'bg-secondary' },
            { type: 'Paternity', color: 'bg-primary' }
          ]?.map(({ type, color }) => (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded ${color}`}></div>
              <span className="text-sm text-muted-foreground">{type}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Upcoming Leaves */}
      <div className="p-6 border-t border-border">
        <h4 className="font-medium text-card-foreground mb-4">Upcoming Team Leaves</h4>
        <div className="space-y-3">
          {mockTeamLeaves?.filter(leave => new Date(leave.startDate) >= new Date())?.slice(0, 3)?.map(leave => (
              <div key={leave?.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="User" size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-card-foreground">{leave?.employeeName}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${leave?.color} text-white`}>
                      {leave?.leaveType}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(leave.startDate)?.toLocaleDateString()} - {new Date(leave.endDate)?.toLocaleDateString()}
                  </p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  leave?.status === 'approved' ? 'bg-success/10 text-success' :
                  leave?.status === 'pending'? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'
                }`}>
                  {leave?.status}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TeamLeaveCalendar;