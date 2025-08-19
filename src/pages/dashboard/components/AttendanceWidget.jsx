import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttendanceWidget = ({ attendanceData, onClockAction }) => {
  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const calculateWorkingHours = () => {
    if (attendanceData?.clockIn && attendanceData?.clockOut) {
      const diff = attendanceData?.clockOut - attendanceData?.clockIn;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
    }
    return '--';
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-card-foreground">Today's Attendance</h2>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          attendanceData?.status === 'present' ?'bg-success/10 text-success' 
            : attendanceData?.status === 'late' ?'bg-warning/10 text-warning' :'bg-muted text-muted-foreground'
        }`}>
          {attendanceData?.status === 'present' ? 'Present' : 
           attendanceData?.status === 'late' ? 'Late' : 'Not Clocked In'}
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Clock In</p>
            <p className="font-semibold text-card-foreground">
              {attendanceData?.clockIn ? formatTime(attendanceData?.clockIn) : '--:--'}
            </p>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Clock Out</p>
            <p className="font-semibold text-card-foreground">
              {attendanceData?.clockOut ? formatTime(attendanceData?.clockOut) : '--:--'}
            </p>
          </div>
        </div>

        <div className="text-center p-3 bg-accent/10 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Working Hours</p>
          <p className="font-semibold text-accent">{calculateWorkingHours()}</p>
        </div>

        <Button
          variant={attendanceData?.clockIn && !attendanceData?.clockOut ? "destructive" : "default"}
          fullWidth
          onClick={onClockAction}
          iconName={attendanceData?.clockIn && !attendanceData?.clockOut ? "LogOut" : "LogIn"}
          iconPosition="left"
        >
          {attendanceData?.clockIn && !attendanceData?.clockOut ? "Clock Out" : "Clock In"}
        </Button>
      </div>
    </div>
  );
};

export default AttendanceWidget;