import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnnouncementsWidget = ({ announcements }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Info';
      case 'low': return 'CheckCircle';
      default: return 'Bell';
    }
  };

  const nextAnnouncement = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements?.length);
  };

  const prevAnnouncement = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements?.length) % announcements?.length);
  };

  if (!announcements || announcements?.length === 0) {
    return (
      <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Bell" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-card-foreground">Announcements</h2>
        </div>
        <div className="text-center py-8">
          <Icon name="Bell" size={32} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">No announcements</p>
        </div>
      </div>
    );
  }

  const currentAnnouncement = announcements?.[currentIndex];

  return (
    <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Bell" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-card-foreground">Announcements</h2>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">
            {currentIndex + 1} of {announcements?.length}
          </span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Icon 
                name={getPriorityIcon(currentAnnouncement?.priority)} 
                size={16} 
                className={getPriorityColor(currentAnnouncement?.priority)}
              />
              <span className={`text-xs font-medium uppercase ${getPriorityColor(currentAnnouncement?.priority)}`}>
                {currentAnnouncement?.priority}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {formatDate(currentAnnouncement?.date)}
            </span>
          </div>
          
          <h3 className="font-semibold text-card-foreground mb-2">
            {currentAnnouncement?.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-3">
            {currentAnnouncement?.content}
          </p>
          
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-muted-foreground">
              By {currentAnnouncement?.author}
            </span>
            <Button variant="ghost" size="sm">
              Read More
            </Button>
          </div>
        </div>

        {announcements?.length > 1 && (
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevAnnouncement}
              iconName="ChevronLeft"
              iconSize={16}
            >
              Previous
            </Button>
            
            <div className="flex gap-1">
              {announcements?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-micro ${
                    index === currentIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextAnnouncement}
              iconName="ChevronRight"
              iconSize={16}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsWidget;