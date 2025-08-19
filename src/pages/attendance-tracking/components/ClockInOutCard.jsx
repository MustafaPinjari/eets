import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClockInOutCard = ({ 
  currentStatus = 'out', 
  onClockAction, 
  currentShift,
  location,
  isLocationVerified = false 
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClockAction = async () => {
    setIsLoading(true);
    try {
      await onClockAction(currentStatus === 'in' ? 'out' : 'in');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      {/* Current Time Display */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-foreground mb-2 font-mono">
          {formatTime(currentTime)}
        </div>
        <div className="text-sm text-muted-foreground">
          {formatDate(currentTime)}
        </div>
      </div>
      {/* Status Indicator */}
      <div className="flex items-center justify-center mb-6">
        <div className={`flex items-center gap-3 px-4 py-2 rounded-full ${
          currentStatus === 'in' ?'bg-success/10 text-success border border-success/20' :'bg-muted text-muted-foreground border border-border'
        }`}>
          <div className={`w-3 h-3 rounded-full ${
            currentStatus === 'in' ? 'bg-success animate-pulse' : 'bg-muted-foreground'
          }`} />
          <span className="font-medium">
            {currentStatus === 'in' ? 'Clocked In' : 'Clocked Out'}
          </span>
        </div>
      </div>
      {/* Current Shift Info */}
      {currentShift && (
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="font-medium text-foreground">Current Shift</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <div>{currentShift?.name}</div>
            <div>{currentShift?.startTime} - {currentShift?.endTime}</div>
          </div>
        </div>
      )}
      {/* Location Verification */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="MapPin" size={16} className="text-primary" />
          <span className="font-medium text-foreground">Location Status</span>
        </div>
        <div className={`flex items-center gap-2 text-sm ${
          isLocationVerified ? 'text-success' : 'text-warning'
        }`}>
          <Icon 
            name={isLocationVerified ? "CheckCircle" : "AlertTriangle"} 
            size={14} 
          />
          <span>
            {isLocationVerified 
              ? 'Location verified - Office premises' 
              : 'Location verification in progress...'
            }
          </span>
        </div>
        {location && (
          <div className="text-xs text-muted-foreground mt-1">
            {location?.address}
          </div>
        )}
      </div>
      {/* Clock Action Button */}
      <Button
        variant={currentStatus === 'in' ? 'destructive' : 'default'}
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={!isLocationVerified}
        onClick={handleClockAction}
        iconName={currentStatus === 'in' ? 'LogOut' : 'LogIn'}
        iconPosition="left"
        className="h-14 text-lg font-semibold"
      >
        {currentStatus === 'in' ? 'Clock Out' : 'Clock In'}
      </Button>
      {!isLocationVerified && (
        <div className="mt-3 text-xs text-center text-muted-foreground">
          Location verification required to clock in/out
        </div>
      )}
    </div>
  );
};

export default ClockInOutCard;