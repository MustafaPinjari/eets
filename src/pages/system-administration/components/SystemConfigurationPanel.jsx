import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';


const SystemConfigurationPanel = ({ activeSubsection }) => {
  const [organizationSettings, setOrganizationSettings] = useState({
    companyName: 'Enterprise Corporation',
    companyCode: 'ENT001',
    timezone: 'America/New_York',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    workWeekStart: 'Monday',
    fiscalYearStart: 'January'
  });

  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
    { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' },
    { value: 'JPY', label: 'Japanese Yen (¥)' },
    { value: 'INR', label: 'Indian Rupee (₹)' },
    { value: 'CAD', label: 'Canadian Dollar (C$)' },
    { value: 'AUD', label: 'Australian Dollar (A$)' }
  ];

  const dateFormatOptions = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US Format)' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (European Format)' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO Format)' },
    { value: 'DD-MMM-YYYY', label: 'DD-MMM-YYYY (Text Month)' }
  ];

  if (activeSubsection === 'system-configuration-organization') {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Organization Settings</h3>
          <p className="text-muted-foreground">Configure global organization settings and preferences</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company Information */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Icon name="Building" size={20} />
              Company Information
            </h4>

            <div className="space-y-4">
              <Input
                label="Company Name"
                value={organizationSettings?.companyName}
                onChange={(e) => setOrganizationSettings(prev => ({ ...prev, companyName: e?.target?.value }))}
                required
              />

              <Input
                label="Company Code"
                value={organizationSettings?.companyCode}
                onChange={(e) => setOrganizationSettings(prev => ({ ...prev, companyCode: e?.target?.value }))}
                description="Unique identifier for your organization"
                required
              />

              <Select
                label="Default Timezone"
                options={timezoneOptions}
                value={organizationSettings?.timezone}
                onChange={(value) => setOrganizationSettings(prev => ({ ...prev, timezone: value }))}
                searchable
              />

              <Select
                label="Default Currency"
                options={currencyOptions}
                value={organizationSettings?.currency}
                onChange={(value) => setOrganizationSettings(prev => ({ ...prev, currency: value }))}
              />
            </div>
          </div>

          {/* Regional Settings */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Icon name="Globe" size={20} />
              Regional Settings
            </h4>

            <div className="space-y-4">
              <Select
                label="Date Format"
                options={dateFormatOptions}
                value={organizationSettings?.dateFormat}
                onChange={(value) => setOrganizationSettings(prev => ({ ...prev, dateFormat: value }))}
              />

              <Select
                label="Work Week Start"
                options={[
                  { value: 'Sunday', label: 'Sunday' },
                  { value: 'Monday', label: 'Monday' }
                ]}
                value={organizationSettings?.workWeekStart}
                onChange={(value) => setOrganizationSettings(prev => ({ ...prev, workWeekStart: value }))}
              />

              <Select
                label="Fiscal Year Start"
                options={[
                  { value: 'January', label: 'January' },
                  { value: 'April', label: 'April' },
                  { value: 'July', label: 'July' },
                  { value: 'October', label: 'October' }
                ]}
                value={organizationSettings?.fiscalYearStart}
                onChange={(value) => setOrganizationSettings(prev => ({ ...prev, fiscalYearStart: value }))}
              />
            </div>
          </div>
        </div>
        {/* Department Structure */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="Sitemap" size={20} />
            Department Structure
          </h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Manage organizational departments and hierarchy</p>
              <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
                Add Department
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Human Resources', employees: 12, manager: 'Sarah Johnson' },
                { name: 'Engineering', employees: 45, manager: 'Michael Chen' },
                { name: 'Sales', employees: 28, manager: 'David Wilson' },
                { name: 'Marketing', employees: 15, manager: 'Emily Davis' },
                { name: 'Finance', employees: 8, manager: 'Robert Brown' },
                { name: 'Operations', employees: 22, manager: 'Lisa Anderson' }
              ]?.map((dept, index) => (
                <div key={index} className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-foreground">{dept?.name}</h5>
                    <Button variant="ghost" size="icon" iconName="MoreHorizontal" iconSize={14} />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{dept?.employees} employees</p>
                  <p className="text-xs text-muted-foreground">Manager: {dept?.manager}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline">Reset to Default</Button>
          <Button>Save Organization Settings</Button>
        </div>
      </div>
    );
  }

  if (activeSubsection === 'system-configuration-holidays') {
    const [selectedYear, setSelectedYear] = useState('2025');
    const [selectedCountry, setSelectedCountry] = useState('US');

    const yearOptions = [
      { value: '2024', label: '2024' },
      { value: '2025', label: '2025' },
      { value: '2026', label: '2026' }
    ];

    const countryOptions = [
      { value: 'US', label: 'United States' },
      { value: 'UK', label: 'United Kingdom' },
      { value: 'CA', label: 'Canada' },
      { value: 'IN', label: 'India' },
      { value: 'AU', label: 'Australia' }
    ];

    const mockHolidays = [
      { date: '2025-01-01', name: 'New Year\'s Day', type: 'National', optional: false },
      { date: '2025-01-20', name: 'Martin Luther King Jr. Day', type: 'Federal', optional: false },
      { date: '2025-02-17', name: 'Presidents\' Day', type: 'Federal', optional: false },
      { date: '2025-05-26', name: 'Memorial Day', type: 'Federal', optional: false },
      { date: '2025-07-04', name: 'Independence Day', type: 'National', optional: false },
      { date: '2025-09-01', name: 'Labor Day', type: 'Federal', optional: false },
      { date: '2025-10-13', name: 'Columbus Day', type: 'Federal', optional: true },
      { date: '2025-11-11', name: 'Veterans Day', type: 'Federal', optional: false },
      { date: '2025-11-27', name: 'Thanksgiving Day', type: 'National', optional: false },
      { date: '2025-12-25', name: 'Christmas Day', type: 'National', optional: false }
    ];

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Holiday Calendar</h3>
          <p className="text-muted-foreground">Manage company holidays and observances</p>
        </div>
        {/* Filters */}
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Year"
              options={yearOptions}
              value={selectedYear}
              onChange={setSelectedYear}
            />
            <Select
              label="Country/Region"
              options={countryOptions}
              value={selectedCountry}
              onChange={setSelectedCountry}
            />
            <div className="flex items-end">
              <Button iconName="Plus" iconPosition="left" fullWidth>
                Add Custom Holiday
              </Button>
            </div>
          </div>
        </div>
        {/* Holiday List */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h4 className="font-semibold text-foreground">Holidays for {selectedYear}</h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium text-foreground">Date</th>
                  <th className="text-left p-4 font-medium text-foreground">Holiday Name</th>
                  <th className="text-left p-4 font-medium text-foreground">Type</th>
                  <th className="text-left p-4 font-medium text-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockHolidays?.map((holiday, index) => (
                  <tr key={index} className="hover:bg-muted/30 transition-micro">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-foreground">
                          {new Date(holiday.date)?.toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium text-foreground">{holiday?.name}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {holiday?.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        holiday?.optional 
                          ? 'bg-warning/10 text-warning' :'bg-success/10 text-success'
                      }`}>
                        {holiday?.optional ? 'Optional' : 'Mandatory'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" iconName="Edit" iconSize={14}>
                          <span className="sr-only">Edit holiday</span>
                        </Button>
                        <Button variant="ghost" size="icon" iconName="Trash2" iconSize={14}>
                          <span className="sr-only">Delete holiday</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Holiday Calendar
          </Button>
          <div className="flex gap-3">
            <Button variant="outline">Import from Template</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    );
  }

  // Default view for other subsections
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <Icon name="Settings" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Feature Under Development</h3>
        <p className="text-muted-foreground">This configuration section is currently being developed.</p>
      </div>
    </div>
  );
};

export default SystemConfigurationPanel;