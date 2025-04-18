import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFileAlt,
  FaCalendarAlt,
  FaEdit,
  FaArrowLeft,
  FaUserCircle,
  FaCheckCircle,
  FaExclamationCircle,
  FaHistory,
} from "react-icons/fa";
import "./styles/Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Default avatar options - use one of these instead of the FaUser icon
  const defaultAvatars = [
    "/images/avatars/default-avatar-1.png", // You'll need to add these images
    "/images/avatars/default-avatar-2.png", // to your public/images/avatars folder
  ];

  // Select a random avatar from the options
  const randomAvatar = "/images/default-user.png"; // Fallback to a single default image

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Fetch user profile data
        const userResponse = await axios.get(
          "http://localhost:9000/api/user/profile",
          {
            withCredentials: true,
          }
        );

        // Fetch user reports
        const reportsResponse = await axios.get(
          "http://localhost:9000/api/missing-reports/user",
          {
            withCredentials: true,
          }
        );

        setUserData(userResponse.data);
        setReports(reportsResponse.data.reports || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to load profile information. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Calculate user stats
  const calculateStats = () => {
    if (!reports || reports.length === 0)
      return { total: 0, active: 0, resolved: 0 };

    const total = reports.length;
    // Assuming we would have a status field to determine if a case is resolved
    const active = reports.filter(
      (report) => report.status !== "resolved"
    ).length;
    const resolved = reports.filter(
      (report) => report.status === "resolved"
    ).length;

    return { total, active: active || total, resolved: resolved || 0 };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-error">
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="profile-error">
        <h3>Not Logged In</h3>
        <p>Please log in to view your profile.</p>
        <Link to="/login" className="login-link">
          Go to Login
        </Link>
      </div>
    );
  }

  // Format date for better display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="profile-page-container">
      <div className="profile-header">
        <Link to="/home" className="back-link">
          <FaArrowLeft /> Back to Home
        </Link>
        <h1>My Profile</h1>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-avatar">
            {userData.profilePicture ? (
              <img src={userData.profilePicture} alt="Profile" />
            ) : (
              <img src={randomAvatar} alt="Default profile" className="default-avatar" />
            )}
          </div>
          <h2>{userData.name}</h2>
          <div className="verification-badge">
            {userData.isVerified ? (
              <span className="verified"><FaCheckCircle /> Verified Account</span>
            ) : (
              <span className="unverified"><FaExclamationCircle /> Email Verification Pending</span>
            )}
          </div>
          <p className="member-since">
            Member since {formatDate(userData.createdAt || Date.now())}
          </p>

          <div className="tab-navigation">
            <button
              className={activeTab === "overview" ? "active" : ""}
              onClick={() => setActiveTab("overview")}
            >
              <FaUserCircle /> Overview
            </button>
            <button
              className={activeTab === "reports" ? "active" : ""}
              onClick={() => setActiveTab("reports")}
            >
              <FaFileAlt /> My Reports
            </button>
            <button
              className={activeTab === "activity" ? "active" : ""}
              onClick={() => setActiveTab("activity")}
            >
              <FaHistory /> Activity Log
            </button>
          </div>

          <Link to="/user-update-profile" className="edit-profile-button">
            <FaEdit /> Edit Profile
          </Link>
        </div>

        <div className="profile-main">
          {activeTab === "overview" && (
            <>
              <div className="profile-stats">
                <div className="stat-card">
                  <div className="stat-number">{stats.total}</div>
                  <div className="stat-label">Total Reports</div>
                  <div className="stat-icon"><FaFileAlt /></div>
                </div>
                <div className="stat-card active-card">
                  <div className="stat-number">{stats.active}</div>
                  <div className="stat-label">Active Cases</div>
                  <div className="stat-icon"><FaExclamationCircle /></div>
                </div>
                <div className="stat-card resolved-card">
                  <div className="stat-number">{stats.resolved}</div>
                  <div className="stat-label">Resolved Cases</div>
                  <div className="stat-icon"><FaCheckCircle /></div>
                </div>
              </div>

              <div className="profile-details-section">
                <h3>Personal Information</h3>
                <div className="profile-details">
                  <div className="detail-item">
                    <div className="detail-icon">
                      <FaUser />
                    </div>
                    <div className="detail-content">
                      <div className="detail-label">Full Name</div>
                      <div className="detail-value">{userData.name}</div>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">
                      <FaEnvelope />
                    </div>
                    <div className="detail-content">
                      <div className="detail-label">Email</div>
                      <div className="detail-value">{userData.email}</div>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">
                      <FaPhone />
                    </div>
                    <div className="detail-content">
                      <div className="detail-label">Phone</div>
                      <div className="detail-value">
                        {userData.phone || "Not provided"}
                      </div>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="detail-content">
                      <div className="detail-label">Location</div>
                      <div className="detail-value">
                        {userData.location || "Not provided"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                  <Link to="/create-report" className="action-button">
                    <FaFileAlt />
                    <span>Create New Report</span>
                  </Link>
                  <Link to="/view-report" className="action-button">
                    <FaSearch />
                    <span>Search Reports</span>
                  </Link>
                  <Link to="/bulletins" className="action-button">
                    <FaBullhorn />
                    <span>News Bulletins</span>
                  </Link>
                </div>
              </div>
            </>
          )}

          {activeTab === "reports" && (
            <div className="reports-section">
              <h3>Missing Person Reports Filed by You</h3>

              {reports.length > 0 ? (
                <div className="reports-list">
                  {reports.map((report, index) => (
                    <div className="report-card" key={index}>
                      <div className="report-header">
                        <h4>{report.name}</h4>
                        <span className={`report-status ${report.status === "resolved" ? "status-resolved" : "status-active"}`}>
                          {report.status === "resolved" ? (
                            <><FaCheckCircle /> Resolved</>
                          ) : (
                            <><FaExclamationCircle /> Active</>
                          )}
                        </span>
                      </div>

                      <div className="report-details">
                        {report.photoURL ? (
                          <div className="report-image">
                            <img
                              src={`http://localhost:9000/${report.photoURL}`}
                              alt={report.name}
                            />
                          </div>
                        ) : (
                          <div className="report-image no-image">
                            <FaUserCircle />
                            <span>No Image</span>
                          </div>
                        )}

                        <div className="report-info">
                          <div className="report-info-grid">
                            <div className="report-info-item">
                              <span className="info-label">Age</span>
                              <span className="info-value">{report.age}</span>
                            </div>
                            <div className="report-info-item">
                              <span className="info-label">Gender</span>
                              <span className="info-value">{report.gender}</span>
                            </div>
                            <div className="report-info-item">
                              <span className="info-label">Place</span>
                              <span className="info-value">{report.placeOfDisappearance}</span>
                            </div>
                            <div className="report-info-item">
                              <span className="info-label">Disappeared On</span>
                              <span className="info-value">{formatDate(report.disappearanceDate)}</span>
                            </div>
                            <div className="report-info-item">
                              <span className="info-label">Reported On</span>
                              <span className="info-value">{formatDate(report.createdAt)}</span>
                            </div>
                          </div>

                          <div className="report-description">
                            <h5>Description</h5>
                            <p>
                              {report.description || "No description provided"}
                            </p>
                          </div>

                          <div className="report-actions">
                            <Link
                              to={`/update-report/${report._id}`}
                              className="update-report-btn"
                            >
                              <FaEdit /> Update Report
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-reports">
                  <FaFileAlt className="no-reports-icon" />
                  <h4>No Reports Found</h4>
                  <p>You haven't filed any missing person reports yet.</p>
                  <Link to="/create-report" className="create-report-btn">
                    <FaFileAlt /> Create New Report
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === "activity" && (
            <div className="profile-activity-section">
              <h3>Activity History</h3>
              {reports.length > 0 ? (
                <div className="activity-timeline">
                  {reports.map((report, index) => (
                    <div className="activity-item" key={index}>
                      <div className="activity-icon">
                        <FaFileAlt />
                      </div>
                      <div className="activity-content">
                        <div className="activity-title">
                          Reported a missing person: {report.name}
                        </div>
                        <div className="activity-description">
                          {report.description
                            ? report.description.substring(0, 120) + "..."
                            : "No description provided."}
                        </div>
                        <div className="activity-meta">
                          <span>
                            <FaMapMarkerAlt /> {report.placeOfDisappearance}
                          </span>
                          <span>
                            <FaCalendarAlt /> {formatDate(report.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-activity">
                  <FaHistory className="no-activity-icon" />
                  <h4>No Activity Found</h4>
                  <p>Your activity history will appear here once you start using the platform.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Import the missing icons
const FaSearch = ({ className }) => <i className={`fa fa-search ${className}`}></i>;
const FaBullhorn = ({ className }) => <i className={`fa fa-bullhorn ${className}`}></i>;

export default Profile;
