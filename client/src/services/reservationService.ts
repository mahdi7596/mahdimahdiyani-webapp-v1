import { ReservationTypesListResponse } from "../models/reservation/responses";

export const getReservationTypes =
  async (): Promise<ReservationTypesListResponse> => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/reservationtypes`
    );
    return await response.json();
  };
