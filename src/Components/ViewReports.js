import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
  Paper,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  TableContainer,
  Link as MuiLink,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./ViewReports.css"; // We'll create this file for custom styles

const ViewReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchCriteria, setSearchCriteria] = useState({
    name: "",
    gender: "",
    age: "",
    placeOfDisappearance: "",
  });
  const [isMyReports, setIsMyReports] = useState(false);

  const navigate = useNavigate(); // Use useNavigate

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:9000/api/missing-reports"
      );
      setReports(response.data.reports);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch reports.");
      setLoading(false);
    }
  };

  const fetchReportsByUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:9000/api/missing-reports/user",
        {
          withCredentials: true,
        }
      );
      setReports(response.data.reports);
      setIsMyReports(true);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch reports by the user.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:9000/api/missing-reports/search",
        {
          params: searchCriteria,
        }
      );
      setReports(response.data.reports);
      setLoading(false);
    } catch (err) {
      setError("No reports found matching the criteria.");
      setLoading(false);
    }
  };

  const handleDelete = async (reportId) => {
    try {
      await axios.delete(
        `http://localhost:9000/api/missing-reports/${reportId}`,
        {
          withCredentials: true,
        }
      );
      setReports(reports.filter((report) => report._id !== reportId));
    } catch (err) {
      setError("Failed to delete the report.");
      console.error("Error deleting report:", err);
    }
  };

  const handleUpdate = (reportId) => {
    navigate(`/update-report/${reportId}`); // Use navigate instead of history.push
  };

  const handleInputChange = (e) => {
    setSearchCriteria({
      ...searchCriteria,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container maxWidth="xl" className="reports-container">
      <Paper className="page-header">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Button startIcon={<HomeIcon />} className="home-button">
            Home
          </Button>
        </Link>

        <Typography variant="h4" className="page-title">
          Missing Persons Reports
        </Typography>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} className="error-alert">
          {error}
        </Alert>
      )}

      <Paper elevation={3} className="search-panel">
        <Box className="search-header">
          <SearchIcon className="search-icon" />
          <Typography variant="h6" className="section-title">
            Search Reports
          </Typography>
        </Box>
        <Divider className="search-divider" />

        <Grid container spacing={3} className="search-form">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              name="name"
              label="Name"
              value={searchCriteria.name}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              className="search-field"
              placeholder="Enter name"
              InputProps={{
                className: "search-input",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              name="gender"
              label="Gender"
              value={searchCriteria.gender}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              className="search-field"
              placeholder="Male/Female/Other"
              InputProps={{
                className: "search-input",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              name="age"
              label="Age"
              value={searchCriteria.age}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              className="search-field"
              placeholder="Enter age"
              InputProps={{
                className: "search-input",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              name="placeOfDisappearance"
              label="Place of Disappearance"
              value={searchCriteria.placeOfDisappearance}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              className="search-field"
              placeholder="Enter location"
              InputProps={{
                className: "search-input",
              }}
            />
          </Grid>
        </Grid>

        <Box className="button-container">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            startIcon={<SearchIcon />}
            className="search-button"
          >
            Search Reports
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={fetchReportsByUser}
            startIcon={<PersonIcon />}
            className="my-reports-button"
          >
            My Reports
          </Button>
        </Box>
      </Paper>

      <Box className="results-section">
        {loading ? (
          <Box className="loading-container">
            <CircularProgress size={60} thickness={4} />
            <Typography variant="h6" className="loading-text">
              Loading reports...
            </Typography>
          </Box>
        ) : reports.length > 0 ? (
          <Paper elevation={4} className="table-container">
            <Box className="table-header-section">
              <Typography variant="h6" className="table-title">
                {isMyReports ? "My Reported Cases" : "Missing Persons Database"}
              </Typography>
              <Chip
                label={`${reports.length} ${
                  reports.length === 1 ? "Report" : "Reports"
                } Found`}
                className="results-chip"
              />
            </Box>
            <TableContainer className="custom-table-container">
              <Table>
                <TableHead>
                  <TableRow className="table-header-row">
                    <TableCell className="table-header">Name</TableCell>
                    <TableCell className="table-header">Age</TableCell>
                    <TableCell className="table-header">Gender</TableCell>
                    <TableCell className="table-header">
                      Place of Disappearance
                    </TableCell>
                    <TableCell className="table-header">
                      Disappearance Date
                    </TableCell>
                    <TableCell className="table-header">Reported By</TableCell>
                    <TableCell className="table-header">Photo</TableCell>
                    <TableCell className="table-header">Description</TableCell>
                    {isMyReports && (
                      <TableCell className="table-header actions-header">
                        Actions
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report._id} className="table-row">
                      <TableCell className="name-cell">{report.name}</TableCell>
                      <TableCell className="age-cell">{report.age}</TableCell>
                      <TableCell className="gender-cell">
                        <Chip
                          label={report.gender}
                          color={
                            report.gender === "Male"
                              ? "primary"
                              : report.gender === "Female"
                              ? "secondary"
                              : "default"
                          }
                          size="small"
                          className={`gender-chip gender-${report.gender.toLowerCase()}`}
                        />
                      </TableCell>
                      <TableCell className="place-cell">
                        {report.placeOfDisappearance}
                      </TableCell>
                      <TableCell className="date-cell">
                        {new Date(
                          report.disappearanceDate
                        ).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="reporter-cell">
                        {report.reportedBy?.name || "Anonymous"}
                      </TableCell>
                      <TableCell className="photo-cell">
                        {report.photoURL ? (
                          <div className="photo-container">
                            <img
                              src={`http://localhost:9000/${report.photoURL}`}
                              alt="Missing person"
                              className="person-photo"
                            />
                          </div>
                        ) : (
                          <Typography variant="body2" color="textSecondary">
                            No Photo
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell className="description-cell">
                        <div className="description-content">
                          {report.description || "No description available"}
                        </div>
                      </TableCell>
                      {isMyReports && (
                        <TableCell className="actions-cell">
                          <Box className="action-buttons">
                            <IconButton
                              color="primary"
                              onClick={() => handleUpdate(report._id)}
                              className="edit-button"
                              size="small"
                              title="Edit Report"
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(report._id)}
                              className="delete-button"
                              size="small"
                              title="Delete Report"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ) : (
          <Card className="no-results">
            <CardContent>
              <Typography variant="h6" align="center" color="textSecondary">
                No reports found matching your criteria.
              </Typography>
              <Typography
                variant="body2"
                align="center"
                color="textSecondary"
                sx={{ mt: 1 }}
              >
                Try adjusting your search parameters or create a new report.
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  component={Link}
                  to="/create-report"
                  variant="contained"
                  color="primary"
                >
                  Create New Report
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
};

export default ViewReports;
