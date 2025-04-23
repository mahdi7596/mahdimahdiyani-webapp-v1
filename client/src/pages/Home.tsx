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
      {/* <Navbar /> */}
      <Hero />
      <LogoTicker />
      <ProductShowcase />
      <ReservationTypeList
        reservationTypes={reservationTypes}
        sliceData={true}
        containerClass="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center"
      />
      <Testimonials />
      <CallToAction />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
