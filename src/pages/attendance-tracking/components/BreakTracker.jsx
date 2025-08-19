import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BreakTracker = ({ 
  isOnBreak = false, 
  onBreakAction, 
  breakHistory = [],
  dailyBreakLimit = 60 // minutes
}) => {
  const [breakStartTime, setBreakStartTime] = useState(null);
  const [currentBreakDuration, setCurrentBreakDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Mock break history
  const mockBreakHistory = breakHistory?.length > 0 ? breakHistory : [
    {
      id: 1,
      startTime: '10:15',
      endTime: '10:30',
      duration: 15,
      type: 'Coffee Break',
      date: '2025-01-19'
    },
    {
      id: 2,
      startTime: '12:00',
      endTime: '13:00',
      duration: 60,
      type: 'Lunch Break',
      date: '2025-01-19'
    }
  ];

  useEffect(() => {
    let interval;
    if (isOnBreak && breakStartTime) {
      interval = setInterval(() => {
        const now = new Date();
        const start = new Date(breakStartTime);
        const duration = Math.floor((now - start) / (1000 * 60)); // minutes
        setCurrentBreakDuration(duration);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOnBreak, breakStartTime]);

  const handleBreakAction = async (action) => {
    setIsLoading(true);
    try {
      if (action === 'start') {
        setBreakStartTime(new Date());
        setCurrentBreakDuration(0);
      } else {
        setBreakStartTime(null);
        setCurrentBreakDuration(0);
      }
      
      if (onBreakAction) {
        await onBreakAction(action);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalBreakTime = () => {
    return mockBreakHistory?.reduce((total, breakItem) => total + breakItem?.duration, 0);
  };

  const getRemainingBreakTime = () => {
    const used = getTotalBreakTime() + currentBreakDuration;
    return Math.max(0, dailyBreakLimit - used);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatTime = (timeStr) => {
    return timeStr;
  };

  const getBreakTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'lunch break':
        return 'text-success';
      case 'coffee break':
        return 'text-accent';
      case 'personal break':
        return 'text-warning';
      default:
        return 'text-primary';
    }
  };

  const totalUsedTime = getTotalBreakTime() + currentBreakDuration;
  const usagePercentage = Math.min((totalUsedTime / dailyBreakLimit) * 100, 100);

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Break Tracker</h3>
        <Icon name="Coffee" size={20} className="text-muted-foreground" />
      </div>
      {/* Current Break Status */}
      <div className={`p-4 rounded-lg mb-6 border ${
        isOnBreak 
          ? 'bg-warning/10 text-warning border-warning/20' :'bg-muted/50 text-muted-foreground border-border'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              isOnBreak ? 'bg-warning animate-pulse' : 'bg-muted-foreground'
            }`} />
            <span className="font-medium">
              {isOnBreak ? 'On Break' : 'Working'}
            </span>
          </div>
          {isOnBreak && (
            <div className="text-sm font-mono">
              {formatDuration(currentBreakDuration)}
            </div>
          )}
        </div>
        
        <Button
          variant={isOnBreak ? 'destructive' : 'default'}
          size="sm"
          loading={isLoading}
          onClick={() => handleBreakAction(isOnBreak ? 'end' : 'start')}
          iconName={isOnBreak ? 'Play' : 'Pause'}
          iconPosition="left"
          fullWidth
        >
          {isOnBreak ? 'End Break' : 'Start Break'}
        </Button>
      </div>
      {/* Break Time Summary */}
      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-foreground mb-3">Today's Break Summary</h4>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Break Time:</span>
            <span className="font-medium text-foreground">
              {formatDuration(totalUsedTime)}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Daily Limit:</span>
            <span className="font-medium text-foreground">
              {formatDuration(dailyBreakLimit)}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Remaining:</span>
            <span className={`font-medium ${
              getRemainingBreakTime() > 0 ? 'text-success' : 'text-destructive'
            }`}>
              {formatDuration(getRemainingBreakTime())}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Usage</span>
              <span>{Math.round(usagePercentage)}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  usagePercentage > 90 ? 'bg-destructive' :
                  usagePercentage > 75 ? 'bg-warning' : 'bg-success'
                }`}
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Break History */}
      <div>
        <h4 className="font-medium text-foreground mb-3">Today's Breaks</h4>
        {mockBreakHistory?.length > 0 ? (
          <div className="space-y-2">
            {mockBreakHistory?.map((breakItem) => (
              <div 
                key={breakItem?.id} 
                className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
              >
                <div className="flex items-center gap-3">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {breakItem?.type}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatTime(breakItem?.startTime)} - {formatTime(breakItem?.endTime)}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium text-foreground">
                  {formatDuration(breakItem?.duration)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <Icon name="Coffee" size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No breaks taken today</p>
          </div>
        )}
      </div>
      {/* Break Reminders */}
      {!isOnBreak && totalUsedTime < 30 && (
        <div className="mt-4 p-3 bg-primary/10 text-primary border border-primary/20 rounded-lg">
          <div className="flex items-center gap-2">
            <Icon name="Bell" size={16} />
            <span className="text-sm">
              Consider taking a break - you've been working for over 2 hours
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreakTracker;