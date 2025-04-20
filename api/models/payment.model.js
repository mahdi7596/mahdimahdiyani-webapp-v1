// models/Payment.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    reservationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["unpaid", "paid", "failed"],
      default: "unpaid",
    },
    authority: String, // For real gateways like Zarinpal
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
