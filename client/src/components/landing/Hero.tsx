import { motion } from "framer-motion";

import cogImage from "../../assets/images/mahdimahdiyani-profile-pic.png";
import Button from "../shared/Button";

const Hero = () => {
  // const heroRef = useRef(null);
  // const { scrollYProgress } = useScroll({
  //   target: heroRef,
  //   offset: ["start end", "end start"],
  // });
  // const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  // useMotionValueEvent(translateY, "change", (latestValue) =>
  //   console.log(latestValue)
  // );

  return (
    <section className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#F2D3A3,#FDEFDA_100%)] overflow-x-clip">
      <div className="container">
        <div className="relative md:flex items-center">
          <div className="md:w-[715px]">
            <div className="tag">درباره مهدی مهدیانی</div>
            <h1 className="text-2xl md:text-5xl font-semibold bg-gradient-to-b from-[#B88436] to-[#B9812B] py-1 text-transparent bg-clip-text mt-6">
              رهبری فکری در حوزه مدیریت مالی
            </h1>
            <p className="text-base md:text-xl mt-6">
              توسعه مالی، سرمایه گذاری، تامین مالی، ترمیم ساختارهای مالی، صورت
              های مالی، حسابرسی، مالیات، تامین اجتماعی
            </p>
            <div className="flex gap-4 items-center  mt-[30px]">
              <Button
                link="/about-me"
                text="معرفی مهدی مهدیانی"
                className="btn btn-primary"
              />
              <Button
                link="/reservations"
                text="دریافت مشاوره تخصصی"
                className="btn btn-outline"
              />
            </div>
          </div>
          <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
            <motion.img
              src={cogImage}
              alt="Cog Image"
              className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0"
              // animate={{ translateY: [-30, 30] }}
              // transition={{
              //   repeat: Infinity,
              //   repeatType: "mirror",
              //   duration: 3,
              //   ease: "easeInOut",
              // }}
            />
            {/* <motion.img
              src={cylinderImage}
              alt="cylinder Image"
              width={220}
              height={220}
              className="hidden md:block -top-8 -left-32 md:absolute"
              style={{
                translateY: translateY,
              }}
            /> */}
          </div>
          {/* <motion.img
            src={noodleImage}
            alt="noodle Image"
            width={220}
            className="hidden lg:block absolute top-[380px] right-[0px] rotate-[30deg]"
            style={{
              rotate: 30,
              translateY: translateY,
            }}
          /> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
