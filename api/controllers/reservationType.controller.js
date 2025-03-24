import ReservationType from "../models/reservationType.model.js";

// 📌 GET ALL Reservation Types
export const getReservationTypes = async (req, res, next) => {
  try {
    const reservationTypes = await ReservationType.find();
    res.status(200).json(reservationTypes);
  } catch (error) {
    next(error);
  }
};
