import MissingReport from "../models/missingReport.js";
import User from "../models/user.js";  // Import the User model

export const createReport = async (req, res) => {
  try {
    const {
      placeOfDisappearance,
      name,
      age,
      gender,
      disappearanceDate,
      phoneOfReporter,
      description,
    } = req.body;

    if (!placeOfDisappearance || !name || !age || !gender || !disappearanceDate || !phoneOfReporter) {
      return res.status(400).json({ success: false, message: "All required fields must be provided" });
    }

    // Ensure a photo was uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Photo is required" });
    }

    const photoURL = `uploads/missingPersonImages/${req.file.filename}`;

    const report = new MissingReport({
      placeOfDisappearance,
      name,
      age,
      gender,
      disappearanceDate,
      phoneOfReporter,
      photoURL,
      reportedBy: req.userId,  // Assuming req.userId is correctly set
      description,
    });

    await report.save();

    res.status(201).json({ success: true, message: "Report created successfully", report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await MissingReport.find().populate("reportedBy", "name email");
    res.status(200).json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getReportsByUser = async (req, res) => {
  try {
    const reports = await MissingReport.find({ reportedBy: req.userId }).populate("reportedBy", "name email");
    res.status(200).json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchReports = async (req, res) => {
  try {
    const { name, gender, age, placeOfDisappearance } = req.query;

    // Build a dynamic query object
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" }; // Case-insensitive search
    }

    if (gender) {
      query.gender = gender; // Exact match
    }

    if (age) {
      query.age = age; // Exact match
    }

    if (placeOfDisappearance) {
      query.placeOfDisappearance = { $regex: placeOfDisappearance, $options: "i" }; // Case-insensitive search
    }

    const reports = await MissingReport.find(query).populate("reportedBy", "name email");

    if (reports.length === 0) {
      return res.status(404).json({ success: false, message: "No reports found matching the criteria" });
    }

    res.status(200).json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const report = await MissingReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    if (report.reportedBy.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "You are not authorized to delete this report" });
    }

    await report.deleteOne();
    res.status(200).json({ success: true, message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};