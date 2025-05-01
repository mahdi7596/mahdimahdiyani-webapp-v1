import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from parent directory
dotenv.config({ path: resolve(__dirname, "../.env") });

// validation
if (!process.env.DB_URL || !process.env.PORT) {
  throw new Error("Missing essential environment variables.");
}

const config = {
  dbUrl: process.env.DB_URL,
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "default_secret",
  apiUrl: process.env.API_URL,
  apiKey: process.env.API_KEY,
  frontendUrl: process.env.FRONTEND_URL,
  backendUrl: process.env.BACKEND_URL,
};

export default config;
