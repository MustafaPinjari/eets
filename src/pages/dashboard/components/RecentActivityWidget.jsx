import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityWidget = ({ activities }) => {
  const getActivityIcon = (type) => {
    const iconMap = {
      'leave_approved': { name: 'CheckCircle', color: 'text-success' },
      'leave_rejected': { name: 'XCircle', color: 'text-destructive' },
      'leave_submitted': { name: 'Calendar', color: 'text-primary' },
      'profile_updated': { name: 'User', color: 'text-secondary' },
      'attendance_marked': { name: 'Clock', color: 'text-accent' },
      'document_uploaded': { name: 'FileText', color: 'text-warning' },
      'system_login': { name: 'LogIn', color: 'text-muted-foreground' }
    };
    return iconMap?.[type] || { name: 'Activity', color: 'text-muted-foreground' };
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Activity" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-card-foreground">Recent Activity</h2>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {activities?.length > 0 ? (
          activities?.map((activity, index) => {
            const iconConfig = getActivityIcon(activity?.type);
            return (
              <div key={index} className="flex items-start gap-3 p-3 hover:bg-muted/30 rounded-lg transition-micro">
                <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${iconConfig?.color}`}>
                  <Icon name={iconConfig?.name} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground">
                    {activity?.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity?.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTimestamp(activity?.timestamp)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <Icon name="Activity" size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivityWidget;