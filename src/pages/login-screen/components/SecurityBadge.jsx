import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadge = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security protocols'
    },
    {
      icon: 'Lock',
      title: 'Data Protection',
      description: 'Your personal information is fully protected'
    },
    {
      icon: 'Eye',
      title: 'Privacy First',
      description: 'We never share your data with third parties'
    }
  ];

  return (
    <div className="mt-8 space-y-4">
      {/* Security Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
          <Icon name="ShieldCheck" size={16} />
          Secure Login
        </div>
      </div>
      {/* Security Features */}
      <div className="grid gap-3">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-card/50 rounded-lg border border-border/50">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={feature?.icon} size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground">
                {feature?.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Compliance Badges */}
      <div className="flex justify-center gap-4 pt-4 border-t border-border/50">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="Award" size={14} />
          <span>ISO 27001</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="Shield" size={14} />
          <span>SOC 2</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="Lock" size={14} />
          <span>GDPR</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadge;