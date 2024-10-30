import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
// import postRoutes from "./routes/post.route.js";

// .env connection
dotenv.config();
const config = {
  dbUrl: process.env.DB_URL,
  port: process.env.PORT,
};

// db connection
mongoose
  .connect(config.dbUrl)
  .then(() => console.log("connected to MongoDB..."))
  .catch((err) => console.log("could not connect to Mongo Db..", err));

// express config
const app = express();
app.use(express.json());

app.listen(config.port, () => {
  console.log("server is running on port " + config.port);
});

// routes config
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
// app.use("/api/post", postRoutes);
