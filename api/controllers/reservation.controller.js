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
      message: "در حال انتقال به بانک",
      reservation: newReservation,
    });
  } catch (error) {
    next(error);
  }
};

// 📌 GET Reservations (Admin gets all, user gets their own)
export const getReservations = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(errorHandler(401, "ابتدا وارد حساب خود شوید"));
    }

    const { date } = req.query;
    const query = {
      status: "confirmed", // ✅ Only confirmed
    };

    if (date) {
      query.date = date; // Optional: filter by date
    }

    if (!req.user.isAdmin) {
      query.userId = req.user.id; // ✅ Users only get their own
    }

    const reservations = await Reservation.find(query)
      .sort({ createdAt: -1 }) // 👈 Sort by newest first
      .populate("userId", "username email")
      .populate("reservationTypeId", "title price")
      .select("date timeSlot status reservationTypeId userId");

    const formatted = reservations.map((res) => ({
      id: res._id,
      date: res.date,
      time: res.timeSlot, // ✅ Use `timeSlot`
      status: res.status,
      type: res.reservationTypeId?.title || "—",
      price: res.reservationTypeId?.price || 0,
      user: req.user.isAdmin
        ? {
            username: res.userId?.username || "—",
            email: res.userId?.email || "—",
          }
        : undefined,
    }));

    res.status(200).json(formatted);
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
