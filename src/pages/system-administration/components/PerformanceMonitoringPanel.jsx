import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PerformanceMonitoringPanel = ({ activeSubsection }) => {
  const [timeRange, setTimeRange] = useState('24h');

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  if (activeSubsection === 'performance-monitoring-system-health') {
    const systemMetrics = [
      { 
        label: 'CPU Usage', 
        value: '45%', 
        status: 'good', 
        trend: 'stable',
        details: 'Average across all cores'
      },
      { 
        label: 'Memory Usage', 
        value: '68%', 
        status: 'warning', 
        trend: 'up',
        details: '13.6 GB of 20 GB used'
      },
      { 
        label: 'Disk Usage', 
        value: '32%', 
        status: 'good', 
        trend: 'stable',
        details: '320 GB of 1 TB used'
      },
      { 
        label: 'Network I/O', 
        value: '125 Mbps', 
        status: 'good', 
        trend: 'down',
        details: 'Current throughput'
      },
      { 
        label: 'Database Connections', 
        value: '45/100', 
        status: 'good', 
        trend: 'stable',
        details: 'Active connections'
      },
      { 
        label: 'Response Time', 
        value: '245ms', 
        status: 'warning', 
        trend: 'up',
        details: 'Average API response time'
      }
    ];

    const getStatusColor = (status) => {
      switch (status) {
        case 'good': return 'text-success';
        case 'warning': return 'text-warning';
        case 'critical': return 'text-error';
        default: return 'text-muted-foreground';
      }
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case 'good': return 'CheckCircle';
        case 'warning': return 'AlertTriangle';
        case 'critical': return 'XCircle';
        default: return 'Minus';
      }
    };

    const getTrendIcon = (trend) => {
      switch (trend) {
        case 'up': return 'TrendingUp';
        case 'down': return 'TrendingDown';
        case 'stable': return 'Minus';
        default: return 'Minus';
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-foreground">System Health</h3>
            <p className="text-muted-foreground">Monitor system performance and resource utilization</p>
          </div>
          <div className="flex items-center gap-3">
            <Select
              options={timeRangeOptions}
              value={timeRange}
              onChange={setTimeRange}
            />
            <Button iconName="RefreshCw" iconPosition="left">
              Refresh
            </Button>
          </div>
        </div>
        {/* System Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemMetrics?.map((metric, index) => (
            <div key={index} className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-foreground">{metric?.label}</h4>
                <Icon 
                  name={getStatusIcon(metric?.status)} 
                  size={20} 
                  className={getStatusColor(metric?.status)}
                />
              </div>
              
              <div className="flex items-end justify-between">
                <div>
                  <p className={`text-2xl font-bold ${getStatusColor(metric?.status)}`}>
                    {metric?.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {metric?.details}
                  </p>
                </div>
                <Icon 
                  name={getTrendIcon(metric?.trend)} 
                  size={16} 
                  className="text-muted-foreground"
                />
              </div>
            </div>
          ))}
        </div>
        {/* System Alerts */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="Bell" size={20} />
            Active Alerts
          </h4>

          <div className="space-y-3">
            {[
              {
                type: 'warning',
                message: 'Memory usage has exceeded 65% threshold',
                timestamp: '5 minutes ago',
                action: 'Monitor memory usage and consider scaling'
              },
              {
                type: 'warning',
                message: 'API response time is above 200ms average',
                timestamp: '12 minutes ago',
                action: 'Check database query performance'
              },
              {
                type: 'info',
                message: 'Scheduled backup completed successfully',
                timestamp: '1 hour ago',
                action: 'No action required'
              }
            ]?.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <Icon 
                  name={alert?.type === 'warning' ? 'AlertTriangle' : alert?.type === 'error' ? 'XCircle' : 'Info'} 
                  size={16} 
                  className={`mt-0.5 ${
                    alert?.type === 'warning' ? 'text-warning' : 
                    alert?.type === 'error' ? 'text-error' : 'text-primary'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{alert?.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert?.timestamp}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <strong>Recommended action:</strong> {alert?.action}
                  </p>
                </div>
                <Button variant="ghost" size="sm" iconName="X" iconSize={14}>
                  <span className="sr-only">Dismiss alert</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
        {/* Performance Chart Placeholder */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="BarChart3" size={20} />
            Performance Trends
          </h4>
          
          <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Icon name="BarChart3" size={48} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Performance charts will be displayed here</p>
              <p className="text-xs text-muted-foreground">Integration with monitoring tools required</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubsection === 'performance-monitoring-capacity-planning') {
    const capacityMetrics = [
      {
        resource: 'Database Storage',
        current: '750 GB',
        capacity: '1 TB',
        utilization: 75,
        projectedFull: '3 months',
        recommendation: 'Plan storage expansion'
      },
      {
        resource: 'User Licenses',
        current: '850',
        capacity: '1000',
        utilization: 85,
        projectedFull: '2 months',
        recommendation: 'Purchase additional licenses'
      },
      {
        resource: 'API Rate Limits',
        current: '75K/hour',
        capacity: '100K/hour',
        utilization: 75,
        projectedFull: '6 months',
        recommendation: 'Monitor usage trends'
      },
      {
        resource: 'Backup Storage',
        current: '2.1 TB',
        capacity: '5 TB',
        utilization: 42,
        projectedFull: '12+ months',
        recommendation: 'No action required'
      }
    ];

    const getUtilizationColor = (utilization) => {
      if (utilization >= 90) return 'bg-error';
      if (utilization >= 75) return 'bg-warning';
      if (utilization >= 50) return 'bg-accent';
      return 'bg-success';
    };

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Capacity Planning</h3>
          <p className="text-muted-foreground">Monitor resource utilization and plan for future capacity needs</p>
        </div>
        {/* Capacity Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {capacityMetrics?.map((metric, index) => (
            <div key={index} className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-foreground">{metric?.resource}</h4>
                <span className="text-sm text-muted-foreground">{metric?.utilization}% used</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2 mb-4">
                <div 
                  className={`h-2 rounded-full transition-all ${getUtilizationColor(metric?.utilization)}`}
                  style={{ width: `${metric?.utilization}%` }}
                />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Usage:</span>
                  <span className="text-foreground font-medium">{metric?.current}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Capacity:</span>
                  <span className="text-foreground font-medium">{metric?.capacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Projected Full:</span>
                  <span className="text-foreground font-medium">{metric?.projectedFull}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>Recommendation:</strong> {metric?.recommendation}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Growth Trends */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="TrendingUp" size={20} />
            Growth Trends & Forecasting
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-primary">+12%</p>
              <p className="text-sm text-muted-foreground">Monthly User Growth</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-accent">+8%</p>
              <p className="text-sm text-muted-foreground">Data Growth Rate</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-success">+15%</p>
              <p className="text-sm text-muted-foreground">API Usage Growth</p>
            </div>
          </div>

          <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Icon name="TrendingUp" size={48} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Growth trend charts will be displayed here</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Capacity Report
          </Button>
          <Button iconName="Settings" iconPosition="left">
            Configure Thresholds
          </Button>
        </div>
      </div>
    );
  }

  // Default view for other subsections
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <Icon name="Activity" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Feature Under Development</h3>
        <p className="text-muted-foreground">This monitoring section is currently being developed.</p>
      </div>
    </div>
  );
};

export default PerformanceMonitoringPanel;