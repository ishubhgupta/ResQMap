import React, { useState } from 'react';
import './App.css';
import LocationComponent from './Components/GeoLoacation';
import WeatherComponent from './Components/WeatherComponent';
import MapComponent from './Components/MapComponent';
import Chatbot from './Components/ChatBot';

const App = () => {
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const handleLocationFetched = (lat, lon) => {
    setUserLocation({ latitude: lat, longitude: lon });
  };

  return (
    <div className="container">
      <div className="left-section">
        <button className="button-big">Home</button>
        <button className="button">Cases</button>
        <button className="button">Bulletins</button>
        <button className="button">About Us</button>
        <button className="button">Tariff</button>
        <button className="button">Settings</button>
        <button className="button-big">Ask a question</button>
      </div>

      <div className="center-section">
        <div className="navbar">
          <a href="#temparature" className="nav-item">Temparature</a>
          <a href="#Precipitation" className="nav-item">Precipitation</a>
          <a href="#Pressure" className="nav-item">Pressure </a>
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
          <Chatbot/>
        </div>
      </div>
      <chatbot/>

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

export default App;