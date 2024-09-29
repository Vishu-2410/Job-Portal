import mongoose from "mongoose";


//Function to establish database connection
export const dbConnection = () => {
  mongoose.connect(process.env.MONGO_URL, {
    dbName: "MERN_STACK_JOB_SEEKING_WEB", //Database name

  }).then(() => {
    console.log('Connected to database'); //Success message upon connection
  }).catch((err) => {
    console.log(`Some error occured while connecting to database.${err}`);  //Error message if connection fails
  })

}