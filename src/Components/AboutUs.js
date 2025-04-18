import React from "react";
import Sidebar from "./Sidebar";
import {
  FaExternalLinkAlt,
  FaHandsHelping,
  FaUsers,
  FaDownload,
} from "react-icons/fa";
import { MdSecurity, MdLocationOn, MdEmail } from "react-icons/md";
import "./styles/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <Sidebar />
      <div className="main-content">
        <div className="hero-section">
          <h1 className="hero-title">
            About <span className="project-name">Sahej</span>
          </h1>
          <div className="hero-subtitle">
            Transforming Emergency Response with Technology
          </div>
        </div>

        <section className="mission-section">
          <div className="section-header">
            <h2>Our Mission</h2>
            <div className="section-divider"></div>
          </div>

          <div className="mission-content">
            <div className="mission-text">
              <p>
                At <span className="project-name">Sahej</span>, we are dedicated
                to transforming disaster management and emergency response
                efforts through innovative technology. Our mission is to provide
                a comprehensive platform that enhances coordination, improves
                response times, and ensures that resources are mobilized
                effectively during times of crisis.
              </p>
              <p>
                By combining real-time data, AI-driven tools, and a
                user-friendly interface, we aim to empower individuals,
                communities, and organizations to respond swiftly and
                effectively to emergencies.
              </p>
            </div>

            <div className="feature-cards">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaHandsHelping />
                </div>
                <h3>Rapid Response</h3>
                <p>
                  Coordinate emergency services faster with our real-time
                  communication tools
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <MdSecurity />
                </div>
                <h3>Data Security</h3>
                <p>
                  Your sensitive information is protected with enterprise-grade
                  security
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <FaUsers />
                </div>
                <h3>Community Focus</h3>
                <p>
                  Engage and empower communities to participate in disaster
                  preparedness
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="download-section">
          <div className="download-content">
            <div className="download-text">
              <h2>
                <FaDownload /> Get Sahej Mobile App
              </h2>
              <p>
                Access critical emergency services, report incidents, and
                receive real-time alerts straight from your mobile device. Our
                app works offline and uses minimal battery to ensure
                availability when you need it most.
              </p>

              <div className="download-badges">
                <a
                  href="https://play.google.com/store/apps/details?id=com.example.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-badge"
                >
                  <img
                    src="/images/GooglePlayButton.png"
                    alt="Download on Google Play"
                  />
                </a>
              </div>
            </div>

            <div className="app-preview">
              <img
                src="/images/app-preview.png"
                alt="Sahej App Preview"
                className="app-screenshot"
              />
            </div>
          </div>
        </section>

        <footer className="about-footer">
          <div className="footer-links">
            <a href="/help" className="footer-link">
              Help <FaExternalLinkAlt className="link-icon" />
            </a>
            <a href="/about" className="footer-link">
              About <FaExternalLinkAlt className="link-icon" />
            </a>
            <a href="/company" className="footer-link">
              Company <FaExternalLinkAlt className="link-icon" />
            </a>
            <a href="/services" className="footer-link">
              Services <FaExternalLinkAlt className="link-icon" />
            </a>
            <a href="/contact" className="footer-link">
              Contact <FaExternalLinkAlt className="link-icon" />
            </a>
          </div>

          <div className="contact-info">
            <div className="contact-item">
              <MdLocationOn /> 123 Tech Plaza, Silicon Valley, CA
            </div>
            <div className="contact-item">
              <MdEmail /> contact@sahej.com
            </div>
          </div>

          <div className="copyright">
            © {new Date().getFullYear()} Sahej Disaster Support Network. All
            rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AboutUs;
