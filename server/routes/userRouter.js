import express from "express";
import { getUser, login, logout, register } from '../controllers/userController.js';
import { isAuthorized } from "../middlewares/auth.js";

// Create an instance of Express Router
const router = express.Router();
// Routes with corresponding controller functions and authorization middleware
router.post("/register", register); // POST route to register a new user
router.post("/login", login);// POST route to authenticate and login a user

router.get("/logout", isAuthorized, logout);// GET route to logout a user, requires authorization

router.get("/getuser", isAuthorized, getUser);// GET route to retrieve user details, requires authorization


export default router;