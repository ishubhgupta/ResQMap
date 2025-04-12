import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaSearch,
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
  FaHandHoldingHeart,
  FaHandHoldingUsd,
  FaFilter,
  FaInfoCircle,
} from "react-icons/fa";
import "./styles/DonationPage.css";

// Sample NGO data (would be fetched from API in a real application)
const sampleNGOs = [
  {
    id: 1,
    name: "Disaster Relief Foundation",
    logo: "/images/ngo-logos/drf-logo.png",
    description:
      "Providing immediate relief to disaster victims with food, shelter, and medical aid.",
    category: ["Disaster Relief", "Medical Aid"],
    location: "Mumbai, Maharashtra",
    distance: 2.5,
    phone: "+91 9876543210",
    website: "https://www.disasterrelief.org",
    email: "info@disasterrelief.org",
    rating: 4.8,
    donationGoal: 2000000,
    raisedAmount: 1250000,
    projects: [
      "Kerala Flood Relief - 2023",
      "Gujarat Earthquake Rehabilitation",
      "COVID-19 Emergency Response",
    ],
    impact:
      "Helped over 50,000 people across 120 disaster-affected communities",
  },
  {
    id: 2,
    name: "National Disaster Response Network",
    logo: "/images/ngo-logos/ndrn-logo.png",
    description:
      "A nationwide network focused on quick disaster response and community rehabilitation.",
    category: ["Disaster Response", "Community Rehabilitation"],
    location: "Delhi, NCR",
    distance: 5.1,
    phone: "+91 9988776655",
    website: "https://www.ndrn.org.in",
    email: "contact@ndrn.org.in",
    rating: 4.6,
    donationGoal: 5000000,
    raisedAmount: 3200000,
    projects: [
      "Cyclone Preparedness Program",
      "Rural India Disaster Readiness",
      "Himalayan Landslide Recovery",
    ],
    impact:
      "Trained 2,500 disaster response volunteers and rehabilitated 85 villages",
  },
  {
    id: 3,
    name: "Children's Emergency Fund",
    logo: "/images/ngo-logos/cef-logo.png",
    description:
      "Focusing on protecting and supporting children affected by natural and man-made disasters.",
    category: ["Children", "Education", "Disaster Relief"],
    location: "Bengaluru, Karnataka",
    distance: 3.8,
    phone: "+91 9012345678",
    website: "https://www.childrenemergency.org",
    email: "help@childrenemergency.org",
    rating: 4.9,
    donationGoal: 3000000,
    raisedAmount: 2750000,
    projects: [
      "School Rebuilding Initiative",
      "Child Trauma Counseling",
      "Displaced Children Support",
    ],
    impact:
      "Provided education and psychological support to 12,000 children in disaster zones",
  },
  {
    id: 4,
    name: "Healthcare Emergency Response Team",
    logo: "/images/ngo-logos/hert-logo.png",
    description:
      "Medical professionals providing critical healthcare during disasters and emergencies.",
    category: ["Medical Aid", "Healthcare"],
    location: "Chennai, Tamil Nadu",
    distance: 7.2,
    phone: "+91 9567890123",
    website: "https://www.healthcareresponse.org",
    email: "medical@healthcareresponse.org",
    rating: 4.7,
    donationGoal: 1500000,
    raisedAmount: 980000,
    projects: [
      "Mobile Medical Units",
      "Emergency Field Hospitals",
      "Medical Supply Distribution",
    ],
    impact:
      "Treated over 35,000 patients and distributed medicines worth ₹4.5 crores",
  },
  {
    id: 5,
    name: "Rural Development & Disaster Management",
    logo: "/images/ngo-logos/rddm-logo.png",
    description:
      "Working on disaster preparedness and sustainable recovery in rural communities.",
    category: ["Rural Development", "Disaster Preparedness"],
    location: "Lucknow, Uttar Pradesh",
    distance: 10.5,
    phone: "+91 8765432109",
    website: "https://www.ruraldisaster.org",
    email: "info@ruraldisaster.org",
    rating: 4.5,
    donationGoal: 2500000,
    raisedAmount: 1100000,
    projects: [
      "Drought Resilience Program",
      "Flood-Resistant Housing",
      "Village Disaster Management Committees",
    ],
    impact:
      "Developed disaster preparedness plans for 230 villages affecting 180,000 lives",
  },
];

const DonationPage = () => {
  const [ngos, setNgos] = useState([]);
  const [filteredNgos, setFilteredNgos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Get all unique categories from the NGO data
  const allCategories = [...new Set(sampleNGOs.flatMap((ngo) => ngo.category))];

  useEffect(() => {
    // Simulate API fetch delay
    const fetchNGOs = () => {
      setTimeout(() => {
        setNgos(sampleNGOs);
        setFilteredNgos(sampleNGOs);
        setLoading(false);
      }, 1000);
    };

    fetchNGOs();
  }, []);

  useEffect(() => {
    // Filter NGOs based on search term and selected categories
    let results = ngos;

    if (searchTerm) {
      results = results.filter(
        (ngo) =>
          ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ngo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ngo.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      results = results.filter((ngo) =>
        ngo.category.some((cat) => selectedCategories.includes(cat))
      );
    }

    setFilteredNgos(results);
  }, [searchTerm, selectedCategories, ngos]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleDonate = (ngo) => {
    setSelectedNGO(ngo);
    setShowDonationModal(true);
  };

  const submitDonation = (e) => {
    e.preventDefault();
    // In a real app, this would process the payment
    alert(
      `Thank you for your donation of ₹${donationAmount} to ${selectedNGO.name}!`
    );
    setShowDonationModal(false);
    setDonationAmount("");
  };

  // Calculate donation progress percentage
  const calculateProgress = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100);
  };

  // Format currency in Indian Rupees
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="donation-page">
      <div className="donation-header">
        <Link to="/home" className="back-link">
          <FaArrowLeft /> Back to Home
        </Link>
        <h1 className="donation-title">
          <FaHandHoldingHeart className="donation-title-icon" />
          <span className="centered-title">Support Disaster Relief NGOs</span>
        </h1>
        <button className="info-button" onClick={() => setShowInfoModal(true)}>
          <FaInfoCircle /> How It Works
        </button>
      </div>

      <div className="donation-hero">
        <div className="donation-hero-content">
          <h2>Make a Difference Today</h2>
          <p>
            Your contribution helps disaster-affected communities recover and
            rebuild. Find NGOs working on causes you care about.
          </p>
        </div>
      </div>

      <div className="donation-container">
        <div className="search-filter-section">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, location or cause..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-section">
            <div className="filter-header">
              <FaFilter className="filter-icon" />
              <h3>Filter by Category</h3>
            </div>
            <div className="category-filters">
              {allCategories.map((category) => (
                <button
                  key={category}
                  className={`category-filter ${
                    selectedCategories.includes(category) ? "active" : ""
                  }`}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Finding NGOs near you...</p>
          </div>
        ) : filteredNgos.length === 0 ? (
          <div className="no-results">
            <h3>No NGOs Found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="ngo-grid">
            {filteredNgos.map((ngo) => (
              <div className="ngo-card" key={ngo.id}>
                <div className="ngo-card-header">
                  <div className="ngo-logo">
                    {ngo.logo ? (
                      <img src={ngo.logo} alt={`${ngo.name} logo`} />
                    ) : (
                      <div className="ngo-logo-placeholder">
                        {ngo.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="ngo-title-section">
                    <h3 className="ngo-name">{ngo.name}</h3>
                    <div className="ngo-location">
                      <FaMapMarkerAlt />
                      <span>{ngo.location}</span>
                      <span className="ngo-distance">
                        {ngo.distance} km away
                      </span>
                    </div>
                  </div>
                </div>

                <div className="ngo-categories">
                  {ngo.category.map((cat) => (
                    <span className="ngo-category" key={cat}>
                      {cat}
                    </span>
                  ))}
                </div>

                <p className="ngo-description">{ngo.description}</p>

                <div className="ngo-impact">
                  <strong>Impact:</strong> {ngo.impact}
                </div>

                <div className="donation-progress">
                  <div className="progress-label">
                    <span>
                      Donation Goal: {formatCurrency(ngo.donationGoal)}
                    </span>
                    <span>Raised: {formatCurrency(ngo.raisedAmount)}</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${calculateProgress(
                          ngo.raisedAmount,
                          ngo.donationGoal
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="ngo-contact">
                  <div className="contact-item">
                    <FaPhone /> <a href={`tel:${ngo.phone}`}>{ngo.phone}</a>
                  </div>
                  <div className="contact-item">
                    <FaGlobe />{" "}
                    <a
                      href={ngo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Website
                    </a>
                  </div>
                </div>

                <button
                  className="donate-button"
                  onClick={() => handleDonate(ngo)}
                >
                  <FaHandHoldingUsd /> Donate Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Donation Modal */}
      {showDonationModal && selectedNGO && (
        <div
          className="modal-overlay"
          onClick={() => setShowDonationModal(false)}
        >
          <div className="donation-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Donate to {selectedNGO.name}</h2>
            <form onSubmit={submitDonation}>
              <div className="donation-amount-options">
                <button
                  type="button"
                  className={donationAmount === "500" ? "active" : ""}
                  onClick={() => setDonationAmount("500")}
                >
                  ₹500
                </button>
                <button
                  type="button"
                  className={donationAmount === "1000" ? "active" : ""}
                  onClick={() => setDonationAmount("1000")}
                >
                  ₹1,000
                </button>
                <button
                  type="button"
                  className={donationAmount === "2000" ? "active" : ""}
                  onClick={() => setDonationAmount("2000")}
                >
                  ₹2,000
                </button>
                <button
                  type="button"
                  className={donationAmount === "5000" ? "active" : ""}
                  onClick={() => setDonationAmount("5000")}
                >
                  ₹5,000
                </button>
              </div>

              <div className="custom-amount">
                <label htmlFor="customAmount">Custom Amount (₹)</label>
                <input
                  id="customAmount"
                  type="number"
                  placeholder="Enter amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  required
                />
              </div>

              <div className="donation-projects">
                <label>Your donation will support:</label>
                <ul>
                  {selectedNGO.projects.map((project, index) => (
                    <li key={index}>{project}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowDonationModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="confirm-button"
                  disabled={
                    !donationAmount || isNaN(parseFloat(donationAmount))
                  }
                >
                  Confirm Donation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Information Modal */}
      {showInfoModal && (
        <div className="modal-overlay" onClick={() => setShowInfoModal(false)}>
          <div className="info-modal" onClick={(e) => e.stopPropagation()}>
            <h2>How Your Donation Helps</h2>

            <div className="info-section">
              <h3>Donation Process</h3>
              <p>
                100% of your donation goes directly to the NGO you choose. Sahej
                does not charge any platform fee.
              </p>

              <h3>Impact of Your Donation</h3>
              <ul className="impact-list">
                <li>
                  <strong>₹500</strong> can provide emergency food supplies for
                  a family for 3 days
                </li>
                <li>
                  <strong>₹1,000</strong> can supply clean drinking water for 10
                  families for a week
                </li>
                <li>
                  <strong>₹2,000</strong> can provide emergency medical supplies
                  for 15 affected individuals
                </li>
                <li>
                  <strong>₹5,000</strong> can help rebuild shelters for
                  disaster-affected families
                </li>
              </ul>

              <h3>Transparency</h3>
              <p>
                All NGOs listed on our platform are verified and regularly
                audited. You will receive updates on how your donation is being
                utilized.
              </p>

              <h3>Tax Benefits</h3>
              <p>
                Donations to registered NGOs are eligible for tax deduction
                under Section 80G of the Income Tax Act. You will receive a
                donation receipt by email.
              </p>
            </div>

            <button
              className="close-button"
              onClick={() => setShowInfoModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="donation-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Sahej Donations</h3>
            <p>
              We connect donors with verified NGOs working in disaster
              management and relief. 100% of your donation goes to the NGO you
              choose.
            </p>
          </div>

          <div className="footer-section">
            <h3>Need Assistance?</h3>
            <p>
              Contact our support team at{" "}
              <a href="mailto:support@sahej.org">support@sahej.org</a> or call{" "}
              <a href="tel:+911234567890">+91 123 456 7890</a>
            </p>
          </div>

          <div className="footer-section">
            <h3>Are you an NGO?</h3>
            <p>
              If you're an NGO working in disaster relief and management,{" "}
              <a href="#">register here</a> to get listed on our platform.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2023 Sahej Disaster Support Network. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
