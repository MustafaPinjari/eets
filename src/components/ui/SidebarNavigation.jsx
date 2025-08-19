import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const SidebarNavigation = ({ isCollapsed = false, onToggle, userRole = 'employee' }) => {
  const location = useLocation();

  // Navigation items with role-based visibility
  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      roles: ['admin', 'hr', 'manager', 'employee'],
      tooltip: 'Overview and quick actions'
    },
    {
      label: 'My Profile',
      path: '/employee-profile-management',
      icon: 'User',
      roles: ['admin', 'hr', 'manager', 'employee'],
      tooltip: 'Manage personal information'
    },
    {
      label: 'Time & Attendance',
      path: '/attendance-tracking',
      icon: 'Clock',
      roles: ['admin', 'hr', 'manager', 'employee'],
      tooltip: 'Track time and attendance'
    },
    {
      label: 'Leave Management',
      path: '/leave-management',
      icon: 'Calendar',
      roles: ['admin', 'hr', 'manager', 'employee'],
      tooltip: 'Request and manage leave'
    },
    {
      label: 'Administration',
      path: '/system-administration',
      icon: 'Settings',
      roles: ['admin'],
      tooltip: 'System configuration and user management'
    }
  ];

  // Filter navigation items based on user role
  const visibleItems = navigationItems?.filter(item => 
    item?.roles?.includes(userRole)
  );

  const isActive = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-0 z-[999] h-full bg-card border-r border-border shadow-soft transition-layout ${
        isCollapsed ? 'w-16' : 'w-72'
      } hidden lg:block`}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Link to="/dashboard" className={`flex items-center gap-3 transition-micro ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Users" size={24} color="white" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="font-semibold text-xl text-primary">Enterprise EMS</span>
                  <span className="text-xs text-muted-foreground">Employee Management</span>
                </div>
              )}
            </Link>
            
            {!isCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="flex-shrink-0"
                iconName="PanelLeftClose"
                iconSize={18}
              >
                <span className="sr-only">Collapse sidebar</span>
              </Button>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {visibleItems?.map((item) => (
              <div key={item?.path} className="relative group">
                <Link
                  to={item?.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-micro ${
                    isActive(item?.path)
                      ? 'bg-accent text-accent-foreground shadow-soft'
                      : 'text-foreground hover:bg-muted hover:text-foreground'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    className="flex-shrink-0"
                  />
                  {!isCollapsed && (
                    <span className="font-medium">{item?.label}</span>
                  )}
                </Link>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-elevated opacity-0 group-hover:opacity-100 transition-micro pointer-events-none whitespace-nowrap z-[1002]">
                    {item?.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-popover"></div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Collapse Toggle for Collapsed State */}
          {isCollapsed && (
            <div className="p-4 border-t border-border">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="w-full"
                iconName="PanelLeftOpen"
                iconSize={18}
              >
                <span className="sr-only">Expand sidebar</span>
              </Button>
            </div>
          )}

          {/* User Role Indicator */}
          {!isCollapsed && (
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Shield" size={14} />
                <span className="capitalize">{userRole} Access</span>
              </div>
            </div>
          )}
        </div>
      </aside>
      {/* Mobile Sidebar Overlay */}
      <div className={`fixed inset-0 z-[999] lg:hidden ${isCollapsed ? 'pointer-events-none' : ''}`}>
        {/* Backdrop */}
        {!isCollapsed && (
          <div 
            className="absolute inset-0 bg-black/50 transition-micro"
            onClick={onToggle}
          />
        )}
        
        {/* Sidebar */}
        <aside className={`absolute left-0 top-0 h-full w-72 bg-card border-r border-border shadow-elevated transform transition-layout ${
          isCollapsed ? '-translate-x-full' : 'translate-x-0'
        }`}>
          <div className="flex flex-col h-full">
            {/* Logo Section */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <Link to="/dashboard" className="flex items-center gap-3" onClick={onToggle}>
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={24} color="white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-xl text-primary">Enterprise EMS</span>
                  <span className="text-xs text-muted-foreground">Employee Management</span>
                </div>
              </Link>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                iconName="X"
                iconSize={18}
              >
                <span className="sr-only">Close sidebar</span>
              </Button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-4 space-y-2">
              {visibleItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={onToggle}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-micro ${
                    isActive(item?.path)
                      ? 'bg-accent text-accent-foreground shadow-soft'
                      : 'text-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                </Link>
              ))}
            </nav>

            {/* User Role Indicator */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Shield" size={14} />
                <span className="capitalize">{userRole} Access</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default SidebarNavigation;