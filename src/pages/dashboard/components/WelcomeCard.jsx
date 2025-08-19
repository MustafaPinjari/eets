import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeCard = ({ user, currentTime }) => {
  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-6 shadow-elevated">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">
            {getGreeting()}, {user?.name}!
          </h1>
          <p className="text-white/80 mb-1">
            {formatDate(currentTime)}
          </p>
          <p className="text-white/70 text-sm">
            {user?.role} • {user?.department}
          </p>
        </div>
        <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-white/20 rounded-full">
          <Icon name="Sun" size={32} color="white" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;