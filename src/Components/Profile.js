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
} from "react-icons/fa";
import "./styles/Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

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
              <div className="avatar-placeholder">
                <FaUser />
              </div>
            )}
          </div>
          <h2>{userData.name}</h2>
          <p className="member-since">
            Member since {formatDate(userData.createdAt || Date.now())}
          </p>

          <div className="tab-navigation">
            <button
              className={activeTab === "overview" ? "active" : ""}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={activeTab === "reports" ? "active" : ""}
              onClick={() => setActiveTab("reports")}
            >
              My Reports
            </button>
          </div>

          <Link to="/user-update-profile" className="edit-profile-button">
            <FaEdit /> Edit Profile
          </Link>
        </div>

        <div className="profile-main">
          {activeTab === "overview" ? (
            <>
              <div className="profile-stats">
                <div className="stat-card">
                  <div className="stat-number">{stats.total}</div>
                  <div className="stat-label">Total Reports</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{stats.active}</div>
                  <div className="stat-label">Active Cases</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{stats.resolved}</div>
                  <div className="stat-label">Resolved Cases</div>
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

              <div className="profile-activity-section">
                <h3>Recent Activity</h3>
                {reports.length > 0 ? (
                  <div className="activity-timeline">
                    {reports.slice(0, 3).map((report, index) => (
                      <div className="activity-item" key={index}>
                        <div className="activity-icon">
                          <FaFileAlt />
                        </div>
                        <div className="activity-content">
                          <div className="activity-title">
                            Reported a missing person: {report.name}
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
                  <p className="no-activity">No recent activity to display</p>
                )}
              </div>
            </>
          ) : (
            <div className="reports-section">
              <h3>Missing Person Reports Filed by You</h3>

              {reports.length > 0 ? (
                <div className="reports-list">
                  {reports.map((report, index) => (
                    <div className="report-card" key={index}>
                      <div className="report-header">
                        <h4>{report.name}</h4>
                        <span className="report-status">
                          {report.status === "resolved" ? "Resolved" : "Active"}
                        </span>
                      </div>

                      <div className="report-details">
                        {report.photoURL && (
                          <div className="report-image">
                            <img
                              src={`http://localhost:9000/${report.photoURL}`}
                              alt={report.name}
                            />
                          </div>
                        )}

                        <div className="report-info">
                          <p>
                            <strong>Age:</strong> {report.age}
                          </p>
                          <p>
                            <strong>Gender:</strong> {report.gender}
                          </p>
                          <p>
                            <strong>Place of Disappearance:</strong>{" "}
                            {report.placeOfDisappearance}
                          </p>
                          <p>
                            <strong>Date of Disappearance:</strong>{" "}
                            {formatDate(report.disappearanceDate)}
                          </p>
                          <p>
                            <strong>Report Filed:</strong>{" "}
                            {formatDate(report.createdAt)}
                          </p>

                          <div className="report-description">
                            <p>
                              <strong>Description:</strong>
                            </p>
                            <p>
                              {report.description || "No description provided"}
                            </p>
                          </div>

                          <div className="report-actions">
                            <Link
                              to={`/update-report/${report._id}`}
                              className="update-report-btn"
                            >
                              Update Report
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-reports">
                  <p>You haven't filed any missing person reports yet.</p>
                  <Link to="/create-report" className="create-report-btn">
                    Create New Report
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
