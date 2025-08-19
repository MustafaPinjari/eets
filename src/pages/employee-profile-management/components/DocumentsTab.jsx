import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DocumentsTab = ({ employee, isEditing, onSave, userRole }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock documents data
  const documents = [
    {
      id: 1,
      name: 'Employment_Contract_2024.pdf',
      category: 'contract',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      uploadedBy: 'HR Department',
      version: '1.0',
      status: 'active',
      expiryDate: null,
      description: 'Updated employment contract for 2024'
    },
    {
      id: 2,
      name: 'Resume_John_Doe.pdf',
      category: 'personal',
      type: 'PDF',
      size: '1.2 MB',
      uploadDate: '2022-06-10',
      uploadedBy: 'John Doe',
      version: '2.1',
      status: 'active',
      expiryDate: null,
      description: 'Latest resume with updated experience'
    },
    {
      id: 3,
      name: 'Passport_Copy.pdf',
      category: 'identification',
      type: 'PDF',
      size: '856 KB',
      uploadDate: '2022-06-15',
      uploadedBy: 'John Doe',
      version: '1.0',
      status: 'active',
      expiryDate: '2032-06-15',
      description: 'Passport copy for identification'
    },
    {
      id: 4,
      name: 'Performance_Review_2023.pdf',
      category: 'performance',
      type: 'PDF',
      size: '1.8 MB',
      uploadDate: '2024-01-10',
      uploadedBy: 'Sarah Johnson',
      version: '1.0',
      status: 'active',
      expiryDate: null,
      description: 'Annual performance review for 2023'
    },
    {
      id: 5,
      name: 'Training_Certificate_AWS.pdf',
      category: 'training',
      type: 'PDF',
      size: '945 KB',
      uploadDate: '2023-09-20',
      uploadedBy: 'John Doe',
      version: '1.0',
      status: 'active',
      expiryDate: '2026-09-20',
      description: 'AWS Solutions Architect certification'
    },
    {
      id: 6,
      name: 'Medical_Certificate.pdf',
      category: 'medical',
      type: 'PDF',
      size: '678 KB',
      uploadDate: '2023-03-15',
      uploadedBy: 'John Doe',
      version: '1.0',
      status: 'expired',
      expiryDate: '2024-03-15',
      description: 'Annual medical fitness certificate'
    }
  ];

  const documentCategories = [
    { value: 'all', label: 'All Documents' },
    { value: 'contract', label: 'Contracts' },
    { value: 'personal', label: 'Personal Documents' },
    { value: 'identification', label: 'Identification' },
    { value: 'performance', label: 'Performance Reviews' },
    { value: 'training', label: 'Training & Certifications' },
    { value: 'medical', label: 'Medical Documents' },
    { value: 'other', label: 'Other' }
  ];

  const getDocumentIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf':
        return 'FileText';
      case 'doc': case'docx':
        return 'FileText';
      case 'xls': case'xlsx':
        return 'FileSpreadsheet';
      case 'jpg': case'jpeg': case'png':
        return 'Image';
      default:
        return 'File';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'expired':
        return 'bg-destructive text-destructive-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const filteredDocuments = documents?.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc?.category === selectedCategory;
    const matchesSearch = doc?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         doc?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      // Handle file upload logic here
      console.log('Files dropped:', e?.dataTransfer?.files);
    }
  };

  const handleFileSelect = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      // Handle file upload logic here
      console.log('Files selected:', e?.target?.files);
    }
  };

  const canEdit = isEditing && (userRole === 'admin' || userRole === 'hr' || employee?.isCurrentUser);

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      {canEdit && (
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-2 mb-6">
            <Icon name="Upload" size={20} className="text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Upload Documents</h3>
          </div>

          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-micro ${
              dragActive 
                ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            />
            <Icon name="Upload" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">
              Drop files here or click to browse
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB per file)
            </p>
            <Button variant="outline" size="sm">
              Choose Files
            </Button>
          </div>
        </div>
      )}
      {/* Document Management */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Icon name="FolderOpen" size={20} className="text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Document Library</h3>
            <span className="px-2 py-1 bg-accent/10 text-accent text-sm rounded-full font-medium">
              {filteredDocuments?.length}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="search"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full sm:w-64"
            />
            <Select
              options={documentCategories}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="Filter by category"
              className="w-full sm:w-48"
            />
          </div>
        </div>

        {/* Expiring Documents Alert */}
        {documents?.some(doc => isExpiringSoon(doc?.expiryDate)) && (
          <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
              <h4 className="font-medium text-warning">Documents Expiring Soon</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Some documents will expire within 30 days. Please review and update as needed.
            </p>
          </div>
        )}

        {/* Documents List */}
        <div className="space-y-4">
          {filteredDocuments?.length > 0 ? (
            filteredDocuments?.map((doc) => (
              <div key={doc?.id} className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-micro">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon name={getDocumentIcon(doc?.type)} size={20} className="text-accent" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground truncate">{doc?.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc?.status)}`}>
                          {doc?.status}
                        </span>
                        {isExpiringSoon(doc?.expiryDate) && (
                          <span className="px-2 py-1 bg-warning/20 text-warning rounded-full text-xs font-medium">
                            Expiring Soon
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{doc?.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span>Size: {doc?.size}</span>
                        <span>Version: {doc?.version}</span>
                        <span>Uploaded: {new Date(doc.uploadDate)?.toLocaleDateString()}</span>
                        <span>By: {doc?.uploadedBy}</span>
                        {doc?.expiryDate && (
                          <span className={isExpiringSoon(doc?.expiryDate) ? 'text-warning' : ''}>
                            Expires: {new Date(doc.expiryDate)?.toLocaleDateString()}
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
                      <span className="sr-only">Preview document</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Download"
                      iconSize={16}
                    >
                      <span className="sr-only">Download document</span>
                    </Button>
                    {canEdit && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          iconName="Edit"
                          iconSize={16}
                        >
                          <span className="sr-only">Edit document</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          iconName="Trash2"
                          iconSize={16}
                          className="text-destructive hover:text-destructive"
                        >
                          <span className="sr-only">Delete document</span>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Icon name="FileText" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h4 className="text-lg font-medium text-foreground mb-2">No documents found</h4>
              <p className="text-muted-foreground">
                {searchTerm || selectedCategory !== 'all' ?'Try adjusting your search or filter criteria' :'No documents have been uploaded yet'
                }
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Document Categories Summary */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="BarChart3" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Document Summary</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {documentCategories?.slice(1)?.map((category) => {
            const count = documents?.filter(doc => doc?.category === category?.value)?.length;
            const expiring = documents?.filter(doc => 
              doc?.category === category?.value && isExpiringSoon(doc?.expiryDate)
            )?.length;
            
            return (
              <div key={category?.value} className="p-4 bg-muted/20 rounded-lg text-center">
                <div className="text-2xl font-semibold text-foreground">{count}</div>
                <div className="text-sm text-muted-foreground mb-1">{category?.label}</div>
                {expiring > 0 && (
                  <div className="text-xs text-warning">
                    {expiring} expiring soon
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Document Version History */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="History" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
            <Icon name="Upload" size={16} className="text-success" />
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">Employment Contract uploaded</div>
              <div className="text-xs text-muted-foreground">2 days ago by HR Department</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
            <Icon name="Edit" size={16} className="text-accent" />
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">Resume updated to version 2.1</div>
              <div className="text-xs text-muted-foreground">1 week ago by John Doe</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">Medical Certificate expired</div>
              <div className="text-xs text-muted-foreground">3 weeks ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsTab;