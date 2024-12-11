import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSun, FaCloudRain, FaBolt } from 'react-icons/fa';  // Icons for weather conditions
import './styles/DisasterComponent.css';  // External CSS file for styling

const DisasterComponent = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [disasterPrediction, setDisasterPrediction] = useState(null);
  const [error, setError] = useState(null);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0] + "T00:00:00Z";
  };

  const predictDisaster = (weatherData) => {
    const riskLevel = {
      flood: "Low",
      heatwave: "Low",
      storm: "Low",
    };

    // Check for heavy rain, which could indicate flooding or a storm
    const heavyRainThreshold = 10; // mm of rain intensity
    const stormThreshold = 50; // mm of rain intensity
    let floodRisk = false;
    let stormRisk = false;

    // Iterate through each time interval in weather data
    weatherData.data.timelines[0].intervals.forEach((interval) => {
      const { precipitationIntensity, rainIntensity, temperature } = interval.values;

      // Flood prediction if precipitation intensity exceeds threshold
      if (precipitationIntensity > heavyRainThreshold) {
        floodRisk = true;
      }

      // Storm prediction if rain intensity is very high
      if (rainIntensity > stormThreshold) {
        stormRisk = true;
      }

      // Check for heatwave: if temperature is above 40°C
      if (temperature > 40) {
        riskLevel.heatwave = "High";
      }
    });

    if (floodRisk) riskLevel.flood = "High";
    if (stormRisk) riskLevel.storm = "High";

    return riskLevel;
  };

  useEffect(() => {
    if (latitude && longitude) {
      const api_key = process.env.REACT_APP_WEATHER_API ;
      const base_url = "https://api.tomorrow.io/v4/timelines";
      const fields = ["precipitationIntensity", "rainIntensity", "temperature"];

      console.log("API Key:", api_key);

      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const startTime = formatDate(today);
      const endTime = formatDate(tomorrow);

      const params = {
        apikey: api_key,
        location: `${latitude},${longitude}`,
        fields: fields.join(","),
        timesteps: "1h",
        units: "metric",
        startTime: startTime,
        endTime: endTime,
      };

      const queryString = new URLSearchParams(params).toString();
      const url = `${base_url}?${queryString}`;

      axios
        .get(url)
        .then((response) => {
          setWeatherData(response.data);
          const disasterRisk = predictDisaster(response.data);
          setDisasterPrediction(disasterRisk);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [latitude, longitude]);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {weatherData ? (
        <div className="risk-level-container">
          <h3>Risk Levels</h3>
          <div className="risk-card flood-risk">
            <FaCloudRain className="risk-icon" />
            <p><strong>Flood Risk:</strong> {disasterPrediction.flood}</p>
          </div>
          <div className="risk-card storm-risk">
            <FaBolt className="risk-icon" />
            <p><strong>Storm Risk:</strong> {disasterPrediction.storm}</p>
          </div>
          <div className="risk-card heatwave-risk">
            <FaSun className="risk-icon" />
            <p><strong>Heatwave Risk:</strong> {disasterPrediction.heatwave}</p>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default DisasterComponent;
