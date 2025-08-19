import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatus = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState('operational');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const statusConfig = {
    operational: {
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      message: 'All systems operational'
    },
    maintenance: {
      icon: 'Settings',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      message: 'Scheduled maintenance in progress'
    },
    degraded: {
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      message: 'Some services may be slower'
    }
  };

  const currentStatus = statusConfig?.[systemStatus];

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
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
    <div className="space-y-4">
      {/* System Status */}
      <div className={`flex items-center gap-3 p-3 rounded-lg ${currentStatus?.bgColor} border border-current/20`}>
        <Icon name={currentStatus?.icon} size={18} className={currentStatus?.color} />
        <div className="flex-1">
          <p className={`text-sm font-medium ${currentStatus?.color}`}>
            System Status
          </p>
          <p className="text-xs text-muted-foreground">
            {currentStatus?.message}
          </p>
        </div>
      </div>
      {/* Current Time & Date */}
      <div className="text-center space-y-2 p-4 bg-muted/30 rounded-lg border border-border/50">
        <div className="space-y-1">
          <p className="text-2xl font-mono font-bold text-foreground">
            {formatTime(currentTime)}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatDate(currentTime)}
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Icon name="Globe" size={12} />
          <span>UTC {currentTime?.getTimezoneOffset() > 0 ? '-' : '+'}{Math.abs(currentTime?.getTimezoneOffset() / 60)}</span>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center p-3 bg-card/50 rounded-lg border border-border/50">
          <div className="flex items-center justify-center gap-1 text-success mb-1">
            <Icon name="Users" size={14} />
            <span className="text-lg font-bold">99.9%</span>
          </div>
          <p className="text-xs text-muted-foreground">Uptime</p>
        </div>
        
        <div className="text-center p-3 bg-card/50 rounded-lg border border-border/50">
          <div className="flex items-center justify-center gap-1 text-primary mb-1">
            <Icon name="Zap" size={14} />
            <span className="text-lg font-bold">&lt;200ms</span>
          </div>
          <p className="text-xs text-muted-foreground">Response</p>
        </div>
      </div>
      {/* Support Information */}
      <div className="text-center text-xs text-muted-foreground space-y-1">
        <p>Need assistance? Contact IT Support</p>
        <div className="flex items-center justify-center gap-4">
          <span className="flex items-center gap-1">
            <Icon name="Mail" size={12} />
            support@company.com
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Phone" size={12} />
            +1-800-HELP-EMS
          </span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;