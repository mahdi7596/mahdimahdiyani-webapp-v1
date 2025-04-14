import express from "express";
import {
  bookReservation,
  getReservations,
  getUserReservations,
  getReservationsByDate,
} from "../controllers/reservation.controller.js";
import { verifyToken } from "../utils/verifyUser.js"; // Middleware for authentication

const router = express.Router();

// 📌 USER: Book a reservation (requires authentication)
router.post("/book", verifyToken, bookReservation);

// 📌 USER: Get their own reservations
router.get("/my-reservations", verifyToken, getUserReservations);

// 📌 PUBLIC: Get all available reservations
router.get("/", getReservations);

router.get("/by-date", getReservationsByDate);

export default router;
