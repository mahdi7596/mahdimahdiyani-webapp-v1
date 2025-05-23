import { motion } from "framer-motion";

const LogoTicker = () => {
  const images = Object.values(
    import.meta.glob("../../assets/images/colleague/*.png", {
      eager: true,
    })
  ).map((module) => (module as { default: string }).default);

  return (
    <div className="py-8 md:py-12 bg-white">
      <div className="container">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_left,transparent,black,transparent)]">
          <motion.div
            className="flex gap-14 flex-none pl-14"
            animate={{ translateX: "50%" }}
            transition={{
              duration: 100,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {images.concat(images).map((src, index) => (
              <img
                key={index}
                src={src}
                alt="image logo"
                className="logo-ticker-image"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LogoTicker;
