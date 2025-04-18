import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
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
  InputAdornment,
  Avatar,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  NearMe as LocationIcon,
  Today as CalendarIcon,
  Description as DescriptionIcon,
  PersonSearch as PersonSearchIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles/ViewReports.module.css"; // Updated to use CSS modules

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
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:9000/api/missing-reports"
      );
      setReports(response.data.reports);
      setIsMyReports(false);
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

  const handleQuickSearch = () => {
    const criteria = {};
    if (searchTerm) {
      // Split the search term by spaces to check if it could be a name or place
      const terms = searchTerm.split(" ");

      // If it's a single word, it could be a name or location
      if (terms.length === 1) {
        criteria.name = searchTerm;
        criteria.placeOfDisappearance = searchTerm;
      } else {
        // If multiple words, more likely to be a full name
        criteria.name = searchTerm;
      }

      // If it's numeric, it could be an age
      if (!isNaN(searchTerm)) {
        criteria.age = searchTerm;
      }
    }

    // Set our search criteria and then perform the search
    setSearchCriteria(criteria);
    handleSearch();
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
    navigate(`/update-report/${reportId}`);
  };

  const handleInputChange = (e) => {
    setSearchCriteria({
      ...searchCriteria,
      [e.target.name]: e.target.value,
    });
  };

  const resetSearch = () => {
    setSearchCriteria({
      name: "",
      gender: "",
      age: "",
      placeOfDisappearance: "",
    });
    setSearchTerm("");
    fetchReports();
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container maxWidth="xl" className={styles.reportsContainer}>
      <Paper className={styles.pageHeader}>
        <Link to="/home" className={styles.homeLink}>
          <HomeIcon className={styles.homeIcon} />
          <span>Back to Home</span>
        </Link>
        <Typography variant="h4" className={styles.pageTitle}>
          Missing Persons Database
        </Typography>
        <Box className={styles.spacer}></Box>{" "}
        {/* Added spacer for balanced centering */}
      </Paper>

      {error && (
        <Alert
          severity="error"
          className={styles.errorAlert}
          onClose={() => setError("")}
        >
          {error}
        </Alert>
      )}

      <Box className={styles.viewControls}>
        <ToggleButtonGroup
          value={isMyReports ? "my" : "all"}
          exclusive
          onChange={(e, newValue) => {
            if (newValue === null) return;
            if (newValue === "my") {
              fetchReportsByUser();
            } else {
              fetchReports();
            }
          }}
          aria-label="reports view"
          className={styles.reportsToggle}
        >
          <ToggleButton
            value="all"
            aria-label="all reports"
            className={styles.toggleButton}
          >
            <PersonSearchIcon className={styles.toggleIcon} />
            All Missing Reports
          </ToggleButton>
          <ToggleButton
            value="my"
            aria-label="my reports"
            className={styles.toggleButton}
          >
            <PersonIcon className={styles.toggleIcon} />
            My Reports
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Paper className={styles.searchContainer}>
        <Box className={styles.mainSearchBar}>
          <Box className={styles.searchFieldContainer}>
            <TextField
              fullWidth
              placeholder="Search by name, age, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleQuickSearch()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" className={styles.searchIcon} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSearchTerm("")} size="small">
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
                className: styles.searchInput,
              }}
            />
          </Box>
          <Box className={styles.searchActions}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleQuickSearch}
              className={styles.searchButton}
            >
              Search
            </Button>
            <Button
              variant="outlined"
              className={styles.filterButton}
              startIcon={<FilterIcon />}
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
            >
              {showAdvancedSearch ? "Hide Filters" : "Show Filters"}
            </Button>
          </Box>
        </Box>

        {showAdvancedSearch && (
          <Box className={styles.advancedSearch}>
            <Typography variant="subtitle2" className={styles.filterTitle}>
              Advanced Search Filters
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  name="name"
                  label="Name"
                  value={searchCriteria.name}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
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
                  size="small"
                  select
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value=""></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  name="age"
                  label="Age"
                  value={searchCriteria.age}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  type="number"
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
                  size="small"
                />
              </Grid>
            </Grid>
            <Box className={styles.advancedSearchActions}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={resetSearch}
                startIcon={<ClearIcon />}
              >
                Clear All
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                startIcon={<SearchIcon />}
              >
                Apply Filters
              </Button>
            </Box>
          </Box>
        )}
      </Paper>

      <Box className={styles.resultsSection}>
        {loading ? (
          <Box className={styles.loadingContainer}>
            <CircularProgress size={60} thickness={4} />
            <Typography variant="h6" className={styles.loadingText}>
              Loading reports...
            </Typography>
          </Box>
        ) : reports.length > 0 ? (
          <Paper className={styles.resultsContainer}>
            <Box className={styles.resultsHeader}>
              <Typography variant="h6" className={styles.resultsTitle}>
                {isMyReports ? "My Reported Cases" : "Missing Persons Reports"}
              </Typography>
              <Chip
                label={`${reports.length} ${
                  reports.length === 1 ? "Report" : "Reports"
                } Found`}
                color="primary"
                variant="outlined"
                className={styles.resultsChip}
              />
            </Box>

            <Box className={styles.reportCardsContainer}>
              {reports.map((report) => (
                <Card key={report._id} className={styles.reportCard}>
                  <Box className={styles.reportCardHeader}>
                    <Typography variant="h6" className={styles.reportName}>
                      {report.name}
                    </Typography>
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
                      className={`${styles.genderChip} ${
                        styles[`gender${report.gender.toLowerCase()}`]
                      }`}
                    />
                  </Box>

                  <Box className={styles.reportContent}>
                    <Box className={styles.reportPhotoSection}>
                      {report.photoURL ? (
                        <img
                          src={`http://localhost:9000/${report.photoURL}`}
                          alt={report.name}
                          className={styles.reportPhoto}
                        />
                      ) : (
                        <Avatar className={styles.reportAvatar}>
                          {report.name.charAt(0)}
                        </Avatar>
                      )}
                    </Box>

                    <Box className={styles.reportDetails}>
                      <Box className={styles.detailItem}>
                        <PersonIcon className={styles.detailIcon} />
                        <Typography variant="body2">
                          <span className={styles.detailLabel}>Age:</span>{" "}
                          {report.age} years
                        </Typography>
                      </Box>

                      <Box className={styles.detailItem}>
                        <LocationIcon className={styles.detailIcon} />
                        <Typography variant="body2">
                          <span className={styles.detailLabel}>
                            Last seen at:
                          </span>{" "}
                          {report.placeOfDisappearance}
                        </Typography>
                      </Box>

                      <Box className={styles.detailItem}>
                        <CalendarIcon className={styles.detailIcon} />
                        <Typography variant="body2">
                          <span className={styles.detailLabel}>Date:</span>{" "}
                          {formatDate(report.disappearanceDate)}
                        </Typography>
                      </Box>

                      {report.description && (
                        <Box className={styles.detailItem}>
                          <DescriptionIcon className={styles.detailIcon} />
                          <Typography
                            variant="body2"
                            className={styles.reportDescription}
                          >
                            <span className={styles.detailLabel}>
                              Description:
                            </span>{" "}
                            {report.description}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>

                  <Box className={styles.reportFooter}>
                    <Typography
                      variant="caption"
                      className={styles.reportReporter}
                    >
                      Reported by: {report.reportedBy?.name || "Anonymous"}
                    </Typography>

                    {isMyReports && (
                      <Box className={styles.reportActions}>
                        <Tooltip title="Edit Report">
                          <IconButton
                            color="primary"
                            onClick={() => handleUpdate(report._id)}
                            size="small"
                            className={styles.editButton}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Report">
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(report._id)}
                            size="small"
                            className={styles.deleteButton}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                  </Box>
                </Card>
              ))}
            </Box>
          </Paper>
        ) : (
          <Card className={styles.noResults}>
            <CardContent>
              <div className={styles.noResultsIcon}>
                <SearchIcon fontSize="large" />
              </div>
              <Typography variant="h6" className={styles.noResultsTitle}>
                No reports found
              </Typography>
              <Typography variant="body2" className={styles.noResultsText}>
                Try adjusting your search parameters or create a new report.
              </Typography>
              <Button
                component={Link}
                to="/create-report"
                variant="contained"
                color="primary"
                className={styles.createReportButton}
              >
                Create New Report
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
};

export default ViewReports;
