//Custom error handler class
class ErrorHandler extends Error {

  constructor(message, statusCode) {
    super(message);  //call the error constructor with the provided message
    this.statusCode = statusCode;  //set the HTTP status code for the error
  }
}

//Middleware to handle errors globally
export const errorMiddleware = (err, req, res, next) => {
  //Set default error message and status code if not provided
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;

  //Handle Specific error types and customize error messages
  if (err.name === "CaseError") {
    const message = `Resource not found.Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  if (err.code === 11000) {
    const message = `Duplicate${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is Invalid,Try Again`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired. Try Again`;
    err = new ErrorHandler(message, 400);
  }
  //Send JSON response with appropriate status code and error message
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;