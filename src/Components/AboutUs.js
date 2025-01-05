import React from 'react';
import Sidebar from './Sidebar';  // Import Sidebar component
import './styles/AboutUs.css';    // Import custom styles for AboutUs page

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <Sidebar /> {/* Sidebar component */}
      <div className="main-content"> {/* Content area */}
        
        <section className="title-container">
          <h1>About Us</h1>
        </section>

        <section className="description-container">
          <p>At <span className='project-name'>Sahej</span>, we are dedicated to transforming disaster management and emergency response efforts through innovative technology. Our mission is to provide a comprehensive platform that enhances coordination, improves response times, and ensures that resources are mobilized effectively during times of crisis. By combining real-time data, AI-driven tools, and a user-friendly interface, we aim to empower individuals, communities, and organizations to respond swiftly and effectively to emergencies.</p>

          {/* Moved the download section here */}
          <section className="download-section">
            <div className="links-container">
              <a href="/help" className="link">Help</a>
              <a href="/about" className="link">About</a>
              <a href="/company" className="link">Company</a>
              <a href="/services" className="link">Services</a>
              <a href="/contact" className="link">Contact</a>
            </div>
            <h2>Download our App</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam est purus, rutrum eget libero accumsan, consequat sollicitudin leo. Curabitur id vestibulum tortor. Sed erat nisi, tristique eget fringilla eget, porta nec lectus. Ut orci metus, tempor ac purus in, rhoncus tincidunt ipsum.</p>
            {/* Replace the button with an image link */}
            <a href="https://play.google.com/store/apps/details?id=com.example.app" target="_blank" rel="noopener noreferrer">
              <img src="/images/GooglePlayButton.png" alt="Download on Google Play" className="download-image" />
            </a>
          </section>
        </section>
        
      </div>
    </div>
  );
};

export default AboutUs;
