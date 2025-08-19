import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationMap = ({ 
  allowedLocations = [], 
  currentLocation = null, 
  onLocationUpdate 
}) => {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);

  // Mock allowed locations
  const mockAllowedLocations = allowedLocations?.length > 0 ? allowedLocations : [
    {
      id: 1,
      name: 'Main Office',
      address: '123 Business District, Downtown, NY 10001',
      lat: 40.7589,
      lng: -73.9851,
      radius: 100, // meters
      isActive: true
    },
    {
      id: 2,
      name: 'Branch Office',
      address: '456 Corporate Ave, Midtown, NY 10017',
      lat: 40.7505,
      lng: -73.9934,
      radius: 50,
      isActive: false
    }
  ];

  // Mock current location
  const mockCurrentLocation = currentLocation || {
    lat: 40.7589,
    lng: -73.9851,
    address: '123 Business District, Downtown, NY 10001',
    accuracy: 15,
    timestamp: new Date()
  };

  const handleLocationRefresh = async () => {
    setIsLoadingLocation(true);
    setLocationError(null);
    
    try {
      // Simulate location fetch
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful location update
      const updatedLocation = {
        ...mockCurrentLocation,
        timestamp: new Date(),
        accuracy: Math.floor(Math.random() * 20) + 5
      };
      
      if (onLocationUpdate) {
        onLocationUpdate(updatedLocation);
      }
    } catch (error) {
      setLocationError('Failed to get current location. Please check GPS settings.');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const isWithinAllowedLocation = (currentLoc, allowedLoc) => {
    // Simple distance calculation (mock)
    const distance = Math.sqrt(
      Math.pow(currentLoc?.lat - allowedLoc?.lat, 2) + 
      Math.pow(currentLoc?.lng - allowedLoc?.lng, 2)
    ) * 111000; // Convert to meters (approximate)
    
    return distance <= allowedLoc?.radius;
  };

  const getLocationStatus = () => {
    const withinLocation = mockAllowedLocations?.find(loc => 
      isWithinAllowedLocation(mockCurrentLocation, loc)
    );
    
    return withinLocation ? {
      isValid: true,
      location: withinLocation,
      message: `You are within ${withinLocation?.name}`
    } : {
      isValid: false,
      location: null,
      message: 'You are outside allowed work locations'
    };
  };

  const locationStatus = getLocationStatus();

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Location Verification</h3>
        <Button
          variant="outline"
          size="sm"
          loading={isLoadingLocation}
          onClick={handleLocationRefresh}
          iconName="RefreshCw"
          iconPosition="left"
        >
          Refresh
        </Button>
      </div>
      {/* Location Status */}
      <div className={`flex items-center gap-3 p-4 rounded-lg mb-6 ${
        locationStatus?.isValid 
          ? 'bg-success/10 text-success border border-success/20' :'bg-destructive/10 text-destructive border border-destructive/20'
      }`}>
        <Icon 
          name={locationStatus?.isValid ? "CheckCircle" : "XCircle"} 
          size={20} 
        />
        <div className="flex-1">
          <div className="font-medium">
            {locationStatus?.isValid ? 'Location Verified' : 'Location Not Verified'}
          </div>
          <div className="text-sm opacity-80">
            {locationStatus?.message}
          </div>
        </div>
      </div>
      {/* Current Location Info */}
      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="MapPin" size={16} className="text-primary" />
          <span className="font-medium text-foreground">Current Location</span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Address:</span>
            <span className="text-foreground text-right flex-1 ml-2">
              {mockCurrentLocation?.address}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Accuracy:</span>
            <span className="text-foreground">±{mockCurrentLocation?.accuracy}m</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last Updated:</span>
            <span className="text-foreground">
              {mockCurrentLocation?.timestamp?.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="bg-muted rounded-lg overflow-hidden mb-6" style={{ height: '300px' }}>
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Office Location"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mockCurrentLocation?.lat},${mockCurrentLocation?.lng}&z=16&output=embed`}
          className="border-0"
        />
      </div>
      {/* Allowed Locations */}
      <div>
        <h4 className="font-medium text-foreground mb-3">Allowed Work Locations</h4>
        <div className="space-y-3">
          {mockAllowedLocations?.map((location) => (
            <div 
              key={location?.id} 
              className={`flex items-center gap-3 p-3 rounded-lg border transition-micro ${
                locationStatus?.location?.id === location?.id
                  ? 'bg-success/10 border-success/20 text-success' :'bg-background border-border text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon 
                name={locationStatus?.location?.id === location?.id ? "CheckCircle" : "MapPin"} 
                size={16} 
              />
              <div className="flex-1">
                <div className="font-medium">{location?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {location?.address}
                </div>
                <div className="text-xs text-muted-foreground">
                  Radius: {location?.radius}m
                </div>
              </div>
              {locationStatus?.location?.id === location?.id && (
                <div className="text-xs bg-success text-success-foreground px-2 py-1 rounded">
                  Current
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Location Error */}
      {locationError && (
        <div className="mt-4 p-3 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg">
          <div className="flex items-center gap-2">
            <Icon name="AlertTriangle" size={16} />
            <span className="text-sm">{locationError}</span>
          </div>
        </div>
      )}
      {/* GPS Info */}
      <div className="mt-4 text-xs text-muted-foreground text-center">
        Location services must be enabled for attendance tracking
      </div>
    </div>
  );
};

export default LocationMap;