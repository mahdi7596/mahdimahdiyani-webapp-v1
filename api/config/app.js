// This file will be responsible for initializing the Express app, setting up middleware, and configuring the routes
import express from "express";
import cookieParser from "cookie-parser";

import { errorHandler } from "../middleware/errorHandler.js";

import authRoutes from "../routes/auth.route.js";
import userRoutes from "../routes/user.route.js";
import postRoutes from "../routes/post.route.js";
import postCategoryRoutes from "../routes/post-category.route.js";
import reservationRoutes from "../routes/reservation.routes.js";
import reservationTypeRoutes from "../routes/reservationType.routes.js";

import path from "path";
import { fileURLToPath } from "url";

import "../utils/reservationCleaner.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());

// این رو نوشتم که بتونم به کوکی ها دسترسی داشته باشم هرجایی که خواستم
app.use(cookieParser());

// Route configuration
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/postcategory", postCategoryRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/reservationtypes", reservationTypeRoutes);

// Serve the "images" folder statically
// app.use("/images", express.static(path.join(__dirname, "../../images")));

// app.use("/images", express.static(path.join(__dirname, "api/images")));

app.use("/images", express.static(path.join(__dirname, "../images")));

// handle error using errorHandler middleware
app.use(errorHandler);

export default app;
