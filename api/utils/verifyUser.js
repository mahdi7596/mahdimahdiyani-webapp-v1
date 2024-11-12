import jwt from "jsonwebtoken";

import config from "../config/config.js";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  // console.log("verifyToken");
  // console.log("config.jwtSecret", config.jwtSecret);
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};
