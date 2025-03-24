import { useEffect, useState } from "react";

import CallToAction from "../components/landing/CallToAction";
import Hero from "../components/landing/Hero";
import LogoTicker from "../components/landing/LogoTicker";
import ReservationTypeList from "../components/landing/ReservationTypeList";
import ProductShowcase from "../components/landing/ProductShowcase";
import Testimonials from "../components/landing/Testimonials";
import { getReservationTypes } from "../services/reservationService";

interface ReservationType {
  title: string;
  description: string;
  includedServices: string[];
  price: number;
  availableDates: string[]; // Format: "YYYY-MM-DD"
  timeSlots: string[]; // Format: "HH:MM-HH:MM"
}

const Home = () => {
  const [reservations, setReservations] = useState<ReservationType[]>([]);

  const fetchTypes = async () => {
    const result = await getReservationTypes();
    if (result.success) {
      setReservations(result.data);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  console.log(reservations, "reservations");

  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <LogoTicker />
      <ProductShowcase />
      <ReservationTypeList />
      <Testimonials />
      <CallToAction />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
