import Reservation from "../models/reservation.model.js";
import { errorHandler } from "../utils/error.js";

/**
 * 📌 Get available time slots for a specific date
 * Example: GET /api/reservations/available?date=2025-03-26
 */
export const getAvailableTimes = async (req, res, next) => {
  try {
    const { date } = req.query;
    if (!date) return next(errorHandler(400, "تاریخ الزامی است"));

    // Define available slots (Modify as needed)
    const allTimeSlots = ["13:00-15:00", "15:00-18:00", "18:00-20:00"];

    // Get booked slots from DB
    const bookedReservations = await Reservation.find({ date }).select(
      "timeSlot"
    );
    const bookedSlots = bookedReservations.map((r) => r.timeSlot);

    // Filter available slots
    const availableSlots = allTimeSlots.filter(
      (slot) => !bookedSlots.includes(slot)
    );

    res.status(200).json({ date, availableSlots, bookedSlots });
  } catch (error) {
    next(error);
  }
};

/**
 * 📌 Book a time slot
 * Example: POST /api/reservations/book
 * Body: { date: "2025-03-26", timeSlot: "13:00-15:00", price: 500000 }
 */
export const bookReservation = async (req, res, next) => {
  try {
    // Ensure user is authenticated
    if (!req.user) {
      return next(errorHandler(401, "ابتدا وارد حساب خود شوید"));
    }

    const { date, timeSlot, price } = req.body;

    if (!date || !timeSlot || !price) {
      return next(errorHandler(400, "همه‌ی فیلدها الزامی است"));
    }

    // Check if the time slot is already booked
    const existingReservation = await Reservation.findOne({ date, timeSlot });
    if (existingReservation) {
      return next(errorHandler(400, "این زمان قبلاً رزرو شده است"));
    }

    // Create a new reservation
    const newReservation = new Reservation({
      userId: req.user.id, // Assuming user is authenticated
      date,
      timeSlot,
      price,
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

/**
 * 📌 Get all reservations of logged-in user
 * Example: GET /api/reservations/my-reservations
 */
export const getUserReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ userId: req.user.id }).sort({
      date: 1,
    });
    res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
};

/**
 * 📌 Admin: Get all reservations (for managing bookings)
 * Example: GET /api/reservations/all (Only Admins)
 */
export const getAllReservations = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "شما دسترسی لازم را ندارید"));
  }

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
