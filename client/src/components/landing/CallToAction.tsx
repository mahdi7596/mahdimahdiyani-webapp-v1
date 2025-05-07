// import ArrowRight from "../../assets/images/landing/arrow-right.svg";
// import starImage from "../../assets/images/landing/star.png";
// import springImage from "../../assets/images/landing/spring.png";
import Button from "../shared/Button";

const CallToAction = () => {
  // const sectionRef = useRef(null);
  // const { scrollYProgress } = useScroll({
  //   target: sectionRef,
  //   offset: ["start end", "end start"],
  // });

  // const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section className="bg-gradient-to-b from-[#ffffff] to-[#FDEFDA] py-24 overflow-x-clip">
      <div className="container">
        <div className="section-heading relative">
          <h2 className="section-title">همین امروز ثبت‌نام کنید</h2>
          <p className="section-description mt-5">
            با اپلیکیشنی که برای پیگیری پیشرفت شما طراحی شده است، لذت دستیابی به
            اهداف خود را تجربه کنید و انگیزه بگیرید.
          </p>
          {/* <motion.img
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
          /> */}
        </div>
        <div className="flex gap-4 items-center  justify-center mt-10">
          <Button
            link="/login"
            text="ورود - ثبت نام"
            className="flex btn-md btn-primary"
          />
          <Button
            link="/search"
            text="درباره من بیشتر بدانید"
            className="flex btn-md btn-primary-content"
          />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
