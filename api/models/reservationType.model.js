import mongoose from "mongoose";

const ReservationTypeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  includedServices: { type: [String], required: true },
  price: { type: Number, required: true },
  availableDates: { type: [String], required: true }, // e.g., ["2025-03-26", "2025-03-27"]
  timeSlots: { type: [String], required: true }, // e.g., ["09:00-10:00", "10:00-11:00"]
});

export default mongoose.model("ReservationType", ReservationTypeSchema);
