import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import './styles/Map.css';  // Importing the CSS file

// Legend Component (inside MapContainer)
const Legend = ({ unit }) => {
  return (
    <div className="legend">
      <strong>Legend</strong>
      <div>
        <span
          style={{
            background: "#ff3333",
            display: "inline-block",
            width: "20px",
            height: "20px",
            marginRight: "5px",
          }}
        ></span>{" "}
        High Value (50+)
      </div>
      <div>
        <span
          style={{
            background: "#ff7f00",
            display: "inline-block",
            width: "20px",
            height: "20px",
            marginRight: "5px",
          }}
        ></span>{" "}
        Moderate Value (30-50)
      </div>
      <div>
        <span
          style={{
            background: "#ffe400",
            display: "inline-block",
            width: "20px",
            height: "20px",
            marginRight: "5px",
          }}
        ></span>{" "}
        Low Value (less than 30)
      </div>
      <small>Unit: {unit}</small>
    </div>
  );
};

const MapComponent = ({ latitude, longitude }) => {
  const [position, setPosition] = useState([latitude, longitude]);
  const [param, setParam] = useState("temperature");
  const [unit, setUnit] = useState("°C");
  const [weatherData, setWeatherData] = useState([]);

  const API_KEY = "ff49434dad6c9d9a449cc5e5d4d5e5c3";

  useEffect(() => {
    async function fetchWeatherData() {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
      try {
        const response = await fetch(url);
        const result = await response.json();
        setWeatherData([
          {
            name: "Location",
            coordinates: [latitude, longitude],
            value: result.main[param],
          },
        ]);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }

    fetchWeatherData();
  }, [latitude, longitude, param]);

  const getColor = (value) => {
    if (value > 50) return "#ff3333"; // High value
    if (value > 30) return "#ff7f00"; // Moderate value
    return "#ffe400"; // Low value
  };

  const getRadius = (value) => {
    // Radius of the circle based on value (adjust for your data range)
    if (value > 50) return 10000;
    if (value > 30) return 50000000;
    return 2500;
  };

  return (
    <div className="map-container">
      <div className="navbar-map">
        <button
          className="nav-item"
          onClick={() => {
            setParam("temp");
            setUnit("°C");
          }}
        >
          Temperature
        </button>
        <button
          className="nav-item"
          onClick={() => {
            setParam("humidity");
            setUnit("%");
          }}
        >
          Humidity
        </button>
        <button
          className="nav-item"
          onClick={() => {
            setParam("pressure");
            setUnit("hPa");
          }}
        >
          Pressure
        </button>
        <button
          className="nav-item"
          onClick={() => {
            setParam("windspeed");
            setUnit("km/h");
          }}
        >
          Wind Speed
        </button>
        <button
          className="nav-item"
          onClick={() => {
            setParam("clouds");
            setUnit("%");
          }}
        >
          Clouds
        </button>
      </div>

      <MapContainer
        center={position}
        zoom={7}
        style={{ height: "100%", width: "100%"}}  // Adjust map container to account for navbar
      >
        <TileLayer
          url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=dxQY1IvwWuHpwcLc01Ht"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {weatherData.map((data, index) => (
          <Circle
            key={index}
            center={data.coordinates}
            color={getColor(data.value)}  // Set color dynamically
            fillColor={getColor(data.value)}  // Set fill color dynamically
            fillOpacity={0.5}
            radius={getRadius(data.value)}  // Set radius dynamically
          >
            <Popup>
              <strong>{data.name}</strong>
              <br />
              {param}: {data.value} {unit}
            </Popup>
          </Circle>
        ))}
        <Legend unit={unit} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
