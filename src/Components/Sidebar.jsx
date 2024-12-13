import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faBriefcase, 
  faBullhorn, 
  faInfoCircle, 
  faMoneyBillWave, 
  faCog,
  
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import "./styles/Sidebar.css";
import sunImage from './assets/sun.png';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="left-section ">
        <img
            src={sunImage} // Replace with actual image path or URL
            alt="Bot"
            className="bot-image"
        />
      <button className="button-big icon-button-b">
        <FontAwesomeIcon icon={faHome} />
      </button>
      <button className="button icon-button">
        <FontAwesomeIcon icon={faBriefcase} />
      </button>
      <button className="button icon-button" onClick={() => navigate('/bulletins')}>
        <FontAwesomeIcon icon={faBullhorn} />
      </button>
      <button className="button icon-button">
        <FontAwesomeIcon icon={faInfoCircle} />
      </button>
      <button className="button icon-button">
        <FontAwesomeIcon icon={faMoneyBillWave} />
      </button>
      <button className="button icon-button">
        <FontAwesomeIcon icon={faCog} />
      </button>
    </div>
  );
};

export default Sidebar;

