import React, { useState, useContext } from 'react';
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
import Sidebar from './Components/Sidebar';
import { NewsContext } from './Components/NewsContext'; // Import the context
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPortrait} from '@fortawesome/free-solid-svg-icons';
import Profile from './Components/Profile';
import UpdateProfile from './Components/UpdateProfile';
import NewsTicker from './Components/NewTicker';

const Home = ({ handleLocationFetched, userLocation }) => {
  const navigate = useNavigate();
  const { recentNews } = useContext(NewsContext);

  return (
    <div className="container">
      <Sidebar/>
      <div className="center-section">

        <div className="navbar">
          <div className="bulletin">
              {recentNews && <NewsTicker news={[{ title: recentNews }]} />}
          </div>
        </div>
        <div className="container-box-center" id="home">
          <LocationComponent onLocationFetched={handleLocationFetched} />
          {userLocation.latitude && userLocation.longitude && (
            <MapComponent latitude={userLocation.latitude} longitude={userLocation.longitude} />
          )}
          {/* <NavLinks />/ */}
        </div>
        {/* <div className="container-box-center" id="about">
          <h2>Overcast Section</h2>
          <LocationComponent onLocationFetched={handleLocationFetched} />
          
          <p>Content for the Overcast</p>
        </div> */}
      </div>

      <div className="right-section">
          <div className="container-box-right-profile">

            <button className="button-big" onClick={() => navigate('/user-profile')}><FontAwesomeIcon icon={faPortrait} />Profile</button> {/* Profile Button */}
          </div>
        <div className="container-box-right">
          <p>Date: {new Date().toLocaleDateString()}</p>
          {userLocation.latitude && userLocation.longitude && (
            <WeatherComponent latitude={userLocation.latitude} longitude={userLocation.longitude} />
          )}
        </div>
        <div className="container-box-right">
          <h2>Missing People</h2>
          <Chatbot />
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
        <Route path="/user-profile" element={<Profile />} ></Route>
        <Route path="/user-update-profile" element={<UpdateProfile />} />
      </Routes>
    </Router>
  );
};

export default App;