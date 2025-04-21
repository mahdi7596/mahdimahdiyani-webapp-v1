// src/models/reservation/responses.ts
import { ReservationType } from "./types";

export interface ReservationTypesListResponse {
  success: boolean;
  data: ReservationType[];
  message?: string;
}
