import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";
import "./styles/UpdateProfile.css";

const UpdateProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:9000/api/user/profile",
          {
            withCredentials: true,
          }
        );
        setUserData({
          ...response.data,
          phone: response.data.phone || "",
          location: response.data.location || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to load profile information. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await axios.put("http://localhost:9000/api/user/profile", userData, {
        withCredentials: true,
      });
      setSuccess(true);
      setSubmitting(false);

      // Redirect after a short delay
      setTimeout(() => {
        navigate("/user-profile");
      }, 2000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Error updating profile. Please try again."
      );
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="update-profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="update-profile-container">
      <div className="update-profile-header">
        <Link to="/user-profile" className="back-button">
          <FaArrowLeft /> Back to Profile
        </Link>
        <h1>Update Your Profile</h1>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="success-message">
          <p>Profile updated successfully! Redirecting to your profile...</p>
        </div>
      )}

      <div className="update-profile-form-container">
        <form onSubmit={handleSubmit} className="update-profile-form">
          <div className="form-group">
            <label htmlFor="name">
              <FaUser className="input-icon" /> Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className="input-icon" /> Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              <FaPhone className="input-icon" /> Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">
              <FaMapMarkerAlt className="input-icon" /> Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={userData.location}
              onChange={handleChange}
              placeholder="Enter your city or location"
            />
          </div>

          <div className="form-actions">
            <Link to="/profile" className="cancel-button">
              Cancel
            </Link>
            <button type="submit" className="save-button" disabled={submitting}>
              {submitting ? (
                "Updating..."
              ) : (
                <>
                  <FaSave /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
