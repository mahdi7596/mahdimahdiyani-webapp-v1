import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../config/config.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "پر کردن تمامی فیلدها الزامی است"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("signup successfull");
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "پر کردن تمامی فیلدها الزامی است"));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      next(errorHandler(404, "کاربری یافت نشد"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "invalid password"));
    }

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      config.jwtSecret
    );

    // i wrote this code inorder not to send the hashed password to front, because its more safe
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
