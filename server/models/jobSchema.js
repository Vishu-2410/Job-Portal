import mongoose from "mongoose";

//Define mongoose schema for job postings
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide job title"],
    minLength: [3, "Job title must contain at least 3 characters!"],
    maxLength: [50, "Job title connot exceed 50 characters!"]
  },
  description: {
    type: String,
    required: [true, "Please provied job description"],
    minLength: [3, "Job Description must contain at least 50 characters!"],
    maxLength: [350, "Job Description connot exceed 350 characters!"]

  },
  category: {
    type: String,
    required: [true, "Job category is required!"],

  },
  country: {
    type: String,
    required: [true, "Please provide a country name!"],
  },
  city: {
    type: String,
    required: [true, "Please provied a city name."],
  },
  location: {
    type: String,
    required: [true, "Please provide location."],
    minLength: [20, "Job Location must contian at least 20 characters!"],

  },
  fixedSalary: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits"],
    maxLength: [9, "Salary cannot exceed 9 digits"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits"],
    maxLength: [9, "Salary cannot exceed 9 digits"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits"],
    maxLength: [9, "Salary cannot exceed 9 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User", //Reference to the User model for the user who posted the job
    required: true,
  },
});

// Create a mongoose model based on the schema
export const Job = mongoose.model("Job", jobSchema);
