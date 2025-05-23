import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({ message: "api is working" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "شما دسترسی بروزرسانی این کاربر را ندارید"));
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "کلمه ی عبور باید حداقل ۶ کاراکتر باشد"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 4 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "نام کاربری باید بین ۴ تا ۲۰ کاراکتر باشد")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "نام کاربری نمیتواند شامل اسپیس باشد"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "username must be in lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "نام کاربری فقط میتواند شامل کاراکتر و عدد باشد")
      );
    }
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    // console.log("error");
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  // we are saying if user is not an admin because we want the admin to be able to delete the user
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, "شما دسترسی حذف این کاربر را ندارید"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("کاربر با موفقیت حذف شد");
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("خروج از حساب کاربری با موفقیت انجام شد");
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "شما دسترسی دیدن کاربران را ندارید"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const userWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: userWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};
