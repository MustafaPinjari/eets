import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange, userRole }) => {
  const tabs = [
    {
      id: 'personal',
      label: 'Personal',
      icon: 'User',
      description: 'Contact & personal information',
      roles: ['admin', 'hr', 'manager', 'employee']
    },
    {
      id: 'job',
      label: 'Job Details',
      icon: 'Briefcase',
      description: 'Position & reporting structure',
      roles: ['admin', 'hr', 'manager', 'employee']
    },
    {
      id: 'compensation',
      label: 'Compensation',
      icon: 'DollarSign',
      description: 'Salary & benefits information',
      roles: ['admin', 'hr']
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: 'FileText',
      description: 'Files & documentation',
      roles: ['admin', 'hr', 'manager', 'employee']
    },
    {
      id: 'assets',
      label: 'Assets',
      icon: 'Monitor',
      description: 'Assigned equipment & resources',
      roles: ['admin', 'hr', 'manager', 'employee']
    }
  ];

  const visibleTabs = tabs?.filter(tab => tab?.roles?.includes(userRole));

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft mb-6">
      {/* Desktop Tab Navigation */}
      <div className="hidden lg:block">
        <nav className="flex border-b border-border">
          {visibleTabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex-1 px-6 py-4 text-left transition-micro ${
                activeTab === tab?.id
                  ? 'border-b-2 border-accent text-accent bg-accent/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon name={tab?.icon} size={20} />
                <div>
                  <div className="font-medium">{tab?.label}</div>
                  <div className="text-xs opacity-75">{tab?.description}</div>
                </div>
              </div>
            </button>
          ))}
        </nav>
      </div>
      {/* Mobile Tab Navigation */}
      <div className="lg:hidden">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <select
              value={activeTab}
              onChange={(e) => onTabChange(e?.target?.value)}
              className="w-full appearance-none bg-input border border-border rounded-lg px-4 py-3 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              {visibleTabs?.map((tab) => (
                <option key={tab?.id} value={tab?.id}>
                  {tab?.label} - {tab?.description}
                </option>
              ))}
            </select>
            <Icon 
              name="ChevronDown" 
              size={20} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
          </div>
        </div>

        {/* Mobile Tab Indicators */}
        <div className="flex overflow-x-auto scrollbar-hide">
          {visibleTabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex-shrink-0 px-4 py-3 flex items-center gap-2 transition-micro ${
                activeTab === tab?.id
                  ? 'text-accent border-b-2 border-accent bg-accent/5' :'text-muted-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="text-sm font-medium whitespace-nowrap">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;