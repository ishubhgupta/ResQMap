import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const LocationComponent = ({ onLocationFetched }) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    errorMessage: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        latitude: null,
        longitude: null,
        errorMessage: "Geolocation is not supported by this browser.",
      });
      return;
    }

    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({
        latitude,
        longitude,
        errorMessage: null,
      });

      // Pass the location to the parent component
      if (onLocationFetched) {
        onLocationFetched(latitude, longitude);
      }
    };

    const handleError = (error) => {
      setLocation({
        latitude: null,
        longitude: null,
        errorMessage: error.message,
      });
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, [onLocationFetched]); // Dependency array includes onLocationFetched

  return (
    <div>
      <h2>User Location</h2>
      {location.errorMessage ? (
        <p style={{ color: "red" }}>Error: {location.errorMessage}</p>
      ) : location.latitude && location.longitude ? (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

// PropTypes for validation
LocationComponent.propTypes = {
  onLocationFetched: PropTypes.func,
};

export default LocationComponent;
