import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// This is needed because you're using ESM (import/export)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load correct .env file based on NODE_ENV
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: path.resolve(__dirname, "..", envFile) });

// Now do your checks
if (!process.env.MONGODB_URI || !process.env.PORT) {
  throw new Error("Missing essential environment variables.");
}

const config = {
  dbUrl: process.env.MONGODB_URI,
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "default_secret",
  apiUrl: process.env.API_URL,
  apiKey: process.env.API_KEY,
  frontendUrl: process.env.FRONTEND_URL,
  backendUrl: process.env.BACKEND_URL,
};

export default config;
