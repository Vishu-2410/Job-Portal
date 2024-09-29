
import { catchAsyncError } from "./catchAsyncError.js"
import ErrorHandler from "./error.js";
import jwt from 'jsonwebtoken';
// import jwt from "../util/jwtToken.js";
import { User } from "../models/userSchema.js";

//Middleware to check if user is authorized
export const isAuthorized = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  //Check if token exists
  if (!token) {
    return next(new ErrorHandler("User not authorized", 400));
  }

  //Verify JWT token
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  //Find user by decoded token ID
  req.user = await User.findById(decoded.id);

  //Move to the next middleware
  next();
})