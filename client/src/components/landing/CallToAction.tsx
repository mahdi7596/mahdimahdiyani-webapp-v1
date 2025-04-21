import { useRef } from "react";

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
          <h2 className="section-title">همین امروز ثبت‌نام کنید</h2>
          <p className="section-description mt-5">
            با اپلیکیشنی که برای پیگیری پیشرفت شما طراحی شده است، لذت دستیابی به
            اهداف خود را تجربه کنید و انگیزه بگیرید.
          </p>
          <motion.img
            src={starImage}
            alt="ستاره"
            width={360}
            className="absolute -left-[350px] -top-[137px]"
            style={{ translateY }}
          />
          <motion.img
            src={springImage}
            alt="فنر"
            width={360}
            className="absolute -right-[331px] -top-[19px]"
            style={{ translateY }}
          />
        </div>
        <div className="flex gap-2 mt-10 justify-center">
          <button className="btn btn-primary">دریافت رایگان</button>
          <button className="btn btn-text gap-1">
            <span>بیشتر بدانید</span>
            <img src={ArrowRight} className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
