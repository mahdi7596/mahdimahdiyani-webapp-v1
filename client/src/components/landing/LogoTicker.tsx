import React from "react";

import { motion } from "framer-motion";

import acmeLogo from "../../assets/images/landing/logo-acme.png";
import quantumLogo from "../../assets/images/landing/logo-quantum.png";
import echoLogo from "../../assets/images/landing/logo-echo.png";
import celestialLogo from "../../assets/images/landing/logo-celestial.png";
import pulseLogo from "../../assets/images/landing/logo-pulse.png";
import apexLogo from "../../assets/images/landing/logo-apex.png";

const LogoTicker = () => {
  return (
    <div className="py-8 md:py-12 bg-white">
      <div className="container">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_left,transparent,black,transparent)]">
          <motion.div
            className="flex gap-14 flex-none pl-14"
            animate={{ translateX: "50%" }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            <img
              src={acmeLogo}
              alt="image logo"
              className="logo-ticker-image"
            />
            <img
              src={quantumLogo}
              alt="image logo"
              className="logo-ticker-image"
            />
            <img
              src={echoLogo}
              alt="image logo"
              className="logo-ticker-image"
            />
            <img
              src={celestialLogo}
              alt="image logo"
              className="logo-ticker-image"
            />
            <img
              src={pulseLogo}
              alt="image logo"
              className="logo-ticker-image"
            />
            <img
              src={apexLogo}
              alt="image logo"
              className="logo-ticker-image"
            />
            {/* second sets of logos for animation */}
            <img
              src={acmeLogo}
              alt="image logo"
              className="logo-ticker-image"
            />
            <img
              src={quantumLogo}
              alt="image logo"
              className="logo-ticker-image"
            />
            <img
              src={echoLogo}
              alt="image logo"
              className="logo-ticker-image"
            />
            <img
              src={celestialLogo}
              alt="image logo"
              className="logo-ticker-image"
            />
            <img
              src={pulseLogo}
              alt="image logo"
              className="logo-ticker-image"
            />
            <img
              src={apexLogo}
              alt="image logo"
              className="logo-ticker-image"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LogoTicker;
