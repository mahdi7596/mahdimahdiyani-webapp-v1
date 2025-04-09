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

export interface ReservationType {
  _id: string;
  title: string;
  description: string;
  includedServices: string[];
  price: number;
  availableDates: string[]; // Format: "YYYY-MM-DD"
  timeSlots: string[]; // Format: "HH:MM-HH:MM"
}

export interface flatReservationDates {
  daysInsideMonth: [
    {
      date: string;
      timeSlots: [
        {
          time: string;
          _id: string;
        }
      ];
    }
  ];
  month: {
    en: string;
    fa: string;
    faNum: string;
  };
}

export interface ReservedTime {
  date: string;
  reservationTypeId: string;
  status: string;
  timeSlot: string;
  userId: string;
}
