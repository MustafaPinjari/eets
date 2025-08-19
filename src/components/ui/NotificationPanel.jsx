import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationPanel = ({ 
  isOpen = false, 
  onClose, 
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
  onNotificationClick 
}) => {
  const [filter, setFilter] = useState('all'); // all, unread, read
  const [filteredNotifications, setFilteredNotifications] = useState([]);

  // Mock notifications if none provided
  const mockNotifications = notifications?.length > 0 ? notifications : [
    {
      id: 1,
      title: 'Leave Request Approved',
      message: 'Your vacation leave request for Dec 25-29 has been approved by your manager.',
      type: 'success',
      read: false,
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      actionUrl: '/leave-management'
    },
    {
      id: 2,
      title: 'Timesheet Reminder',
      message: 'Please submit your timesheet for the current week by Friday.',
      type: 'warning',
      read: false,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      actionUrl: '/attendance-tracking'
    },
    {
      id: 3,
      title: 'Profile Update Required',
      message: 'Please update your emergency contact information in your profile.',
      type: 'info',
      read: true,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      actionUrl: '/employee-profile-management'
    },
    {
      id: 4,
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur this weekend from 2 AM to 6 AM.',
      type: 'info',
      read: true,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    }
  ];

  useEffect(() => {
    let filtered = mockNotifications;
    
    if (filter === 'unread') {
      filtered = mockNotifications?.filter(n => !n?.read);
    } else if (filter === 'read') {
      filtered = mockNotifications?.filter(n => n?.read);
    }
    
    // Sort by timestamp, newest first
    filtered?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    setFilteredNotifications(filtered);
  }, [filter, notifications]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'warning':
        return { name: 'AlertTriangle', color: 'text-warning' };
      case 'error':
        return { name: 'XCircle', color: 'text-error' };
      default:
        return { name: 'Info', color: 'text-primary' };
    }
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
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp)?.toLocaleDateString();
  };

  const handleNotificationClick = (notification) => {
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
    if (onMarkAsRead && !notification?.read) {
      onMarkAsRead(notification?.id);
    }
  };

  const unreadCount = mockNotifications?.filter(n => !n?.read)?.length;

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div className="fixed inset-0 z-[1002] lg:hidden">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-popover border-l border-border shadow-elevated">
          <NotificationContent />
        </div>
      </div>

      {/* Desktop Panel */}
      <div className="hidden lg:block fixed right-4 top-20 w-96 bg-popover border border-border rounded-lg shadow-elevated z-[1002]">
        <NotificationContent />
      </div>
    </>
  );

  function NotificationContent() {
    return (
      <div className="flex flex-col h-full max-h-[80vh] lg:max-h-96">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-popover-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && onMarkAllAsRead && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMarkAllAsRead}
                className="text-xs"
              >
                Mark all read
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
              iconSize={16}
            >
              <span className="sr-only">Close notifications</span>
            </Button>
          </div>
        </div>
        {/* Filter Tabs */}
        <div className="flex border-b border-border">
          {[
            { key: 'all', label: 'All', count: mockNotifications?.length },
            { key: 'unread', label: 'Unread', count: unreadCount },
            { key: 'read', label: 'Read', count: mockNotifications?.length - unreadCount }
          ]?.map((tab) => (
            <button
              key={tab?.key}
              onClick={() => setFilter(tab?.key)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-micro ${
                filter === tab?.key
                  ? 'text-accent border-b-2 border-accent' :'text-muted-foreground hover:text-popover-foreground'
              }`}
            >
              {tab?.label} ({tab?.count})
            </button>
          ))}
        </div>
        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications?.length > 0 ? (
            <div className="divide-y divide-border">
              {filteredNotifications?.map((notification) => {
                const iconConfig = getNotificationIcon(notification?.type);
                return (
                  <div
                    key={notification?.id}
                    className={`p-4 hover:bg-muted transition-micro cursor-pointer ${
                      !notification?.read ? 'bg-muted/30' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      <Icon 
                        name={iconConfig?.name} 
                        size={20} 
                        className={`mt-0.5 flex-shrink-0 ${iconConfig?.color}`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={`text-sm font-medium ${
                            !notification?.read ? 'text-popover-foreground' : 'text-muted-foreground'
                          }`}>
                            {notification?.title}
                          </h4>
                          {!notification?.read && (
                            <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {notification?.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatTimestamp(notification?.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <Icon name="Bell" size={48} className="text-muted-foreground mb-4" />
              <h4 className="font-medium text-popover-foreground mb-2">
                {filter === 'unread' ? 'No unread notifications' : 
                 filter === 'read' ? 'No read notifications' : 'No notifications'}
              </h4>
              <p className="text-sm text-muted-foreground text-center">
                {filter === 'unread' ? "You're all caught up! New notifications will appear here." :"Notifications will appear here when you receive them."
                }
              </p>
            </div>
          )}
        </div>
        {/* Footer Actions */}
        {filteredNotifications?.length > 0 && (
          <div className="p-4 border-t border-border">
            <Button variant="outline" size="sm" fullWidth>
              View All Notifications
            </Button>
          </div>
        )}
      </div>
    );
  }
};

export default NotificationPanel;