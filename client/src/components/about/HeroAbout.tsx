import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Button from "../shared/Button";
import correct from "../../assets/images/correct.png";

// Customer data type
interface Customer {
  id: number;
  name: string;
  count: string;
  description: string;
  image: string;
}

// Customer data array
const customers: Customer[] = [
  {
    id: 1,
    name: "مشتریان راضی",
    count: "15,290",
    description:
      "فرآیند استخدام فروش را ساده می‌کند تا بتوانید روی رشد تمرکز کنید",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "شرکای تجاری",
    count: "7,845",
    description: "همکاری موثر و راهکارهای نوآورانه در کسب و کار",
    image:
      "https://images.unsplash.com/photo-1573496359394-025c4b977150?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "مشاوران برتر",
    count: "3,210",
    description: "راهنمایی و مشاوره تخصصی برای رشد کسب و کار",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
  },
];

const HeroAbout = () => {
  const aboutMeModalRef = useRef(null);
  const [currentCustomer, setCurrentCustomer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCustomer((prev) => (prev + 1) % customers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Free Trial Badge */}
          <motion.div
            className="inline-flex items-center gap-1.5 bg-white rounded-full px-2 py-3 shadow-sm mb-8"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse mb-1 sm:mb-0" />

            <span className="text-neutrals400 text-[10px] xxs:text-sm">
              درباره من | مهدی مهدیانی
            </span>
          </motion.div>

          {/* Main Heading */}
          <h1
            className="text-2xl md:text-4xl font-bold text-neutrals mb-6"
            style={{ lineHeight: "1.4" }}
          >
            مشاور و تسهیل‌گر توسعه مالی کسب‌وکارها
          </h1>

          {/* Description */}
          <p className="text-neutrals400 text-lg mb-8">
            من مهدی مهدیانی هستم، مدیر و مشاور مالی، مدرس دانشگاه و مدیر اجرایی
            پروژه‌های توسعه مالی، حسابداری و حسابرسی در بنگاه‌های اقتصادی.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button
              onAction={() => {
                aboutMeModalRef.current?.showModal();
              }}
              text="ادامه مطلب"
              icon={"weui_arrow-filled -rotate-180 text-2xl"}
              className="btn btn-primary"
            />
            <Button
              text="دانلود رزومه"
              icon={"material-symbols_download text-2xl"}
              className="btn btn-outline gap-2"
            />
          </div>
        </motion.div>

        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Main Image */}
          <div className="relative bg-primary100 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80"
              alt="Professional businessman"
              className="w-full h-auto"
            />

            {/* Floating Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute top-4 left-4 bg-white rounded-lg px-4 py-2 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
                  alt="Avatar"
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-neutrals500">
                  +30,000 استخدام انجام شده
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-4 left-4 bg-white rounded-lg px-4 py-2 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
                  alt="Avatar"
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-neutrals500">85% هدف عملکرد</span>
              </div>
            </motion.div>
          </div>

          {/* Customer Slider */}
          <AnimatePresence mode="wait">
            <motion.div
              key={customers[currentCustomer].id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.8,
              }}
              className="absolute -bottom-16 left-4 bg-white rounded-xl p-4 shadow-lg max-w-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={customers[currentCustomer].image}
                  alt={customers[currentCustomer].name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-bold text-neutrals mb-1">
                    {customers[currentCustomer].name}
                  </h3>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {customers[currentCustomer].count}
                  </div>
                  <p className="text-sm text-neutrals400">
                    {customers[currentCustomer].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <dialog ref={aboutMeModalRef} id="my_modal_1" className="modal">
        <div className="absolute w-[90%] xl:w-[1200px] bg-surfaceBg rounded py-6 px-8 ">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-neutral hover:bg-error absolute left-2 top-2 ">
              ✕
            </button>
          </form>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* right Column */}
            <div className="">
              {/* Free Trial Badge */}
              <div className="inline-flex items-center gap-1.5 bg-primary100 rounded-full px-2 py-3 shadow-sm mb-8">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse mb-1 sm:mb-0" />

                <span className="text-neutrals400 text-[10px] xxs:text-sm">
                  درباره من | مهدی مهدیانی
                </span>
              </div>
              {/* Main Heading */}
              <h1
                className="text-xl sm:text-2xl md:text-3xl font-bold text-neutrals"
                style={{ lineHeight: "1.4" }}
              >
                مشاور و تسهیل‌گر توسعه مالی کسب‌وکارها
              </h1>

              <p className="text-neutrals400 text-sm sm:text-lg mt-4">
                من مهدی مهدیانی هستم، مدیر و مشاور مالی، مدرس دانشگاه و مدیر
                اجرایی پروژه‌های توسعه مالی، حسابداری و حسابرسی در بنگاه‌های
                اقتصادی.
              </p>
              <p className="text-neutrals400 text-sm sm:text-lg my-4">
                طی بیش از یک دهه فعالیت تخصصی در حوزه‌های حسابداری، حسابرسی،
                مدیریت مالی و مشاوره سازمانی، به مدیران، سازمان‌ها و شرکت‌های
                متعددی در بخش‌های مختلف صنعتی و خدماتی کمک کرده‌ام تا:
              </p>
              <ul className="flex flex-col gap-y-2 text-neutrals400 text-sm sm:text-lg">
                <li className="flex items-center gap-1">
                  <img src={correct} className="w-8" alt="correct" />
                  ساختار مالی خود را ایجاد یا بازآفرینی کنند
                </li>

                <li className="flex items-center gap-1">
                  <img src={correct} className="w-8" alt="correct" />
                  کنترل‌های داخلی را تقویت نمایند
                </li>
                <li className="flex items-center gap-1">
                  <img src={correct} className="w-8" alt="correct" />
                  تصمیم‌گیری‌های مبتنی بر داده را جایگزین شهود و حدس کنند
                </li>
                <li className="flex items-center gap-1">
                  <img src={correct} className="w-8" alt="correct" />
                  تیم‌های مالی توانمندی را در درون سازمان پرورش دهند
                </li>
                <li className="flex items-center gap-1">
                  <img src={correct} className="w-8" alt="correct" />و ثروت فردی
                  و سازمانی خود را افزایش دهند.
                </li>
              </ul>
            </div>

            {/* Left Column */}
            <div className="hidden xxs:block  relative bg-primary100 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80"
                alt="Professional businessman"
                className="h-[100px] sm:h-[160px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default HeroAbout;
