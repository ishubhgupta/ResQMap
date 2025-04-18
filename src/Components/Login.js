import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaUserShield, FaArrowRight } from "react-icons/fa";
import api from "../api";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/login", { email, password });
      if (response.data.success) {
        // Show success animation briefly before redirecting
        setLoading(false);
        navigate("/home");
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-image-section">
          <div className="auth-overlay">
            <div className="brand-logo">
              <FaUserShield />
              <span>Sahej</span>
            </div>
            <div className="image-content">
              <h2>Welcome Back</h2>
              <p>
                Access your account to manage disaster reports and emergency
                services
              </p>
            </div>
          </div>
        </div>

        <div className="auth-form-section">
          <div className="auth-form-container">
            <div className="auth-header">
              <h1>Sign In</h1>
              <p>Please enter your credentials to continue</p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
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
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="auth-options">
                <Link to="/forgot-password" className="forgot-password-link">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className={`auth-button ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? (
                  "Signing In..."
                ) : (
                  <>
                    Sign In <FaArrowRight />
                  </>
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>Don't have an account?</p>
              <Link to="/signup" className="auth-switch-link">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
