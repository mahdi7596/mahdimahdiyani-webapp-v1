// src/types/reservation.ts
export interface Reservation {
  _id: string;
  title: string;
  description: string;
  includedServices: string[];
  price: number;
  date: string;
  timeSlot: string;
  userId?: string;
  status?: "pending" | "confirmed" | "cancelled";
}
