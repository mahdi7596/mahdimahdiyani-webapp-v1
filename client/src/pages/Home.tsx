import CallToAction from "../components/landing/CallToAction";
import Hero from "../components/landing/Hero";
import LogoTicker from "../components/landing/LogoTicker";
import ServicesSection from "../components/landing/servicesCard/ServicesSection";

const Home = () => {
  // const { reservationTypes } = useReservationTypes();

  return (
    <>
      <Hero />
      <LogoTicker />
      {/* <ProductShowcase /> */}
      {/* <ReservationTypeList
        reservationTypes={reservationTypes}
        sliceData={true}
        containerClass="section-container grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6 mt-12 sm:mt-20 px-4"
      /> */}
      {/* <Testimonials /> */}
      <ServicesSection />
      <CallToAction />
    </>
  );
};

export default Home;
