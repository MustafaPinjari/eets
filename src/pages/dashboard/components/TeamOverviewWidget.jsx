import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TeamOverviewWidget = ({ teamData, userRole }) => {
  const navigate = useNavigate();

  // Only show for managers, HR, and admin
  if (!['manager', 'hr', 'admin']?.includes(userRole)) {
    return null;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'bg-success text-success-foreground';
      case 'late': return 'bg-warning text-warning-foreground';
      case 'absent': return 'bg-destructive text-destructive-foreground';
      case 'on_leave': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return 'CheckCircle';
      case 'late': return 'Clock';
      case 'absent': return 'XCircle';
      case 'on_leave': return 'Calendar';
      default: return 'User';
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Users" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-card-foreground">Team Overview</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/attendance-tracking')}
          iconName="ExternalLink"
          iconSize={16}
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="text-center p-3 bg-success/10 rounded-lg">
          <p className="text-2xl font-bold text-success">{teamData?.present}</p>
          <p className="text-xs text-muted-foreground">Present</p>
        </div>
        <div className="text-center p-3 bg-warning/10 rounded-lg">
          <p className="text-2xl font-bold text-warning">{teamData?.late}</p>
          <p className="text-xs text-muted-foreground">Late</p>
        </div>
        <div className="text-center p-3 bg-destructive/10 rounded-lg">
          <p className="text-2xl font-bold text-destructive">{teamData?.absent}</p>
          <p className="text-xs text-muted-foreground">Absent</p>
        </div>
        <div className="text-center p-3 bg-secondary/10 rounded-lg">
          <p className="text-2xl font-bold text-secondary">{teamData?.onLeave}</p>
          <p className="text-xs text-muted-foreground">On Leave</p>
        </div>
      </div>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {teamData?.members?.slice(0, 6)?.map((member, index) => (
          <div key={index} className="flex items-center justify-between p-2 hover:bg-muted/30 rounded-lg transition-micro">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div>
                <p className="font-medium text-sm text-card-foreground">{member?.name}</p>
                <p className="text-xs text-muted-foreground">{member?.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member?.status)}`}>
                <Icon name={getStatusIcon(member?.status)} size={12} className="inline mr-1" />
                {member?.status?.replace('_', ' ')}
              </span>
            </div>
          </div>
        ))}
      </div>
      {teamData?.members?.length > 6 && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            +{teamData?.members?.length - 6} more team members
          </p>
        </div>
      )}
    </div>
  );
};

export default TeamOverviewWidget;