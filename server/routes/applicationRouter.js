import express from "express";
import { employerGetAllApplications, jobseekerDeleteApplication, jobseekerGetAllApplications, postApplication } from "../controllers/applicationController.js";
import { isAuthorized } from "../middlewares/auth.js";


//Create an instance of Express Router
const router = express.Router();

//Routes with Corresponding controller function and authorization middleware
router.post("/post", isAuthorized, postApplication);  //Post route to post an application
router.get("/employer/getall", isAuthorized, employerGetAllApplications); //Get route to get all applications for employers
router.get("/jobseeker/getall", isAuthorized, jobseekerGetAllApplications);  //Get route to get all applications for job seekers
router.delete("/delete/:id", isAuthorized, jobseekerDeleteApplication);  //Delete route to delete a job application by ID



export default router;