// This file will be responsible for initializing the Express app, setting up middleware, and configuring the routes
import express from "express";

import { errorHandler } from "../middleware/errorHandler.js";

import authRoutes from "../routes/auth.route.js";
import userRoutes from "../routes/user.route.js";
// import postRoutes from "../routes/post.route.js";

const app = express();

// Middleware
app.use(express.json());

// Route configuration
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
// app.use("/api/post", postRoutes);

// handle error using errorHandler middleware
app.use(errorHandler);

export default app;
