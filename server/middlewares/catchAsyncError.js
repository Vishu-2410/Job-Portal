//Middleware to catch asynchronous errors in route handlers
export const catchAsyncError = (thefunction) => {

  return (req, res, next) => {
    //Executes the function and catches any asynchronous errors
    Promise.resolve(thefunction(req, res, next)).catch(next);
  }
}