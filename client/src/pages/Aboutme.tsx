import HeroAbout from "../components/about/HeroAbout";
import ServicesAbout from "../components/about/ServicesAbout";
import AnimatedServices from "../components/AnimatedServices";
import Counter from "../components/Counter";

const Aboutme = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroAbout />
      <Counter />
      <ServicesAbout />
      <AnimatedServices />
    </div>
  );
};

export default Aboutme;
