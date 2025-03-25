import { useReservationTypes } from "../hooks/useReservationTypes";

import CallToAction from "../components/landing/CallToAction";
import Hero from "../components/landing/Hero";
import LogoTicker from "../components/landing/LogoTicker";
import ReservationTypeList from "../components/landing/ReservationTypeList";
import ProductShowcase from "../components/landing/ProductShowcase";
import Testimonials from "../components/landing/Testimonials";

const Home = () => {
  const { reservationTypes, loading, error } = useReservationTypes();

  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <LogoTicker />
      <ProductShowcase />
      <ReservationTypeList reservationTypes={reservationTypes} />
      <Testimonials />
      <CallToAction />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
