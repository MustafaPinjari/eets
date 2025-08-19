import React from 'react';
import Icon from '../../../components/AppIcon';

const LeaveStatistics = ({ statistics = {} }) => {
  const mockStatistics = Object.keys(statistics)?.length > 0 ? statistics : {
    totalRequests: 12,
    approvedRequests: 8,
    pendingRequests: 2,
    rejectedRequests: 2,
    totalDaysTaken: 45,
    averageApprovalTime: '1.5 days',
    mostUsedLeaveType: 'Vacation Leave',
    upcomingLeaves: 3,
    teamUtilization: 85,
    monthlyTrend: [
      { month: 'Jan', requests: 2, days: 8 },
      { month: 'Feb', requests: 1, days: 3 },
      { month: 'Mar', requests: 3, days: 12 },
      { month: 'Apr', requests: 2, days: 6 },
      { month: 'May', requests: 1, days: 4 },
      { month: 'Jun', requests: 3, days: 12 }
    ]
  };

  const statCards = [
    {
      title: 'Total Requests',
      value: mockStatistics?.totalRequests,
      icon: 'FileText',
      color: 'primary',
      description: 'This year'
    },
    {
      title: 'Approved',
      value: mockStatistics?.approvedRequests,
      icon: 'CheckCircle',
      color: 'success',
      description: `${((mockStatistics?.approvedRequests / mockStatistics?.totalRequests) * 100)?.toFixed(0)}% approval rate`
    },
    {
      title: 'Pending',
      value: mockStatistics?.pendingRequests,
      icon: 'Clock',
      color: 'warning',
      description: 'Awaiting approval'
    },
    {
      title: 'Days Taken',
      value: mockStatistics?.totalDaysTaken,
      icon: 'Calendar',
      color: 'accent',
      description: 'Total this year'
    }
  ];

  const getColorClasses = (color) => {
    const configs = {
      primary: { bg: 'bg-primary/10', text: 'text-primary', icon: 'text-primary' },
      success: { bg: 'bg-success/10', text: 'text-success', icon: 'text-success' },
      warning: { bg: 'bg-warning/10', text: 'text-warning', icon: 'text-warning' },
      accent: { bg: 'bg-accent/10', text: 'text-accent', icon: 'text-accent' },
      secondary: { bg: 'bg-secondary/10', text: 'text-secondary', icon: 'text-secondary' }
    };
    return configs?.[color] || configs?.primary;
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards?.map((stat, index) => {
          const colors = getColorClasses(stat?.color);
          return (
            <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-elevated transition-layout">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${colors?.bg} rounded-lg flex items-center justify-center`}>
                  <Icon name={stat?.icon} size={24} className={colors?.icon} />
                </div>
                <button className="text-muted-foreground hover:text-foreground transition-micro">
                  <Icon name="MoreHorizontal" size={16} />
                </button>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-card-foreground mb-1">{stat?.value}</h3>
                <p className="text-sm font-medium text-card-foreground mb-1">{stat?.title}</p>
                <p className="text-xs text-muted-foreground">{stat?.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Insights */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-card-foreground">Quick Insights</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span className="text-sm font-medium text-card-foreground">Avg. Approval Time</span>
              </div>
              <span className="text-sm font-semibold text-primary">{mockStatistics?.averageApprovalTime}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Icon name="Star" size={16} className="text-accent" />
                <span className="text-sm font-medium text-card-foreground">Most Used Type</span>
              </div>
              <span className="text-sm font-semibold text-accent">{mockStatistics?.mostUsedLeaveType}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Icon name="CalendarDays" size={16} className="text-warning" />
                <span className="text-sm font-medium text-card-foreground">Upcoming Leaves</span>
              </div>
              <span className="text-sm font-semibold text-warning">{mockStatistics?.upcomingLeaves} scheduled</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Icon name="Users" size={16} className="text-success" />
                <span className="text-sm font-medium text-card-foreground">Team Utilization</span>
              </div>
              <span className="text-sm font-semibold text-success">{mockStatistics?.teamUtilization}%</span>
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="BarChart3" size={20} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-card-foreground">Monthly Trend</h3>
          </div>

          <div className="space-y-3">
            {mockStatistics?.monthlyTrend?.map((month, index) => {
              const maxRequests = Math.max(...mockStatistics?.monthlyTrend?.map(m => m?.requests));
              const requestPercentage = (month?.requests / maxRequests) * 100;
              
              return (
                <div key={month?.month} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-card-foreground">{month?.month}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">{month?.requests} requests</span>
                      <span className="text-muted-foreground">{month?.days} days</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-layout"
                      style={{ width: `${Math.max(requestPercentage, 5)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Info" size={14} className="text-primary" />
              <span className="text-muted-foreground">
                Peak leave period: March with {Math.max(...mockStatistics?.monthlyTrend?.map(m => m?.requests))} requests
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveStatistics;