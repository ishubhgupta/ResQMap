import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBullhorn,
  faInfoCircle,
  faHandHoldingDollar,
  faGear,
  faFileCirclePlus,
  faClipboardList,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles/Sidebar.css";
import sunImage from "./assets/sun.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState("/home");

  // Update active route based on current location
  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location]);

  // Navigation items configuration
  const navItems = [
    { path: "/home", icon: faHome, label: "Home" },
    { path: "/create-report", icon: faFileCirclePlus, label: "Create Report" },
    { path: "/view-report", icon: faClipboardList, label: "View Reports" },
    { path: "/bulletins", icon: faBullhorn, label: "News Bulletins" },
    { path: "/about-us", icon: faInfoCircle, label: "About Us" },
    { path: "/donate", icon: faHandHoldingDollar, label: "Donate" },
    { path: "/settings", icon: faGear, label: "Settings" },
  ];

  // Navigate and set active
  const handleNavigation = (path) => {
    navigate(path);
    setActiveRoute(path);
  };

  return (
    <div className="left-section">
      <div className="app-logo">
        <img src={sunImage} alt="Sahej Logo" />
      </div>

      <div className="nav-buttons">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`sidebar-button ${
              activeRoute === item.path ? "active" : ""
            }`}
            onClick={() => handleNavigation(item.path)}
          >
            <FontAwesomeIcon icon={item.icon} className="icon" />
            <span className="tooltip">{item.label}</span>
          </button>
        ))}
      </div>

      <button className="sidebar-button help-button">
        <FontAwesomeIcon icon={faCircleQuestion} className="icon" />
        <span className="tooltip">Get Help</span>
      </button>
    </div>
  );
};

export default Sidebar;
