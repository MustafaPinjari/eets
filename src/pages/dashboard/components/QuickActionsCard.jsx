import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsCard = ({ userRole }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'clock-in',
      label: 'Clock In/Out',
      icon: 'Clock',
      color: 'bg-success',
      action: () => navigate('/attendance-tracking'),
      roles: ['employee', 'manager', 'hr', 'admin']
    },
    {
      id: 'leave-request',
      label: 'Request Leave',
      icon: 'Calendar',
      color: 'bg-accent',
      action: () => navigate('/leave-management'),
      roles: ['employee', 'manager', 'hr', 'admin']
    },
    {
      id: 'profile',
      label: 'My Profile',
      icon: 'User',
      color: 'bg-secondary',
      action: () => navigate('/employee-profile-management'),
      roles: ['employee', 'manager', 'hr', 'admin']
    },
    {
      id: 'admin',
      label: 'Administration',
      icon: 'Settings',
      color: 'bg-warning',
      action: () => navigate('/system-administration'),
      roles: ['admin']
    }
  ];

  const availableActions = quickActions?.filter(action => 
    action?.roles?.includes(userRole)
  );

  return (
    <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Zap" size={20} className="text-accent" />
        <h2 className="text-lg font-semibold text-card-foreground">Quick Actions</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {availableActions?.map((action) => (
          <Button
            key={action?.id}
            variant="outline"
            onClick={action?.action}
            className="h-auto p-4 justify-start"
          >
            <div className={`w-10 h-10 ${action?.color} rounded-lg flex items-center justify-center mr-3`}>
              <Icon name={action?.icon} size={20} color="white" />
            </div>
            <span className="font-medium">{action?.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsCard;