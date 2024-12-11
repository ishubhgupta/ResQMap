import { Schema, model } from "mongoose";

// Regular expression to match Indian phone numbers
const phoneRegex = /^(\+91|91)?[6789]\d{9}$/;

const missingReportSchema = new Schema(
  {
    placeOfDisappearance: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Gender must be Male, Female, or Other",
      },
      required: true,
    },
    disappearanceDate: {
      type: Date,
      required: true,
    },
    photoURL: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "No description provided",
    },
    phoneOfReporter: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Custom validation using regex for Indian phone numbers
          return phoneRegex.test(value);
        },
        message: "Please enter a valid Indian phone number",
      },
    },
    reportedBy: { 
      type: Schema.Types.ObjectId, 
      ref: "user", 
      required: true 
    },
  },
  { timestamps: true }
);

const MissingReport = model("missingReport", missingReportSchema);

export default MissingReport;
