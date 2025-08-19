import React from 'react';
import Icon from '../../../components/AppIcon';

const UpcomingEventsWidget = ({ events }) => {
  const formatDate = (date) => {
    const eventDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow?.setDate(tomorrow?.getDate() + 1);

    if (eventDate?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (eventDate?.toDateString() === tomorrow?.toDateString()) {
      return 'Tomorrow';
    } else {
      return eventDate?.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const getEventIcon = (type) => {
    const iconMap = {
      'holiday': 'Calendar',
      'meeting': 'Users',
      'training': 'BookOpen',
      'deadline': 'Clock',
      'birthday': 'Gift',
      'company_event': 'Building'
    };
    return iconMap?.[type] || 'Calendar';
  };

  const getEventColor = (type) => {
    const colorMap = {
      'holiday': 'bg-success text-success-foreground',
      'meeting': 'bg-primary text-primary-foreground',
      'training': 'bg-secondary text-secondary-foreground',
      'deadline': 'bg-destructive text-destructive-foreground',
      'birthday': 'bg-accent text-accent-foreground',
      'company_event': 'bg-warning text-warning-foreground'
    };
    return colorMap?.[type] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Calendar" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-card-foreground">Upcoming Events</h2>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {events && events?.length > 0 ? (
          events?.map((event, index) => (
            <div key={index} className="flex items-center gap-3 p-3 hover:bg-muted/30 rounded-lg transition-micro">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getEventColor(event?.type)}`}>
                <Icon name={getEventIcon(event?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-card-foreground truncate">
                  {event?.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {event?.time && `${event?.time} • `}{event?.location || 'No location'}
                </p>
              </div>
              
              <div className="text-right flex-shrink-0">
                <span className="text-xs font-medium text-primary">
                  {formatDate(event?.date)}
                </span>
                {event?.isToday && (
                  <div className="w-2 h-2 bg-accent rounded-full mt-1 ml-auto" />
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Calendar" size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No upcoming events</p>
          </div>
        )}
      </div>
      {events && events?.length > 5 && (
        <div className="mt-4 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            +{events?.length - 5} more events this month
          </p>
        </div>
      )}
    </div>
  );
};

export default UpcomingEventsWidget;