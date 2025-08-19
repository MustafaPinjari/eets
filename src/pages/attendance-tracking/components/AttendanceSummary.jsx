import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceSummary = ({ summaryData = {} }) => {
  // Mock summary data
  const mockSummaryData = {
    totalHours: 168.5,
    regularHours: 160,
    overtimeHours: 8.5,
    leaveTaken: 2,
    presentDays: 20,
    absentDays: 2,
    lateDays: 3,
    workingDays: 22,
    ...summaryData
  };

  const summaryCards = [
    {
      title: 'Total Hours',
      value: `${mockSummaryData?.totalHours}h`,
      subtitle: 'This month',
      icon: 'Clock',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Regular Hours',
      value: `${mockSummaryData?.regularHours}h`,
      subtitle: 'Standard time',
      icon: 'Calendar',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Overtime',
      value: `${mockSummaryData?.overtimeHours}h`,
      subtitle: 'Extra hours',
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Leave Taken',
      value: `${mockSummaryData?.leaveTaken}`,
      subtitle: 'Days off',
      icon: 'Calendar',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const attendanceStats = [
    {
      label: 'Present Days',
      value: mockSummaryData?.presentDays,
      total: mockSummaryData?.workingDays,
      color: 'text-success',
      percentage: Math.round((mockSummaryData?.presentDays / mockSummaryData?.workingDays) * 100)
    },
    {
      label: 'Absent Days',
      value: mockSummaryData?.absentDays,
      total: mockSummaryData?.workingDays,
      color: 'text-destructive',
      percentage: Math.round((mockSummaryData?.absentDays / mockSummaryData?.workingDays) * 100)
    },
    {
      label: 'Late Arrivals',
      value: mockSummaryData?.lateDays,
      total: mockSummaryData?.workingDays,
      color: 'text-warning',
      percentage: Math.round((mockSummaryData?.lateDays / mockSummaryData?.workingDays) * 100)
    }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards?.map((card, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${card?.bgColor} flex items-center justify-center`}>
                <Icon name={card?.icon} size={20} className={card?.color} />
              </div>
              <div className="flex-1">
                <div className="text-2xl font-bold text-foreground">
                  {card?.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {card?.title}
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              {card?.subtitle}
            </div>
          </div>
        ))}
      </div>
      {/* Attendance Statistics */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-foreground mb-4">Attendance Statistics</h3>
        <div className="space-y-4">
          {attendanceStats?.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">
                  {stat?.label}
                </span>
                <span className={`text-sm font-bold ${stat?.color}`}>
                  {stat?.value}/{stat?.total}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      stat?.color?.includes('success') ? 'bg-success' :
                      stat?.color?.includes('destructive') ? 'bg-destructive' :
                      'bg-warning'
                    }`}
                    style={{ width: `${stat?.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-10 text-right">
                  {stat?.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Monthly Trend */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Trend</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">91%</div>
            <div className="text-sm text-muted-foreground">Attendance Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">8.4h</div>
            <div className="text-sm text-muted-foreground">Avg Daily Hours</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">0.4h</div>
            <div className="text-sm text-muted-foreground">Avg Overtime</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSummary;