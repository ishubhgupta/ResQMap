import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./CreateReport.css";

const CreateReport = () => {
  const [formData, setFormData] = useState({
    placeOfDisappearance: "",
    name: "",
    age: "",
    gender: "",
    disappearanceDate: "",
    phoneOfReporter: "",
    description: "",
  });
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (photo) {
      data.append("photo", photo); // Ensure photo is added correctly
    }

    try {
      // Send the token as part of the request (via cookies)
      const response = await axios.post(
        "http://localhost:9000/api/missing-reports/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      alert("Report created successfully!");
    } catch (error) {
      console.error(
        "Error creating report:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="create-report-container">
      <Link to="/home" className="home-link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Return to Home
      </Link>

      <h2 className="form-title">Submit Missing Person Report</h2>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="report-form"
      >
        <div className="form-section">
          <h3>Missing Person Details</h3>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              required
              placeholder="Enter full name of missing person"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                onChange={handleChange}
                required
                placeholder="Age in years"
                min="0"
                max="120"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Disappearance Information</h3>
          <div className="form-group">
            <label htmlFor="placeOfDisappearance">Place of Disappearance</label>
            <input
              type="text"
              id="placeOfDisappearance"
              name="placeOfDisappearance"
              onChange={handleChange}
              required
              placeholder="City, area, or last known location"
            />
          </div>

          <div className="form-group">
            <label htmlFor="disappearanceDate">Date of Disappearance</label>
            <input
              type="date"
              id="disappearanceDate"
              name="disappearanceDate"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Description (appearance, circumstances, etc.)
            </label>
            <textarea
              id="description"
              name="description"
              onChange={handleChange}
              rows="4"
              placeholder="Include height, weight, clothing, unique features, and circumstances of disappearance"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="photo">Photo of Missing Person</label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
              required
              className="file-input"
              accept="image/*"
            />
            <small>
              Please upload a clear, recent photo (JPEG, PNG formats preferred)
            </small>
          </div>
        </div>

        <div className="form-section">
          <h3>Reporter Information</h3>
          <div className="form-group">
            <label htmlFor="phoneOfReporter">Contact Phone Number</label>
            <input
              type="text"
              id="phoneOfReporter"
              name="phoneOfReporter"
              onChange={handleChange}
              required
              placeholder="Enter your contact number"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateReport;
