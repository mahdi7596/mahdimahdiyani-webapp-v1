import express from "express";
import {
  bookReservation,
  getReservations,
  getReservationsByDate,
} from "../controllers/reservation.controller.js";
import { verifyToken } from "../utils/verifyUser.js"; // Middleware for authentication

const router = express.Router();

// 📌 USER: Book a reservation (requires authentication)
router.post("/book", verifyToken, bookReservation);

// ✅ Unified: Both users and admins use this route Reservations (Admin gets all, user gets their own)
router.get("/", verifyToken, getReservations);

router.get("/by-date", getReservationsByDate);

export default router;
