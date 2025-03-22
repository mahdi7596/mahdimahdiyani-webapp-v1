import { errorHandler } from "../utils/error.js";
import Reservation from "../models/reservation.model.js";

// 📌 USER: Book a Reservation
export const bookReservation = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(errorHandler(401, "ابتدا وارد حساب خود شوید"));
    }

    const { title, description, includedServices, price, date, timeSlot } =
      req.body;

    if (
      !title ||
      !description ||
      !includedServices ||
      !price ||
      !date ||
      !timeSlot
    ) {
      return next(errorHandler(400, "همه‌ی فیلدها الزامی است"));
    }

    // Check if the time slot is already booked
    const existingReservation = await Reservation.findOne({ date, timeSlot });
    if (existingReservation) {
      return next(errorHandler(400, "این زمان قبلاً رزرو شده است"));
    }

    // Create new reservation
    const newReservation = new Reservation({
      title,
      description,
      includedServices,
      price,
      date,
      timeSlot,
      userId: req.user.id,
      status: "pending",
    });

    await newReservation.save();
    res
      .status(201)
      .json({
        message: "رزرو با موفقیت انجام شد",
        reservation: newReservation,
      });
  } catch (error) {
    next(error);
  }
};

// 📌 GET ALL Reservations (For Users)
export const getReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find().populate(
      "userId",
      "username email"
    );
    res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
};

// 📌 GET User's Own Reservations
export const getUserReservations = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(errorHandler(401, "ابتدا وارد حساب خود شوید"));
    }

    const userReservations = await Reservation.find({ userId: req.user.id });
    res.status(200).json(userReservations);
  } catch (error) {
    next(error);
  }
};

// 📌 ADMIN: Create a New Reservation Type (Optional)
export const adminCreateReservation = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, "دسترسی غیرمجاز"));
    }

    const { title, description, includedServices, price } = req.body;

    if (!title || !description || !includedServices || !price) {
      return next(errorHandler(400, "همه‌ی فیلدها الزامی است"));
    }

    const newReservation = new Reservation({
      title,
      description,
      includedServices,
      price,
      date: null, // Admin does not set the date, users select it
      timeSlot: null,
      userId: null,
      status: "available",
    });

    await newReservation.save();
    res
      .status(201)
      .json({ message: "نوع جدید رزرو اضافه شد", reservation: newReservation });
  } catch (error) {
    next(error);
  }
};
