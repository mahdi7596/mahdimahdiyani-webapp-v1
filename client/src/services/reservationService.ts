import { ReservationTypesListResponse } from "../models/reservation/responses";

export const getReservationTypes =
  async (): Promise<ReservationTypesListResponse> => {
    const response = await fetch("/api/reservationtypes");
    return await response.json();
  };
