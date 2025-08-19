import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const CompensationTab = ({ employee, isEditing, onSave, userRole }) => {
  const [formData, setFormData] = useState({
    baseSalary: employee?.baseSalary || '',
    currency: employee?.currency || 'USD',
    payFrequency: employee?.payFrequency || '',
    effectiveDate: employee?.effectiveDate || '',
    salaryGrade: employee?.salaryGrade || '',
    salaryStep: employee?.salaryStep || '',
    overtimeEligible: employee?.overtimeEligible || false,
    bonusEligible: employee?.bonusEligible || false,
    commissionEligible: employee?.commissionEligible || false
  });

  const [showSalaryHistory, setShowSalaryHistory] = useState(false);

  // Mock salary history data
  const salaryHistory = [
    {
      id: 1,
      effectiveDate: '2024-01-01',
      baseSalary: 85000,
      currency: 'USD',
      reason: 'Annual Review',
      approvedBy: 'Sarah Johnson',
      notes: 'Performance-based increase'
    },
    {
      id: 2,
      effectiveDate: '2023-01-01',
      baseSalary: 80000,
      currency: 'USD',
      reason: 'Promotion',
      approvedBy: 'Michael Chen',
      notes: 'Promoted to Senior Developer'
    },
    {
      id: 3,
      effectiveDate: '2022-06-15',
      baseSalary: 75000,
      currency: 'USD',
      reason: 'Initial Hire',
      approvedBy: 'HR Department',
      notes: 'Starting salary'
    }
  ];

  // Mock benefits data
  const benefits = [
    {
      id: 1,
      name: 'Health Insurance',
      type: 'Medical',
      provider: 'Blue Cross Blue Shield',
      coverage: 'Employee + Family',
      employeeContribution: 150,
      employerContribution: 450,
      status: 'Active',
      enrollmentDate: '2022-06-15'
    },
    {
      id: 2,
      name: 'Dental Insurance',
      type: 'Dental',
      provider: 'Delta Dental',
      coverage: 'Employee + Spouse',
      employeeContribution: 25,
      employerContribution: 75,
      status: 'Active',
      enrollmentDate: '2022-06-15'
    },
    {
      id: 3,
      name: '401(k) Plan',
      type: 'Retirement',
      provider: 'Fidelity',
      coverage: 'Employee',
      employeeContribution: 500,
      employerContribution: 250,
      status: 'Active',
      enrollmentDate: '2022-09-01'
    },
    {
      id: 4,
      name: 'Life Insurance',
      type: 'Insurance',
      provider: 'MetLife',
      coverage: '2x Annual Salary',
      employeeContribution: 0,
      employerContribution: 45,
      status: 'Active',
      enrollmentDate: '2022-06-15'
    }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' },
    { value: 'CAD', label: 'Canadian Dollar (C$)' },
    { value: 'AUD', label: 'Australian Dollar (A$)' },
    { value: 'INR', label: 'Indian Rupee (₹)' },
    { value: 'JPY', label: 'Japanese Yen (¥)' }
  ];

  const payFrequencyOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'bi-weekly', label: 'Bi-weekly' },
    { value: 'semi-monthly', label: 'Semi-monthly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    })?.format(amount);
  };

  const getBenefitStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'inactive':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const canEdit = isEditing && (userRole === 'admin' || userRole === 'hr');
  const canView = userRole === 'admin' || userRole === 'hr';

  if (!canView) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Icon name="Lock" size={64} className="text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Access Restricted</h3>
        <p className="text-muted-foreground text-center max-w-md">
          You don't have permission to view compensation information. Please contact HR or your administrator for access.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Current Compensation */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="DollarSign" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Current Compensation</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Input
            label="Base Salary"
            type="number"
            value={formData?.baseSalary}
            onChange={(e) => handleInputChange('baseSalary', e?.target?.value)}
            disabled={!canEdit}
            placeholder="0"
            required
          />
          <Select
            label="Currency"
            options={currencyOptions}
            value={formData?.currency}
            onChange={(value) => handleInputChange('currency', value)}
            disabled={!canEdit}
            placeholder="Select currency"
          />
          <Select
            label="Pay Frequency"
            options={payFrequencyOptions}
            value={formData?.payFrequency}
            onChange={(value) => handleInputChange('payFrequency', value)}
            disabled={!canEdit}
            placeholder="Select frequency"
          />
          <Input
            label="Effective Date"
            type="date"
            value={formData?.effectiveDate}
            onChange={(e) => handleInputChange('effectiveDate', e?.target?.value)}
            disabled={!canEdit}
          />
          <Input
            label="Salary Grade"
            type="text"
            value={formData?.salaryGrade}
            onChange={(e) => handleInputChange('salaryGrade', e?.target?.value)}
            disabled={!canEdit}
            placeholder="e.g., Grade 5"
          />
          <Input
            label="Salary Step"
            type="text"
            value={formData?.salaryStep}
            onChange={(e) => handleInputChange('salaryStep', e?.target?.value)}
            disabled={!canEdit}
            placeholder="e.g., Step 3"
          />
        </div>

        {/* Eligibility Checkboxes */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-medium text-foreground mb-4">Compensation Eligibility</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData?.overtimeEligible}
                onChange={(e) => handleInputChange('overtimeEligible', e?.target?.checked)}
                disabled={!canEdit}
                className="rounded border-border text-accent focus:ring-accent"
              />
              <span className="text-sm text-foreground">Overtime Eligible</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData?.bonusEligible}
                onChange={(e) => handleInputChange('bonusEligible', e?.target?.checked)}
                disabled={!canEdit}
                className="rounded border-border text-accent focus:ring-accent"
              />
              <span className="text-sm text-foreground">Bonus Eligible</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData?.commissionEligible}
                onChange={(e) => handleInputChange('commissionEligible', e?.target?.checked)}
                disabled={!canEdit}
                className="rounded border-border text-accent focus:ring-accent"
              />
              <span className="text-sm text-foreground">Commission Eligible</span>
            </label>
          </div>
        </div>
      </div>
      {/* Salary History */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Icon name="TrendingUp" size={20} className="text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Salary History</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSalaryHistory(!showSalaryHistory)}
            iconName={showSalaryHistory ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            iconSize={16}
          >
            {showSalaryHistory ? 'Hide' : 'Show'} History
          </Button>
        </div>

        {showSalaryHistory && (
          <div className="space-y-4">
            {salaryHistory?.map((record) => (
              <div key={record?.id} className="p-4 bg-muted/20 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Effective Date</div>
                    <div className="font-medium text-foreground">
                      {new Date(record.effectiveDate)?.toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Base Salary</div>
                    <div className="font-medium text-foreground">
                      {formatCurrency(record?.baseSalary, record?.currency)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Reason</div>
                    <div className="font-medium text-foreground">{record?.reason}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Approved By</div>
                    <div className="font-medium text-foreground">{record?.approvedBy}</div>
                  </div>
                </div>
                {record?.notes && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="text-sm text-muted-foreground">Notes</div>
                    <div className="text-sm text-foreground">{record?.notes}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Benefits Enrollment */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={20} className="text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Benefits Enrollment</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            iconPosition="left"
            iconSize={16}
          >
            Manage Benefits
          </Button>
        </div>

        <div className="space-y-4">
          {benefits?.map((benefit) => (
            <div key={benefit?.id} className="p-4 bg-muted/20 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground">{benefit?.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBenefitStatusColor(benefit?.status)}`}>
                      {benefit?.status}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">{benefit?.type} • {benefit?.provider}</div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  iconSize={14}
                >
                  View Details
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Coverage</div>
                  <div className="font-medium text-foreground">{benefit?.coverage}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Employee Contribution</div>
                  <div className="font-medium text-foreground">
                    {formatCurrency(benefit?.employeeContribution)}/month
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Employer Contribution</div>
                  <div className="font-medium text-foreground">
                    {formatCurrency(benefit?.employerContribution)}/month
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Enrollment Date</div>
                  <div className="font-medium text-foreground">
                    {new Date(benefit.enrollmentDate)?.toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Summary */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-accent/10 rounded-lg">
              <div className="text-2xl font-semibold text-accent">
                {formatCurrency(benefits?.reduce((sum, b) => sum + b?.employeeContribution, 0))}
              </div>
              <div className="text-sm text-muted-foreground">Monthly Employee Contribution</div>
            </div>
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <div className="text-2xl font-semibold text-success">
                {formatCurrency(benefits?.reduce((sum, b) => sum + b?.employerContribution, 0))}
              </div>
              <div className="text-sm text-muted-foreground">Monthly Employer Contribution</div>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-2xl font-semibold text-primary">
                {formatCurrency(benefits?.reduce((sum, b) => sum + b?.employeeContribution + b?.employerContribution, 0))}
              </div>
              <div className="text-sm text-muted-foreground">Total Monthly Benefits Value</div>
            </div>
          </div>
        </div>
      </div>
      {/* Payroll Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Icon name="Receipt" size={20} className="text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Payroll Information</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Download Payslips
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-muted/20 rounded-lg">
            <div className="text-sm text-muted-foreground">Last Pay Date</div>
            <div className="text-lg font-semibold text-foreground">Dec 15, 2024</div>
          </div>
          <div className="p-4 bg-muted/20 rounded-lg">
            <div className="text-sm text-muted-foreground">Next Pay Date</div>
            <div className="text-lg font-semibold text-foreground">Dec 31, 2024</div>
          </div>
          <div className="p-4 bg-muted/20 rounded-lg">
            <div className="text-sm text-muted-foreground">YTD Gross Pay</div>
            <div className="text-lg font-semibold text-foreground">{formatCurrency(78500)}</div>
          </div>
          <div className="p-4 bg-muted/20 rounded-lg">
            <div className="text-sm text-muted-foreground">YTD Net Pay</div>
            <div className="text-lg font-semibold text-foreground">{formatCurrency(58200)}</div>
          </div>
        </div>

        {/* Tax Information */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-medium text-foreground mb-4">Tax Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-muted/20 rounded-lg">
              <div className="text-sm text-muted-foreground">Federal Tax Withheld (YTD)</div>
              <div className="text-lg font-semibold text-foreground">{formatCurrency(15700)}</div>
            </div>
            <div className="p-4 bg-muted/20 rounded-lg">
              <div className="text-sm text-muted-foreground">State Tax Withheld (YTD)</div>
              <div className="text-lg font-semibold text-foreground">{formatCurrency(3925)}</div>
            </div>
            <div className="p-4 bg-muted/20 rounded-lg">
              <div className="text-sm text-muted-foreground">Social Security (YTD)</div>
              <div className="text-lg font-semibold text-foreground">{formatCurrency(4867)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompensationTab;