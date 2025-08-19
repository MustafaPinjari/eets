import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttendanceCalendar = ({ attendanceData = [], currentMonth = new Date() }) => {
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'
  const [selectedDate, setSelectedDate] = useState(currentMonth);

  // Mock attendance data
  const mockAttendanceData = attendanceData?.length > 0 ? attendanceData : [
    { date: '2025-01-15', status: 'present', hoursWorked: 8.5, clockIn: '09:00', clockOut: '17:30' },
    { date: '2025-01-16', status: 'present', hoursWorked: 8.0, clockIn: '09:15', clockOut: '17:15' },
    { date: '2025-01-17', status: 'late', hoursWorked: 7.5, clockIn: '09:45', clockOut: '17:15' },
    { date: '2025-01-18', status: 'absent', hoursWorked: 0, reason: 'Sick Leave' },
    { date: '2025-01-19', status: 'present', hoursWorked: 9.0, clockIn: '08:30', clockOut: '17:30' },
    { date: '2025-01-20', status: 'partial', hoursWorked: 4.0, clockIn: '09:00', clockOut: '13:00' },
    { date: '2025-01-21', status: 'present', hoursWorked: 8.0, clockIn: '09:00', clockOut: '17:00' },
    { date: '2025-01-22', status: 'present', hoursWorked: 8.5, clockIn: '08:45', clockOut: '17:15' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-success text-success-foreground';
      case 'absent':
        return 'bg-destructive text-destructive-foreground';
      case 'late':
        return 'bg-warning text-warning-foreground';
      case 'partial':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return 'CheckCircle';
      case 'absent':
        return 'XCircle';
      case 'late':
        return 'Clock';
      case 'partial':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1)?.padStart(2, '0')}-${String(day)?.padStart(2, '0')}`;
      const attendanceRecord = mockAttendanceData?.find(record => record?.date === dateStr);
      days?.push({
        day,
        date: dateStr,
        attendance: attendanceRecord
      });
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate?.setMonth(newDate?.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const formatMonthYear = (date) => {
    return date?.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  const days = getDaysInMonth(selectedDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Attendance Calendar</h3>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('month')}
          >
            Month
          </Button>
          <Button
            variant={viewMode === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('week')}
          >
            Week
          </Button>
        </div>
      </div>
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth(-1)}
          iconName="ChevronLeft"
          iconSize={20}
        >
          <span className="sr-only">Previous month</span>
        </Button>
        
        <h4 className="text-xl font-semibold text-foreground">
          {formatMonthYear(selectedDate)}
        </h4>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth(1)}
          iconName="ChevronRight"
          iconSize={20}
        >
          <span className="sr-only">Next month</span>
        </Button>
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {/* Week day headers */}
        {weekDays?.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {days?.map((dayData, index) => (
          <div key={index} className="aspect-square">
            {dayData ? (
              <div className="h-full p-1">
                <div className={`h-full rounded-lg border border-border hover:border-primary/50 transition-micro cursor-pointer relative ${
                  dayData?.attendance ? getStatusColor(dayData?.attendance?.status) : 'bg-background'
                }`}>
                  <div className="p-2 h-full flex flex-col">
                    <div className="text-sm font-medium mb-1">
                      {dayData?.day}
                    </div>
                    {dayData?.attendance && (
                      <div className="flex-1 flex items-center justify-center">
                        <Icon 
                          name={getStatusIcon(dayData?.attendance?.status)} 
                          size={16} 
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full" />
            )}
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-border">
        {[
          { status: 'present', label: 'Present', count: 5 },
          { status: 'absent', label: 'Absent', count: 1 },
          { status: 'late', label: 'Late', count: 1 },
          { status: 'partial', label: 'Partial', count: 1 }
        ]?.map(item => (
          <div key={item?.status} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${getStatusColor(item?.status)} flex items-center justify-center`}>
              <Icon name={getStatusIcon(item?.status)} size={12} />
            </div>
            <span className="text-sm text-foreground">{item?.label}</span>
            <span className="text-sm text-muted-foreground">({item?.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceCalendar;