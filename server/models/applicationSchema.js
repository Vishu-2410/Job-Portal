import mongoose from "mongoose";
import validator from "validator";


//Define mongoose schema for job applications
const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  coverLetter: {
    type: String,
    required: [true, "Please provide a cover letter!"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  address: {
    type: String,
    required: [true, "Please enter your Address!"],
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //Reference to the User model for the applicant
      required: true,
    },
    role: {
      type: String,
      enum: ["Job Seeker"],  //Only "Job Seeker " role allowed tor applications
      required: true,
    },
  },
  employerID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",   //Reference to the user model for the employer
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer"],  //Only "Employer" role allowed for employers
      required: true,
    },
  },
});


// Create a mongoose model based on the schema
export const Application = mongoose.model("Application", applicationSchema);