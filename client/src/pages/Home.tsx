import CallToAction from "../components/landing/CallToAction";
import Hero from "../components/landing/Hero";
import LogoTicker from "../components/landing/LogoTicker";
import Reservations from "../components/landing/Reservations";
import ProductShowcase from "../components/landing/ProductShowcase";
import Testimonials from "../components/landing/Testimonials";

const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <LogoTicker />
      <ProductShowcase />
      <Reservations />
      <Testimonials />
      <CallToAction />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
