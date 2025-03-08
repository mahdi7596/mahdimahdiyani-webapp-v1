import HeroAbout from "../components/about/HeroAbout";
import ServicesAbout from "../components/about/ServicesAbout";
import Counter from "../components/Counter";

const Aboutme = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroAbout />
      <Counter />
      <ServicesAbout />
    </div>
  );
};

export default Aboutme;
