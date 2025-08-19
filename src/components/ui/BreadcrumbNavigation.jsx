import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ customBreadcrumbs = null }) => {
  const location = useLocation();

  // Default breadcrumb mapping based on routes
  const routeBreadcrumbs = {
    '/dashboard': [
      { label: 'Dashboard', path: '/dashboard' }
    ],
    '/employee-profile-management': [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'My Profile', path: '/employee-profile-management' }
    ],
    '/attendance-tracking': [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Time & Attendance', path: '/attendance-tracking' }
    ],
    '/leave-management': [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Leave Management', path: '/leave-management' }
    ],
    '/system-administration': [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Administration', path: '/system-administration' }
    ]
  };

  // Use custom breadcrumbs if provided, otherwise use route-based breadcrumbs
  const breadcrumbs = customBreadcrumbs || routeBreadcrumbs?.[location?.pathname] || [
    { label: 'Dashboard', path: '/dashboard' }
  ];

  // Don't render breadcrumbs if there's only one item (current page)
  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbs?.map((crumb, index) => {
          const isLast = index === breadcrumbs?.length - 1;
          const isFirst = index === 0;

          return (
            <li key={crumb?.path || index} className="flex items-center">
              {/* Home icon for first item */}
              {isFirst && (
                <Icon name="Home" size={14} className="mr-1" />
              )}
              {/* Breadcrumb item */}
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {crumb?.label}
                </span>
              ) : (
                <Link
                  to={crumb?.path}
                  className="hover:text-foreground transition-micro"
                >
                  {crumb?.label}
                </Link>
              )}
              {/* Separator */}
              {!isLast && (
                <Icon 
                  name="ChevronRight" 
                  size={14} 
                  className="mx-2 text-muted-foreground/60" 
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;