import React, { useRef } from "react";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

import cogImage from "../../assets/images/landing/cog.png";
import cylinderImage from "../../assets/images/landing/cylinder.png";
import noodleImage from "../../assets/images/landing/noodle.png";

import ArrowIcon from "../../assets/images/landing/arrow-right.svg";

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  // useMotionValueEvent(translateY, "change", (latestValue) =>
  //   console.log(latestValue)
  // );

  return (
    <section className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#F2D3A3,#FFFBF5_100%)] overflow-x-clip">
      <div className="container">
        <div className="relative md:flex items-center">
          <div className="md:w-[478px]">
            <div className="tag">درباره مهدی مهدیانی</div>
            <h1 className="text-2xl md:text-5xl font-semibold bg-gradient-to-b from-[#87560E] to-[#B9812B] py-1 text-transparent bg-clip-text mt-6">
              رهبر فکری در حسابداری و مدیریت
            </h1>
            <p className="text-base md:text-xl mt-6">
              بنیان‌گذار رسانه همکلان، دبیرکل انجمن حسابداران استان تهران و مدرس
              دانشگاه با سال‌ها تجربه در حسابداری و مدیریت.
            </p>
            <div className="flex gap-1 items-center mt-[30px]">
              <button className="btn btn-primary">مشاهده مقالات</button>
              <button className="btn btn-text gap-1">
                <span>درباره من بیشتر بدانید</span>
                <img src={ArrowIcon} className="h-5 w-5 rotate-180" />
              </button>
            </div>
          </div>
          <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
            <motion.img
              src={cogImage}
              alt="Cog Image"
              className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0"
              animate={{ translateY: [-30, 30] }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
                ease: "easeInOut",
              }}
            />
            <motion.img
              src={cylinderImage}
              alt="cylinder Image"
              width={220}
              height={220}
              className="hidden md:block -top-8 -left-32 md:absolute"
              style={{
                translateY: translateY,
              }}
            />
          </div>
          <motion.img
            src={noodleImage}
            alt="noodle Image"
            width={220}
            className="hidden lg:block absolute top-[480px] right-[0px] rotate-[30deg]"
            style={{
              rotate: 30,
              translateY: translateY,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
