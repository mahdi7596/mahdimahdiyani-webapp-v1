import express from "express";
import {
  bookReservation,
  getAvailableTimes,
  getUserReservations,
  getAllReservations,
} from "../controllers/reservation.controller.js";
import { verifyToken } from "../utils/verifyUser.js"; // Middleware for authentication

const router = express.Router();

// ✅ Get available time slots for a date
router.get("/available", getAvailableTimes);

// ✅ Book a reservation (user must be logged in)
router.post("/book", verifyToken, bookReservation);

// ✅ Get all reservations of logged-in user
router.get("/my-reservations", verifyToken, getUserReservations);

// ✅ Admin: Get all reservations
router.get("/all", verifyToken, getAllReservations);

export default router;
