import express from "express";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
// import postRoutes from "./routes/post.route.js";

import config from "./config/config.js";

import connectToDatabase from "./config/database.js";

// express config
const app = express();
app.use(express.json());

// Connect to the database
connectToDatabase();

app.listen(config.port, () => {
  console.log("server is running on port " + config.port);
});

// routes config
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
// app.use("/api/post", postRoutes);
