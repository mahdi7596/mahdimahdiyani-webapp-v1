import { motion } from "framer-motion";

import CheckIcon from "../../assets/images/landing/check.svg";

const pricingTiers = [
  {
    title: "مشاوره مالی و حسابداری",
    monthlyPrice: 500,
    buttonText: "درخواست مشاوره",
    popular: false,
    inverse: false,
    features: [
      "تحلیل صورت‌های مالی",
      "مدیریت هزینه و درآمد",
      "بهینه‌سازی مالیاتی",
      "راهنمایی در تنظیم گزارشات مالی",
      "مشاوره برای افزایش سودآوری",
      "آموزش اصول حسابداری",
      "آنالیز و بهبود فرآیندهای مالی",
      "بررسی و پیشنهاد نرم‌افزارهای مالی",
      "مدیریت ریسک مالی",
      "بهینه‌سازی سرمایه‌گذاری",
    ],
  },

  {
    title: "آموزش حسابداری",
    monthlyPrice: 300,
    buttonText: "ثبت‌نام کنید",
    popular: true,
    inverse: true,
    features: [
      "آموزش کامل اصول حسابداری",
      "کاربرد اکسل در حسابداری",
      "تحلیل و تفسیر صورت‌های مالی",
      "آموزش نرم‌افزارهای حسابداری",
      "پشتیبانی آموزشی",
      "آموزش محاسبه مالیات",
      "تمرین‌های عملی و پروژه محور",
    ],
  },
  {
    title: "خدمات مالی پایه",
    monthlyPrice: 0,
    buttonText: "شروع کنید",
    popular: false,
    inverse: false,
    features: [
      "مشاوره اولیه رایگان",
      "راهنمایی درباره اصول مالی",
      "بررسی وضعیت مالی کلی",
      "معرفی ابزارهای پایه حسابداری",
      "پاسخ به سوالات عمومی مالی",
    ],
  },
];

const Pricing = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title ">پلن‌های خدمات</h2>
          <p className="section-description">
            خدمات متنوع مشاوره و آموزش مالی، متناسب با نیازهای شما
          </p>
        </div>
        <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center">
          {pricingTiers.map(
            (
              { title, monthlyPrice, buttonText, popular, inverse, features },
              index
            ) => (
              <div
                key={index}
                className={`landing-card ${
                  inverse === true && "border-black bg-black text-white/60"
                }`}
              >
                <div className="flex justify-between">
                  <h3
                    className={`text-lg font-bold text-black/50 ${
                      inverse === true && "text-white/60"
                    }`}
                  >
                    {title}
                  </h3>
                  {popular === true && (
                    <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20 ">
                      <motion.span
                        animate={{ backgroundPositionX: "100%" }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                          repeatType: "loop",
                        }}
                        className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF)] [background-size:200%] text-transparent bg-clip-text font-medium"
                      >
                        پرطرفدار
                      </motion.span>
                    </div>
                  )}
                </div>
                <div className="flex items-baseline gap-1 mt-[30px]">
                  <span className="text-4xl font-bold tracking-tighter leading-none">
                    {monthlyPrice === 0
                      ? "رایگان"
                      : `${monthlyPrice} هزار تومان`}
                  </span>
                  {monthlyPrice !== 0 && (
                    <span className="tracking-tight font-bold text-black/50">
                      /ماه
                    </span>
                  )}
                </div>
                <button
                  className={`btn btn-primary w-full mt-[30px] ${
                    inverse === true && "bg-white text-black"
                  }`}
                >
                  {buttonText}
                </button>
                <ul className="flex flex-col gap-5  mt-8">
                  {features.map((feature, index) => (
                    <li key={index} className="text-sm flex items-center gap-4">
                      <img src={CheckIcon} className="h-6 w-6" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
