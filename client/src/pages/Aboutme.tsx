import HeroAbout from "../components/about/HeroAbout";
import ServicesAbout from "../components/about/ServicesAbout";

const Aboutme = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroAbout />
      <ServicesAbout />
    </div>
  );
};

export default Aboutme;
