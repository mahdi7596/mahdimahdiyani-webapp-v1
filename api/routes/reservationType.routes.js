import express from "express";

import {
  getReservationTypes,
  getReservationById,
} from "../controllers/reservationType.controller.js";

const router = express.Router();

// GET all reservation types
router.get("/", getReservationTypes);

// for reservation single page
router.get("/:id", getReservationById);

export default router;
