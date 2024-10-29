import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";

import userRoutes from "./routes/user.route.js";
// import authRoutes from "./routes/auth.route.js";
// import postRoutes from "./routes/post.route.js";

dotenv.config();
// require("dotenv").config();
const app = express();
app.use(express.json());

mongoose
  //   .connect("mongodb://localhost/mahdimahdiyani-webapp")
  // !have to replace this
  .connect(process.env.MONGO)
  .then(() => console.log("connected to MongoDB..."))
  .catch((err) => console.log("could not connect to Mongo Db..", err));

app.listen(3000, () => {
  console.log("server is running on prot 3000");
});

app.use("/api/user", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/post", postRoutes);
