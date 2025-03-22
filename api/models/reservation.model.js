const reservationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    includedServices: {
      type: [String], // List of services offered
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: String, // Storing date as string (e.g., "2025-03-26")
      required: true,
    },
    timeSlot: {
      type: String, // Storing time range (e.g., "13:00-15:00")
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;
