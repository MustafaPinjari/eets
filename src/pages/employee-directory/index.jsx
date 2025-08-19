import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { Checkbox } from '../../components/ui/Checkbox';

const EmployeeDirectory = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or table
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showTaskAssignment, setShowTaskAssignment] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    deadline: '',
    assignedTo: []
  });

  // Mock user data
  const mockUser = {
    name: 'HR Manager',
    email: 'hr@company.com',
    role: 'hr'
  };

  // Mock employee data
  const mockEmployees = [
    {
      id: 'EMP001',
      name: 'John Smith',
      email: 'john.smith@company.com',
      phone: '+1 (555) 123-4567',
      jobTitle: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'New York',
      manager: 'Sarah Johnson',
      status: 'active',
      joinDate: '2022-03-15',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      salary: 95000,
      performance: 4.2,
      tasksAssigned: 8,
      tasksCompleted: 6
    },
    {
      id: 'EMP002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 234-5678',
      jobTitle: 'Engineering Manager',
      department: 'Engineering',
      location: 'New York',
      manager: 'Michael Chen',
      status: 'active',
      joinDate: '2021-01-20',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      salary: 120000,
      performance: 4.5,
      tasksAssigned: 12,
      tasksCompleted: 10
    },
    {
      id: 'EMP003',
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      phone: '+1 (555) 345-6789',
      jobTitle: 'VP Engineering',
      department: 'Engineering',
      location: 'San Francisco',
      manager: 'CEO',
      status: 'active',
      joinDate: '2020-06-10',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      salary: 180000,
      performance: 4.8,
      tasksAssigned: 15,
      tasksCompleted: 13
    },
    {
      id: 'EMP004',
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      phone: '+1 (555) 456-7890',
      jobTitle: 'HR Specialist',
      department: 'Human Resources',
      location: 'Chicago',
      manager: 'Lisa Wilson',
      status: 'active',
      joinDate: '2023-02-01',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      salary: 65000,
      performance: 4.0,
      tasksAssigned: 5,
      tasksCompleted: 4
    },
    {
      id: 'EMP005',
      name: 'David Wilson',
      email: 'david.wilson@company.com',
      phone: '+1 (555) 567-8901',
      jobTitle: 'Sales Manager',
      department: 'Sales',
      location: 'Los Angeles',
      manager: 'Robert Brown',
      status: 'on_leave',
      joinDate: '2021-09-15',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      salary: 85000,
      performance: 3.8,
      tasksAssigned: 7,
      tasksCompleted: 5
    },
    {
      id: 'EMP006',
      name: 'Lisa Wilson',
      email: 'lisa.wilson@company.com',
      phone: '+1 (555) 678-9012',
      jobTitle: 'HR Director',
      department: 'Human Resources',
      location: 'New York',
      manager: 'CEO',
      status: 'active',
      joinDate: '2019-11-01',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      salary: 110000,
      performance: 4.6,
      tasksAssigned: 10,
      tasksCompleted: 9
    }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Finance', label: 'Finance' }
  ];

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'VP Engineering', label: 'VP Engineering' },
    { value: 'Engineering Manager', label: 'Engineering Manager' },
    { value: 'Senior Software Engineer', label: 'Senior Software Engineer' },
    { value: 'HR Director', label: 'HR Director' },
    { value: 'HR Specialist', label: 'HR Specialist' },
    { value: 'Sales Manager', label: 'Sales Manager' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'New York', label: 'New York' },
    { value: 'San Francisco', label: 'San Francisco' },
    { value: 'Chicago', label: 'Chicago' },
    { value: 'Los Angeles', label: 'Los Angeles' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'on_leave', label: 'On Leave' },
    { value: 'terminated', label: 'Terminated' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
    const matchesRole = filterRole === 'all' || employee.jobTitle === filterRole;
    const matchesLocation = filterLocation === 'all' || employee.location === filterLocation;
    const matchesStatus = filterStatus === 'all' || employee.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesRole && matchesLocation && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const configs = {
      active: { bg: 'bg-success/10', text: 'text-success', label: 'Active' },
      inactive: { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Inactive' },
      on_leave: { bg: 'bg-warning/10', text: 'text-warning', label: 'On Leave' },
      terminated: { bg: 'bg-destructive/10', text: 'text-destructive', label: 'Terminated' }
    };
    
    const config = configs[status] || configs.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const handleEmployeeSelect = (employeeId, checked) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedEmployees(filteredEmployees.map(emp => emp.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleTaskAssignment = async () => {
    if (!taskForm.title || selectedEmployees.length === 0) return;
    
    // Mock task assignment
    console.log('Assigning task:', taskForm, 'to employees:', selectedEmployees);
    
    // Reset form
    setTaskForm({
      title: '',
      description: '',
      priority: 'medium',
      deadline: '',
      assignedTo: []
    });
    setSelectedEmployees([]);
    setShowTaskAssignment(false);
    
    alert('Task assigned successfully!');
  };

  const exportData = (format) => {
    console.log(`Exporting employee data in ${format} format`);
    alert(`Employee directory exported as ${format.toUpperCase()}`);
  };

  return (
    <>
      <Helmet>
        <title>Employee Directory - Enterprise EMS</title>
        <meta name="description" content="Browse and manage employee profiles, assign tasks, and export reports" />
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
              { label: 'Employee Directory', path: '/employee-directory' }
            ]} />

            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Employee Directory</h1>
                <p className="text-muted-foreground">
                  Browse employee profiles, assign tasks, and manage team information
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => exportData('csv')}
                >
                  Export CSV
                </Button>
                <Button
                  variant="outline"
                  iconName="FileText"
                  iconPosition="left"
                  onClick={() => exportData('pdf')}
                >
                  Export PDF
                </Button>
                <Button
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => navigate('/employee-profile-management')}
                >
                  Add Employee
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-card rounded-lg border border-border p-6 mb-6 shadow-soft">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
                <Input
                  type="search"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="lg:col-span-2"
                />
                <Select
                  options={departmentOptions}
                  value={filterDepartment}
                  onChange={setFilterDepartment}
                  placeholder="Department"
                />
                <Select
                  options={roleOptions}
                  value={filterRole}
                  onChange={setFilterRole}
                  placeholder="Role"
                />
                <Select
                  options={locationOptions}
                  value={filterLocation}
                  onChange={setFilterLocation}
                  placeholder="Location"
                />
                <Select
                  options={statusOptions}
                  value={filterStatus}
                  onChange={setFilterStatus}
                  placeholder="Status"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {filteredEmployees.length} employees found
                  </span>
                  {selectedEmployees.length > 0 && (
                    <span className="text-sm font-medium text-accent">
                      {selectedEmployees.length} selected
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    iconName="Grid3X3"
                    onClick={() => setViewMode('grid')}
                  />
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'outline'}
                    size="sm"
                    iconName="List"
                    onClick={() => setViewMode('table')}
                  />
                </div>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedEmployees.length > 0 && (
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {selectedEmployees.length} employee{selectedEmployees.length > 1 ? 's' : ''} selected
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="UserPlus"
                      iconPosition="left"
                      onClick={() => setShowTaskAssignment(true)}
                    >
                      Assign Task
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Mail"
                      iconPosition="left"
                    >
                      Send Email
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Download"
                      iconPosition="left"
                      onClick={() => exportData('selected')}
                    >
                      Export Selected
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Task Assignment Modal */}
            {showTaskAssignment && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-card rounded-lg border border-border p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-foreground">Assign Task</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="X"
                      onClick={() => setShowTaskAssignment(false)}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <Input
                      label="Task Title"
                      value={taskForm.title}
                      onChange={(e) => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter task title"
                      required
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Description
                      </label>
                      <textarea
                        value={taskForm.description}
                        onChange={(e) => setTaskForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter task description"
                        rows={3}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        label="Priority"
                        options={priorityOptions}
                        value={taskForm.priority}
                        onChange={(value) => setTaskForm(prev => ({ ...prev, priority: value }))}
                      />
                      <Input
                        label="Deadline"
                        type="date"
                        value={taskForm.deadline}
                        onChange={(e) => setTaskForm(prev => ({ ...prev, deadline: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Assigned To ({selectedEmployees.length} employees)
                      </label>
                      <div className="bg-muted/30 rounded-lg p-3 max-h-32 overflow-y-auto">
                        {selectedEmployees.map(empId => {
                          const employee = mockEmployees.find(emp => emp.id === empId);
                          return (
                            <div key={empId} className="flex items-center gap-2 py-1">
                              <Icon name="User" size={16} className="text-muted-foreground" />
                              <span className="text-sm text-foreground">{employee?.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setShowTaskAssignment(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleTaskAssignment}
                      disabled={!taskForm.title || selectedEmployees.length === 0}
                    >
                      Assign Task
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Employee Grid/Table */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEmployees.map((employee) => (
                  <div key={employee.id} className="bg-card rounded-lg border border-border p-6 shadow-soft hover:shadow-elevated transition-layout">
                    <div className="flex items-start justify-between mb-4">
                      <Checkbox
                        checked={selectedEmployees.includes(employee.id)}
                        onChange={(e) => handleEmployeeSelect(employee.id, e.target.checked)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="MoreHorizontal"
                        iconSize={16}
                      />
                    </div>
                    
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-border">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-foreground">{employee.name}</h3>
                      <p className="text-sm text-muted-foreground">{employee.jobTitle}</p>
                      {getStatusBadge(employee.status)}
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name="Building" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">{employee.department}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="MapPin" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">{employee.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Star" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">Rating: {employee.performance}/5</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="CheckSquare" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Tasks: {employee.tasksCompleted}/{employee.tasksAssigned}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        fullWidth
                        iconName="Eye"
                        iconPosition="left"
                        onClick={() => navigate(`/employee-profile-management?id=${employee.id}`)}
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-lg border border-border overflow-hidden shadow-soft">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="text-left p-4 w-12">
                          <Checkbox
                            checked={selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                          />
                        </th>
                        <th className="text-left p-4 font-medium text-foreground">Employee</th>
                        <th className="text-left p-4 font-medium text-foreground">Department</th>
                        <th className="text-left p-4 font-medium text-foreground">Location</th>
                        <th className="text-left p-4 font-medium text-foreground">Status</th>
                        <th className="text-left p-4 font-medium text-foreground">Performance</th>
                        <th className="text-left p-4 font-medium text-foreground">Tasks</th>
                        <th className="text-left p-4 font-medium text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredEmployees.map((employee) => (
                        <tr key={employee.id} className="hover:bg-muted/30 transition-micro">
                          <td className="p-4">
                            <Checkbox
                              checked={selectedEmployees.includes(employee.id)}
                              onChange={(e) => handleEmployeeSelect(employee.id, e.target.checked)}
                            />
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden border border-border">
                                <img
                                  src={employee.avatar}
                                  alt={employee.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{employee.name}</p>
                                <p className="text-sm text-muted-foreground">{employee.jobTitle}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-foreground">{employee.department}</td>
                          <td className="p-4 text-sm text-foreground">{employee.location}</td>
                          <td className="p-4">{getStatusBadge(employee.status)}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Icon
                                    key={star}
                                    name="Star"
                                    size={14}
                                    className={star <= employee.performance ? 'text-warning' : 'text-muted'}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {employee.performance}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-foreground">
                              {employee.tasksCompleted}/{employee.tasksAssigned}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                iconName="Eye"
                                iconSize={16}
                                onClick={() => navigate(`/employee-profile-management?id=${employee.id}`)}
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                iconName="UserPlus"
                                iconSize={16}
                                onClick={() => {
                                  setSelectedEmployees([employee.id]);
                                  setShowTaskAssignment(true);
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredEmployees.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Users" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No employees found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default EmployeeDirectory;