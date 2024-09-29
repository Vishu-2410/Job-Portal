import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from './routes/userRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import jobRouter from './routes/jobRouter.js';
import { dbConnection } from './database/dbConnection.js'
import { errorMiddleware } from "./middlewares/error.js";

// Load environment variables from config file
dotenv.config({ path: "./config/config.env" });
// Create an instance of Express
const app = express();

// Middleware setup
app.use(cors({
  origin: [process.env.FRONTEND_URL],    // Allow requests from frontend URL
  methods: ["GET", "POST", "DELETE", "PUT"],  // Allow specified HTTP methods

  credentials: true,   // Allow cookies to be sent to/from frontend
}));

app.use(cookieParser());  // Parse cookies in requests

app.use(express.json());// Parse JSON bodies in requests

app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies in requests 

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
})) // Handle file uploads


// Define routes for different parts of the API
app.use('/api/v1/user', userRouter); // Routes for user-related operations
app.use('/api/v1/application', applicationRouter); // Routes for job application-related operations

app.use('/api/v1/job', jobRouter); // Routes for job-related operations

// Establish database connection
dbConnection();

// error middle ware
// Error handling middleware
app.use(errorMiddleware); // Handle errors using custom error middleware

export default app;