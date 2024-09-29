import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//Define mongoose schema for user data
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name!"],
    minLength: [3, "Name must contain at least 3 characters!"],
    maxLength: [30, "Name cannot exceed 30 characters!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    validate: [validator.isEmail, "Please provide a valid email !"],
  },
  phone: {
    type: Number,
    required: [true, "Please provid your phone number."],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minLength: [8, "Password must conotain at least 8 characters !"],
    maxLength: [32, "password cannot exceed 32 characters !"],
    select: false,  //Password field will not be included in query results by default
  },
  role: {
    type: String,
    required: [true, "Please provide your role"],
    enum: ["Job Seeker", "Employer"],  //Role must be either "Job Seeker" or "Employer"

  },
  createdAt: {
    type: Date,
    default: Date.now,  //Default value set to current date and time
  },
});

//hasing the password  (Middleware to hash the password before saving to the databse)
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);  //Hash the password with bcrypt
});

//comparing password
//Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);  //Compare passwords using bcrypt
};

//generating a JWT token for authorization
//Method to generate a JWT token for user authorization
userSchema.methods.geJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,  //Set expiration for JWT token
  });
};

// Create a mongoose model based on the schema
export const User = mongoose.model("User", userSchema);
