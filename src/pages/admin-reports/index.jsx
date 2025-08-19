import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { Checkbox } from '../../components/ui/Checkbox';

const AdminReports = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('administration');
  const [selectedAssets, setSelectedAssets] = useState([]);

  // Mock user data
  const mockUser = {
    name: 'System Admin',
    email: 'admin@company.com',
    role: 'admin'
  };

  // Mock assets data
  const mockAssets = [
    {
      id: 'AST001',
      name: 'MacBook Pro 16"',
      category: 'Laptop',
      assignedTo: 'John Smith',
      assignedDate: '2024-01-15',
      status: 'assigned',
      condition: 'excellent',
      warrantyExpiry: '2027-01-15',
      value: 2499
    },
    {
      id: 'AST002',
      name: 'iPhone 15 Pro',
      category: 'Mobile',
      assignedTo: 'Sarah Johnson',
      assignedDate: '2024-02-01',
      status: 'assigned',
      condition: 'good',
      warrantyExpiry: '2025-02-01',
      value: 999
    },
    {
      id: 'AST003',
      name: 'Dell Monitor 27"',
      category: 'Monitor',
      assignedTo: 'Unassigned',
      assignedDate: null,
      status: 'available',
      condition: 'excellent',
      warrantyExpiry: '2026-03-15',
      value: 649
    }
  ];

  // Mock system configuration
  const [systemConfig, setSystemConfig] = useState({
    companyName: 'Enterprise Corporation',
    timezone: 'America/New_York',
    currency: 'USD',
    workWeekStart: 'Monday',
    fiscalYearStart: 'January',
    passwordPolicy: {
      minLength: 12,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSymbols: true,
      expiry: 90
    }
  });

  const tabs = [
    { id: 'administration', label: 'System Administration', icon: 'Settings' },
    { id: 'assets', label: 'Asset Management', icon: 'Monitor' },
    { id: 'reports', label: 'Reports & Analytics', icon: 'BarChart3' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getAssetStatusColor = (status) => {
    switch (status) {
      case 'assigned': return 'bg-success/10 text-success';
      case 'available': return 'bg-primary/10 text-primary';
      case 'maintenance': return 'bg-warning/10 text-warning';
      case 'retired': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const renderAdministrationTab = () => (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: '247', icon: 'Users', color: 'text-primary' },
          { label: 'Active Sessions', value: '89', icon: 'Activity', color: 'text-success' },
          { label: 'System Uptime', value: '99.9%', icon: 'Server', color: 'text-accent' },
          { label: 'Storage Used', value: '68%', icon: 'HardDrive', color: 'text-warning' }
        ].map((stat, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <Icon name={stat.icon} size={24} className={stat.color} />
            </div>
          </div>
        ))}
      </div>

      {/* User Management */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">User Management</h3>
          <Button iconName="Plus" iconPosition="left">
            Add User
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { role: 'Admin', count: 2, color: 'bg-destructive' },
            { role: 'HR', count: 5, color: 'bg-accent' },
            { role: 'Manager', count: 15, color: 'bg-primary' },
            { role: 'Employee', count: 225, color: 'bg-success' }
          ].map((role, index) => (
            <div key={index} className="p-4 bg-muted/20 rounded-lg text-center">
              <div className={`w-12 h-12 ${role.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <Icon name="Users" size={20} color="white" />
              </div>
              <div className="text-2xl font-bold text-foreground">{role.count}</div>
              <div className="text-sm text-muted-foreground">{role.role}s</div>
            </div>
          ))}
        </div>
      </div>

      {/* System Configuration */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-xl font-semibold text-foreground mb-6">System Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Company Name"
              value={systemConfig.companyName}
              onChange={(e) => setSystemConfig(prev => ({ ...prev, companyName: e.target.value }))}
            />
            <Select
              label="Default Timezone"
              options={[
                { value: 'America/New_York', label: 'Eastern Time' },
                { value: 'America/Chicago', label: 'Central Time' },
                { value: 'America/Los_Angeles', label: 'Pacific Time' }
              ]}
              value={systemConfig.timezone}
              onChange={(value) => setSystemConfig(prev => ({ ...prev, timezone: value }))}
            />
          </div>
          
          <div className="space-y-4">
            <Select
              label="Default Currency"
              options={[
                { value: 'USD', label: 'US Dollar ($)' },
                { value: 'EUR', label: 'Euro (€)' },
                { value: 'GBP', label: 'British Pound (£)' }
              ]}
              value={systemConfig.currency}
              onChange={(value) => setSystemConfig(prev => ({ ...prev, currency: value }))}
            />
            <Select
              label="Fiscal Year Start"
              options={[
                { value: 'January', label: 'January' },
                { value: 'April', label: 'April' },
                { value: 'July', label: 'July' }
              ]}
              value={systemConfig.fiscalYearStart}
              onChange={(value) => setSystemConfig(prev => ({ ...prev, fiscalYearStart: value }))}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button>Save Configuration</Button>
        </div>
      </div>

      {/* Password Policy */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-xl font-semibold text-foreground mb-6">Password Policy</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Minimum Length"
              type="number"
              value={systemConfig.passwordPolicy.minLength}
              onChange={(e) => setSystemConfig(prev => ({
                ...prev,
                passwordPolicy: { ...prev.passwordPolicy, minLength: parseInt(e.target.value) }
              }))}
              min="8"
              max="32"
            />
            <Input
              label="Password Expiry (days)"
              type="number"
              value={systemConfig.passwordPolicy.expiry}
              onChange={(e) => setSystemConfig(prev => ({
                ...prev,
                passwordPolicy: { ...prev.passwordPolicy, expiry: parseInt(e.target.value) }
              }))}
              min="0"
              max="365"
            />
          </div>
          
          <div className="space-y-3">
            <Checkbox
              label="Require uppercase letters"
              checked={systemConfig.passwordPolicy.requireUppercase}
              onChange={(e) => setSystemConfig(prev => ({
                ...prev,
                passwordPolicy: { ...prev.passwordPolicy, requireUppercase: e.target.checked }
              }))}
            />
            <Checkbox
              label="Require lowercase letters"
              checked={systemConfig.passwordPolicy.requireLowercase}
              onChange={(e) => setSystemConfig(prev => ({
                ...prev,
                passwordPolicy: { ...prev.passwordPolicy, requireLowercase: e.target.checked }
              }))}
            />
            <Checkbox
              label="Require numbers"
              checked={systemConfig.passwordPolicy.requireNumbers}
              onChange={(e) => setSystemConfig(prev => ({
                ...prev,
                passwordPolicy: { ...prev.passwordPolicy, requireNumbers: e.target.checked }
              }))}
            />
            <Checkbox
              label="Require symbols"
              checked={systemConfig.passwordPolicy.requireSymbols}
              onChange={(e) => setSystemConfig(prev => ({
                ...prev,
                passwordPolicy: { ...prev.passwordPolicy, requireSymbols: e.target.checked }
              }))}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button>Update Password Policy</Button>
        </div>
      </div>
    </div>
  );

  const renderAssetsTab = () => (
    <div className="space-y-6">
      {/* Asset Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Assets', value: '156', icon: 'Package', color: 'text-primary' },
          { label: 'Assigned', value: '134', icon: 'UserCheck', color: 'text-success' },
          { label: 'Available', value: '22', icon: 'Package', color: 'text-accent' },
          { label: 'Total Value', value: '$2.1M', icon: 'DollarSign', color: 'text-warning' }
        ].map((stat, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <Icon name={stat.icon} size={24} className={stat.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Asset Management */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">Asset Inventory</h3>
          <div className="flex gap-3">
            <Button variant="outline" iconName="Download" iconPosition="left">
              Export Assets
            </Button>
            <Button iconName="Plus" iconPosition="left">
              Add Asset
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left p-4 w-12">
                  <Checkbox
                    checked={selectedAssets.length === mockAssets.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAssets(mockAssets.map(asset => asset.id));
                      } else {
                        setSelectedAssets([]);
                      }
                    }}
                  />
                </th>
                <th className="text-left p-4 font-medium text-foreground">Asset</th>
                <th className="text-left p-4 font-medium text-foreground">Category</th>
                <th className="text-left p-4 font-medium text-foreground">Assigned To</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Condition</th>
                <th className="text-left p-4 font-medium text-foreground">Value</th>
                <th className="text-left p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-muted/30 transition-micro">
                  <td className="p-4">
                    <Checkbox
                      checked={selectedAssets.includes(asset.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAssets([...selectedAssets, asset.id]);
                        } else {
                          setSelectedAssets(selectedAssets.filter(id => id !== asset.id));
                        }
                      }}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Icon name="Monitor" size={20} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{asset.name}</p>
                        <p className="text-sm text-muted-foreground">{asset.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-foreground">{asset.category}</td>
                  <td className="p-4 text-sm text-foreground">{asset.assignedTo}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAssetStatusColor(asset.status)}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-foreground capitalize">{asset.condition}</td>
                  <td className="p-4 text-sm font-medium text-foreground">{formatCurrency(asset.value)}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" iconName="Edit" iconSize={16} />
                      <Button variant="ghost" size="icon" iconName="RotateCcw" iconSize={16} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="space-y-6">
      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: 'Headcount Report',
            description: 'Employee count by department and location',
            icon: 'Users',
            color: 'bg-primary',
            data: { total: 247, newHires: 12, exits: 5 }
          },
          {
            title: 'Attendance Analytics',
            description: 'Attendance patterns and anomalies',
            icon: 'Clock',
            color: 'bg-success',
            data: { avgAttendance: '94.2%', lateArrivals: 23, earlyDepartures: 8 }
          },
          {
            title: 'Leave Balance Report',
            description: 'Leave utilization across teams',
            icon: 'Calendar',
            color: 'bg-accent',
            data: { totalLeaves: 156, pending: 12, approved: 144 }
          },
          {
            title: 'Performance Distribution',
            description: 'Performance ratings across organization',
            icon: 'TrendingUp',
            color: 'bg-secondary',
            data: { avgRating: '4.1/5', topPerformers: 45, needsImprovement: 12 }
          },
          {
            title: 'Payroll Summary',
            description: 'Monthly payroll breakdown',
            icon: 'DollarSign',
            color: 'bg-warning',
            data: { totalPayroll: '$1.2M', avgSalary: '$4,856', bonuses: '$45K' }
          },
          {
            title: 'Asset Utilization',
            description: 'Asset assignment and utilization',
            icon: 'Monitor',
            color: 'bg-primary',
            data: { totalAssets: 156, assigned: 134, available: 22 }
          }
        ].map((report, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-6 shadow-soft hover:shadow-elevated transition-layout">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${report.color} rounded-lg flex items-center justify-center`}>
                <Icon name={report.icon} size={24} color="white" />
              </div>
              <Button variant="ghost" size="icon" iconName="Download" iconSize={16} />
            </div>
            
            <h4 className="font-semibold text-foreground mb-2">{report.title}</h4>
            <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
            
            <div className="space-y-2">
              {Object.entries(report.data).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm" fullWidth className="mt-4">
              Generate Report
            </Button>
          </div>
        ))}
      </div>

      {/* Audit Trail */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-xl font-semibold text-foreground mb-6">Recent Audit Activities</h3>
        
        <div className="space-y-3">
          {[
            { action: 'User Created', user: 'Admin', details: 'Created new employee: Jane Doe', time: '2 hours ago' },
            { action: 'Salary Updated', user: 'HR Manager', details: 'Updated salary for John Smith', time: '4 hours ago' },
            { action: 'Asset Assigned', user: 'IT Admin', details: 'Assigned MacBook Pro to new hire', time: '6 hours ago' },
            { action: 'Leave Approved', user: 'Manager', details: 'Approved vacation leave for Sarah Johnson', time: '1 day ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-muted/20 rounded-lg">
              <Icon name="Activity" size={16} className="text-accent" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{activity.action}</span>
                  <span className="text-sm text-muted-foreground">by {activity.user}</span>
                </div>
                <p className="text-sm text-muted-foreground">{activity.details}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Administration & Reports - Enterprise EMS</title>
        <meta name="description" content="System administration, asset management, and comprehensive reporting" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        {/* Global Header */}
        <GlobalHeader
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          user={mockUser}
          notifications={[]}
        />

        {/* Sidebar Navigation */}
        <SidebarNavigation
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          userRole={mockUser.role}
        />

        {/* Main Content */}
        <main className={`transition-layout ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
        } pt-16`}>
          <div className="p-6">
            {/* Breadcrumb Navigation */}
            <BreadcrumbNavigation customBreadcrumbs={[
              { label: 'Dashboard', path: '/dashboard' },
              { label: 'Administration & Reports', path: '/admin-reports' }
            ]} />

            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Administration & Reports
              </h1>
              <p className="text-muted-foreground">
                System configuration, asset management, and comprehensive analytics
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-border mb-8">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-micro ${
                      activeTab === tab.id
                        ? 'border-accent text-accent'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'administration' && renderAdministrationTab()}
            {activeTab === 'assets' && renderAssetsTab()}
            {activeTab === 'reports' && renderReportsTab()}
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminReports;