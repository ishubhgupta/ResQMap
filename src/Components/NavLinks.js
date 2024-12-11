import React from 'react';
import './styles/NavLinks.css'; // Assuming you will add the styles in this file

const NavLinks = () => {
  return (
    <div className="nav-links-container">
      <a href="#temparature" className="nav-item">Temperature</a>
      <a href="#Precipitation" className="nav-item">Precipitation</a>
      <a href="#Pressure" className="nav-item">Pressure</a>
      <a href="#Windspeed" className="nav-item">Windspeed</a>
      <a href="#Clouds" className="nav-item">Clouds</a>
    </div>
  );
};

export default NavLinks;
