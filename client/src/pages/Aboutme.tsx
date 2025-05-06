import Achievements from "../components/about/Achievement";
import HeroAbout from "../components/about/HeroAbout";
import ServicesAbout from "../components/about/ServicesAbout";
import AnimatedServices from "../components/AnimatedServices";
import Counter from "../components/Counter";
import Timeline from "../components/Timeline";

const Aboutme = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroAbout />
      <Counter />
      <ServicesAbout />
      <AnimatedServices />
      <Achievements />
      <Timeline />
    </div>
  );
};

export default Aboutme;
