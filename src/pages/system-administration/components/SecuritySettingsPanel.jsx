import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

import { Checkbox } from '../../../components/ui/Checkbox';

const SecuritySettingsPanel = ({ activeSubsection }) => {
  const [passwordSettings, setPasswordSettings] = useState({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    passwordExpiry: 90,
    preventReuse: 5
  });

  const [sessionSettings, setSessionSettings] = useState({
    sessionTimeout: 30,
    maxConcurrentSessions: 3,
    requireReauth: true,
    trackDevices: true
  });

  if (activeSubsection === 'security-settings-password-policy') {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Password Policy</h3>
          <p className="text-muted-foreground">Configure password requirements and security policies</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Password Requirements */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Icon name="Lock" size={20} />
              Password Requirements
            </h4>

            <div className="space-y-4">
              <Input
                label="Minimum Password Length"
                type="number"
                value={passwordSettings?.minLength}
                onChange={(e) => setPasswordSettings(prev => ({ ...prev, minLength: parseInt(e?.target?.value) }))}
                min="6"
                max="32"
              />

              <div className="space-y-3">
                <Checkbox
                  label="Require uppercase letters (A-Z)"
                  checked={passwordSettings?.requireUppercase}
                  onChange={(e) => setPasswordSettings(prev => ({ ...prev, requireUppercase: e?.target?.checked }))}
                />
                <Checkbox
                  label="Require lowercase letters (a-z)"
                  checked={passwordSettings?.requireLowercase}
                  onChange={(e) => setPasswordSettings(prev => ({ ...prev, requireLowercase: e?.target?.checked }))}
                />
                <Checkbox
                  label="Require numbers (0-9)"
                  checked={passwordSettings?.requireNumbers}
                  onChange={(e) => setPasswordSettings(prev => ({ ...prev, requireNumbers: e?.target?.checked }))}
                />
                <Checkbox
                  label="Require special characters (!@#$%)"
                  checked={passwordSettings?.requireSpecialChars}
                  onChange={(e) => setPasswordSettings(prev => ({ ...prev, requireSpecialChars: e?.target?.checked }))}
                />
              </div>
            </div>
          </div>

          {/* Password Expiry & History */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Icon name="Clock" size={20} />
              Password Expiry & History
            </h4>

            <div className="space-y-4">
              <Input
                label="Password Expiry (days)"
                type="number"
                value={passwordSettings?.passwordExpiry}
                onChange={(e) => setPasswordSettings(prev => ({ ...prev, passwordExpiry: parseInt(e?.target?.value) }))}
                description="Set to 0 for no expiry"
                min="0"
                max="365"
              />

              <Input
                label="Prevent Password Reuse"
                type="number"
                value={passwordSettings?.preventReuse}
                onChange={(e) => setPasswordSettings(prev => ({ ...prev, preventReuse: parseInt(e?.target?.value) }))}
                description="Number of previous passwords to remember"
                min="0"
                max="24"
              />
            </div>
          </div>
        </div>
        {/* Current Policy Preview */}
        <div className="bg-muted/30 rounded-lg border border-border p-6">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="Eye" size={20} />
            Current Policy Preview
          </h4>
          
          <div className="bg-card rounded-lg p-4">
            <p className="text-sm text-foreground mb-2">Password must contain:</p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• At least {passwordSettings?.minLength} characters</li>
              {passwordSettings?.requireUppercase && <li>• At least one uppercase letter</li>}
              {passwordSettings?.requireLowercase && <li>• At least one lowercase letter</li>}
              {passwordSettings?.requireNumbers && <li>• At least one number</li>}
              {passwordSettings?.requireSpecialChars && <li>• At least one special character</li>}
              {passwordSettings?.passwordExpiry > 0 && <li>• Must be changed every {passwordSettings?.passwordExpiry} days</li>}
              {passwordSettings?.preventReuse > 0 && <li>• Cannot reuse last {passwordSettings?.preventReuse} passwords</li>}
            </ul>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline">Reset to Default</Button>
          <Button>Save Password Policy</Button>
        </div>
      </div>
    );
  }

  if (activeSubsection === 'security-settings-session-management') {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Session Management</h3>
          <p className="text-muted-foreground">Configure user session settings and security controls</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Session Timeout */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Icon name="Timer" size={20} />
              Session Timeout
            </h4>

            <div className="space-y-4">
              <Input
                label="Idle Timeout (minutes)"
                type="number"
                value={sessionSettings?.sessionTimeout}
                onChange={(e) => setSessionSettings(prev => ({ ...prev, sessionTimeout: parseInt(e?.target?.value) }))}
                description="Automatically log out inactive users"
                min="5"
                max="480"
              />

              <Input
                label="Maximum Concurrent Sessions"
                type="number"
                value={sessionSettings?.maxConcurrentSessions}
                onChange={(e) => setSessionSettings(prev => ({ ...prev, maxConcurrentSessions: parseInt(e?.target?.value) }))}
                description="Maximum sessions per user"
                min="1"
                max="10"
              />
            </div>
          </div>

          {/* Security Options */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Icon name="Shield" size={20} />
              Security Options
            </h4>

            <div className="space-y-4">
              <Checkbox
                label="Require re-authentication for sensitive actions"
                description="Users must re-enter password for critical operations"
                checked={sessionSettings?.requireReauth}
                onChange={(e) => setSessionSettings(prev => ({ ...prev, requireReauth: e?.target?.checked }))}
              />

              <Checkbox
                label="Track user devices and locations"
                description="Monitor login locations and device information"
                checked={sessionSettings?.trackDevices}
                onChange={(e) => setSessionSettings(prev => ({ ...prev, trackDevices: e?.target?.checked }))}
              />
            </div>
          </div>
        </div>
        {/* Active Sessions Monitor */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="Monitor" size={20} />
            Active Sessions Monitor
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium text-foreground">User</th>
                  <th className="text-left p-3 font-medium text-foreground">Device</th>
                  <th className="text-left p-3 font-medium text-foreground">Location</th>
                  <th className="text-left p-3 font-medium text-foreground">Login Time</th>
                  <th className="text-left p-3 font-medium text-foreground">Last Activity</th>
                  <th className="text-left p-3 font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { user: 'John Smith', device: 'Chrome on Windows', location: 'New York, US', loginTime: '09:30 AM', lastActivity: '2 min ago' },
                  { user: 'Sarah Johnson', device: 'Safari on macOS', location: 'London, UK', loginTime: '08:15 AM', lastActivity: '5 min ago' },
                  { user: 'Michael Brown', device: 'Firefox on Linux', location: 'Toronto, CA', loginTime: '10:45 AM', lastActivity: '1 min ago' }
                ]?.map((session, index) => (
                  <tr key={index} className="hover:bg-muted/30 transition-micro">
                    <td className="p-3 text-sm text-foreground">{session?.user}</td>
                    <td className="p-3 text-sm text-muted-foreground">{session?.device}</td>
                    <td className="p-3 text-sm text-muted-foreground">{session?.location}</td>
                    <td className="p-3 text-sm text-muted-foreground">{session?.loginTime}</td>
                    <td className="p-3 text-sm text-muted-foreground">{session?.lastActivity}</td>
                    <td className="p-3">
                      <Button variant="destructive" size="sm" iconName="LogOut" iconPosition="left">
                        Terminate
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline">Reset to Default</Button>
          <Button>Save Session Settings</Button>
        </div>
      </div>
    );
  }

  if (activeSubsection === 'security-settings-security-monitoring') {
    const securityMetrics = [
      { label: 'Failed Login Attempts (24h)', value: '23', trend: 'up', color: 'text-warning' },
      { label: 'Suspicious Activities', value: '5', trend: 'down', color: 'text-error' },
      { label: 'Active Security Alerts', value: '2', trend: 'stable', color: 'text-accent' },
      { label: 'Blocked IP Addresses', value: '12', trend: 'up', color: 'text-muted-foreground' }
    ];

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Security Monitoring</h3>
          <p className="text-muted-foreground">Monitor security events and suspicious activities</p>
        </div>
        {/* Security Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {securityMetrics?.map((metric, index) => (
            <div key={index} className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric?.label}</p>
                  <p className={`text-2xl font-bold ${metric?.color}`}>{metric?.value}</p>
                </div>
                <Icon 
                  name={metric?.trend === 'up' ? 'TrendingUp' : metric?.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                  size={20} 
                  className={metric?.color}
                />
              </div>
            </div>
          ))}
        </div>
        {/* Recent Security Events */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="AlertTriangle" size={20} />
            Recent Security Events
          </h4>

          <div className="space-y-3">
            {[
              { type: 'warning', message: 'Multiple failed login attempts from IP 192.168.1.100', time: '5 minutes ago' },
              { type: 'error', message: 'Suspicious activity detected: User accessing restricted area', time: '15 minutes ago' },
              { type: 'info', message: 'Password policy updated by admin', time: '1 hour ago' },
              { type: 'success', message: 'Security scan completed successfully', time: '2 hours ago' }
            ]?.map((event, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <Icon 
                  name={event?.type === 'error' ? 'XCircle' : event?.type === 'warning' ? 'AlertTriangle' : event?.type === 'success' ? 'CheckCircle' : 'Info'} 
                  size={16} 
                  className={`mt-0.5 ${
                    event?.type === 'error' ? 'text-error' : 
                    event?.type === 'warning' ? 'text-warning' : 
                    event?.type === 'success' ? 'text-success' : 'text-primary'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm text-foreground">{event?.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{event?.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Security Report
          </Button>
          <Button iconName="RefreshCw" iconPosition="left">
            Refresh Monitoring
          </Button>
        </div>
      </div>
    );
  }

  // Default view for other subsections
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <Icon name="Shield" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Feature Under Development</h3>
        <p className="text-muted-foreground">This security feature is currently being developed.</p>
      </div>
    </div>
  );
};

export default SecuritySettingsPanel;