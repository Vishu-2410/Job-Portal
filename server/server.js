// Importing the 'app' from './app.js' file
import app from "./app.js";
// Importing cloudinary and configuring it with environment variables
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLODINARY_CLIENT_NAME, // Cloudinary client name from environment variables
  api_key: process.env.CLODINARY_CLIENT_API,       // Cloudinary API key from environment variables

  api_secret: process.env.CLODINARY_CLIENT_SECRET,  // Cloudinary API secret from environment variables

}
);
// Starting the server to listen on the specified PORT from environment variables
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`) // Logging server start message
})

