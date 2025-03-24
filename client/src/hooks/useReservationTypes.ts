import { useEffect, useState } from "react";
import { getReservationTypes } from "../services/reservationService";
import { ReservationType } from "../models/reservation/types";

export const useReservationTypes = () => {
  const [reservationTypes, setReservationTypes] = useState<ReservationType[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Define fetch function outside useEffect
  const fetchReservationTypes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getReservationTypes();
      if (response.success) {
        setReservationTypes(response.data);
      } else {
        setError(response.message || "خطا در دریافت انواع رزرو");
      }
    } catch (error) {
      setError(error + "ایی در دریافت اطلاعات رخ داد");
    } finally {
      setLoading(false);
    }
  };

  // Call fetch function inside useEffect
  useEffect(() => {
    fetchReservationTypes();
  }, []);

  return { reservationTypes, loading, error, refetch: fetchReservationTypes };
};
