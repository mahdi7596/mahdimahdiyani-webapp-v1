import express from "express";
import {
  bookReservation,
  getReservations,
  getUserReservations,
  adminCreateReservation,
} from "../controllers/reservation.controller.js";
import { verifyToken } from "../utils/verifyUser.js"; // Middleware for authentication

const router = express.Router();

// 📌 USER: Book a reservation (requires authentication)
router.post("/book", verifyToken, bookReservation);

// 📌 USER: Get their own reservations
router.get("/my-reservations", verifyToken, getUserReservations);

// 📌 PUBLIC: Get all available reservations
router.get("/", getReservations);

// 📌 ADMIN: Create a new reservation type
router.post("/create", verifyToken, adminCreateReservation);

export default router;
