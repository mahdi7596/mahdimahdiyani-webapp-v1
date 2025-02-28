import React, { useRef } from "react";

import { motion, useScroll, useTransform } from "framer-motion";

import ArrowRight from "../../assets/images/landing/arrow-right.svg";
import starImage from "../../assets/images/landing/star.png";
import springImage from "../../assets/images/landing/spring.png";

const CallToAction = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section className="bg-gradient-to-b from-[#ffffff] to-[#FDEFDA] py-24 overflow-x-clip">
      <div className="container">
        <div className="section-heading relative">
          <h2 className="section-title">Sign up for free today</h2>
          <p className="section-description mt-5">
            Celebrate they joy of accomplishment with an app designed to track
            your progress and motivate your efforts.
          </p>
          <motion.img
            src={starImage}
            alt="star image"
            width={360}
            className="absolute -left-[350px] -top-[137px]"
            style={{ translateY }}
          />
          <motion.img
            src={springImage}
            alt="spring image"
            width={360}
            className="absolute -right-[331px] -top-[19px]"
            style={{ translateY }}
          />
        </div>
        <div className="flex gap-2 mt-10 justify-center">
          <button className="btn btn-primary">Get for free</button>
          <button className="btn btn-text gap-1">
            <span>Learn more</span>
            <img src={ArrowRight} className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
