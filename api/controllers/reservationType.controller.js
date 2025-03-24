import ReservationType from "../models/reservationType.model.js";

// 📌 GET ALL Reservation Types
export const getReservationTypes = async (req, res, next) => {
  try {
    const reservationTypes = await ReservationType.find();

    // Return response with success, data, and optional message
    res.status(200).json({
      success: true,
      data: reservationTypes, // Return the list of reservation types
    });
  } catch (error) {
    // Handle any errors and return an error response
    res.status(500).json({
      success: false,
      message: "Failed to fetch reservation types",
    });
  }
};
