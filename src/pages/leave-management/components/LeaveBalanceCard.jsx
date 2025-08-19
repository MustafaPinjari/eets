import React from 'react';
import Icon from '../../../components/AppIcon';

const LeaveBalanceCard = ({ 
  leaveType, 
  available, 
  total, 
  accrualRate, 
  policyLink, 
  color = 'primary',
  icon = 'Calendar'
}) => {
  const percentage = total > 0 ? (available / total) * 100 : 0;
  
  const getColorClasses = (color) => {
    switch (color) {
      case 'success':
        return {
          bg: 'bg-success/10',
          border: 'border-success/20',
          icon: 'text-success',
          text: 'text-success'
        };
      case 'warning':
        return {
          bg: 'bg-warning/10',
          border: 'border-warning/20',
          icon: 'text-warning',
          text: 'text-warning'
        };
      case 'accent':
        return {
          bg: 'bg-accent/10',
          border: 'border-accent/20',
          icon: 'text-accent',
          text: 'text-accent'
        };
      default:
        return {
          bg: 'bg-primary/10',
          border: 'border-primary/20',
          icon: 'text-primary',
          text: 'text-primary'
        };
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className={`bg-card border ${colorClasses?.border} rounded-lg p-6 shadow-soft hover:shadow-elevated transition-layout`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 ${colorClasses?.bg} rounded-lg flex items-center justify-center`}>
            <Icon name={icon} size={24} className={colorClasses?.icon} />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{leaveType}</h3>
            <p className="text-sm text-muted-foreground">{accrualRate}</p>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-micro">
          <Icon name="Info" size={16} />
        </button>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-card-foreground">{available}</span>
          <span className="text-sm text-muted-foreground">of {total} days</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-layout ${
              percentage > 70 ? 'bg-success' : 
              percentage > 30 ? 'bg-warning': 'bg-destructive'
            }`}
            style={{ width: `${Math.max(percentage, 5)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{percentage?.toFixed(0)}% available</span>
          {policyLink && (
            <button className={`${colorClasses?.text} hover:underline font-medium`}>
              View Policy
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveBalanceCard;