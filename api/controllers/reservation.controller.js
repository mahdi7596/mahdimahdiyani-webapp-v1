import { errorHandler } from "../utils/error.js";
import Reservation from "../models/reservation.model.js";

// 📌 USER: Book a Reservation
export const bookReservation = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(errorHandler(401, "ابتدا وارد حساب خود شوید"));
    }

    const { reservationTypeId, date, timeSlot } = req.body;

    if (!reservationTypeId || !date || !timeSlot) {
      return next(errorHandler(400, "همه‌ی فیلدها الزامی است"));
    }

    // Check if the time slot is already booked
    const existingReservation = await Reservation.findOne({
      reservationTypeId,
      date,
      timeSlot,
      status: { $in: ["confirmed", "pending"] },
    });
    if (existingReservation) {
      return next(errorHandler(400, "این زمان قبلاً رزرو شده است"));
    }

    // Create new reservation
    const newReservation = new Reservation({
      userId: req.user.id,
      reservationTypeId,
      date,
      timeSlot,
      status: "pending",
    });

    await newReservation.save();

    res.status(201).json({
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
    const { date } = req.query; // Get date from query params
    let query = {};
    if (date) {
      query.date = date; // Filter reservations by date
    }
    const reservations = await Reservation.find(query).populate(
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

// When user wants to see available time slots → Disable reserved ones
export const getReservationsByDate = async (req, res, next) => {
  try {
    const { date, reservationTypeId } = req.query;

    if ((!date, !reservationTypeId)) {
      return next(errorHandler(400, "تاریخ و نوع رزرو الزامی است"));
    }

    const reservations = await Reservation.find({
      date,
      reservationTypeId,
      status: { $in: ["confirmed", "pending"] },
    }).select("timeSlot status createdAt");

    res.status(200).json({
      reservations,
    });
  } catch (error) {}
};
