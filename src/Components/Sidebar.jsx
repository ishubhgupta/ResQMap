import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faBullhorn, 
  faInfoCircle, 
  faMoneyBillWave, 
  faCog,
  faFileAlt,
  faNewspaper,
  faClipboardQuestion
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import "./styles/Sidebar.css";
import sunImage from './assets/sun.png';

const Sidebar = ({ toggleChatbot }) => {
  const navigate = useNavigate();

  return (
    <div className="left-section ">
      <img
        src={sunImage} 
        alt="Bot"
        className="bot-image"
      />
      <button className="button-big icon-button-b">
        <FontAwesomeIcon icon={faHome} />
      </button>
      <button className="button icon-button" onClick={() => navigate('/create-report')}>
        <FontAwesomeIcon icon={faFileAlt} /> {/* Icon for creating reports */}
      </button>
      <button className="button icon-button" onClick={() => navigate('/view-report')}>
        <FontAwesomeIcon icon={faNewspaper} /> {/* Icon for viewing reports */}
      </button>
      <button className="button icon-button" onClick={() => navigate('/bulletins')}>
        <FontAwesomeIcon icon={faBullhorn} />
      </button>
      <button className="button icon-button" onClick={() => navigate('/about-us')}>
        <FontAwesomeIcon icon={faInfoCircle} />
      </button>
      <button className="button icon-button">
        <FontAwesomeIcon icon={faMoneyBillWave} />
      </button>
      <button className="button icon-button">
        <FontAwesomeIcon icon={faCog} />
      </button>
      <button className="button icon-button-a">
        <FontAwesomeIcon icon={faClipboardQuestion} />
      </button>
    </div>
  );
};

export default Sidebar;
