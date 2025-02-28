import React from "react";

import { motion } from "framer-motion";

import avatar1 from "../../assets/images/landing/avatar-1.png";
import avatar2 from "../../assets/images/landing/avatar-2.png";
import avatar3 from "../../assets/images/landing/avatar-3.png";
import avatar4 from "../../assets/images/landing/avatar-4.png";
import avatar5 from "../../assets/images/landing/avatar-5.png";
import avatar6 from "../../assets/images/landing/avatar-6.png";
import avatar7 from "../../assets/images/landing/avatar-7.png";
import avatar8 from "../../assets/images/landing/avatar-8.png";
import avatar9 from "../../assets/images/landing/avatar-9.png";

const testimonials = [
  {
    text: "مشاوره مالی این مجموعه باعث شد کسب‌وکارم رشد قابل توجهی داشته باشد.",
    imageSrc: avatar1,
    name: "رضا کریمی",
    username: "@rezakarimi",
  },
  {
    text: "با آموزش‌های ارائه شده، توانستم حسابداری کسب‌وکارم را به خوبی مدیریت کنم.",
    imageSrc: avatar2,
    name: "سارا مرادی",
    username: "@saramoradi",
  },
  {
    text: "خدمات مالی این تیم فوق‌العاده بود و توانست هزینه‌هایم را بهینه کند.",
    imageSrc: avatar3,
    name: "مهدی رضایی",
    username: "@mahdirz",
  },
  {
    text: "راهنمایی‌های دقیق و حرفه‌ای تیم باعث شد تصمیمات مالی بهتری بگیرم.",
    imageSrc: avatar4,
    name: "الهام احمدی",
    username: "@elhamahmadi",
  },
  {
    text: "بسیار از کیفیت خدمات ارائه شده راضی هستم و حتماً به دیگران پیشنهاد می‌کنم.",
    imageSrc: avatar5,
    name: "علی رستمی",
    username: "@alirastami",
  },
  {
    text: "آموزش‌های این مجموعه به من کمک کرد تا مهارت‌های حسابداری خود را تقویت کنم.",
    imageSrc: avatar6,
    name: "نرگس موسوی",
    username: "@nargesmosavi",
  },
  {
    text: "با استفاده از مشاوره‌های ارائه شده، توانستم سود کسب‌وکارم را افزایش دهم.",
    imageSrc: avatar7,
    name: "محمد کاظمی",
    username: "@mohammadkazemi",
  },
  {
    text: "پشتیبانی و پاسخگویی تیم بسیار عالی است و همیشه در کنار مشتریان هستند.",
    imageSrc: avatar8,
    name: "زهرا نادری",
    username: "@zahranadari",
  },
  {
    text: "تنوع خدمات ارائه شده در این مجموعه، پاسخگوی نیازهای متنوع کسب‌وکارهاست.",
    imageSrc: avatar9,
    name: "حسین طاهری",
    username: "@hoseintaheri",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);

const TestimonialsColumn = (props) => (
  <div className={props.className}>
    <motion.div
      animate={{ translateY: "-50%" }}
      transition={{
        duration: props.duration || 10,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className={"flex flex-col gap-6 pb-6 -translate-y-1/2"}
    >
      {[...new Array(2)].fill(0).map((_, index) => (
        <React.Fragment key={index}>
          {props.testimonials.map(
            ({ text, imageSrc, name, username }, index) => (
              <div key={index} className="landing-card">
                <div>{text}</div>
                <div className="flex items-center gap-2 mt-5">
                  <img
                    src={imageSrc}
                    width={40}
                    height={40}
                    alt={name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight leading-5">
                      {name}
                    </div>
                    <div className="leading-5 tracking-tight">{username}</div>
                  </div>
                </div>
              </div>
            )
          )}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="bg-white">
      <div className="container">
        <div className="section-heading">
          <div className="flex justify-center">
            <div className="tag">نظرات مشتریان</div>
          </div>
          <h2 className="section-title mt-5 ">بازخورد کاربران ما</h2>
          <p className="section-description mt-5">
            از مشاوره مالی تا آموزش‌های حرفه‌ای، مشتریان ما تجربه فوق‌العاده‌ای
            داشته‌اند.
          </p>
        </div>
        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            duration={19}
            testimonials={secondColumn}
            className="hidden md:block"
          />
          <TestimonialsColumn
            duration={17}
            testimonials={secondColumn}
            className="hidden lg:block"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
