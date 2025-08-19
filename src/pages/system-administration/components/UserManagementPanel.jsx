import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserManagementPanel = ({ activeSubsection }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'HR Manager',
      department: 'Human Resources',
      status: 'active',
      lastLogin: '2025-01-19 08:30:00',
      permissions: ['user_read', 'user_write', 'reports_read']
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Employee',
      department: 'Engineering',
      status: 'active',
      lastLogin: '2025-01-19 09:15:00',
      permissions: ['user_read', 'attendance_write']
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.brown@company.com',
      role: 'Manager',
      department: 'Sales',
      status: 'inactive',
      lastLogin: '2025-01-17 16:45:00',
      permissions: ['user_read', 'team_manage', 'reports_read']
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      role: 'Admin',
      department: 'IT',
      status: 'active',
      lastLogin: '2025-01-19 07:20:00',
      permissions: ['user_read', 'user_write', 'system_admin', 'reports_full']
    }
  ];

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'Admin', label: 'Admin' },
    { value: 'HR Manager', label: 'HR Manager' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Employee', label: 'Employee' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const handleUserSelect = (userId, checked) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers?.filter(id => id !== userId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedUsers(mockUsers?.map(user => user?.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success text-success-foreground', label: 'Active' },
      inactive: { color: 'bg-muted text-muted-foreground', label: 'Inactive' },
      suspended: { color: 'bg-destructive text-destructive-foreground', label: 'Suspended' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.inactive;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const filteredUsers = mockUsers?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRole = filterRole === 'all' || user?.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user?.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  if (activeSubsection === 'user-management-users') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-foreground">User Management</h3>
            <p className="text-muted-foreground">Manage user accounts, roles, and permissions</p>
          </div>
          <Button iconName="Plus" iconPosition="left">
            Add New User
          </Button>
        </div>
        {/* Filters and Search */}
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              type="search"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="md:col-span-2"
            />
            <Select
              options={roleOptions}
              value={filterRole}
              onChange={setFilterRole}
              placeholder="Filter by role"
            />
            <Select
              options={statusOptions}
              value={filterStatus}
              onChange={setFilterStatus}
              placeholder="Filter by status"
            />
          </div>
        </div>
        {/* Bulk Actions */}
        {selectedUsers?.length > 0 && (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {selectedUsers?.length} user{selectedUsers?.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" iconName="Mail">
                  Send Email
                </Button>
                <Button variant="outline" size="sm" iconName="Lock">
                  Suspend
                </Button>
                <Button variant="destructive" size="sm" iconName="Trash2">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* Users Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 w-12">
                    <Checkbox
                      checked={selectedUsers?.length === filteredUsers?.length && filteredUsers?.length > 0}
                      onChange={(e) => handleSelectAll(e?.target?.checked)}
                    />
                  </th>
                  <th className="text-left p-4 font-medium text-foreground">User</th>
                  <th className="text-left p-4 font-medium text-foreground">Role</th>
                  <th className="text-left p-4 font-medium text-foreground">Department</th>
                  <th className="text-left p-4 font-medium text-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-foreground">Last Login</th>
                  <th className="text-left p-4 font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers?.map((user) => (
                  <tr key={user?.id} className="hover:bg-muted/30 transition-micro">
                    <td className="p-4">
                      <Checkbox
                        checked={selectedUsers?.includes(user?.id)}
                        onChange={(e) => handleUserSelect(user?.id, e?.target?.checked)}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <Icon name="User" size={16} color="white" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{user?.name}</p>
                          <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-foreground">{user?.role}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-foreground">{user?.department}</span>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(user?.status)}
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">
                        {new Date(user.lastLogin)?.toLocaleDateString()} {new Date(user.lastLogin)?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" iconName="Edit" iconSize={16}>
                          <span className="sr-only">Edit user</span>
                        </Button>
                        <Button variant="ghost" size="icon" iconName="Key" iconSize={16}>
                          <span className="sr-only">Manage permissions</span>
                        </Button>
                        <Button variant="ghost" size="icon" iconName="MoreHorizontal" iconSize={16}>
                          <span className="sr-only">More actions</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredUsers?.length} of {mockUsers?.length} users
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" iconName="ChevronLeft" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">1</Button>
            <Button variant="outline" size="sm" iconName="ChevronRight" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Roles & Permissions view
  if (activeSubsection === 'user-management-roles') {
    const mockRoles = [
      {
        id: 1,
        name: 'System Administrator',
        description: 'Full system access with all administrative privileges',
        userCount: 2,
        permissions: ['system_admin', 'user_management', 'security_config', 'audit_logs']
      },
      {
        id: 2,
        name: 'HR Manager',
        description: 'Human resources management with employee data access',
        userCount: 5,
        permissions: ['employee_management', 'leave_approval', 'reports_hr', 'payroll_view']
      },
      {
        id: 3,
        name: 'Department Manager',
        description: 'Team management with approval workflows',
        userCount: 12,
        permissions: ['team_management', 'leave_approval', 'timesheet_approval', 'reports_team']
      },
      {
        id: 4,
        name: 'Employee',
        description: 'Standard employee access for self-service functions',
        userCount: 156,
        permissions: ['profile_edit', 'attendance_log', 'leave_request', 'timesheet_submit']
      }
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-foreground">Roles & Permissions</h3>
            <p className="text-muted-foreground">Configure user roles and access permissions</p>
          </div>
          <Button iconName="Plus" iconPosition="left">
            Create New Role
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockRoles?.map((role) => (
            <div key={role?.id} className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-foreground">{role?.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{role?.description}</p>
                </div>
                <Button variant="ghost" size="icon" iconName="MoreHorizontal" iconSize={16} />
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{role?.userCount} users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Key" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{role?.permissions?.length} permissions</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium text-foreground">Permissions:</p>
                <div className="flex flex-wrap gap-2">
                  {role?.permissions?.slice(0, 3)?.map((permission) => (
                    <span key={permission} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                      {permission?.replace('_', ' ')}
                    </span>
                  ))}
                  {role?.permissions?.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                      +{role?.permissions?.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" iconName="Edit" iconPosition="left">
                  Edit Role
                </Button>
                <Button variant="outline" size="sm" iconName="Users" iconPosition="left">
                  Assign Users
                </Button>
              </div>
            </div>
          ))}
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
        <p className="text-muted-foreground">This section is currently being developed.</p>
      </div>
    </div>
  );
};

export default UserManagementPanel;