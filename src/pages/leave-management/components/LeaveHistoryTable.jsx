import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const LeaveHistoryTable = ({ requests = [] }) => {
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const mockRequests = requests?.length > 0 ? requests : [
    {
      id: 'LR-2024-001',
      type: 'Vacation Leave',
      startDate: '2024-12-25',
      endDate: '2024-12-29',
      days: 5,
      status: 'approved',
      approver: 'Sarah Johnson',
      submittedDate: '2024-12-10',
      reason: 'Christmas holiday with family',
      approvedDate: '2024-12-11'
    },
    {
      id: 'LR-2024-002',
      type: 'Sick Leave',
      startDate: '2024-11-15',
      endDate: '2024-11-16',
      days: 2,
      status: 'approved',
      approver: 'Sarah Johnson',
      submittedDate: '2024-11-15',
      reason: 'Flu symptoms and recovery',
      approvedDate: '2024-11-15'
    },
    {
      id: 'LR-2024-003',
      type: 'Personal Leave',
      startDate: '2024-10-20',
      endDate: '2024-10-20',
      days: 1,
      status: 'pending',
      approver: 'Sarah Johnson',
      submittedDate: '2024-10-18',
      reason: 'Personal appointment',
      approvedDate: null
    },
    {
      id: 'LR-2024-004',
      type: 'Vacation Leave',
      startDate: '2024-09-05',
      endDate: '2024-09-12',
      days: 8,
      status: 'rejected',
      approver: 'Sarah Johnson',
      submittedDate: '2024-08-20',
      reason: 'Extended vacation in Europe',
      approvedDate: '2024-08-22',
      rejectionReason: 'Insufficient leave balance'
    },
    {
      id: 'LR-2024-005',
      type: 'Maternity Leave',
      startDate: '2024-07-01',
      endDate: '2024-09-30',
      days: 90,
      status: 'approved',
      approver: 'HR Department',
      submittedDate: '2024-06-01',
      reason: 'Maternity leave for childbirth',
      approvedDate: '2024-06-02'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'type', label: 'Leave Type' },
    { value: 'status', label: 'Status' },
    { value: 'days', label: 'Days' }
  ];

  const getStatusBadge = (status) => {
    const configs = {
      approved: { bg: 'bg-success/10', text: 'text-success', icon: 'CheckCircle' },
      pending: { bg: 'bg-warning/10', text: 'text-warning', icon: 'Clock' },
      rejected: { bg: 'bg-destructive/10', text: 'text-destructive', icon: 'XCircle' }
    };
    
    const config = configs?.[status] || configs?.pending;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
        <Icon name={config?.icon} size={12} />
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredRequests = mockRequests?.filter(request => {
      if (filter !== 'all' && request?.status !== filter) return false;
      if (searchTerm && !request?.reason?.toLowerCase()?.includes(searchTerm?.toLowerCase()) && 
          !request?.type?.toLowerCase()?.includes(searchTerm?.toLowerCase())) return false;
      if (dateRange?.start && new Date(request.startDate) < new Date(dateRange.start)) return false;
      if (dateRange?.end && new Date(request.endDate) > new Date(dateRange.end)) return false;
      return true;
    })?.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.startDate);
          bValue = new Date(b.startDate);
          break;
        case 'type':
          aValue = a?.type;
          bValue = b?.type;
          break;
        case 'status':
          aValue = a?.status;
          bValue = b?.status;
          break;
        case 'days':
          aValue = a?.days;
          bValue = b?.days;
          break;
        default:
          aValue = a?.startDate;
          bValue = b?.startDate;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="History" size={20} className="text-secondary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Leave History</h2>
            <p className="text-sm text-muted-foreground">View and manage your leave requests</p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Status Filter"
            options={statusOptions}
            value={filter}
            onChange={setFilter}
          />
          
          <Select
            label="Sort By"
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
          />

          <Input
            label="Search"
            type="text"
            placeholder="Search by reason or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />

          <div className="flex items-end gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 font-medium text-card-foreground">
                <button 
                  onClick={() => handleSort('date')}
                  className="flex items-center gap-1 hover:text-primary transition-micro"
                >
                  Request ID
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-card-foreground">
                <button 
                  onClick={() => handleSort('type')}
                  className="flex items-center gap-1 hover:text-primary transition-micro"
                >
                  Leave Type
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-card-foreground">
                <button 
                  onClick={() => handleSort('date')}
                  className="flex items-center gap-1 hover:text-primary transition-micro"
                >
                  Dates
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-card-foreground">
                <button 
                  onClick={() => handleSort('days')}
                  className="flex items-center gap-1 hover:text-primary transition-micro"
                >
                  Days
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-card-foreground">
                <button 
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-1 hover:text-primary transition-micro"
                >
                  Status
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-card-foreground">Approver</th>
              <th className="text-left p-4 font-medium text-card-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests?.map((request, index) => (
              <tr key={request?.id} className={`border-t border-border hover:bg-muted/30 transition-micro ${
                index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
              }`}>
                <td className="p-4">
                  <div>
                    <span className="font-medium text-card-foreground">{request?.id}</span>
                    <p className="text-xs text-muted-foreground">
                      Submitted {formatDate(request?.submittedDate)}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-card-foreground">{request?.type}</span>
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    <div className="text-card-foreground">
                      {formatDate(request?.startDate)}
                    </div>
                    {request?.startDate !== request?.endDate && (
                      <div className="text-muted-foreground">
                        to {formatDate(request?.endDate)}
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-medium text-card-foreground">{request?.days}</span>
                </td>
                <td className="p-4">
                  {getStatusBadge(request?.status)}
                </td>
                <td className="p-4">
                  <span className="text-sm text-card-foreground">{request?.approver}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      iconSize={16}
                    >
                      View
                    </Button>
                    {request?.status === 'pending' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Edit"
                        iconSize={16}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredRequests?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="FileX" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="font-medium text-card-foreground mb-2">No requests found</h3>
          <p className="text-sm text-muted-foreground">
            {filter !== 'all' || searchTerm || dateRange?.start || dateRange?.end ?'Try adjusting your filters to see more results' :'You haven\'t submitted any leave requests yet'
            }
          </p>
        </div>
      )}
      {/* Pagination */}
      {filteredRequests?.length > 0 && (
        <div className="p-4 border-t border-border flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredRequests?.length} of {mockRequests?.length} requests
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <Icon name="ChevronLeft" size={16} />
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveHistoryTable;