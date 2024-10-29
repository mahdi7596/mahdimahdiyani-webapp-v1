import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";

import userRoutes from "./routes/user.route.js";

dotenv.config();
// require("dotenv").config();
const app = express();

mongoose
  //   .connect("mongodb://localhost/mahdimahdiyani-webapp")
  // !have to replace this
  .connect(process.env.MONGO)
  .then(() => console.log("connected to MongoDB..."))
  .catch((err) => console.log("could not connect to Mongo Db..", err));

app.listen(3001, () => {
  console.log("server is running on prot 3001");
});

app.use("/api/user", userRoutes);
