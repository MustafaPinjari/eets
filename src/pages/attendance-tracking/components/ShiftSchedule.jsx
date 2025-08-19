import React from 'react';
import Icon from '../../../components/AppIcon';

const ShiftSchedule = ({ shifts = [], currentShift = null }) => {
  // Mock shift data
  const mockShifts = shifts?.length > 0 ? shifts : [
    {
      id: 1,
      name: 'Morning Shift',
      startTime: '09:00',
      endTime: '17:00',
      date: '2025-01-19',
      status: 'current',
      breakTime: '12:00 - 13:00',
      location: 'Main Office'
    },
    {
      id: 2,
      name: 'Morning Shift',
      startTime: '09:00',
      endTime: '17:00',
      date: '2025-01-20',
      status: 'upcoming',
      breakTime: '12:00 - 13:00',
      location: 'Main Office'
    },
    {
      id: 3,
      name: 'Morning Shift',
      startTime: '09:00',
      endTime: '17:00',
      date: '2025-01-21',
      status: 'upcoming',
      breakTime: '12:00 - 13:00',
      location: 'Main Office'
    },
    {
      id: 4,
      name: 'Morning Shift',
      startTime: '09:00',
      endTime: '17:00',
      date: '2025-01-22',
      status: 'upcoming',
      breakTime: '12:00 - 13:00',
      location: 'Main Office'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'current':
        return 'bg-success/10 text-success border-success/20';
      case 'upcoming':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'completed':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-background text-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'current':
        return 'Play';
      case 'upcoming':
        return 'Clock';
      case 'completed':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateShiftDuration = (startTime, endTime) => {
    const start = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(`2000-01-01 ${endTime}`);
    const diff = end - start;
    const hours = diff / (1000 * 60 * 60);
    return `${hours}h`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Shift Schedule</h3>
        <Icon name="Calendar" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {mockShifts?.map((shift) => (
          <div 
            key={shift?.id} 
            className={`border rounded-lg p-4 transition-micro ${getStatusColor(shift?.status)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Icon 
                  name={getStatusIcon(shift?.status)} 
                  size={20} 
                  className={shift?.status === 'current' ? 'text-success' : 
                           shift?.status === 'upcoming' ? 'text-primary' : 'text-muted-foreground'}
                />
                <div>
                  <div className="font-medium text-foreground">
                    {shift?.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(shift?.date)}
                  </div>
                </div>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                shift?.status === 'current' ? 'bg-success text-success-foreground' :
                shift?.status === 'upcoming' ? 'bg-primary text-primary-foreground' :
                'bg-muted text-muted-foreground'
              }`}>
                {shift?.status}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">Time:</span>
                <span className="font-medium text-foreground">
                  {shift?.startTime} - {shift?.endTime}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Icon name="Coffee" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">Break:</span>
                <span className="font-medium text-foreground">
                  {shift?.breakTime}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium text-foreground">
                  {shift?.location}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
              <div className="text-sm text-muted-foreground">
                Duration: {calculateShiftDuration(shift?.startTime, shift?.endTime)}
              </div>
              {shift?.status === 'current' && (
                <div className="flex items-center gap-1 text-sm text-success">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span>Active</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Weekly Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-3">This Week Summary</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Shifts:</span>
            <span className="font-medium text-foreground">5</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Hours:</span>
            <span className="font-medium text-foreground">40h</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Completed:</span>
            <span className="font-medium text-success">0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Remaining:</span>
            <span className="font-medium text-primary">4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftSchedule;