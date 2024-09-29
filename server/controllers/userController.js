import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js'
import { User } from '../models/userSchema.js';
import { sendToken } from '../util/jwtToken.js'


//User registration
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;

  //Validation checks
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full registration from!"));

  }

  //Check if email already exists
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already exists!"));

  }

  //Create new user
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,

  });
  // res.status(200).json({
  //   success: true,
  //   message: "User registered!",
  //   user,

  // });

  //Send JWT token in response
  sendToken(user, 200, res, "User Registered Successfully !");

});

// for User login 
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;

  //Validation checks
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email,password and role.", 400));

  }

  // Find user by email
  const user = await User.findOne({ email }).select("+password");

  //Check if user exists
  const isPasswordMatched = await user.comparePassword(password);
  if (!user) {
    return next(
      new ErrorHandler("Invalid Email or Password", 400)
    );

  }

  //Check if password matches
  // else
  if (!isPasswordMatched) {
    // return next(
    new ErrorHandler("Invalid Email or Password.", 400);
    // );
  }

  //Check user role
  if (user.role !== role) {
    return next(new ErrorHandler("User with this role not found !", 400));
  }
  //Send JWT token in response
  sendToken(user, 200, res, "User Logged in successflly !");


});


//User logout
export const logout = catchAsyncError(async (req, res, next) => {
  //Clear cookies containing token
  res.status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    }).json({
      success: true,
      message: "Logged Out Successfully.",
    });
});

//Get current user details
export const getUser = catchAsyncError((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

