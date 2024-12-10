import express from "express";
import { createReport, getReports, getReportsByUser, searchReports, deleteReport } from "../controllers/missingReport.js";
import { verifyToken } from "../middlewares/authentication.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post("/create", verifyToken, upload.single("photoURL"), createReport);
router.get("/", getReports);
router.get("/user", verifyToken, getReportsByUser);
router.get("/search", searchReports);
router.delete("/:id", verifyToken, deleteReport);

export default router;
