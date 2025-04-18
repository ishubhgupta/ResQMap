  import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Alert,
  Container,
  Paper,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  Grid,
} from "@mui/material";
import { Home as HomeIcon, Save as SaveIcon } from "@mui/icons-material";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./UpdateReport.css";

const UpdateReport = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [updatedReport, setUpdatedReport] = useState({
    name: "",
    gender: "",
    age: "",
    placeOfDisappearance: "",
    disappearanceDate: "",
    phoneOfReporter: "",
    description: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        console.log("Fetching report with ID:", id);
        const response = await axios.get(
          `http://localhost:9000/api/missing-reports/${id}`,
          {
            withCredentials: true,
          }
        );
        setUpdatedReport(response.data.report);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.patch(
        `http://localhost:9000/api/missing-reports/${id}`,
        updatedReport,
        {
          withCredentials: true,
        }
      );
      setSuccess(true);
      setLoading(false);

      setTimeout(() => {
        navigate("/view-report");
      }, 1500);
    } catch (err) {
      setError("Failed to update the report.");
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" className="update-report-container">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
          px: 2,
          py: 1.5,
          backgroundColor: "#f0f4f8",
          borderRadius: "8px",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button startIcon={<HomeIcon />} className="home-button">
            Home
          </Button>
        </Link>

        <Typography
          variant="h4"
          className="page-title"
          sx={{ margin: "0 auto" }}
        >
          Update Missing Person Report
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Report updated successfully! Redirecting...
        </Alert>
      )}

      {loading && !success ? (
        <Box className="loading-container">
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" className="loading-text">
            Loading report data...
          </Typography>
        </Box>
      ) : !success ? (
        <Paper elevation={3} className="update-form-paper">
          <Typography variant="h6" className="section-title">
            Edit Report Details
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <form onSubmit={handleUpdate}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Name of Missing Person"
                  value={updatedReport.name || ""}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  className="form-field"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className="form-field"
                >
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={updatedReport.gender || ""}
                    onChange={handleInputChange}
                    label="Gender"
                    required
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="age"
                  label="Age"
                  type="number"
                  value={updatedReport.age || ""}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  className="form-field"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="placeOfDisappearance"
                  label="Place of Disappearance"
                  value={updatedReport.placeOfDisappearance || ""}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  className="form-field"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="disappearanceDate"
                  label="Date of Disappearance"
                  type="date"
                  value={
                    updatedReport.disappearanceDate
                      ? updatedReport.disappearanceDate.split("T")[0]
                      : ""
                  }
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  className="form-field"
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="phoneOfReporter"
                  label="Contact Phone Number"
                  value={updatedReport.phoneOfReporter || ""}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  className="form-field"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  value={updatedReport.description || ""}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  className="form-field"
                  multiline
                  rows={4}
                  placeholder="Include appearance, circumstances, and any other relevant details"
                />
              </Grid>
            </Grid>

            <Box className="form-actions">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/view-report")}
                className="cancel-button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                className="update-button"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Report"}
              </Button>
            </Box>
          </form>
        </Paper>
      ) : null}
    </Container>
  );
};

export default UpdateReport;
