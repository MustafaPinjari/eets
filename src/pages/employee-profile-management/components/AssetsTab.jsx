import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AssetsTab = ({ employee, isEditing, onSave, userRole }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAssignForm, setShowAssignForm] = useState(false);

  // Mock assets data
  const assets = [
    {
      id: 1,
      name: 'MacBook Pro 16"',
      category: 'laptop',
      assetTag: 'LT-2024-001',
      serialNumber: 'C02XK1XJMD6T',
      model: 'MacBook Pro 16-inch (2023)',
      manufacturer: 'Apple',
      assignedDate: '2024-01-15',
      status: 'assigned',
      condition: 'excellent',
      location: 'Employee Desk',
      warrantyExpiry: '2027-01-15',
      purchaseDate: '2024-01-10',
      purchasePrice: 2499,
      description: 'Primary work laptop for development tasks'
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      category: 'mobile',
      assetTag: 'MB-2024-045',
      serialNumber: 'F2LX4K9NQRV8',
      model: 'iPhone 15 Pro 256GB',
      manufacturer: 'Apple',
      assignedDate: '2024-02-01',
      status: 'assigned',
      condition: 'good',
      location: 'Employee',
      warrantyExpiry: '2025-02-01',
      purchaseDate: '2024-01-25',
      purchasePrice: 999,
      description: 'Company mobile phone for business use'
    },
    {
      id: 3,
      name: 'Dell UltraSharp Monitor',
      category: 'monitor',
      assetTag: 'MN-2024-078',
      serialNumber: 'CN-0P2414H-74261',
      model: 'U2723QE 27" 4K',
      manufacturer: 'Dell',
      assignedDate: '2024-01-15',
      status: 'assigned',
      condition: 'excellent',
      location: 'Employee Desk',
      warrantyExpiry: '2027-01-15',
      purchaseDate: '2024-01-10',
      purchasePrice: 649,
      description: '4K monitor for enhanced productivity'
    },
    {
      id: 4,
      name: 'Wireless Keyboard & Mouse',
      category: 'accessories',
      assetTag: 'AC-2024-156',
      serialNumber: 'MX-KEYS-001',
      model: 'MX Keys & MX Master 3S',
      manufacturer: 'Logitech',
      assignedDate: '2024-01-15',
      status: 'assigned',
      condition: 'good',
      location: 'Employee Desk',
      warrantyExpiry: '2026-01-15',
      purchaseDate: '2024-01-10',
      purchasePrice: 199,
      description: 'Wireless keyboard and mouse combo'
    },
    {
      id: 5,
      name: 'Desk Chair',
      category: 'furniture',
      assetTag: 'FR-2024-089',
      serialNumber: 'HC-AERON-2024',
      model: 'Aeron Chair Size B',
      manufacturer: 'Herman Miller',
      assignedDate: '2024-01-15',
      status: 'assigned',
      condition: 'excellent',
      location: 'Employee Desk',
      warrantyExpiry: '2036-01-15',
      purchaseDate: '2024-01-10',
      purchasePrice: 1395,
      description: 'Ergonomic office chair'
    },
    {
      id: 6,
      name: 'Software License - Adobe Creative Suite',
      category: 'software',
      assetTag: 'SW-2024-023',
      serialNumber: 'ACS-2024-USER-001',
      model: 'Creative Cloud All Apps',
      manufacturer: 'Adobe',
      assignedDate: '2024-03-01',
      status: 'assigned',
      condition: 'active',
      location: 'Digital License',
      warrantyExpiry: '2025-03-01',
      purchaseDate: '2024-02-25',
      purchasePrice: 599,
      description: 'Annual subscription for design software'
    }
  ];

  const assetCategories = [
    { value: 'all', label: 'All Assets' },
    { value: 'laptop', label: 'Laptops' },
    { value: 'mobile', label: 'Mobile Devices' },
    { value: 'monitor', label: 'Monitors' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'software', label: 'Software Licenses' }
  ];

  const conditionOptions = [
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' },
    { value: 'damaged', label: 'Damaged' }
  ];

  const getAssetIcon = (category) => {
    switch (category) {
      case 'laptop':
        return 'Laptop';
      case 'mobile':
        return 'Smartphone';
      case 'monitor':
        return 'Monitor';
      case 'accessories':
        return 'Mouse';
      case 'furniture':
        return 'Armchair';
      case 'software':
        return 'Code';
      default:
        return 'Package';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'assigned':
        return 'bg-success text-success-foreground';
      case 'available':
        return 'bg-primary text-primary-foreground';
      case 'maintenance':
        return 'bg-warning text-warning-foreground';
      case 'retired':
        return 'bg-muted text-muted-foreground';
      case 'damaged':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'excellent':
        return 'text-success';
      case 'good':
        return 'text-primary';
      case 'fair':
        return 'text-warning';
      case 'poor':
        return 'text-destructive';
      case 'damaged':
        return 'text-destructive';
      case 'active':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const isWarrantyExpiring = (warrantyExpiry) => {
    if (!warrantyExpiry) return false;
    const expiry = new Date(warrantyExpiry);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 90 && daysUntilExpiry > 0;
  };

  const filteredAssets = assets?.filter(asset => {
    const matchesCategory = selectedCategory === 'all' || asset?.category === selectedCategory;
    const matchesSearch = asset?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         asset?.assetTag?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         asset?.serialNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const canEdit = isEditing && (userRole === 'admin' || userRole === 'hr');

  return (
    <div className="space-y-8">
      {/* Asset Assignment Form */}
      {canEdit && showAssignForm && (
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Icon name="Plus" size={20} className="text-accent" />
              <h3 className="text-lg font-semibold text-foreground">Assign New Asset</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAssignForm(false)}
              iconName="X"
              iconSize={16}
            >
              <span className="sr-only">Close form</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input
              label="Asset Name"
              type="text"
              placeholder="Enter asset name"
              required
            />
            <Select
              label="Category"
              options={assetCategories?.slice(1)}
              placeholder="Select category"
              required
            />
            <Input
              label="Asset Tag"
              type="text"
              placeholder="e.g., LT-2024-001"
              required
            />
            <Input
              label="Serial Number"
              type="text"
              placeholder="Enter serial number"
            />
            <Input
              label="Model"
              type="text"
              placeholder="Enter model"
            />
            <Input
              label="Manufacturer"
              type="text"
              placeholder="Enter manufacturer"
            />
            <Input
              label="Purchase Date"
              type="date"
            />
            <Input
              label="Purchase Price"
              type="number"
              placeholder="0.00"
            />
            <Input
              label="Warranty Expiry"
              type="date"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowAssignForm(false)}
            >
              Cancel
            </Button>
            <Button variant="default">
              Assign Asset
            </Button>
          </div>
        </div>
      )}
      {/* Asset Management */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Icon name="Package" size={20} className="text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Assigned Assets</h3>
            <span className="px-2 py-1 bg-accent/10 text-accent text-sm rounded-full font-medium">
              {filteredAssets?.length}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="search"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full sm:w-64"
            />
            <Select
              options={assetCategories}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="Filter by category"
              className="w-full sm:w-48"
            />
            {canEdit && (
              <Button
                variant="default"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
                onClick={() => setShowAssignForm(true)}
              >
                Assign Asset
              </Button>
            )}
          </div>
        </div>

        {/* Warranty Expiring Alert */}
        {assets?.some(asset => isWarrantyExpiring(asset?.warrantyExpiry)) && (
          <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
              <h4 className="font-medium text-warning">Warranties Expiring Soon</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Some asset warranties will expire within 90 days. Please review and plan for renewals.
            </p>
          </div>
        )}

        {/* Assets List */}
        <div className="space-y-4">
          {filteredAssets?.length > 0 ? (
            filteredAssets?.map((asset) => (
              <div key={asset?.id} className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-micro">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon name={getAssetIcon(asset?.category)} size={24} className="text-accent" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">{asset?.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(asset?.status)}`}>
                          {asset?.status}
                        </span>
                        {isWarrantyExpiring(asset?.warrantyExpiry) && (
                          <span className="px-2 py-1 bg-warning/20 text-warning rounded-full text-xs font-medium">
                            Warranty Expiring
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{asset?.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                        <div>
                          <div className="text-xs text-muted-foreground">Asset Tag</div>
                          <div className="text-sm font-medium text-foreground">{asset?.assetTag}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Serial Number</div>
                          <div className="text-sm font-medium text-foreground">{asset?.serialNumber}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Model</div>
                          <div className="text-sm font-medium text-foreground">{asset?.model}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Condition</div>
                          <div className={`text-sm font-medium ${getConditionColor(asset?.condition)}`}>
                            {asset?.condition?.charAt(0)?.toUpperCase() + asset?.condition?.slice(1)}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span>Assigned: {new Date(asset.assignedDate)?.toLocaleDateString()}</span>
                        <span>Location: {asset?.location}</span>
                        <span>Value: {formatCurrency(asset?.purchasePrice)}</span>
                        {asset?.warrantyExpiry && (
                          <span className={isWarrantyExpiring(asset?.warrantyExpiry) ? 'text-warning' : ''}>
                            Warranty: {new Date(asset.warrantyExpiry)?.toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Eye"
                      iconSize={16}
                    >
                      <span className="sr-only">View asset details</span>
                    </Button>
                    {canEdit && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          iconName="Edit"
                          iconSize={16}
                        >
                          <span className="sr-only">Edit asset</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          iconName="RotateCcw"
                          iconSize={16}
                          className="text-warning hover:text-warning"
                        >
                          <span className="sr-only">Return asset</span>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Icon name="Package" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h4 className="text-lg font-medium text-foreground mb-2">No assets found</h4>
              <p className="text-muted-foreground">
                {searchTerm || selectedCategory !== 'all' ?'Try adjusting your search or filter criteria' :'No assets have been assigned yet'
                }
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Asset Summary */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="BarChart3" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Asset Summary</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {assetCategories?.slice(1)?.map((category) => {
            const count = assets?.filter(asset => asset?.category === category?.value)?.length;
            const totalValue = assets?.filter(asset => asset?.category === category?.value)?.reduce((sum, asset) => sum + asset?.purchasePrice, 0);
            
            return (
              <div key={category?.value} className="p-4 bg-muted/20 rounded-lg text-center">
                <div className="text-2xl font-semibold text-foreground">{count}</div>
                <div className="text-sm text-muted-foreground mb-1">{category?.label}</div>
                <div className="text-xs text-accent font-medium">
                  {formatCurrency(totalValue)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Asset Value */}
        <div className="pt-6 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-accent/10 rounded-lg">
              <div className="text-3xl font-semibold text-accent">
                {formatCurrency(assets?.reduce((sum, asset) => sum + asset?.purchasePrice, 0))}
              </div>
              <div className="text-sm text-muted-foreground">Total Asset Value</div>
            </div>
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <div className="text-3xl font-semibold text-success">
                {assets?.filter(asset => asset?.status === 'assigned')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Assets Assigned</div>
            </div>
            <div className="text-center p-4 bg-warning/10 rounded-lg">
              <div className="text-3xl font-semibold text-warning">
                {assets?.filter(asset => isWarrantyExpiring(asset?.warrantyExpiry))?.length}
              </div>
              <div className="text-sm text-muted-foreground">Warranties Expiring</div>
            </div>
          </div>
        </div>
      </div>
      {/* Asset History */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="History" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Recent Asset Activity</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
            <Icon name="Package" size={16} className="text-success" />
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">MacBook Pro 16" assigned</div>
              <div className="text-xs text-muted-foreground">3 months ago by IT Department</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
            <Icon name="Smartphone" size={16} className="text-success" />
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">iPhone 15 Pro assigned</div>
              <div className="text-xs text-muted-foreground">2 months ago by IT Department</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
            <Icon name="Code" size={16} className="text-accent" />
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">Adobe Creative Suite license assigned</div>
              <div className="text-xs text-muted-foreground">1 month ago by IT Department</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsTab;