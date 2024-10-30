import dotenv from "dotenv";

dotenv.config();

// validation to check for essential env variables
if (!process.env.DB_URL || !process.env.PORT) {
  throw new Error("Missing essential environment variables.");
}

const config = {
  dbUrl: process.env.DB_URL,
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "default_secret",
  apiUrl: process.env.API_URL,
  apiKey: process.env.API_KEY,
};

export default config;
