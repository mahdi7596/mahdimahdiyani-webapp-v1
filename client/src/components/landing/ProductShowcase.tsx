import React, { useRef } from "react";

import { motion, useScroll, useTransform } from "framer-motion";

import productImage from "../../assets/images/landing/product-image.png";
import pyramidImage from "../../assets/images/landing/pyramid.png";
import tubeImage from "../../assets/images/landing/tube.png";

const ProductShowcase = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-[#ffffff] to-[#FDEFDA] py-24 overflow-x-clip"
    >
      <div className="container">
        <div className="section-heading ">
          <div className="flex justify-center">
            <div className="tag">تخصص و تجربه در حسابداری و مدیریت</div>
          </div>
          <h2 className="section-title mt-5">
            ارائه دانش و بینش در حوزه مالی و حسابداری
          </h2>
          <p className="section-description mt-5">
            با بهره‌گیری از سال‌ها تجربه در حوزه حسابداری، مدیریت مالی و آموزش،
            مهدی مهدیانی دانش و تخصص خود را در اختیار مدیران، حسابداران و
            علاقه‌مندان این حوزه قرار می‌دهد.
          </p>
        </div>
        <div className="relative ">
          <img src={productImage} alt="productImage" className="mt-10" />
          <motion.img
            src={pyramidImage}
            alt="pyramidImage"
            height={262}
            width={262}
            className="hidden md:block  absolute -right-36 -top-32"
            style={{ translateY }}
          />
          <motion.img
            src={tubeImage}
            alt="tubeImage"
            height={248}
            width={248}
            className="hidden md:block  absolute bottom-24 -left-36"
            style={{ translateY }}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
