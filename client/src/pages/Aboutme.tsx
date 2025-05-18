import Achievements from "../components/about/Achievement";
import HeroAbout from "../components/about/HeroAbout";
import ServicesAbout from "../components/about/ServicesAbout";
import Counter from "../components/Counter";
import Timeline from "../components/Timeline";
import SocialMediaShowcase from "../components/about/SocialMediaShowcase";

const Aboutme = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroAbout />
      <Counter />
      <SocialMediaShowcase />
      <ServicesAbout />
      {/* <AnimatedServices /> */}
      <Achievements />
      <Timeline />
    </div>
  );
};

export default Aboutme;
