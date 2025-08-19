import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const TimesheetsPerformance = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('timesheets');
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [timesheetData, setTimesheetData] = useState({});

  // Mock user data
  const mockUser = {
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'employee'
  };

  // Mock timesheet data
  const mockTimesheetEntries = [
    {
      id: 1,
      date: '2025-01-20',
      project: 'ERP System Development',
      task: 'Frontend Development',
      hours: 8,
      billable: true,
      status: 'submitted',
      description: 'Worked on user dashboard components'
    },
    {
      id: 2,
      date: '2025-01-21',
      project: 'ERP System Development',
      task: 'Code Review',
      hours: 6,
      billable: true,
      status: 'draft',
      description: 'Reviewed pull requests and provided feedback'
    },
    {
      id: 3,
      date: '2025-01-22',
      project: 'Internal Training',
      task: 'React Workshop',
      hours: 4,
      billable: false,
      status: 'draft',
      description: 'Attended React best practices workshop'
    }
  ];

  // Mock OKR data
  const mockOKRs = [
    {
      id: 1,
      objective: 'Improve Development Velocity',
      keyResults: [
        { description: 'Reduce average PR review time to 2 hours', progress: 75, target: 100 },
        { description: 'Increase code coverage to 90%', progress: 85, target: 90 },
        { description: 'Complete 3 major features', progress: 67, target: 100 }
      ],
      quarter: 'Q1 2025',
      status: 'in_progress'
    },
    {
      id: 2,
      objective: 'Enhance Team Collaboration',
      keyResults: [
        { description: 'Conduct 12 knowledge sharing sessions', progress: 25, target: 100 },
        { description: 'Mentor 2 junior developers', progress: 50, target: 100 },
        { description: 'Improve team satisfaction score to 4.5/5', progress: 80, target: 100 }
      ],
      quarter: 'Q1 2025',
      status: 'in_progress'
    }
  ];

  // Mock payroll data
  const mockPayrollData = {
    grossSalary: 7083.33,
    basicSalary: 5000,
    allowances: {
      hra: 1500,
      transport: 300,
      meal: 283.33
    },
    deductions: {
      tax: 1200,
      insurance: 150,
      retirement: 354.17
    },
    netSalary: 5379.16,
    payPeriod: 'January 2025',
    payDate: '2025-01-31'
  };

  const projectOptions = [
    { value: 'erp-system', label: 'ERP System Development' },
    { value: 'mobile-app', label: 'Mobile App Project' },
    { value: 'internal-training', label: 'Internal Training' },
    { value: 'maintenance', label: 'System Maintenance' }
  ];

  const taskOptions = [
    { value: 'frontend-dev', label: 'Frontend Development' },
    { value: 'backend-dev', label: 'Backend Development' },
    { value: 'code-review', label: 'Code Review' },
    { value: 'testing', label: 'Testing' },
    { value: 'documentation', label: 'Documentation' },
    { value: 'meetings', label: 'Meetings' }
  ];

  const tabs = [
    { id: 'timesheets', label: 'Timesheets', icon: 'Clock' },
    { id: 'performance', label: 'Performance & OKRs', icon: 'Target' },
    { id: 'payroll', label: 'Payroll Summary', icon: 'DollarSign' }
  ];

  const addTimesheetEntry = () => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      project: '',
      task: '',
      hours: 0,
      billable: true,
      status: 'draft',
      description: ''
    };
    // In real app, this would update state
    console.log('Adding new timesheet entry:', newEntry);
  };

  const submitTimesheet = () => {
    console.log('Submitting timesheet for approval');
    alert('Timesheet submitted for manager approval');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const renderTimesheetsTab = () => (
    <div className="space-y-6">
      {/* Timesheet Header */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground">Weekly Timesheet</h3>
            <p className="text-muted-foreground">Week of January 20-26, 2025</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
              onClick={addTimesheetEntry}
            >
              Add Entry
            </Button>
            <Button
              iconName="Send"
              iconPosition="left"
              onClick={submitTimesheet}
            >
              Submit for Approval
            </Button>
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-primary/10 rounded-lg">
            <div className="text-2xl font-bold text-primary">38.5h</div>
            <div className="text-sm text-muted-foreground">Total Hours</div>
          </div>
          <div className="text-center p-4 bg-success/10 rounded-lg">
            <div className="text-2xl font-bold text-success">32h</div>
            <div className="text-sm text-muted-foreground">Billable Hours</div>
          </div>
          <div className="text-center p-4 bg-warning/10 rounded-lg">
            <div className="text-2xl font-bold text-warning">6.5h</div>
            <div className="text-sm text-muted-foreground">Non-Billable</div>
          </div>
          <div className="text-center p-4 bg-accent/10 rounded-lg">
            <div className="text-2xl font-bold text-accent">83%</div>
            <div className="text-sm text-muted-foreground">Utilization</div>
          </div>
        </div>
      </div>

      {/* Timesheet Entries */}
      <div className="bg-card rounded-lg border border-border overflow-hidden shadow-soft">
        <div className="p-4 border-b border-border">
          <h4 className="font-semibold text-foreground">Time Entries</h4>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Date</th>
                <th className="text-left p-4 font-medium text-foreground">Project</th>
                <th className="text-left p-4 font-medium text-foreground">Task</th>
                <th className="text-left p-4 font-medium text-foreground">Hours</th>
                <th className="text-left p-4 font-medium text-foreground">Billable</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockTimesheetEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-muted/30 transition-micro">
                  <td className="p-4 text-sm text-foreground">
                    {new Date(entry.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-sm text-foreground">{entry.project}</td>
                  <td className="p-4 text-sm text-foreground">{entry.task}</td>
                  <td className="p-4 text-sm font-medium text-foreground">{entry.hours}h</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      entry.billable ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                    }`}>
                      {entry.billable ? 'Billable' : 'Non-billable'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      entry.status === 'submitted' ? 'bg-accent/10 text-accent' : 'bg-warning/10 text-warning'
                    }`}>
                      {entry.status === 'submitted' ? 'Submitted' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" iconName="Edit" iconSize={16} />
                      <Button variant="ghost" size="icon" iconName="Trash2" iconSize={16} />
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

  const renderPerformanceTab = () => (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Target" size={24} className="text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Overall Rating</h3>
              <p className="text-2xl font-bold text-success">4.2/5</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Exceeds expectations</p>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">OKR Progress</h3>
              <p className="text-2xl font-bold text-accent">71%</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">On track for Q1 goals</p>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckSquare" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Tasks Completed</h3>
              <p className="text-2xl font-bold text-primary">24/30</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">This quarter</p>
        </div>
      </div>

      {/* OKRs */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground">Objectives & Key Results (OKRs)</h3>
            <p className="text-muted-foreground">Q1 2025 Performance Goals</p>
          </div>
          <Button variant="outline" iconName="Plus" iconPosition="left">
            Add Objective
          </Button>
        </div>

        <div className="space-y-6">
          {mockOKRs.map((okr) => (
            <div key={okr.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-foreground">{okr.objective}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  okr.status === 'completed' ? 'bg-success/10 text-success' :
                  okr.status === 'in_progress' ? 'bg-accent/10 text-accent' :
                  'bg-warning/10 text-warning'
                }`}>
                  {okr.status.replace('_', ' ')}
                </span>
              </div>
              
              <div className="space-y-3">
                {okr.keyResults.map((kr, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-foreground">{kr.description}</p>
                      <span className="text-sm font-medium text-accent">{kr.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full transition-all"
                        style={{ width: `${kr.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Reviews */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-xl font-semibold text-foreground mb-6">Performance Reviews</h3>
        
        <div className="space-y-4">
          {[
            { period: 'Q4 2024', rating: 4.2, status: 'completed', reviewer: 'Sarah Johnson' },
            { period: 'Q3 2024', rating: 4.0, status: 'completed', reviewer: 'Sarah Johnson' },
            { period: 'Q1 2025', rating: null, status: 'pending', reviewer: 'Sarah Johnson' }
          ].map((review, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">{review.period} Review</h4>
                <p className="text-sm text-muted-foreground">Reviewer: {review.reviewer}</p>
              </div>
              <div className="flex items-center gap-4">
                {review.rating && (
                  <div className="text-right">
                    <div className="text-lg font-bold text-success">{review.rating}/5</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  review.status === 'completed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                }`}>
                  {review.status}
                </span>
                <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPayrollTab = () => (
    <div className="space-y-6">
      {/* Payroll Summary */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground">Payroll Summary</h3>
            <p className="text-muted-foreground">{mockPayrollData.payPeriod}</p>
          </div>
          <Button variant="outline" iconName="Download" iconPosition="left">
            Download Payslip
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Earnings */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Earnings</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Basic Salary</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(mockPayrollData.basicSalary)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">HRA</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(mockPayrollData.allowances.hra)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transport Allowance</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(mockPayrollData.allowances.transport)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Meal Allowance</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(mockPayrollData.allowances.meal)}
                </span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Gross Salary</span>
                  <span className="font-bold text-success">
                    {formatCurrency(mockPayrollData.grossSalary)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Deductions</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Income Tax</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(mockPayrollData.deductions.tax)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Health Insurance</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(mockPayrollData.deductions.insurance)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Retirement (401k)</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(mockPayrollData.deductions.retirement)}
                </span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total Deductions</span>
                  <span className="font-bold text-destructive">
                    {formatCurrency(Object.values(mockPayrollData.deductions).reduce((a, b) => a + b, 0))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Net Pay */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="bg-accent/10 rounded-lg p-6 text-center">
            <h4 className="text-lg font-semibold text-foreground mb-2">Net Pay</h4>
            <p className="text-3xl font-bold text-accent">
              {formatCurrency(mockPayrollData.netSalary)}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Pay Date: {new Date(mockPayrollData.payDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Payroll History */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-xl font-semibold text-foreground mb-6">Payroll History</h3>
        
        <div className="space-y-3">
          {[
            { month: 'December 2024', gross: 7083.33, net: 5379.16, status: 'paid' },
            { month: 'November 2024', gross: 7083.33, net: 5379.16, status: 'paid' },
            { month: 'October 2024', gross: 7083.33, net: 5379.16, status: 'paid' }
          ].map((payroll, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">{payroll.month}</h4>
                <p className="text-sm text-muted-foreground">
                  Gross: {formatCurrency(payroll.gross)} | Net: {formatCurrency(payroll.net)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                  {payroll.status}
                </span>
                <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Timesheets & Performance - Enterprise EMS</title>
        <meta name="description" content="Manage timesheets, track performance goals, and view payroll information" />
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
              { label: 'Timesheets & Performance', path: '/timesheets-performance' }
            ]} />

            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Timesheets & Performance
              </h1>
              <p className="text-muted-foreground">
                Track time, manage performance goals, and view payroll information
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
            {activeTab === 'timesheets' && renderTimesheetsTab()}
            {activeTab === 'performance' && renderPerformanceTab()}
            {activeTab === 'payroll' && renderPayrollTab()}
          </div>
        </main>
      </div>
    </>
  );
};

export default TimesheetsPerformance;