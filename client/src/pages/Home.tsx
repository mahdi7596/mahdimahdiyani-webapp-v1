import { useReservationTypes } from "../hooks/useReservationTypes";

import CallToAction from "../components/landing/CallToAction";
import Hero from "../components/landing/Hero";
import LogoTicker from "../components/landing/LogoTicker";
import ReservationTypeList from "../components/landing/ReservationTypeList";
import ProductShowcase from "../components/landing/ProductShowcase";
import Testimonials from "../components/landing/Testimonials";

const Home = () => {
  const { reservationTypes } = useReservationTypes();

  return (
    <>
      <Hero />
      <LogoTicker />
      <ProductShowcase />
      <ReservationTypeList
        reservationTypes={reservationTypes}
        sliceData={true}
        containerClass="section-container grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6 mt-12 sm:mt-20 px-4"
      />
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default Home;
