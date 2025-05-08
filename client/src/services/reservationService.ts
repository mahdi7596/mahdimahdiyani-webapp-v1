import { ReservationTypesListResponse } from "../models/reservation/responses";
import { apiFetch } from "../utils/apiFetch";

export const getReservationTypes =
  async (): Promise<ReservationTypesListResponse> => {
    const response = await apiFetch(`/api/reservationtypes`);
    return await response.json();
  };
