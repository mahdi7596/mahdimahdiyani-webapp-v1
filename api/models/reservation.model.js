import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true, // Format: "YYYY-MM-DD"
    },
    timeSlot: {
      type: String,
      required: true, // Format: "13:00-15:00"
    },
    status: {
      type: String,
      enum: ["pending", "confirmed"],
      default: "pending",
    },
    price: {
      type: Number,
      required: true, // Example: 500000 toman
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
