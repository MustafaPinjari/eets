import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AuditLogsPanel = ({ activeSubsection }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUser, setFilterUser] = useState('all');
  const [filterAction, setFilterAction] = useState('all');
  const [filterDate, setFilterDate] = useState('today');

  const userOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'john.smith', label: 'John Smith' },
    { value: 'sarah.johnson', label: 'Sarah Johnson' },
    { value: 'michael.brown', label: 'Michael Brown' },
    { value: 'emily.davis', label: 'Emily Davis' }
  ];

  const actionOptions = [
    { value: 'all', label: 'All Actions' },
    { value: 'login', label: 'Login' },
    { value: 'logout', label: 'Logout' },
    { value: 'create', label: 'Create' },
    { value: 'update', label: 'Update' },
    { value: 'delete', label: 'Delete' },
    { value: 'view', label: 'View' },
    { value: 'export', label: 'Export' }
  ];

  const dateOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  if (activeSubsection === 'audit-logs-activity-logs') {
    const mockActivityLogs = [
      {
        id: 1,
        timestamp: '2025-01-19 09:45:23',
        user: 'John Smith',
        action: 'Update',
        resource: 'Employee Profile',
        details: 'Updated salary information for employee ID: EMP001',
        ipAddress: '192.168.1.100',
        userAgent: 'Chrome 120.0.0.0',
        status: 'Success'
      },
      {
        id: 2,
        timestamp: '2025-01-19 09:30:15',
        user: 'Sarah Johnson',
        action: 'Create',
        resource: 'Leave Request',
        details: 'Created new leave request for vacation from 2025-02-15 to 2025-02-20',
        ipAddress: '192.168.1.105',
        userAgent: 'Safari 17.2.1',
        status: 'Success'
      },
      {
        id: 3,
        timestamp: '2025-01-19 09:15:42',
        user: 'Michael Brown',
        action: 'Export',
        resource: 'Attendance Report',
        details: 'Exported attendance report for December 2024',
        ipAddress: '192.168.1.110',
        userAgent: 'Firefox 121.0.0',
        status: 'Success'
      },
      {
        id: 4,
        timestamp: '2025-01-19 09:00:08',
        user: 'Emily Davis',
        action: 'Delete',
        resource: 'User Account',
        details: 'Attempted to delete user account: temp.user@company.com',
        ipAddress: '192.168.1.115',
        userAgent: 'Chrome 120.0.0.0',
        status: 'Failed'
      },
      {
        id: 5,
        timestamp: '2025-01-19 08:45:33',
        user: 'Admin System',
        action: 'Update',
        resource: 'Security Policy',
        details: 'Updated password policy requirements',
        ipAddress: '127.0.0.1',
        userAgent: 'System Process',
        status: 'Success'
      }
    ];

    const getActionIcon = (action) => {
      const icons = {
        'Create': 'Plus',
        'Update': 'Edit',
        'Delete': 'Trash2',
        'View': 'Eye',
        'Export': 'Download',
        'Login': 'LogIn',
        'Logout': 'LogOut'
      };
      return icons?.[action] || 'Activity';
    };

    const getStatusBadge = (status) => {
      return status === 'Success' ? (
        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">Success</span>
      ) : (
        <span className="px-2 py-1 bg-error/10 text-error text-xs rounded-full">Failed</span>
      );
    };

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Activity Logs</h3>
          <p className="text-muted-foreground">Monitor all user activities and system events</p>
        </div>
        {/* Filters */}
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input
              type="search"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
            <Select
              options={userOptions}
              value={filterUser}
              onChange={setFilterUser}
              placeholder="Filter by user"
            />
            <Select
              options={actionOptions}
              value={filterAction}
              onChange={setFilterAction}
              placeholder="Filter by action"
            />
            <Select
              options={dateOptions}
              value={filterDate}
              onChange={setFilterDate}
              placeholder="Filter by date"
            />
            <Button iconName="RefreshCw" iconPosition="left" fullWidth>
              Refresh
            </Button>
          </div>
        </div>
        {/* Activity Logs Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium text-foreground">Timestamp</th>
                  <th className="text-left p-4 font-medium text-foreground">User</th>
                  <th className="text-left p-4 font-medium text-foreground">Action</th>
                  <th className="text-left p-4 font-medium text-foreground">Resource</th>
                  <th className="text-left p-4 font-medium text-foreground">Details</th>
                  <th className="text-left p-4 font-medium text-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-foreground">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockActivityLogs?.map((log) => (
                  <tr key={log?.id} className="hover:bg-muted/30 transition-micro">
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground font-mono">
                        {new Date(log.timestamp)?.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <Icon name="User" size={12} color="white" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{log?.user}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Icon name={getActionIcon(log?.action)} size={16} className="text-muted-foreground" />
                        <span className="text-sm text-foreground">{log?.action}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-foreground">{log?.resource}</span>
                    </td>
                    <td className="p-4 max-w-xs">
                      <p className="text-sm text-muted-foreground truncate" title={log?.details}>
                        {log?.details}
                      </p>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(log?.status)}
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground font-mono">{log?.ipAddress}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination and Export */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing 5 of 1,247 activity logs
          </p>
          <div className="flex items-center gap-3">
            <Button variant="outline" iconName="Download" iconPosition="left">
              Export Logs
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" iconName="ChevronLeft">
                Previous
              </Button>
              <Button variant="outline" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm" iconName="ChevronRight">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubsection === 'audit-logs-login-logs') {
    const mockLoginLogs = [
      {
        id: 1,
        timestamp: '2025-01-19 09:30:00',
        user: 'John Smith',
        email: 'john.smith@company.com',
        ipAddress: '192.168.1.100',
        location: 'New York, US',
        device: 'Chrome on Windows 11',
        status: 'Success',
        sessionDuration: '2h 15m'
      },
      {
        id: 2,
        timestamp: '2025-01-19 09:15:00',
        user: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        ipAddress: '192.168.1.105',
        location: 'London, UK',
        device: 'Safari on macOS',
        status: 'Success',
        sessionDuration: '1h 45m'
      },
      {
        id: 3,
        timestamp: '2025-01-19 09:00:00',
        user: 'Unknown User',
        email: 'invalid@company.com',
        ipAddress: '203.0.113.1',
        location: 'Unknown',
        device: 'Chrome on Linux',
        status: 'Failed',
        sessionDuration: '-'
      },
      {
        id: 4,
        timestamp: '2025-01-19 08:45:00',
        user: 'Michael Brown',
        email: 'michael.brown@company.com',
        ipAddress: '192.168.1.110',
        location: 'Toronto, CA',
        device: 'Firefox on Windows 10',
        status: 'Success',
        sessionDuration: '3h 20m'
      }
    ];

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Login Logs</h3>
          <p className="text-muted-foreground">Track user authentication attempts and sessions</p>
        </div>
        {/* Login Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Logins Today', value: '247', icon: 'LogIn', color: 'text-primary' },
            { label: 'Failed Attempts', value: '23', icon: 'XCircle', color: 'text-error' },
            { label: 'Active Sessions', value: '89', icon: 'Users', color: 'text-success' },
            { label: 'Suspicious Activities', value: '5', icon: 'AlertTriangle', color: 'text-warning' }
          ]?.map((stat, index) => (
            <div key={index} className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat?.label}</p>
                  <p className={`text-2xl font-bold ${stat?.color}`}>{stat?.value}</p>
                </div>
                <Icon name={stat?.icon} size={24} className={stat?.color} />
              </div>
            </div>
          ))}
        </div>
        {/* Filters */}
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              type="search"
              placeholder="Search login logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
            <Select
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'success', label: 'Successful' },
                { value: 'failed', label: 'Failed' }
              ]}
              value={filterAction}
              onChange={setFilterAction}
              placeholder="Filter by status"
            />
            <Select
              options={dateOptions}
              value={filterDate}
              onChange={setFilterDate}
              placeholder="Filter by date"
            />
            <Button iconName="RefreshCw" iconPosition="left" fullWidth>
              Refresh
            </Button>
          </div>
        </div>
        {/* Login Logs Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium text-foreground">Timestamp</th>
                  <th className="text-left p-4 font-medium text-foreground">User</th>
                  <th className="text-left p-4 font-medium text-foreground">IP Address</th>
                  <th className="text-left p-4 font-medium text-foreground">Location</th>
                  <th className="text-left p-4 font-medium text-foreground">Device</th>
                  <th className="text-left p-4 font-medium text-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-foreground">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockLoginLogs?.map((log) => (
                  <tr key={log?.id} className="hover:bg-muted/30 transition-micro">
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground font-mono">
                        {new Date(log.timestamp)?.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{log?.user}</p>
                        <p className="text-xs text-muted-foreground">{log?.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground font-mono">{log?.ipAddress}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">{log?.location}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">{log?.device}</span>
                    </td>
                    <td className="p-4">
                      {log?.status === 'Success' ? (
                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full flex items-center gap-1">
                          <Icon name="CheckCircle" size={12} />
                          Success
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-error/10 text-error text-xs rounded-full flex items-center gap-1">
                          <Icon name="XCircle" size={12} />
                          Failed
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">{log?.sessionDuration}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing 4 of 1,847 login attempts
          </p>
          <div className="flex items-center gap-3">
            <Button variant="outline" iconName="Download" iconPosition="left">
              Export Login Logs
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" iconName="ChevronLeft">
                Previous
              </Button>
              <Button variant="outline" size="sm">1</Button>
              <Button variant="outline" size="sm" iconName="ChevronRight">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default view for other subsections
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Feature Under Development</h3>
        <p className="text-muted-foreground">This audit section is currently being developed.</p>
      </div>
    </div>
  );
};

export default AuditLogsPanel;