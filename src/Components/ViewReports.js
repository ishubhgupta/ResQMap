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
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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
      const response = await axios.get("http://localhost:9000/api/missing-reports");
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
      const response = await axios.get("http://localhost:9000/api/missing-reports/user", {
        withCredentials: true,
      });
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
      const response = await axios.get("http://localhost:9000/api/missing-reports/search", {
        params: searchCriteria,
      });
      setReports(response.data.reports);
      setLoading(false);
    } catch (err) {
      setError("No reports found matching the criteria.");
      setLoading(false);
    }
  };

  const handleDelete = async (reportId) => {
    try {
      await axios.delete(`http://localhost:9000/api/missing-reports/${reportId}`, {
        withCredentials: true,
      });
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
    <div>
      <Typography variant="h4" gutterBottom>
        View Missing Reports
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <div style={{ marginBottom: "20px" }}>
        <TextField
          name="name"
          label="Name"
          value={searchCriteria.name}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        <TextField
          name="gender"
          label="Gender"
          value={searchCriteria.gender}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        <TextField
          name="age"
          label="Age"
          value={searchCriteria.age}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        <TextField
          name="placeOfDisappearance"
          label="Place of Disappearance"
          value={searchCriteria.placeOfDisappearance}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="contained" color="secondary" onClick={fetchReportsByUser} style={{ marginLeft: "10px" }}>
          My Reports
        </Button>
      </div>

      {loading && <CircularProgress />}

      {!loading && reports.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Place of Disappearance</TableCell>
              <TableCell>Disappearance Date</TableCell>
              <TableCell>Reported By</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Description</TableCell>
              {isMyReports && <TableCell>Actions</TableCell>} {/* Only show Actions if it's "My Reports" */}
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report._id}>
                <TableCell>{report.name}</TableCell>
                <TableCell>{report.age}</TableCell>
                <TableCell>{report.gender}</TableCell>
                <TableCell>{report.placeOfDisappearance}</TableCell>
                <TableCell>{new Date(report.disappearanceDate).toLocaleDateString()}</TableCell>
                <TableCell>{report.reportedBy?.name || "Anonymous"}</TableCell>
                <TableCell>
                  {report.photoURL ? (
                    <img
                      src={`http://localhost:9000/${report.photoURL}`}
                      alt="Missing person"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No Photo
                    </Typography>
                  )}
                </TableCell>
                <TableCell>{report.description || "No description available"}</TableCell>
                {isMyReports && (
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleUpdate(report._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(report._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {!loading && reports.length === 0 && <Typography variant="body1">No reports found.</Typography>}
    </div>
  );
};

export default ViewReports;
