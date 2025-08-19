import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LeaveBalanceWidget = ({ leaveData }) => {
  const navigate = useNavigate();

  const leaveTypes = [
    {
      type: 'Annual Leave',
      available: leaveData?.annual?.available,
      total: leaveData?.annual?.total,
      color: 'bg-primary',
      icon: 'Calendar'
    },
    {
      type: 'Sick Leave',
      available: leaveData?.sick?.available,
      total: leaveData?.sick?.total,
      color: 'bg-accent',
      icon: 'Heart'
    },
    {
      type: 'Personal Leave',
      available: leaveData?.personal?.available,
      total: leaveData?.personal?.total,
      color: 'bg-secondary',
      icon: 'User'
    }
  ];

  return (
    <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Calendar" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-card-foreground">Leave Balance</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/leave-management')}
          iconName="ExternalLink"
          iconSize={16}
        >
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {leaveTypes?.map((leave, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 ${leave?.color} rounded-lg flex items-center justify-center`}>
                <Icon name={leave?.icon} size={16} color="white" />
              </div>
              <div>
                <p className="font-medium text-card-foreground text-sm">{leave?.type}</p>
                <p className="text-xs text-muted-foreground">
                  {leave?.available} of {leave?.total} days
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg text-card-foreground">{leave?.available}</p>
              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${leave?.color} transition-all duration-300`}
                  style={{ width: `${(leave?.available / leave?.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        fullWidth
        className="mt-4"
        onClick={() => navigate('/leave-management')}
        iconName="Plus"
        iconPosition="left"
      >
        Request Leave
      </Button>
    </div>
  );
};

export default LeaveBalanceWidget;