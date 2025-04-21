import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reservationTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReservationType",
      required: true,
    },
    date: { type: String, required: true }, // Selected date
    timeSlot: { type: String, required: true }, // Selected time slot
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", ReservationSchema);
