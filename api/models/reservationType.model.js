import mongoose from "mongoose";

const TimeSlotSchema = new mongoose.Schema({
  time: { type: String, required: true }, // e.g., "09:00-10:00"
});

const AvailableDateSchema = new mongoose.Schema({
  date: { type: String, required: true }, // e.g., "2025-03-26"
  timeSlots: { type: [TimeSlotSchema], required: true },
});

const ReservationTypeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  includedServices: { type: [String], required: true },
  price: { type: Number, required: true },
  availableDates: { type: [AvailableDateSchema], required: true },
});

export default mongoose.model("ReservationType", ReservationTypeSchema);
