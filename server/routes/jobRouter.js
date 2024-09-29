import express from "express";
import { deleteJob, getALLJobs, getmyJobs, getSingleJob, postJob, updateJob } from "../controllers/jobController.js";
import { isAuthorized } from '../middlewares/auth.js'

// Create an instance of Express Router
const router = express.Router();

// Routes with corresponding controller functions and authorization middleware

router.get("/getall", getALLJobs);// GET route to retrieve all jobs
router.post("/post", isAuthorized, postJob);// POST route to post a new job, requires authorization

// to get job by jobseeker
router.get("/getmyjobs", isAuthorized, getmyJobs);// GET route to retrieve jobs posted by the current user (job seeker)
router.put("/update/:id", isAuthorized, updateJob);// PUT route to update a job by ID, requires authorization
router.delete("/delete/:id", isAuthorized, deleteJob); // DELETE route to delete a job by ID, requires authorization
router.get("/:id", isAuthorized, getSingleJob); // GET route to retrieve a job by ID, requires authorization





export default router;