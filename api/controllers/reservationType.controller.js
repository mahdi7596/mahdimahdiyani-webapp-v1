import ReservationType from "../models/reservationType.model.js";

// 📌 GET ALL Reservation Types
export const getReservationTypes = async (req, res, next) => {
  try {
    const reservationTypes = await ReservationType.find();

    // Return response with success, data, and optional message
    res.status(200).json({
      success: true,
      data: reservationTypes, // Return the list of reservation types
      // message: "Data fetched successfully", // Add a success message
    });
  } catch (error) {
    // Handle any errors and return an error response
    res.status(500).json({
      success: false,
      message: "Failed to fetch reservation types",
    });
  }
};

// 📌 GET Reservation by ID (Public)
export const getReservationById = async (req, res, next) => {
  try {
    const reservation = await ReservationType.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "پیدا نشد" });
    }
    res.status(200).json(reservation);
  } catch (error) {
    next(error);
  }
};
