import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import ThemeToggle from './ThemeToggle';

const GlobalHeader = ({ onSidebarToggle, user = null, notifications = [] }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  const handleLogout = () => {
    // Logout logic would be implemented here
    console.log('Logout clicked');
  };

  const mockUser = user || {
    name: 'John Doe',
    email: 'john.doe@company.com',
    avatar: '/assets/images/no_image.png',
    role: 'HR Professional'
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border shadow-soft">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left Section - Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSidebarToggle}
            className="lg:hidden"
            iconName="Menu"
            iconSize={20}
          >
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          
          {/* Logo for mobile when sidebar is collapsed */}
          <Link to="/dashboard" className="lg:hidden">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Users" size={20} color="white" />
              </div>
              <span className="font-semibold text-lg text-primary">EMS</span>
            </div>
          </Link>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
              iconName="Bell"
              iconSize={20}
            >
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevated z-[1001]">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium text-popover-foreground">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications?.length > 0 ? (
                    notifications?.slice(0, 5)?.map((notification, index) => (
                      <div
                        key={index}
                        className={`p-4 border-b border-border last:border-b-0 hover:bg-muted transition-micro ${
                          !notification?.read ? 'bg-muted/50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${!notification?.read ? 'bg-accent' : 'bg-muted'}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-popover-foreground truncate">
                              {notification?.title || 'New notification'}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification?.message || 'You have a new notification'}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification?.time || '2 minutes ago'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <Icon name="Bell" size={32} className="mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No notifications</p>
                    </div>
                  )}
                </div>
                {notifications?.length > 5 && (
                  <div className="p-3 border-t border-border">
                    <Button variant="ghost" size="sm" fullWidth>
                      View all notifications
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 h-auto"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-foreground">{mockUser?.name}</p>
                <p className="text-xs text-muted-foreground">{mockUser?.role}</p>
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </Button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevated z-[1001]">
                <div className="p-3 border-b border-border">
                  <p className="font-medium text-popover-foreground">{mockUser?.name}</p>
                  <p className="text-sm text-muted-foreground">{mockUser?.email}</p>
                </div>
                <div className="py-2">
                  <Link
                    to="/employee-profile-management"
                    className="flex items-center gap-3 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-micro"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Icon name="User" size={16} />
                    My Profile
                  </Link>
                  <button
                    className="flex items-center gap-3 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-micro w-full text-left"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Icon name="Settings" size={16} />
                    Settings
                  </button>
                  <button
                    className="flex items-center gap-3 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-micro w-full text-left"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Icon name="HelpCircle" size={16} />
                    Help & Support
                  </button>
                </div>
                <div className="border-t border-border py-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-muted transition-micro w-full text-left"
                  >
                    <Icon name="LogOut" size={16} />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Click outside handlers */}
      {(showNotifications || showUserMenu) && (
        <div
          className="fixed inset-0 z-[999]"
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default GlobalHeader;