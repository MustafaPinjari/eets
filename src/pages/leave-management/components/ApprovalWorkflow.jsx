import React from 'react';
import Icon from '../../../components/AppIcon';

const ApprovalWorkflow = ({ workflow = [], currentStage = 0 }) => {
  const defaultWorkflow = workflow?.length > 0 ? workflow : [
    {
      id: 1,
      title: 'Employee Request',
      description: 'Request submitted by employee',
      approver: 'You',
      status: 'completed',
      completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      estimatedTime: null
    },
    {
      id: 2,
      title: 'Manager Review',
      description: 'Direct manager approval required',
      approver: 'Sarah Johnson',
      status: 'pending',
      completedAt: null,
      estimatedTime: '1-2 business days'
    },
    {
      id: 3,
      title: 'HR Verification',
      description: 'HR policy compliance check',
      approver: 'HR Department',
      status: 'waiting',
      completedAt: null,
      estimatedTime: '1 business day'
    },
    {
      id: 4,
      title: 'Final Approval',
      description: 'Final approval and calendar update',
      approver: 'System',
      status: 'waiting',
      completedAt: null,
      estimatedTime: 'Automatic'
    }
  ];

  const getStageIcon = (status) => {
    switch (status) {
      case 'completed':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'pending':
        return { name: 'Clock', color: 'text-warning' };
      case 'rejected':
        return { name: 'XCircle', color: 'text-destructive' };
      default:
        return { name: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getStageBackground = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 border-success/20';
      case 'pending':
        return 'bg-warning/10 border-warning/20';
      case 'rejected':
        return 'bg-destructive/10 border-destructive/20';
      default:
        return 'bg-muted/50 border-border';
    }
  };

  const formatTime = (date) => {
    if (!date) return null;
    const now = new Date();
    const diff = now - new Date(date);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="GitBranch" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Approval Workflow</h2>
          <p className="text-sm text-muted-foreground">Track your request progress</p>
        </div>
      </div>
      <div className="space-y-4">
        {defaultWorkflow?.map((stage, index) => {
          const icon = getStageIcon(stage?.status);
          const isLast = index === defaultWorkflow?.length - 1;
          
          return (
            <div key={stage?.id} className="relative">
              <div className={`border rounded-lg p-4 transition-layout ${getStageBackground(stage?.status)}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                      stage?.status === 'completed' ? 'bg-success border-success' :
                      stage?.status === 'pending' ? 'bg-warning border-warning' :
                      stage?.status === 'rejected'? 'bg-destructive border-destructive' : 'bg-background border-border'
                    }`}>
                      <Icon 
                        name={icon?.name} 
                        size={20} 
                        className={stage?.status === 'completed' || stage?.status === 'pending' || stage?.status === 'rejected' ? 'text-white' : icon?.color}
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-card-foreground">{stage?.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{stage?.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-sm">
                            <Icon name="User" size={14} className="text-muted-foreground" />
                            <span className="text-muted-foreground">{stage?.approver}</span>
                          </div>
                          {stage?.estimatedTime && stage?.status !== 'completed' && (
                            <div className="flex items-center gap-1 text-sm">
                              <Icon name="Clock" size={14} className="text-muted-foreground" />
                              <span className="text-muted-foreground">{stage?.estimatedTime}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          stage?.status === 'completed' ? 'bg-success/10 text-success' :
                          stage?.status === 'pending' ? 'bg-warning/10 text-warning' :
                          stage?.status === 'rejected'? 'bg-destructive/10 text-destructive' : 'bg-muted/50 text-muted-foreground'
                        }`}>
                          {stage?.status === 'completed' && <Icon name="Check" size={12} />}
                          {stage?.status === 'pending' && <Icon name="Clock" size={12} />}
                          {stage?.status === 'rejected' && <Icon name="X" size={12} />}
                          {stage?.status === 'waiting' && <Icon name="Minus" size={12} />}
                          <span className="capitalize">{stage?.status}</span>
                        </div>
                        {stage?.completedAt && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatTime(stage?.completedAt)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Connector Line */}
              {!isLast && (
                <div className="absolute left-9 top-16 w-0.5 h-4 bg-border"></div>
              )}
            </div>
          );
        })}
      </div>
      {/* Estimated Completion */}
      <div className="mt-6 p-4 bg-muted/30 border border-border rounded-lg">
        <div className="flex items-center gap-2 text-sm">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="font-medium text-card-foreground">Estimated Completion:</span>
          <span className="text-muted-foreground">2-3 business days</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1 ml-6">
          You will receive email notifications at each stage of the approval process
        </p>
      </div>
    </div>
  );
};

export default ApprovalWorkflow;