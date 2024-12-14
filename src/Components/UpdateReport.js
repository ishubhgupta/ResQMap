import React, { useState, useEffect } from "react";
import { TextField, Button, CircularProgress, Typography, Alert } from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

const UpdateReport = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatedReport, setUpdatedReport] = useState({
    name: "",
    gender: "",
    age: "",
    placeOfDisappearance: "",
    description: "",
  });

  const { id } = useParams(); // Get the report ID from the URL
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    // Fetch the existing report data
    const fetchReport = async () => {
      try {
        setLoading(true);
        console.log("Fetching report with ID:", id);
        const response = await axios.get(`http://localhost:9000/api/missing-reports/${id}`, {
            withCredentials: true,
          });
        setUpdatedReport(response.data.report); // Pre-fill the form with the existing data
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch report details.");
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  const handleInputChange = (e) => {
    setUpdatedReport({
      ...updatedReport,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`http://localhost:9000/api/missing-reports/${id}`, updatedReport, {
        withCredentials: true,
      });
      navigate("/view-reports");
    } catch (err) {
      setError("Failed to update the report.");
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Update Missing Report
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {loading ? (
        <CircularProgress />
      ) : (
        <form>
          <TextField
            name="name"
            label="Name"
            value={updatedReport.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="gender"
            label="Gender"
            value={updatedReport.gender}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="age"
            label="Age"
            value={updatedReport.age}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="placeOfDisappearance"
            label="Place of Disappearance"
            value={updatedReport.placeOfDisappearance}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            value={updatedReport.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update Report
          </Button>
        </form>
      )}
    </div>
  );
};

export default UpdateReport;
