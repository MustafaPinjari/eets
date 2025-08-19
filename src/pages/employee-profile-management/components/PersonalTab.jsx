import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PersonalTab = ({ employee, isEditing, onSave, userRole }) => {
  const [formData, setFormData] = useState({
    firstName: employee?.firstName || '',
    lastName: employee?.lastName || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    alternatePhone: employee?.alternatePhone || '',
    personalEmail: employee?.personalEmail || '',
    dateOfBirth: employee?.dateOfBirth || '',
    gender: employee?.gender || '',
    maritalStatus: employee?.maritalStatus || '',
    nationality: employee?.nationality || '',
    address: employee?.address || '',
    city: employee?.city || '',
    state: employee?.state || '',
    zipCode: employee?.zipCode || '',
    country: employee?.country || '',
    emergencyContacts: employee?.emergencyContacts || []
  });

  const [newEmergencyContact, setNewEmergencyContact] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: ''
  });

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  const maritalStatusOptions = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' },
    { value: 'separated', label: 'Separated' }
  ];

  const relationshipOptions = [
    { value: 'spouse', label: 'Spouse' },
    { value: 'parent', label: 'Parent' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'child', label: 'Child' },
    { value: 'friend', label: 'Friend' },
    { value: 'other', label: 'Other' }
  ];

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'in', label: 'India' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddEmergencyContact = () => {
    if (newEmergencyContact?.name && newEmergencyContact?.phone) {
      setFormData(prev => ({
        ...prev,
        emergencyContacts: [...prev?.emergencyContacts, { ...newEmergencyContact, id: Date.now() }]
      }));
      setNewEmergencyContact({ name: '', relationship: '', phone: '', email: '' });
    }
  };

  const handleRemoveEmergencyContact = (index) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev?.emergencyContacts?.filter((_, i) => i !== index)
    }));
  };

  const canEdit = isEditing && (userRole === 'admin' || userRole === 'hr' || employee?.isCurrentUser);

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="User" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            type="text"
            value={formData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            disabled={!canEdit}
            required
          />
          <Input
            label="Last Name"
            type="text"
            value={formData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            disabled={!canEdit}
            required
          />
          <Input
            label="Work Email"
            type="email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            disabled={!canEdit}
            required
          />
          <Input
            label="Personal Email"
            type="email"
            value={formData?.personalEmail}
            onChange={(e) => handleInputChange('personalEmail', e?.target?.value)}
            disabled={!canEdit}
          />
          <Input
            label="Work Phone"
            type="tel"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            disabled={!canEdit}
          />
          <Input
            label="Alternate Phone"
            type="tel"
            value={formData?.alternatePhone}
            onChange={(e) => handleInputChange('alternatePhone', e?.target?.value)}
            disabled={!canEdit}
          />
        </div>
      </div>
      {/* Personal Details */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="Info" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Personal Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Input
            label="Date of Birth"
            type="date"
            value={formData?.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
            disabled={!canEdit}
          />
          <Select
            label="Gender"
            options={genderOptions}
            value={formData?.gender}
            onChange={(value) => handleInputChange('gender', value)}
            disabled={!canEdit}
            placeholder="Select gender"
          />
          <Select
            label="Marital Status"
            options={maritalStatusOptions}
            value={formData?.maritalStatus}
            onChange={(value) => handleInputChange('maritalStatus', value)}
            disabled={!canEdit}
            placeholder="Select status"
          />
          <Input
            label="Nationality"
            type="text"
            value={formData?.nationality}
            onChange={(e) => handleInputChange('nationality', e?.target?.value)}
            disabled={!canEdit}
            placeholder="e.g., American, British"
          />
        </div>
      </div>
      {/* Address Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="MapPin" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Address Information</h3>
        </div>

        <div className="space-y-6">
          <Input
            label="Street Address"
            type="text"
            value={formData?.address}
            onChange={(e) => handleInputChange('address', e?.target?.value)}
            disabled={!canEdit}
            placeholder="Enter full address"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Input
              label="City"
              type="text"
              value={formData?.city}
              onChange={(e) => handleInputChange('city', e?.target?.value)}
              disabled={!canEdit}
            />
            <Input
              label="State/Province"
              type="text"
              value={formData?.state}
              onChange={(e) => handleInputChange('state', e?.target?.value)}
              disabled={!canEdit}
            />
            <Input
              label="ZIP/Postal Code"
              type="text"
              value={formData?.zipCode}
              onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
              disabled={!canEdit}
            />
            <Select
              label="Country"
              options={countryOptions}
              value={formData?.country}
              onChange={(value) => handleInputChange('country', value)}
              disabled={!canEdit}
              placeholder="Select country"
              searchable
            />
          </div>
        </div>
      </div>
      {/* Emergency Contacts */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Icon name="Phone" size={20} className="text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Emergency Contacts</h3>
          </div>
          {canEdit && (
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
              onClick={handleAddEmergencyContact}
              disabled={!newEmergencyContact?.name || !newEmergencyContact?.phone}
            >
              Add Contact
            </Button>
          )}
        </div>

        {/* Add New Emergency Contact Form */}
        {canEdit && (
          <div className="bg-muted/30 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-foreground mb-4">Add New Emergency Contact</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input
                label="Full Name"
                type="text"
                value={newEmergencyContact?.name}
                onChange={(e) => setNewEmergencyContact(prev => ({ ...prev, name: e?.target?.value }))}
                placeholder="Contact name"
                required
              />
              <Select
                label="Relationship"
                options={relationshipOptions}
                value={newEmergencyContact?.relationship}
                onChange={(value) => setNewEmergencyContact(prev => ({ ...prev, relationship: value }))}
                placeholder="Select relationship"
              />
              <Input
                label="Phone Number"
                type="tel"
                value={newEmergencyContact?.phone}
                onChange={(e) => setNewEmergencyContact(prev => ({ ...prev, phone: e?.target?.value }))}
                placeholder="Phone number"
                required
              />
              <Input
                label="Email (Optional)"
                type="email"
                value={newEmergencyContact?.email}
                onChange={(e) => setNewEmergencyContact(prev => ({ ...prev, email: e?.target?.value }))}
                placeholder="Email address"
              />
            </div>
          </div>
        )}

        {/* Emergency Contacts List */}
        <div className="space-y-4">
          {formData?.emergencyContacts?.length > 0 ? (
            formData?.emergencyContacts?.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <div className="font-medium text-foreground">{contact?.name}</div>
                    <div className="text-sm text-muted-foreground">{contact?.relationship}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium text-foreground">{contact?.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium text-foreground">{contact?.email || 'N/A'}</div>
                  </div>
                  <div className="flex items-center justify-end">
                    {canEdit && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveEmergencyContact(index)}
                        iconName="Trash2"
                        iconSize={16}
                        className="text-destructive hover:text-destructive"
                      >
                        <span className="sr-only">Remove contact</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Icon name="Phone" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No emergency contacts added yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalTab;