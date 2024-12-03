import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const DisasterComponent = ({ latitude, longitude}) => {// latitude = 36.41800215159957, longitude = -116.88913382165802
  const [weatherData, setWeatherData] = useState(null);
  const [disasterPrediction, setDisasterPrediction] = useState(null);
  const [error, setError] = useState(null);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0] + "T00:00:00Z";
  };

  const predictDisaster = (weatherData) => {
    const riskLevel = {
      flood: "Low",
      heatwave: "Low",
      storm: "Low",
    };

    const heavyRainThreshold = 10; // mm
    const stormThreshold = 50; // mm

    let floodRisk = false;
    let stormRisk = false;

    weatherData.data.timelines[0].intervals.forEach((interval) => {
      const { precipitationIntensity, rainIntensity, temperature } = interval.values;

      if (precipitationIntensity > heavyRainThreshold) {
        floodRisk = true;
      }
      if (rainIntensity > stormThreshold) {
        stormRisk = true;
      }
      if (temperature > 40) {
        riskLevel.heatwave = "High";
      }
    });

    if (floodRisk) riskLevel.flood = "High";
    if (stormRisk) riskLevel.storm = "High";

    return riskLevel;
  };

  useEffect(() => {
    if (!latitude || !longitude) return;

    const apiKey = process.env.REACT_APP_WEATHER_API;
    if (!apiKey) {
      setError("API key is missing. Please set REACT_APP_WEATHER_API in your environment.");
      return;
    }

    const baseUrl = "https://api.tomorrow.io/v4/timelines";
    const fields = ["precipitationIntensity", "rainIntensity", "temperature"];
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const params = {
      apikey: apiKey,
      location: `${latitude},${longitude}`,
      fields: fields.join(","),
      timesteps: "1h",
      units: "metric",
      startTime: formatDate(today),
      endTime: formatDate(tomorrow),
    };

    const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;

    axios
      .get(url)
      .then((response) => {
        setWeatherData(response.data);
        const riskLevel = predictDisaster(response.data);
        setDisasterPrediction(riskLevel);
      })
      .catch((err) => {
        setError(`Failed to fetch weather data: ${err.message}`);
      });
  }, [latitude, longitude]);

  return (
    <div>
      <h2>Natural Disaster Prediction</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {weatherData ? (
        <div>
          <h3>Risk Levels</h3>
          <p>
            <strong>Flood Risk:</strong> {disasterPrediction?.flood}
          </p>
          <p>
            <strong>Storm Risk:</strong> {disasterPrediction?.storm}
          </p>
          <p>
            <strong>Heatwave Risk:</strong> {disasterPrediction?.heatwave}
          </p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

// PropTypes for validation
DisasterComponent.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default DisasterComponent;
