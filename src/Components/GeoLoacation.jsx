import React, { useState, useEffect } from 'react';

const LocationComponent = ({ onLocationFetched }) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    errorMessage: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({
            latitude: lat,
            longitude: lon,
            errorMessage: null,
          });
          // Pass the location to the parent component
          if (onLocationFetched) {
            onLocationFetched(lat, lon);
          }
        },
        (error) => {
          setLocation({
            latitude: null,
            longitude: null,
            errorMessage: error.message,
          });
        }
      );
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        errorMessage: 'Geolocation is not supported by this browser.',
      });
    }
  }, [onLocationFetched]); // Adding onLocationFetched to dependency array

  return (
    <div>
      <h2>User Location</h2>
      {location.errorMessage ? (
        <p>Error: {location.errorMessage}</p>
      ) : (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )}
    </div>
  );
};

export default LocationComponent;
