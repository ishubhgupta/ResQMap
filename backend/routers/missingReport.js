import express from "express";
import { createReport, getReports, getReportsByUser, searchReports, deleteReport, updateReport, getReportById} from "../controllers/missingReport.js";
import { verifyToken } from "../middlewares/authentication.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post("/create", verifyToken, upload.single("photo"), createReport);
router.get("/", getReports);
router.get("/user", verifyToken, getReportsByUser);
router.get("/search", searchReports);
router.patch("/:id", verifyToken, upload.single("photo"), updateReport);
router.get("/:id", verifyToken, getReportById);
router.delete("/:id", verifyToken, deleteReport);

export default router;
