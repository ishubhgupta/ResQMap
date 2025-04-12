import React, { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import LocationComponent from "./Components/GeoLoacation";
import WeatherComponent from "./Components/WeatherComponent";
import MapComponent from "./Components/MapComponent";
import Chatbot from "./Components/ChatBot";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import ResetPassword from "./Components/ResetPassword";
import VerifyEmail from "./Components/VerifyEmail";
import Bulletin from "./Components/Bulletin";
import Sidebar from "./Components/Sidebar";
import { NewsContext } from "./Components/NewsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPortrait } from "@fortawesome/free-solid-svg-icons";
import Profile from "./Components/Profile";
import UpdateProfile from "./Components/UpdateProfile";
import NewsTicker from "./Components/NewTicker";
import CreateReport from "./Components/CreateReport";
import ViewReport from "./Components/ViewReports";
import UpdateReport from "./Components/UpdateReport";
import AboutUs from "./Components/AboutUs";
import DonationPage from "./Components/DonationPage";

const Home = ({ handleLocationFetched, userLocation }) => {
  const navigate = useNavigate();
  const { recentNews } = useContext(NewsContext);

  // Sample forecast data (used if API doesn't provide it)
  const sampleForecastData = [
    {
      day: "Monday",
      high: 40,
      low: 24,
      condition: "Sunny",
      precipitation: "0%",
      icon: "☀️",
      humidity: 45,
      pressure: 1013,
      windSpeed: 12,
      clouds: 10,
    },
    {
      day: "Tuesday",
      high: 40,
      low: 23,
      condition: "Partly Cloudy",
      precipitation: "10%",
      icon: "⛅",
      humidity: 55,
      pressure: 1014,
      windSpeed: 15,
      clouds: 30,
    },
    {
      day: "Wednesday",
      high: 41,
      low: 22,
      condition: "Cloudy",
      precipitation: "30%",
      icon: "☁️",
      humidity: 65,
      pressure: 1012,
      windSpeed: 18,
      clouds: 75,
    },
    {
      day: "Thursday",
      high: 43,
      low: 21,
      condition: "Rain",
      precipitation: "80%",
      icon: "🌧️",
      humidity: 80,
      pressure: 1008,
      windSpeed: 25,
      clouds: 90,
    },
    {
      day: "Friday",
      high: 42,
      low: 22,
      condition: "Thunderstorms",
      precipitation: "70%",
      icon: "⛈️",
      humidity: 75,
      pressure: 1007,
      windSpeed: 30,
      clouds: 95,
    },
    {
      day: "Saturday",
      high: 42,
      low: 23,
      condition: "Sunny",
      precipitation: "0%",
      icon: "☀️",
      humidity: 50,
      pressure: 1015,
      windSpeed: 10,
      clouds: 5,
    },
    {
      day: "Sunday",
      high: 39,
      low: 25,
      condition: "Clear",
      precipitation: "0%",
      icon: "☀️",
      humidity: 40,
      pressure: 1016,
      windSpeed: 8,
      clouds: 0,
    },
  ];

  // Temperature trend data for the graph
  const tempTrendData = {
    labels: sampleForecastData.map((day) => day.day.substring(0, 3)),
    datasets: [
      {
        high: sampleForecastData.map((day) => day.high),
        low: sampleForecastData.map((day) => day.low),
      },
    ],
  };

  // Additional weather metrics data for graphs
  const weatherMetrics = {
    humidity: {
      title: "Humidity (%)",
      color: "#3b82f6",
      data: sampleForecastData.map((day) => day.humidity),
    },
    pressure: {
      title: "Atmospheric Pressure (hPa)",
      color: "#8b5cf6",
      data: sampleForecastData.map((day) => day.pressure),
    },
    windSpeed: {
      title: "Wind Speed (km/h)",
      color: "#10b981",
      data: sampleForecastData.map((day) => day.windSpeed),
    },
    clouds: {
      title: "Cloud Coverage (%)",
      color: "#6b7280",
      data: sampleForecastData.map((day) => day.clouds),
    },
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="center-section">
        <div className="navbar">
          <div className="bulletin">
            {recentNews && <NewsTicker news={[{ title: recentNews }]} />}
          </div>
        </div>
        <div className="container-box-center" id="home">
          <LocationComponent onLocationFetched={handleLocationFetched} />
          {userLocation.latitude && userLocation.longitude && (
            <MapComponent
              latitude={userLocation.latitude}
              longitude={userLocation.longitude}
            />
          )}

          {/* Enhanced Forecast Container */}
          <div className="forecast-container-table">
            <h2 className="forecast-title">7-Day Weather Forecast</h2>
            <div className="forecast-card-wrapper">
              {sampleForecastData.map((forecast, index) => (
                <div key={index} className="forecast-card">
                  <div className="forecast-day-label">{forecast.day}</div>
                  <div className="forecast-icon">{forecast.icon}</div>
                  <div className="forecast-condition">{forecast.condition}</div>
                  <div className="forecast-temps">
                    <span className="forecast-high">{forecast.high}°</span>
                    <span className="forecast-separator">/</span>
                    <span className="forecast-low">{forecast.low}°</span>
                  </div>
                  <div className="forecast-precip">
                    <span className="precip-label">Precipitation:</span>
                    <span className="precip-value">
                      {forecast.precipitation}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Multi-Graph Dashboard */}
          <div className="weather-dashboard">
            <h2 className="dashboard-title">Weather Analysis Dashboard</h2>

            {/* Weather Metrics Grid with Bar Charts */}
            <div className="metrics-grid">
              {/* Temperature Trend Graph - New and Improved */}
              <div className="temperature-graph">
                {/* <h3 className="graph-title">Temperature Trend</h3> */}
                <div className="temp-graph-enhanced">
                  <div className="temp-graph-container">
                    <div className="temp-axis-y">
                      {[35, 30, 25, 20, 15].map((temp) => (
                        <div key={temp} className="temp-axis-label">
                          <span className="temp-axis-value">{temp}°C</span>
                          <div className="temp-axis-line"></div>
                        </div>
                      ))}
                    </div>

                    <div className="temp-chart-area">
                      {sampleForecastData.map((day, index) => (
                        <div key={index} className="temp-day-column">
                          <div className="temp-bar-container">
                            <div
                              className="temp-range-bar"
                              style={{
                                top: `${100 - (day.high - 15) * 5}px`,
                                height: `${(day.high - day.low) * 5}px`,
                              }}
                            >
                              <div
                                className="temp-high-marker"
                                data-value={`${day.high}°`}
                              ></div>
                              <div
                                className="temp-low-marker"
                                data-value={`${day.low}°`}
                              ></div>
                            </div>
                            <div className="temp-connector"></div>
                          </div>
                          <div className="temp-day-label">
                            {day.day.substring(0, 3)}
                          </div>
                        </div>
                      ))}

                      {/* Animated Trend Line */}
                      <svg
                        className="temp-trend-line"
                        viewBox="0 0 700 200"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient
                            id="highGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#ff6b6b" />
                            <stop offset="100%" stopColor="#ff9f43" />
                          </linearGradient>
                          <linearGradient
                            id="lowGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#54a0ff" />
                            <stop offset="100%" stopColor="#00d2d3" />
                          </linearGradient>
                          <filter id="glow">
                            <feGaussianBlur
                              stdDeviation="2.5"
                              result="coloredBlur"
                            />
                            <feMerge>
                              <feMergeNode in="coloredBlur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>

                        {/* High temperature path */}
                        <path
                          d={`M ${sampleForecastData
                            .map(
                              (day, i) =>
                                `${
                                  (i / (sampleForecastData.length - 1)) * 700
                                } ${200 - (day.high - 15) * 5}`
                            )
                            .join(" L ")}`}
                          stroke="url(#highGradient)"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          filter="url(#glow)"
                          className="high-temp-path"
                        />

                        {/* Low temperature path */}
                        <path
                          d={`M ${sampleForecastData
                            .map(
                              (day, i) =>
                                `${
                                  (i / (sampleForecastData.length - 1)) * 700
                                } ${200 - (day.low - 15) * 5}`
                            )
                            .join(" L ")}`}
                          stroke="url(#lowGradient)"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          filter="url(#glow)"
                          className="low-temp-path"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="temp-legend-enhanced">
                    <div className="temp-legend-item">
                      <div className="temp-legend-color high-gradient"></div>
                      <span>High Temperature</span>
                    </div>
                    <div className="temp-legend-item">
                      <div className="temp-legend-color low-gradient"></div>
                      <span>Low Temperature</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Humidity Graph */}
              <div className="metric-card">
                <h3 className="metric-title">
                  <span className="metric-icon humidity-icon">💧</span>
                  Humidity
                </h3>
                <div className="bar-chart-container">
                  {sampleForecastData.map((day, index) => (
                    <div key={index} className="bar-group">
                      <div className="bar-label">{day.day.substring(0, 3)}</div>
                      <div className="bar-wrapper">
                        <div
                          className="bar humidity-bar"
                          style={{
                            height: `${day.humidity}%`,
                            animationDelay: `${index * 0.1}s`,
                          }}
                        >
                          <span className="bar-value">{day.humidity}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wind Speed Graph */}
              <div className="metric-card">
                <h3 className="metric-title">
                  <span className="metric-icon wind-icon">🌬️</span>
                  Wind Speed
                </h3>
                <div className="bar-chart-container">
                  {sampleForecastData.map((day, index) => (
                    <div key={index} className="bar-group">
                      <div className="bar-label">{day.day.substring(0, 3)}</div>
                      <div className="bar-wrapper">
                        <div
                          className="bar wind-bar"
                          style={{
                            height: `${day.windSpeed * 2.5}%`,
                            animationDelay: `${index * 0.1}s`,
                          }}
                        >
                          <span className="bar-value">
                            {day.windSpeed} km/h
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pressure Line Graph */}
              <div className="metric-card">
                <h3 className="metric-title">
                  <span className="metric-icon pressure-icon">🔍</span>
                  Atmospheric Pressure
                </h3>
                <div className="line-chart-container">
                  <div className="line-chart-inner">
                    <svg viewBox="0 0 700 200" className="line-chart">
                      <g className="grid-lines">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <line
                            key={i}
                            x1="0"
                            y1={40 + i * 40}
                            x2="700"
                            y2={40 + i * 40}
                            stroke="#444"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                          />
                        ))}
                      </g>
                      <g className="y-axis-labels">
                        {[1020, 1015, 1010, 1005, 1000].map((val, i) => (
                          <text
                            key={i}
                            x="5"
                            y={45 + i * 40}
                            fill="#999"
                            fontSize="12"
                          >
                            {val}
                          </text>
                        ))}
                      </g>
                      <g className="x-axis-labels">
                        {sampleForecastData.map((day, i) => (
                          <text
                            key={i}
                            x={100 * i + 50}
                            y="195"
                            fill="#999"
                            fontSize="12"
                            textAnchor="middle"
                          >
                            {day.day.substring(0, 3)}
                          </text>
                        ))}
                      </g>

                      {/* Create the pressure line */}
                      <path
                        d={`M${sampleForecastData
                          .map(
                            (day, i) =>
                              `${100 * i + 50},${
                                200 - (day.pressure - 1000) * 4
                              }`
                          )
                          .join(" L")}`}
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="pressure-line"
                      />

                      {/* Add data points */}
                      {sampleForecastData.map((day, i) => (
                        <g
                          key={i}
                          className="data-point"
                          style={{ animation: `fadeIn 0.5s ${i * 0.1}s both` }}
                        >
                          <circle
                            cx={100 * i + 50}
                            cy={200 - (day.pressure - 1000) * 4}
                            r="5"
                            fill="#8b5cf6"
                            className="point-circle"
                          />
                          <text
                            x={100 * i + 50}
                            y={200 - (day.pressure - 1000) * 4 - 10}
                            fill="#ccc"
                            fontSize="12"
                            textAnchor="middle"
                          >
                            {day.pressure}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>
              </div>

              {/* Cloud Coverage Pie/Radial Charts */}
              <div className="metric-card">
                <h3 className="metric-title">
                  <span className="metric-icon cloud-icon">☁️</span>
                  Cloud Coverage
                </h3>
                <div className="radial-chart-container">
                  {sampleForecastData.map((day, index) => (
                    <div key={index} className="radial-chart-item">
                      <div className="day-label">{day.day.substring(0, 3)}</div>
                      <div className="radial-wrapper">
                        <div className="radial-chart">
                          <div
                            className="radial-bar"
                            style={{
                              background: `conic-gradient(#6b7280 ${
                                day.clouds * 3.6
                              }deg, #2a2a2a 0deg)`,
                              animationDelay: `${index * 0.1}s`,
                            }}
                          >
                            <div className="radial-inner">
                              <span className="radial-value">
                                {day.clouds}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="right-section">
        <div className="container-box-right-profile">
          <button
            className="button-big-1"
            onClick={() => navigate("/user-profile")}
          >
            <FontAwesomeIcon icon={faPortrait} /> Profile
          </button>
        </div>
        <div className="container-box-right">
          <p>Date: {new Date().toLocaleDateString()}</p>
          {userLocation.latitude && userLocation.longitude && (
            <WeatherComponent
              latitude={userLocation.latitude}
              longitude={userLocation.longitude}
            />
          )}
        </div>
        {/* <div className="container-box-right">
          <h2>Missing People</h2>
          <Chatbot />
        </div> */}
        <Chatbot />
      </div>
    </div>
  );
};

const App = () => {
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const handleLocationFetched = (lat, lon) => {
    setUserLocation({ latitude: lat, longitude: lon });
  };

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/bulletins" element={<Bulletin />} />
        <Route
          path="/home"
          element={
            <Home
              handleLocationFetched={handleLocationFetched}
              userLocation={userLocation}
            />
          }
        />
        <Route path="/user-profile" element={<Profile />} />
        <Route path="/user-update-profile" element={<UpdateProfile />} />
        <Route path="/create-report" element={<CreateReport />} />
        <Route path="/view-report" element={<ViewReport />} />
        <Route path="/update-report/:id" element={<UpdateReport />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/donate" element={<DonationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
