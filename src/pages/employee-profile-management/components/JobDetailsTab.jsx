import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const JobDetailsTab = ({ employee, isEditing, onSave, userRole }) => {
  const [formData, setFormData] = useState({
    employeeId: employee?.employeeId || '',
    jobTitle: employee?.jobTitle || '',
    department: employee?.department || '',
    division: employee?.division || '',
    location: employee?.location || '',
    workLocation: employee?.workLocation || '',
    employmentType: employee?.employmentType || '',
    employmentStatus: employee?.employmentStatus || '',
    joinDate: employee?.joinDate || '',
    probationEndDate: employee?.probationEndDate || '',
    reportsTo: employee?.reportsTo || '',
    costCenter: employee?.costCenter || '',
    workSchedule: employee?.workSchedule || '',
    timeZone: employee?.timeZone || '',
    workPhone: employee?.workPhone || '',
    workEmail: employee?.workEmail || '',
    skills: employee?.skills || [],
    certifications: employee?.certifications || []
  });

  const [newSkill, setNewSkill] = useState('');
  const [newCertification, setNewCertification] = useState({
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: ''
  });

  const employmentTypeOptions = [
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'temporary', label: 'Temporary' },
    { value: 'intern', label: 'Intern' }
  ];

  const employmentStatusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'on-leave', label: 'On Leave' },
    { value: 'terminated', label: 'Terminated' }
  ];

  const workLocationOptions = [
    { value: 'office', label: 'Office' },
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'field', label: 'Field Work' }
  ];

  const workScheduleOptions = [
    { value: 'standard', label: 'Standard (9 AM - 5 PM)' },
    { value: 'flexible', label: 'Flexible Hours' },
    { value: 'shift-1', label: 'Shift 1 (6 AM - 2 PM)' },
    { value: 'shift-2', label: 'Shift 2 (2 PM - 10 PM)' },
    { value: 'shift-3', label: 'Shift 3 (10 PM - 6 AM)' },
    { value: 'compressed', label: 'Compressed (4x10)' }
  ];

  const timeZoneOptions = [
    { value: 'EST', label: 'Eastern Standard Time (EST)' },
    { value: 'CST', label: 'Central Standard Time (CST)' },
    { value: 'MST', label: 'Mountain Standard Time (MST)' },
    { value: 'PST', label: 'Pacific Standard Time (PST)' },
    { value: 'GMT', label: 'Greenwich Mean Time (GMT)' },
    { value: 'IST', label: 'India Standard Time (IST)' },
    { value: 'JST', label: 'Japan Standard Time (JST)' },
    { value: 'AEST', label: 'Australian Eastern Standard Time (AEST)' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSkill = () => {
    if (newSkill?.trim() && !formData?.skills?.includes(newSkill?.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev?.skills, newSkill?.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev?.skills?.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAddCertification = () => {
    if (newCertification?.name && newCertification?.issuer) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev?.certifications, { ...newCertification, id: Date.now() }]
      }));
      setNewCertification({ name: '', issuer: '', issueDate: '', expiryDate: '' });
    }
  };

  const handleRemoveCertification = (index) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev?.certifications?.filter((_, i) => i !== index)
    }));
  };

  const canEdit = isEditing && (userRole === 'admin' || userRole === 'hr');

  return (
    <div className="space-y-8">
      {/* Employment Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="Briefcase" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Employment Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Input
            label="Employee ID"
            type="text"
            value={formData?.employeeId}
            onChange={(e) => handleInputChange('employeeId', e?.target?.value)}
            disabled
            description="System generated ID"
          />
          <Input
            label="Job Title"
            type="text"
            value={formData?.jobTitle}
            onChange={(e) => handleInputChange('jobTitle', e?.target?.value)}
            disabled={!canEdit}
            required
          />
          <Input
            label="Department"
            type="text"
            value={formData?.department}
            onChange={(e) => handleInputChange('department', e?.target?.value)}
            disabled={!canEdit}
            required
          />
          <Input
            label="Division"
            type="text"
            value={formData?.division}
            onChange={(e) => handleInputChange('division', e?.target?.value)}
            disabled={!canEdit}
          />
          <Input
            label="Office Location"
            type="text"
            value={formData?.location}
            onChange={(e) => handleInputChange('location', e?.target?.value)}
            disabled={!canEdit}
          />
          <Select
            label="Work Location Type"
            options={workLocationOptions}
            value={formData?.workLocation}
            onChange={(value) => handleInputChange('workLocation', value)}
            disabled={!canEdit}
            placeholder="Select work location"
          />
          <Select
            label="Employment Type"
            options={employmentTypeOptions}
            value={formData?.employmentType}
            onChange={(value) => handleInputChange('employmentType', value)}
            disabled={!canEdit}
            placeholder="Select employment type"
          />
          <Select
            label="Employment Status"
            options={employmentStatusOptions}
            value={formData?.employmentStatus}
            onChange={(value) => handleInputChange('employmentStatus', value)}
            disabled={!canEdit}
            placeholder="Select status"
          />
          <Input
            label="Cost Center"
            type="text"
            value={formData?.costCenter}
            onChange={(e) => handleInputChange('costCenter', e?.target?.value)}
            disabled={!canEdit}
          />
        </div>
      </div>
      {/* Employment Dates */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="Calendar" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Employment Dates</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Join Date"
            type="date"
            value={formData?.joinDate}
            onChange={(e) => handleInputChange('joinDate', e?.target?.value)}
            disabled={!canEdit}
            required
          />
          <Input
            label="Probation End Date"
            type="date"
            value={formData?.probationEndDate}
            onChange={(e) => handleInputChange('probationEndDate', e?.target?.value)}
            disabled={!canEdit}
            description="Leave blank if not applicable"
          />
        </div>
      </div>
      {/* Reporting Structure */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="Users" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Reporting Structure</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Reports To"
            type="text"
            value={formData?.reportsTo}
            onChange={(e) => handleInputChange('reportsTo', e?.target?.value)}
            disabled={!canEdit}
            placeholder="Manager name"
          />
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Direct Reports</label>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-sm text-muted-foreground">
                {employee?.directReports > 0 
                  ? `Manages ${employee?.directReports} direct report${employee?.directReports > 1 ? 's' : ''}`
                  : 'No direct reports'
                }
              </div>
            </div>
          </div>
        </div>

        {/* Org Chart Placeholder */}
        <div className="mt-6 p-4 bg-muted/20 rounded-lg border-2 border-dashed border-border">
          <div className="text-center">
            <Icon name="Sitemap" size={48} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Organization Chart</p>
            <p className="text-xs text-muted-foreground mt-1">Interactive org chart will be displayed here</p>
          </div>
        </div>
      </div>
      {/* Work Schedule */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="Clock" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Work Schedule & Contact</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Select
            label="Work Schedule"
            options={workScheduleOptions}
            value={formData?.workSchedule}
            onChange={(value) => handleInputChange('workSchedule', value)}
            disabled={!canEdit}
            placeholder="Select schedule"
          />
          <Select
            label="Time Zone"
            options={timeZoneOptions}
            value={formData?.timeZone}
            onChange={(value) => handleInputChange('timeZone', value)}
            disabled={!canEdit}
            placeholder="Select time zone"
            searchable
          />
          <Input
            label="Work Phone"
            type="tel"
            value={formData?.workPhone}
            onChange={(e) => handleInputChange('workPhone', e?.target?.value)}
            disabled={!canEdit}
          />
        </div>
      </div>
      {/* Skills */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Icon name="Award" size={20} className="text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Skills</h3>
          </div>
          {canEdit && (
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e?.target?.value)}
                placeholder="Add skill"
                className="w-40"
              />
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                iconSize={16}
                onClick={handleAddSkill}
                disabled={!newSkill?.trim()}
              >
                Add
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {formData?.skills?.length > 0 ? (
            formData?.skills?.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
              >
                <span>{skill}</span>
                {canEdit && (
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-accent hover:text-accent/70 transition-micro"
                  >
                    <Icon name="X" size={14} />
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No skills added yet</p>
          )}
        </div>
      </div>
      {/* Certifications */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Icon name="Certificate" size={20} className="text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Certifications</h3>
          </div>
          {canEdit && (
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
              onClick={handleAddCertification}
              disabled={!newCertification?.name || !newCertification?.issuer}
            >
              Add Certification
            </Button>
          )}
        </div>

        {/* Add New Certification Form */}
        {canEdit && (
          <div className="bg-muted/30 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-foreground mb-4">Add New Certification</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input
                label="Certification Name"
                type="text"
                value={newCertification?.name}
                onChange={(e) => setNewCertification(prev => ({ ...prev, name: e?.target?.value }))}
                placeholder="e.g., PMP, AWS Certified"
                required
              />
              <Input
                label="Issuing Organization"
                type="text"
                value={newCertification?.issuer}
                onChange={(e) => setNewCertification(prev => ({ ...prev, issuer: e?.target?.value }))}
                placeholder="e.g., PMI, Amazon"
                required
              />
              <Input
                label="Issue Date"
                type="date"
                value={newCertification?.issueDate}
                onChange={(e) => setNewCertification(prev => ({ ...prev, issueDate: e?.target?.value }))}
              />
              <Input
                label="Expiry Date"
                type="date"
                value={newCertification?.expiryDate}
                onChange={(e) => setNewCertification(prev => ({ ...prev, expiryDate: e?.target?.value }))}
                description="Leave blank if no expiry"
              />
            </div>
          </div>
        )}

        {/* Certifications List */}
        <div className="space-y-4">
          {formData?.certifications?.length > 0 ? (
            formData?.certifications?.map((cert, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <div className="font-medium text-foreground">{cert?.name}</div>
                    <div className="text-sm text-muted-foreground">{cert?.issuer}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Issue Date</div>
                    <div className="font-medium text-foreground">
                      {cert?.issueDate ? new Date(cert.issueDate)?.toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Expiry Date</div>
                    <div className="font-medium text-foreground">
                      {cert?.expiryDate ? new Date(cert.expiryDate)?.toLocaleDateString() : 'No Expiry'}
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    {canEdit && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveCertification(index)}
                        iconName="Trash2"
                        iconSize={16}
                        className="text-destructive hover:text-destructive"
                      >
                        <span className="sr-only">Remove certification</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Icon name="Certificate" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No certifications added yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsTab;