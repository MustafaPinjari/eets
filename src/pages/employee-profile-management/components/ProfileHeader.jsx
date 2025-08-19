import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ employee, isEditing, onEditToggle, userRole }) => {
  const canEdit = userRole === 'admin' || userRole === 'hr' || employee?.isCurrentUser;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'inactive':
        return 'bg-muted text-muted-foreground';
      case 'on leave':
        return 'bg-warning text-warning-foreground';
      case 'terminated':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Profile Photo Section */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-border">
              <Image
                src={employee?.profilePhoto || '/assets/images/no_image.png'}
                alt={`${employee?.firstName} ${employee?.lastName}`}
                className="w-full h-full object-cover"
              />
            </div>
            {canEdit && (
              <Button
                variant="outline"
                size="icon"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-border shadow-soft"
                iconName="Camera"
                iconSize={16}
              >
                <span className="sr-only">Change profile photo</span>
              </Button>
            )}
          </div>
        </div>

        {/* Employee Information */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl lg:text-3xl font-semibold text-foreground mb-2">
                {employee?.firstName} {employee?.lastName}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-lg text-muted-foreground">
                  {employee?.jobTitle}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(employee?.status)}`}>
                  {employee?.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="Building" size={16} />
                  <span>{employee?.department}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="MapPin" size={16} />
                  <span>{employee?.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Calendar" size={16} />
                  <span>Joined {new Date(employee.joinDate)?.toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {canEdit && (
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant={isEditing ? "outline" : "default"}
                  onClick={onEditToggle}
                  iconName={isEditing ? "X" : "Edit"}
                  iconPosition="left"
                  iconSize={16}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
                {isEditing && (
                  <Button
                    variant="default"
                    iconName="Save"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Save Changes
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-semibold text-foreground">{employee?.employeeId}</div>
          <div className="text-sm text-muted-foreground">Employee ID</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-foreground">{employee?.yearsOfService}</div>
          <div className="text-sm text-muted-foreground">Years of Service</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-foreground">{employee?.reportsTo || 'N/A'}</div>
          <div className="text-sm text-muted-foreground">Reports To</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-foreground">{employee?.directReports || 0}</div>
          <div className="text-sm text-muted-foreground">Direct Reports</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;