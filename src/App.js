import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import LocationComponent from './Components/GeoLoacation';
import WeatherComponent from './Components/WeatherComponent';
import MapComponent from './Components/MapComponent';
import Chatbot from './Components/ChatBot';
import Signup from './Components/Signup';
import Login from './Components/Login';
import ResetPassword from './Components/ResetPassword';
import VerifyEmail from './Components/VerifyEmail';
import Bulletin from './Components/Bulletin'; // Correctly import Bulletin

const Home = ({ handleLocationFetched, userLocation }) => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="left-section">
        <button className="button-big">Home</button>
        <button className="button">Cases</button>
        <button className="button" onClick={() => navigate('/bulletins')}>Bulletins</button>
        <button className="button">About Us</button>
        <button className="button">Tariff</button>
        <button className="button">Settings</button>
        <button className="button-big">Ask a question</button>
      </div>

      <div className="center-section">
        <div className="navbar">
          <a href="#temparature" className="nav-item">Temparature</a>
          <a href="#Precipitation" className="nav-item">Precipitation</a>
          <a href="#Pressure" className="nav-item">Pressure</a>
          <a href="#Windspeed" className="nav-item">Windspeed</a>
          <a href="#Clouds" className="nav-item">Clouds</a>
        </div>
        <div className="container-box-center" id="home">
          <h2>Map Section</h2>
          <LocationComponent onLocationFetched={handleLocationFetched} />
          {userLocation.latitude && userLocation.longitude && (
            <MapComponent latitude={userLocation.latitude} longitude={userLocation.longitude} heatmapData={0.8} />
          )}
        </div>
        <div className="container-box-center" id="about">
          <h2>Overcast Section</h2>
          <LocationComponent onLocationFetched={handleLocationFetched} />
          {userLocation.latitude && userLocation.longitude && (
            <WeatherComponent latitude={userLocation.latitude} longitude={userLocation.longitude} />
          )}
          <p>Content for the Overcast</p>
        </div>
        <div className="container-box-center" id="about">
          <h2>About Us Section</h2>
          <p>Content for the About Us section.</p>
          <Chatbot />
        </div>
      </div>

      <div className="right-section">
        <div className="container-box-right">
          <p>Date: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="container-box-right">
          <p>Additional Info</p>
        </div>
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
        <Route path="/home" element={<Home handleLocationFetched={handleLocationFetched} userLocation={userLocation} />} />
      </Routes>
    </Router>
  );
};

export default App;