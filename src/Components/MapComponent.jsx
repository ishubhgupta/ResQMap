import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Rectangle,
  useMap,
  Circle,
} from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles/Map.css";
import {
  FaTemperatureHigh,
  FaTint,
  FaWind,
  FaCompress,
  FaCloud,
} from "react-icons/fa";

// Custom marker icon
const customIcon = new Icon({
  iconUrl: "/images/location-pin.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

// Legend Component based on parameter type
const Legend = ({ param, unit }) => {
  // Define color categories based on parameter
  const getColors = () => {
    switch (param) {
      case "temp":
        return [
          { color: "#2c79ff", label: "Cold (< 10°C)" },
          { color: "#56c0fa", label: "Cool (10-20°C)" },
          { color: "#ffeb56", label: "Warm (20-30°C)" },
          { color: "#fc9272", label: "Hot (30-35°C)" },
          { color: "#d7301f", label: "Very Hot (> 35°C)" },
        ];
      case "humidity":
        return [
          { color: "#ece2f0", label: "Very Dry (< 30%)" },
          { color: "#a6bddb", label: "Dry (30-50%)" },
          { color: "#3690c0", label: "Moderate (50-70%)" },
          { color: "#034e7b", label: "Humid (> 70%)" },
        ];
      case "pressure":
        return [
          { color: "#d73027", label: "Low (< 1000 hPa)" },
          { color: "#fc8d59", label: "Below Normal (1000-1010 hPa)" },
          { color: "#fee090", label: "Normal (1010-1020 hPa)" },
          { color: "#91bfdb", label: "Above Normal (1020-1030 hPa)" },
          { color: "#4575b4", label: "High (> 1030 hPa)" },
        ];
      case "windspeed":
        return [
          { color: "#edf8fb", label: "Calm (< 5 km/h)" },
          { color: "#b3cde3", label: "Light (5-15 km/h)" },
          { color: "#8c96c6", label: "Moderate (15-25 km/h)" },
          { color: "#8856a7", label: "Strong (25-35 km/h)" },
          { color: "#810f7c", label: "Storm (> 35 km/h)" },
        ];
      case "clouds":
        return [
          { color: "#f7fbff", label: "Clear (< 10%)" },
          { color: "#c7dcef", label: "Partly Cloudy (10-30%)" },
          { color: "#72b2d7", label: "Cloudy (30-70%)" },
          { color: "#2878b8", label: "Very Cloudy (70-90%)" },
          { color: "#08306b", label: "Overcast (> 90%)" },
        ];
      default:
        return [
          { color: "#2c79ff", label: "Low" },
          { color: "#ffeb56", label: "Medium" },
          { color: "#d7301f", label: "High" },
        ];
    }
  };

  const colors = getColors();

  return (
    <div className="map-legend">
      <div className="legend-header">
        <h3>{getParamTitle(param)}</h3>
        <span className="legend-unit">{unit}</span>
      </div>
      <div className="legend-items">
        {colors.map((item, index) => (
          <div key={index} className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="legend-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper Functions
const getParamTitle = (param) => {
  switch (param) {
    case "temp":
      return "Temperature";
    case "humidity":
      return "Humidity";
    case "pressure":
      return "Pressure";
    case "windspeed":
      return "Wind Speed";
    case "clouds":
      return "Cloud Cover";
    default:
      return "Data";
  }
};

const getParamIcon = (param) => {
  switch (param) {
    case "temp":
      return <FaTemperatureHigh />;
    case "humidity":
      return <FaTint />;
    case "pressure":
      return <FaCompress />;
    case "windspeed":
      return <FaWind />;
    case "clouds":
      return <FaCloud />;
    default:
      return null;
  }
};

// Modified MapUpdater Component to create more accurate local weather visualization
const MapUpdater = ({ weatherData, param, cityName }) => {
  const map = useMap();
  const mapInitializedRef = useRef(false);

  useEffect(() => {
    // Only run this if map is available and weatherData exists
    if (
      map &&
      weatherData &&
      weatherData.length > 0 &&
      !mapInitializedRef.current
    ) {
      try {
        // Set view safely after a slight delay to ensure map is ready
        const timer = setTimeout(() => {
          map.setView(weatherData[0].coordinates, 8);
          mapInitializedRef.current = true;
        }, 100);

        return () => clearTimeout(timer);
      } catch (err) {
        console.error("Error setting map view:", err);
      }
    }
  }, [map, weatherData]);

  // If no data, don't render anything
  if (!weatherData || weatherData.length === 0) return null;

  // Color function based on parameter
  const getColor = (value) => {
    switch (param) {
      case "temp":
        if (value < 10) return "rgba(44, 121, 255, 0.4)";
        if (value < 20) return "rgba(86, 192, 250, 0.4)";
        if (value < 30) return "rgba(255, 235, 86, 0.4)";
        if (value < 35) return "rgba(252, 146, 114, 0.4)";
        return "rgba(215, 48, 31, 0.4)";

      case "humidity":
        if (value < 30) return "rgba(236, 226, 240, 0.4)";
        if (value < 50) return "rgba(166, 189, 219, 0.4)";
        if (value < 70) return "rgba(54, 144, 192, 0.4)";
        return "rgba(3, 78, 123, 0.4)";

      case "pressure":
        if (value < 1000) return "rgba(215, 48, 39, 0.4)";
        if (value < 1010) return "rgba(252, 141, 89, 0.4)";
        if (value < 1020) return "rgba(254, 224, 144, 0.4)";
        if (value < 1030) return "rgba(145, 191, 219, 0.4)";
        return "rgba(69, 117, 180, 0.4)";

      case "windspeed":
        if (value < 5) return "rgba(237, 248, 251, 0.4)";
        if (value < 15) return "rgba(179, 205, 227, 0.4)";
        if (value < 25) return "rgba(140, 150, 198, 0.4)";
        if (value < 35) return "rgba(136, 86, 167, 0.4)";
        return "rgba(129, 15, 124, 0.4)";

      case "clouds":
        if (value < 10) return "rgba(247, 251, 255, 0.4)";
        if (value < 30) return "rgba(199, 220, 239, 0.4)";
        if (value < 70) return "rgba(114, 178, 215, 0.4)";
        if (value < 90) return "rgba(40, 120, 184, 0.4)";
        return "rgba(8, 48, 107, 0.4)";

      default:
        return "rgba(51, 136, 255, 0.4)";
    }
  };

  // Instead of creating a rectangular grid, we'll directly use actual weather data points
  // This ensures each location shows its own weather, not interpolated data
  return (
    <>
      {weatherData.map((location, index) => {
        // We don't need to find the closest point anymore since we're using actual data
        const color = getColor(location.value);

        // Create a circle for each location with the appropriate color
        return (
          <Circle
            key={index}
            center={location.coordinates}
            pathOptions={{
              color: location.isMainLocation ? "#FF5722" : color,
              fillColor: color,
              fillOpacity: location.isMainLocation ? 0.7 : 0.6,
              weight: location.isMainLocation ? 3 : 1,
            }}
            // Adjust radius based on importance and for main location
            radius={location.isMainLocation ? 25000 : 15000}
          >
            <Popup className="custom-popup">
              <div className="popup-content">
                <h3>{location.name}</h3>
                <div className="popup-weather">
                  <img
                    src={`https://openweathermap.org/img/wn/${location.weather?.icon}.png`}
                    alt={location.weather?.description}
                  />
                  <span>{location.weather?.description}</span>
                </div>
                <div className="popup-data">
                  <strong>{getParamTitle(param)}: </strong>
                  <span className="popup-value">
                    {Math.round(location.value * 10) / 10}{" "}
                    {param === "temp"
                      ? "°C"
                      : param === "humidity"
                      ? "%"
                      : param === "pressure"
                      ? "hPa"
                      : param === "windspeed"
                      ? "km/h"
                      : "%"}
                  </span>
                </div>
              </div>
            </Popup>
          </Circle>
        );
      })}
    </>
  );
};

const MapComponent = ({ latitude, longitude }) => {
  const [position, setPosition] = useState([latitude, longitude]);
  const [param, setParam] = useState("temp");
  const [unit, setUnit] = useState("°C");
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cityName, setCityName] = useState("");
  const [mapKey, setMapKey] = useState(Date.now()); // Add a key to force re-render when needed

  const API_KEY = "ff49434dad6c9d9a449cc5e5d4d5e5c3";

  useEffect(() => {
    // Update position when props change and force map re-render
    setPosition([latitude, longitude]);
    setMapKey(Date.now());
  }, [latitude, longitude]);

  useEffect(() => {
    let isMounted = true;

    async function fetchWeatherData() {
      if (!isMounted) return;

      setLoading(true);

      try {
        // Fetch current location weather
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherResult = await weatherResponse.json();

        if (!isMounted) return;

        // Set city name
        setCityName(weatherResult.name);

        // Get the value based on parameter for user location
        let value;
        switch (param) {
          case "temp":
            value = weatherResult.main.temp;
            break;
          case "humidity":
            value = weatherResult.main.humidity;
            break;
          case "pressure":
            value = weatherResult.main.pressure;
            break;
          case "windspeed":
            value = weatherResult.wind.speed * 3.6;
            break;
          case "clouds":
            value = weatherResult.clouds.all;
            break;
          default:
            value = weatherResult.main.temp;
        }

        // Fetch more detailed data with more locations for a better visualization
        const cityDataUrl = `https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=30&appid=${API_KEY}&units=metric`;
        const cityResponse = await fetch(cityDataUrl);
        const citiesResult = await cityResponse.json();

        if (!isMounted) return;

        // Create array with current location and nearby cities
        // Each location will have its own weather data
        const allData = [
          {
            name: weatherResult.name,
            coordinates: [latitude, longitude],
            value: value,
            isMainLocation: true,
            weather: weatherResult.weather[0],
          },
          ...citiesResult.list.map((city) => {
            // Get precise value for each city based on parameter
            let cityValue;
            switch (param) {
              case "temp":
                cityValue = city.main.temp;
                break;
              case "humidity":
                cityValue = city.main.humidity;
                break;
              case "pressure":
                cityValue = city.main.pressure;
                break;
              case "windspeed":
                cityValue = city.wind.speed * 3.6;
                break;
              case "clouds":
                cityValue = city.clouds.all;
                break;
              default:
                cityValue = city.main.temp;
            }

            return {
              name: city.name,
              coordinates: [city.coord.lat, city.coord.lon],
              value: cityValue,
              isMainLocation: false,
              weather: city.weather[0],
            };
          }),
        ];

        setWeatherData(allData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchWeatherData();

    // Cleanup function to handle component unmounting
    return () => {
      isMounted = false;
    };
  }, [latitude, longitude, param, API_KEY]);

  // When changing parameters, no need to re-render the entire map
  const handleParamChange = (newParam, newUnit) => {
    setParam(newParam);
    setUnit(newUnit);
  };

  return (
    <div className="map-component-container">
      <div className="map-controls">
        <div className="map-param-buttons">
          <button
            className={`param-button ${param === "temp" ? "active" : ""}`}
            onClick={() => handleParamChange("temp", "°C")}
          >
            <FaTemperatureHigh /> Temperature
          </button>
          <button
            className={`param-button ${param === "humidity" ? "active" : ""}`}
            onClick={() => handleParamChange("humidity", "%")}
          >
            <FaTint /> Humidity
          </button>
          <button
            className={`param-button ${param === "pressure" ? "active" : ""}`}
            onClick={() => handleParamChange("pressure", "hPa")}
          >
            <FaCompress /> Pressure
          </button>
          <button
            className={`param-button ${param === "windspeed" ? "active" : ""}`}
            onClick={() => handleParamChange("windspeed", "km/h")}
          >
            <FaWind /> Wind Speed
          </button>
          <button
            className={`param-button ${param === "clouds" ? "active" : ""}`}
            onClick={() => handleParamChange("clouds", "%")}
          >
            <FaCloud /> Clouds
          </button>
        </div>

        <div className="current-location-info">
          <span className="location-name">{cityName}</span>
          {weatherData.length > 0 && (
            <span className="location-value">
              {getParamIcon(param)} {Math.round(weatherData[0]?.value)} {unit}
            </span>
          )}
        </div>
      </div>

      <div className="map-wrapper">
        {loading ? (
          <div className="map-loading">
            <div className="loader"></div>
            <p>Loading map data...</p>
          </div>
        ) : (
          <MapContainer
            key={mapKey} // Add a key to force re-render when needed
            center={position}
            zoom={8}
            style={{ height: "100%", width: "100%" }}
            className="leaflet-map"
            whenCreated={(map) => {
              // Add a small delay to ensure map is fully initialized
              setTimeout(() => {
                try {
                  map.invalidateSize();
                } catch (err) {
                  console.error("Error invalidating map size:", err);
                }
              }, 200);
            }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              subdomains="abcd"
              maxZoom={19}
            />

            {/* Render the weather overlay grid */}
            <MapUpdater
              weatherData={weatherData}
              param={param}
              cityName={cityName}
            />

            {/* Main location marker */}
            <Marker position={position} icon={customIcon}>
              <Popup className="custom-popup">
                <div className="current-location-popup">
                  <h3>Your Location</h3>
                  <p>{cityName}</p>
                  {weatherData.length > 0 && (
                    <div className="current-weather-info">
                      <img
                        src={`https://openweathermap.org/img/wn/${weatherData[0]?.weather?.icon}.png`}
                        alt={weatherData[0]?.weather?.description}
                      />
                      <p>
                        {getParamTitle(param)}:{" "}
                        {Math.round(weatherData[0]?.value * 10) / 10} {unit}
                      </p>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>

            <Legend param={param} unit={unit} />
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
