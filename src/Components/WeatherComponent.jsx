import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSun,
  FaCloudRain,
  FaBolt,
  FaWind,
  FaThermometerHalf,
  FaCloudSun,
  FaUmbrella,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";
import "./styles/WeatherComponent.css";

const WeatherComponent = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [disasterPrediction, setDisasterPrediction] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0] + "T00:00:00Z";
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
      const { precipitationIntensity, rainIntensity, temperature } =
        interval.values;

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
      setLoading(true);

      // Fetch current weather using OpenWeatherMap
      const fetchCurrentWeather = async () => {
        try {
          const apiKey =
            process.env.REACT_APP_OPENWEATHER_API_KEY ||
            "0d7303c17ee3d3482cd82a2ad273a90d";
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
          );
          setCurrentWeather(response.data);
        } catch (err) {
          setError("Failed to fetch current weather");
          console.error(err);
        }
      };

      // Fetch 7-day forecast
      const fetchForecast = async () => {
        try {
          const apiKey =
            process.env.REACT_APP_OPENWEATHER_API_KEY ||
            "0d7303c17ee3d3482cd82a2ad273a90d";
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${apiKey}&units=metric`
          );
          setForecast(response.data);
        } catch (err) {
          console.error("Forecast fetch error:", err);
        }
      };

      // Fetch disaster prediction data
      const fetchDisasterData = async () => {
        try {
          const api_key = process.env.REACT_APP_WEATHER_API;
          const base_url = "https://api.tomorrow.io/v4/timelines";
          const fields = [
            "precipitationIntensity",
            "rainIntensity",
            "temperature",
          ];

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

          const response = await axios.get(url);
          setWeatherData(response.data);
          const disasterRisk = predictDisaster(response.data);
          setDisasterPrediction(disasterRisk);
        } catch (err) {
          console.error("Disaster prediction error:", err);
        }
      };

      // Fetch all data
      Promise.all([
        fetchCurrentWeather(),
        fetchForecast(),
        fetchDisasterData(),
      ]).finally(() => {
        setLoading(false);
      });
    }
  }, [latitude, longitude]);

  // Helper function to get day name
  const getDayName = (timestamp) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(timestamp * 1000);
    return days[date.getDay()];
  };

  // Get weather icon
  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  // Get risk level color
  const getRiskColor = (level) => {
    switch (level) {
      case "High":
        return "var(--high-risk-color)";
      case "Medium":
        return "var(--medium-risk-color)";
      case "Low":
      default:
        return "var(--low-risk-color)";
    }
  };

  return (
    <div className="weather-master-container">
      {loading ? (
        <div className="weather-loading">
          <div className="weather-spinner"></div>
          <p>Loading weather information...</p>
        </div>
      ) : error ? (
        <div className="weather-error">
          <FaExclamationTriangle />
          <p>{error}</p>
        </div>
      ) : (
        <>
          {currentWeather && (
            <div className="current-weather-container">
              <div className="current-weather-card">
                <div className="weather-header">
                  <h3>
                    <FaInfoCircle /> Current Weather in {currentWeather.name}
                  </h3>
                </div>

                <div className="weather-main">
                  <div className="weather-icon-temp">
                    <img
                      src={getWeatherIcon(currentWeather.weather[0].icon)}
                      alt={currentWeather.weather[0].description}
                    />
                    <div className="temperature">
                      {Math.round(currentWeather.main.temp)}°C
                    </div>
                  </div>

                  <div className="weather-details">
                    <p className="weather-description">
                      {currentWeather.weather[0].description}
                    </p>

                    <div className="weather-metrics">
                      <div className="metric">
                        <FaThermometerHalf className="metric-icon" />
                        <span>
                          Feels like:{" "}
                          {Math.round(currentWeather.main.feels_like)}°C
                        </span>
                      </div>
                      <div className="metric">
                        <FaWind className="metric-icon" />
                        <span>
                          Wind: {Math.round(currentWeather.wind.speed * 3.6)}{" "}
                          km/h
                        </span>
                      </div>
                      <div className="metric">
                        <FaUmbrella className="metric-icon" />
                        <span>Humidity: {currentWeather.main.humidity}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Risk Levels Section */}
          {disasterPrediction && (
            <div className="risk-level-container">
              <h3>
                <FaExclamationTriangle /> Risk Assessment
              </h3>

              <div className="risk-cards">
                <div
                  className="risk-card"
                  style={{
                    borderColor: getRiskColor(disasterPrediction.flood),
                  }}
                >
                  <FaCloudRain className="risk-icon" />
                  <div className="risk-info">
                    <h4>Flood Risk</h4>
                    <div
                      className={`risk-level ${disasterPrediction.flood.toLowerCase()}-risk`}
                    >
                      {disasterPrediction.flood}
                    </div>
                  </div>
                </div>

                <div
                  className="risk-card"
                  style={{
                    borderColor: getRiskColor(disasterPrediction.storm),
                  }}
                >
                  <FaBolt className="risk-icon" />
                  <div className="risk-info">
                    <h4>Storm Risk</h4>
                    <div
                      className={`risk-level ${disasterPrediction.storm.toLowerCase()}-risk`}
                    >
                      {disasterPrediction.storm}
                    </div>
                  </div>
                </div>

                <div
                  className="risk-card"
                  style={{
                    borderColor: getRiskColor(disasterPrediction.heatwave),
                  }}
                >
                  <FaSun className="risk-icon" />
                  <div className="risk-info">
                    <h4>Heatwave Risk</h4>
                    <div
                      className={`risk-level ${disasterPrediction.heatwave.toLowerCase()}-risk`}
                    >
                      {disasterPrediction.heatwave}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Forecast Section */}
          {forecast && forecast.daily && (
            <div className="forecast-container">
              <h3>
                <FaCloudSun /> 7-Day Forecast
              </h3>

              <div className="forecast-scroll">
                {forecast.daily.map((day, index) => (
                  <div className="forecast-day" key={index}>
                    <div className="forecast-date">
                      {index === 0 ? "Today" : getDayName(day.dt)}
                    </div>
                    <img
                      src={getWeatherIcon(day.weather[0].icon)}
                      alt={day.weather[0].description}
                    />
                    <div className="forecast-temp">
                      <span className="forecast-high">
                        {Math.round(day.temp.max)}°
                      </span>
                      <span className="forecast-low">
                        {Math.round(day.temp.min)}°
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WeatherComponent;
