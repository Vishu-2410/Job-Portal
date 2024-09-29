export const sendToken = (user, statusCode, res, message) => {
  // Generate JWT token for the user
  const token = user.geJWTToken();

  // Cookie options for token storage in the client's browser

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000  // Set cookie expiration time
    ),
    httpOnly: true,  // Cookie accessible only via HTTP(S), not JavaScript
  }

  // Set HTTP status, attach token as a cookie in the response, and send JSON response
  res.status(statusCode)
    .cookie("token", token, options) // Attach token as a cookie named "token"
    .json({
      success: true,
      user,   // Send user object in the response
      message,   // Send success message in the response

      token, // Send token in the response for client-side storage
    });
};