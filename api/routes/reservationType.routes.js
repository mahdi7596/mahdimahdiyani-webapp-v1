import express from "express";

import { getReservationTypes } from "../controllers/reservationType.controller.js";

const router = express.Router();

// GET all reservation types
router.get("/", getReservationTypes);

export default router;
