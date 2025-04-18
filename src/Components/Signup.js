import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";
import api from "../api";
import "./signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/signup", { name, email, password });
      if (response.data.success) {
        setLoading(false);
        navigate("/verify-email");
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-form-section">
          <div className="auth-form-container">
            <div className="auth-header">
              <h1>Create Account</h1>
              <p>Join Sahej to access disaster management services</p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="name">
                  <FaUser className="input-icon" />
                  <span>Full Name</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope className="input-icon" />
                  <span>Email Address</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="password-container">
                <div className="form-group">
                  <label htmlFor="password">
                    <FaLock className="input-icon" />
                    <span>Password</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                    minLength="8"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    <FaShieldAlt className="input-icon" />
                    <span>Confirm</span>
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`auth-button ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? (
                  "Creating Account..."
                ) : (
                  <>
                    Create Account <FaArrowRight />
                  </>
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>Already have an account? 
              <Link to="/login" className="auth-switch-link">
                 Sign In
              </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="auth-image-section signup-image">
          <div className="auth-overlay">
            <div className="brand-logo">
              <FaShieldAlt />
              <span>Sahej</span>
            </div>
            <div className="image-content">
              <h2>Join Our Community</h2>
              <p>
                Create an account to access all features and help manage
                disaster response
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
