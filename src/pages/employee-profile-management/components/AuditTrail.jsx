import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AuditTrail = ({ employee, isVisible, onToggle, userRole }) => {
  const [filterType, setFilterType] = useState('all');
  const [timeRange, setTimeRange] = useState('30days');

  // Mock audit trail data
  const auditLogs = [
    {
      id: 1,
      action: 'Profile Updated',
      field: 'Phone Number',
      oldValue: '+1 (555) 123-4567',
      newValue: '+1 (555) 987-6543',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      user: 'John Doe',
      userRole: 'employee',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      type: 'update'
    },
    {
      id: 2,
      action: 'Document Uploaded',
      field: 'Documents',
      oldValue: null,
      newValue: 'Training_Certificate_AWS.pdf',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      user: 'John Doe',
      userRole: 'employee',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      type: 'create'
    },
    {
      id: 3,
      action: 'Emergency Contact Added',
      field: 'Emergency Contacts',
      oldValue: null,
      newValue: 'Jane Doe - Spouse - +1 (555) 111-2222',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      user: 'John Doe',
      userRole: 'employee',
      ipAddress: '192.168.1.105',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
      type: 'create'
    },
    {
      id: 4,
      action: 'Salary Updated',
      field: 'Base Salary',
      oldValue: '$80,000',
      newValue: '$85,000',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      user: 'Sarah Johnson',
      userRole: 'hr',
      ipAddress: '192.168.1.50',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      type: 'update'
    },
    {
      id: 5,
      action: 'Asset Assigned',
      field: 'Assets',
      oldValue: null,
      newValue: 'MacBook Pro 16" (LT-2024-001)',
      timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
      user: 'IT Department',
      userRole: 'admin',
      ipAddress: '192.168.1.25',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      type: 'create'
    },
    {
      id: 6,
      action: 'Job Title Changed',
      field: 'Job Title',
      oldValue: 'Software Developer',
      newValue: 'Senior Software Developer',
      timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 1 month ago
      user: 'Michael Chen',
      userRole: 'manager',
      ipAddress: '192.168.1.75',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      type: 'update'
    },
    {
      id: 7,
      action: 'Profile Created',
      field: 'Employee Profile',
      oldValue: null,
      newValue: 'Initial profile setup completed',
      timestamp: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 3 months ago
      user: 'HR System',
      userRole: 'system',
      ipAddress: '192.168.1.10',
      userAgent: 'System/1.0',
      type: 'create'
    }
  ];

  const actionTypes = [
    { value: 'all', label: 'All Actions' },
    { value: 'create', label: 'Created' },
    { value: 'update', label: 'Updated' },
    { value: 'delete', label: 'Deleted' },
    { value: 'view', label: 'Viewed' }
  ];

  const timeRanges = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' },
    { value: '1year', label: 'Last year' },
    { value: 'all', label: 'All time' }
  ];

  const getActionIcon = (type) => {
    switch (type) {
      case 'create':
        return { name: 'Plus', color: 'text-success' };
      case 'update':
        return { name: 'Edit', color: 'text-accent' };
      case 'delete':
        return { name: 'Trash2', color: 'text-destructive' };
      case 'view':
        return { name: 'Eye', color: 'text-primary' };
      default:
        return { name: 'Activity', color: 'text-muted-foreground' };
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-destructive/10 text-destructive';
      case 'hr':
        return 'bg-accent/10 text-accent';
      case 'manager':
        return 'bg-primary/10 text-primary';
      case 'employee':
        return 'bg-success/10 text-success';
      case 'system':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp)?.toLocaleDateString();
  };

  const filteredLogs = auditLogs?.filter(log => {
    const matchesType = filterType === 'all' || log?.type === filterType;
    
    let matchesTimeRange = true;
    if (timeRange !== 'all') {
      const now = new Date();
      const logDate = new Date(log.timestamp);
      const daysDiff = Math.floor((now - logDate) / (1000 * 60 * 60 * 24));
      
      switch (timeRange) {
        case '7days':
          matchesTimeRange = daysDiff <= 7;
          break;
        case '30days':
          matchesTimeRange = daysDiff <= 30;
          break;
        case '90days':
          matchesTimeRange = daysDiff <= 90;
          break;
        case '1year':
          matchesTimeRange = daysDiff <= 365;
          break;
      }
    }
    
    return matchesType && matchesTimeRange;
  });

  const canViewAudit = userRole === 'admin' || userRole === 'hr';

  if (!canViewAudit) {
    return null;
  }

  if (!isVisible) {
    return (
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={onToggle}
          className="bg-card border-border shadow-elevated"
          iconName="History"
          iconSize={20}
        >
          <span className="sr-only">Show audit trail</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-card border-l border-border shadow-elevated z-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="History" size={20} className="text-accent" />
          <h3 className="font-semibold text-foreground">Audit Trail</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          iconName="X"
          iconSize={16}
        >
          <span className="sr-only">Close audit trail</span>
        </Button>
      </div>
      {/* Filters */}
      <div className="p-4 border-b border-border space-y-3">
        <Select
          label="Action Type"
          options={actionTypes}
          value={filterType}
          onChange={setFilterType}
          placeholder="Filter by action"
        />
        <Select
          label="Time Range"
          options={timeRanges}
          value={timeRange}
          onChange={setTimeRange}
          placeholder="Select time range"
        />
      </div>
      {/* Audit Logs */}
      <div className="flex-1 overflow-y-auto">
        {filteredLogs?.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredLogs?.map((log) => {
              const actionIcon = getActionIcon(log?.type);
              return (
                <div key={log?.id} className="p-4 hover:bg-muted/30 transition-micro">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-muted/50 rounded-full flex items-center justify-center mt-1">
                      <Icon name={actionIcon?.name} size={14} className={actionIcon?.color} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium text-foreground">{log?.action}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(log?.userRole)}`}>
                          {log?.userRole}
                        </span>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-2">
                        Field: {log?.field}
                      </p>
                      
                      {log?.oldValue && (
                        <div className="mb-2">
                          <div className="text-xs text-muted-foreground">From:</div>
                          <div className="text-xs text-foreground bg-destructive/10 px-2 py-1 rounded">
                            {log?.oldValue}
                          </div>
                        </div>
                      )}
                      
                      {log?.newValue && (
                        <div className="mb-2">
                          <div className="text-xs text-muted-foreground">
                            {log?.oldValue ? 'To:' : 'Value:'}
                          </div>
                          <div className="text-xs text-foreground bg-success/10 px-2 py-1 rounded">
                            {log?.newValue}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{log?.user}</span>
                        <span>{formatTimestamp(log?.timestamp)}</span>
                      </div>
                      
                      <div className="text-xs text-muted-foreground mt-1">
                        IP: {log?.ipAddress}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <Icon name="History" size={48} className="text-muted-foreground mb-4" />
            <h4 className="font-medium text-foreground mb-2">No audit logs found</h4>
            <p className="text-sm text-muted-foreground text-center">
              No activities match your current filter criteria.
            </p>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          Showing {filteredLogs?.length} of {auditLogs?.length} activities
        </div>
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="Download"
          iconPosition="left"
          iconSize={14}
          className="mt-2"
        >
          Export Audit Log
        </Button>
      </div>
    </div>
  );
};

export default AuditTrail;