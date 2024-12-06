import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import ResetPassword from './Components/ResetPassword';
import VerifyEmail from "./Components/VerifyEmail";

function App() {
    return (
        <Router>
            <Routes>
                {/* Route for the signup page */}
                <Route path="/signup" element={<Signup />} />

                {/* Other routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />

                {/* Default route */}
                <Route path="/" element={
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
                                <a href="#Pressure" className="nav-item">Pressure</a>
                                <a href="#Windspeed" className="nav-item">Windspeed</a>
                                <a href="#Clouds" className="nav-item">Clouds</a>
                            </div>
                            <div className="container-box-center" id="home">
                                <h2>Map Section</h2>
                                <p>Content for the Map section.</p>
                            </div>
                            <div className="container-box-center" id="about">
                                <h2>Overcast Section</h2>
                                <p>Content for the Overcast</p>
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
                } />
            </Routes>
        </Router>
    );
}

export default App;
