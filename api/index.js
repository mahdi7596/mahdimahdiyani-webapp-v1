import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// require("dotenv").config();
const express = require("express");
const app = express();

mongoose
  //   .connect("mongodb://localhost/mahdimahdiyani-webapp")
  // !have to replace this
  .connect(process.env.MONGO)
  .then(() => console.log("connected to MongoDB..."))
  .catch((err) => console.log("could not connect to Mongo Db..", err));

app.listen(3000, () => {
  console.log("server is running on prot 3001");
});
