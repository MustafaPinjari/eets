import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LeaveRequestForm = ({ onSubmit, availableBalances = {} }) => {
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    duration: 'full',
    reason: '',
    emergencyContact: '',
    workHandover: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const leaveTypeOptions = [
    { value: 'vacation', label: 'Vacation Leave', description: `${availableBalances?.vacation || 0} days available` },
    { value: 'sick', label: 'Sick Leave', description: `${availableBalances?.sick || 0} days available` },
    { value: 'personal', label: 'Personal Leave', description: `${availableBalances?.personal || 0} days available` },
    { value: 'maternity', label: 'Maternity Leave', description: `${availableBalances?.maternity || 0} days available` },
    { value: 'paternity', label: 'Paternity Leave', description: `${availableBalances?.paternity || 0} days available` },
    { value: 'bereavement', label: 'Bereavement Leave', description: `${availableBalances?.bereavement || 0} days available` }
  ];

  const durationOptions = [
    { value: 'full', label: 'Full Day' },
    { value: 'half-morning', label: 'Half Day (Morning)' },
    { value: 'half-afternoon', label: 'Half Day (Afternoon)' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.leaveType) {
      newErrors.leaveType = 'Please select a leave type';
    }

    if (!formData?.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData?.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (formData?.startDate && formData?.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      if (endDate < startDate) {
        newErrors.endDate = 'End date cannot be before start date';
      }

      // Check if start date is in the past
      const today = new Date();
      today?.setHours(0, 0, 0, 0);
      if (startDate < today) {
        newErrors.startDate = 'Start date cannot be in the past';
      }
    }

    if (!formData?.reason?.trim()) {
      newErrors.reason = 'Reason is required';
    } else if (formData?.reason?.trim()?.length < 10) {
      newErrors.reason = 'Please provide a more detailed reason (minimum 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      // Reset form on success
      setFormData({
        leaveType: '',
        startDate: '',
        endDate: '',
        duration: 'full',
        reason: '',
        emergencyContact: '',
        workHandover: ''
      });
    } catch (error) {
      console.error('Error submitting leave request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const calculateDays = () => {
    if (!formData?.startDate || !formData?.endDate) return 0;
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    return formData?.duration?.startsWith('half') ? diffDays * 0.5 : diffDays;
  };

  const requestedDays = calculateDays();

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Plus" size={20} className="text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">New Leave Request</h2>
          <p className="text-sm text-muted-foreground">Submit a new time-off request</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Leave Type"
            placeholder="Select leave type"
            options={leaveTypeOptions}
            value={formData?.leaveType}
            onChange={(value) => handleInputChange('leaveType', value)}
            error={errors?.leaveType}
            required
            searchable
          />

          <Select
            label="Duration"
            options={durationOptions}
            value={formData?.duration}
            onChange={(value) => handleInputChange('duration', value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Start Date"
            type="date"
            value={formData?.startDate}
            onChange={(e) => handleInputChange('startDate', e?.target?.value)}
            error={errors?.startDate}
            required
          />

          <Input
            label="End Date"
            type="date"
            value={formData?.endDate}
            onChange={(e) => handleInputChange('endDate', e?.target?.value)}
            error={errors?.endDate}
            required
          />
        </div>

        {requestedDays > 0 && (
          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Calendar" size={16} className="text-primary" />
              <span className="font-medium">
                Requesting {requestedDays} {requestedDays === 1 ? 'day' : 'days'}
              </span>
              {formData?.leaveType && availableBalances?.[formData?.leaveType] !== undefined && (
                <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                  requestedDays <= availableBalances?.[formData?.leaveType]
                    ? 'bg-success/10 text-success' :'bg-destructive/10 text-destructive'
                }`}>
                  {requestedDays <= availableBalances?.[formData?.leaveType] 
                    ? 'Sufficient balance' :'Insufficient balance'
                  }
                </span>
              )}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Reason for Leave <span className="text-destructive">*</span>
            </label>
            <textarea
              value={formData?.reason}
              onChange={(e) => handleInputChange('reason', e?.target?.value)}
              placeholder="Please provide a detailed reason for your leave request..."
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-micro ${
                errors?.reason ? 'border-destructive' : 'border-border'
              }`}
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-1">
              {errors?.reason && (
                <span className="text-sm text-destructive">{errors?.reason}</span>
              )}
              <span className="text-xs text-muted-foreground ml-auto">
                {formData?.reason?.length}/500 characters
              </span>
            </div>
          </div>

          <Input
            label="Emergency Contact (Optional)"
            type="text"
            placeholder="Contact person during your absence"
            value={formData?.emergencyContact}
            onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
            description="Person to contact in case of emergency during your leave"
          />

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Work Handover Notes (Optional)
            </label>
            <textarea
              value={formData?.workHandover}
              onChange={(e) => handleInputChange('workHandover', e?.target?.value)}
              placeholder="Describe how your work will be handled during your absence..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-micro"
              maxLength={300}
            />
            <span className="text-xs text-muted-foreground">
              {formData?.workHandover?.length}/300 characters
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            <Icon name="Info" size={16} className="inline mr-1" />
            Your request will be sent to your manager for approval
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData({
                  leaveType: '',
                  startDate: '',
                  endDate: '',
                  duration: 'full',
                  reason: '',
                  emergencyContact: '',
                  workHandover: ''
                });
                setErrors({});
              }}
            >
              Reset
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              iconName="Send"
              iconPosition="right"
            >
              Submit Request
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LeaveRequestForm;