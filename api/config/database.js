import mongoose from "mongoose";
import config from "./config.js";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.dbUrl);
    console.log("Connected to MongoDB...");
  } catch (err) {
    console.error("Could not connect to MongoDB...", err);
    process.exit(1); //
  }
};

export default connectToDatabase;
