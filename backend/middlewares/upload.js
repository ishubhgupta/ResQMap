import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/missingPersonImages"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`), // Remove spaces from filenames
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log("File being uploaded:", file);
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed (jpeg, jpg, png)"));
    }
  },
});
