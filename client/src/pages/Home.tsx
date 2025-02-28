import Hero from "../components/landing/Hero";
import LogoTicker from "../components/landing/LogoTicker";
import Pricing from "../components/landing/Pricing";
import ProductShowcase from "../components/landing/ProductShowcase";

const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <LogoTicker />
      <ProductShowcase />
      <Pricing />
      {/* <Testimonials /> */}
      {/* <CallToAction /> */}
      {/* <Footer /> */}
    </>
  );
};

export default Home;
