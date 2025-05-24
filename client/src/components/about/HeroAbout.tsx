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
            className="inline-flex items-center gap-1.5 bg-white rounded-full px-2 py-3 shadow-sm mb-8 border border-primary400"
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
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
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
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
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
        <div className="relative w-[95%] sm:w-[90%] xl:w-[1000px] max-h-[90vh] bg-surfaceBg rounded-lg py-4 sm:py-6 px-4 sm:px-6 md:px-8 overflow-y-auto">
          {/* Sticky Close Button */}
          <div className="sticky top-0 z-50 left-0 bg-transparent">
            <form method="dialog" className="flex justify-end">
              <button className="btn btn-sm btn-circle btn-neutral hover:bg-error">
                ✕
              </button>
            </form>
          </div>

          <div className="pt-1">
            {/* Header Section */}
            <div className="text-center pt -2 sm:pt-0">
              <div className="inline-flex items-center gap-1.5 bg-primary100 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />

                <span className="text-xs sm:text-sm text-neutrals400">
                  درباره من | مهدی مهدیانی
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutrals mb-2 sm:mb-3">
                مشاور و تسهیل‌گر توسعه مالی کسب‌وکارها
              </h1>
              <p className="text-sm sm:text-base text-neutrals600">
                متخصص در مدیریت مالی، حسابداری و مشاوره سازمانی
              </p>
            </div>

            {/* Section 1: Professional Path */}
            <section className="relative bg-gradient-to-br from-primary50 to-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-gray-100">
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg sm:text-xl font-bold">
                ۱
              </div>
              <div className="grid md:grid-cols-2 gap-5 sm:gap-8 items-center">
                <div className="mt-6 sm:mt-0">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-3 sm:mb-4 md:mb-6 relative inline-block">
                    <span className="relative z-10">مسیر حرفه‌ای من</span>
                    <span className="absolute bottom-1 right-0 w-full h-1.5 sm:h-2 bg-primary/20 -z-0 rounded-full"></span>
                  </h2>
                  <div className="space-y-3 sm:space-y-4 text-justify text-sm sm:text-base text-neutrals600">
                    <p className="leading-relaxed">
                      مسیر حرفه‌ای من، از علاقه‌مندی به دنیای اعداد و تحلیل‌های
                      مالی آغاز شد و با سال‌ها تجربه در حسابداری، حسابرسی،
                      مدیریت مالی و مشاوره کسب‌وکارها به جایگاهی رسید که امروز
                      به‌عنوان یک تسهیل‌گر توسعه مالی سازمان‌ها و مشاور ارشد
                      مدیران شناخته می‌شوم.
                    </p>
                    <p className="leading-relaxed">
                      تحصیلات من در رشته حسابداری آغاز شد، با مدیریت مالی ادامه
                      پیدا کرد و سپس در DBA با تمرکز بر مدیریت کسب‌وکار، توانستم
                      بین دانش تخصصی مالی و مهارت‌های مدیریتی پل بزنم و مسائل
                      مالی را از نگاه کلان و راهبردی تحلیل کنم.
                    </p>
                  </div>
                </div>
                <div className="h-48 sm:h-56 md:h-64 lg:h-72 w-full">
                  <img
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt="تحلیل مالی"
                    className="w-full h-full object-cover rounded-lg sm:rounded-xl shadow-md"
                  />
                </div>
              </div>
            </section>

            {/* Section 2: Experience */}
            <section className="relative bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-gray-100 mt-8">
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg sm:text-xl font-bold">
                ۲
              </div>
              <div className="grid md:grid-cols-2 gap-5 sm:gap-8 items-center">
                <div className="order-2 md:order-1 mt-6 sm:mt-0">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-3 sm:mb-4 md:mb-6 relative inline-block">
                    <span className="relative z-10">
                      تجربه‌ای که به عمل گره خورده است
                    </span>
                    <span className="absolute bottom-1 right-0 w-full h-1.5 sm:h-2 bg-primary/20 -z-0 rounded-full"></span>
                  </h2>
                  <div className="space-y-3 sm:space-y-4">
                    <p className="text-sm sm:text-base text-neutrals600 leading-relaxed">
                      در طول این سال‌ها، مسئولیت‌های متنوعی داشتم از جمله:
                    </p>
                    <ul className="space-y-2 sm:space-y-3">
                      {[
                        "مدیریت مالی و سرمایه‌گذاری در هلدینگ‌ها و شرکت‌های چندرشته‌ای",
                        "نوسازی و بازآفرینی ساختار مالی در سازمان‌های تولیدی، بازرگانی، خدماتی و فناوری‌محور",
                        "استقرار و ممیزی کنترل‌های داخلی و فرآیندهای مالی",
                        "فعالیت‌های نظارتی، بازرسی، حسابرسی داخلی، حسابرسی صورت‌های مالی و تهیه گزارشات حسابرسی",
                        "مشاوره به مدیران غیرمالی در حوزه تحلیل صورت‌های مالی و تصمیم‌گیری مالی",
                        "آموزش و پرورش نیروهای متخصص برای جایگاه‌های کلیدی مالی",
                        "حسابرسی داخلی، بازرسی، حسابرسی صورت‌های مالی و تهیه گزارشات حسابرسی",
                      ].map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 group"
                        >
                          <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors mt-0.5">
                            <img src={correct} alt="" />
                          </div>
                          <span className="text-xs sm:text-sm text-neutrals600">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs sm:text-sm text-neutrals600 italic mt-4 sm:mt-6 border-r-2 border-primary pr-3">
                      را بر عهده داشتم؛ تجربیاتی که من را به درک عمیق‌تری از
                      چالش‌های واقعی مدیران در فضای عملیاتی کسب‌وکار رساند.
                    </p>
                  </div>
                </div>
                <div className="order-1 md:order-2 h-56 sm:h-64 md:h-72 w-full">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt="تجربه کاری"
                    className="w-full h-full object-cover rounded-lg sm:rounded-xl shadow-md"
                  />
                </div>
              </div>
            </section>

            {/* Section 3: Education & Training */}
            <section className="relative bg-gradient-to-bl from-primary50 to-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-gray-100 mt-8">
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg sm:text-xl font-bold">
                ۳
              </div>
              <div className="grid md:grid-cols-2 gap-5 sm:gap-8 items-center">
                <div className="mt-6 sm:mt-0">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-3 sm:mb-4 md:mb-6 relative inline-block">
                    <span className="relative z-10">
                      از اجرا تا آموزش، از آموزش تا توانمندسازی
                    </span>
                    <span className="absolute bottom-1 right-0 w-full h-1.5 sm:h-2 bg-primary/20 -z-0 rounded-full"></span>
                  </h2>
                  <div className="space-y-3 sm:space-y-4 text-justify text-sm sm:text-base text-neutrals600">
                    <p className="leading-relaxed">
                      در کنار فعالیت‌های اجرایی، همواره دغدغه انتقال دانش و
                      تجربه را داشتم. به همین دلیل، به‌عنوان مدرس دانشگاه، مدرس
                      رسمی سازمان فنی و حرفه‌ای کشور و سخنران در رویدادهای
                      تخصصی، سال‌هاست در مسیر توسعه سرمایه انسانی حوزه مالی و
                      حسابداری نقش‌آفرینی می‌کنم.
                    </p>
                    <p className="leading-relaxed">
                      تأسیس و رهبری رسانه تخصصی همکلان نیز گامی مهم در همین مسیر
                      بود؛ پلتفرمی با بیش از ۳۰۰۰ عضو فعال، به فضایی برای آموزش،
                      تعامل و ارتقاء حرفه‌ای مدیران مالی، حسابداران و حسابرسان
                      در ایران تبدیل شده است.
                    </p>
                  </div>
                </div>
                <div className="h-48 sm:h-56 md:h-64 lg:h-72 w-full">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                    alt="آموزش و توانمندسازی"
                    className="w-full h-full object-cover rounded-lg sm:rounded-xl shadow-md"
                  />
                </div>
              </div>
            </section>

            {/* Section 4: Current Positions */}
            <section className="relative bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-sm overflow-visible border border-gray-100 mt-8">
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg sm:text-xl font-bold">
                ۴
              </div>
              <div className="relative z-10">
                <div className="text-center mb-6 sm:mb-8 md:mb-10">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-6">
                    سمت‌ها و مسئولیت‌های فعلی
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    "رئیس هیئت مدیره شرکت خدمات مالی و مالیاتی کلان حساب پارسیان",
                    "صاحب امتیاز و مدیر همکلان، اولین رسانه مدیریت مالی و حسابداری",
                    "معاون مالی و اقتصادی در گروه تکین (Tech-Inn corporate) شامل شرکت‌های متعدد در حوزه‌های بازرگانی، معدن، فناوری، کشت‌وصنعت، فناوری، پالایش و پتروشیمی",
                    "دبیرکل و عضو هیئت‌مدیره انجمن صنفی حسابداران استان تهران",
                    "بازرس کانون انجمن‌های صنفی حسابداران ایران",
                    "مدرس رسمی سازمان فنی و حرفه‌ای کشور",
                    "مدرس و سخنران در دانشگاه‌ها و مؤسسات آموزش عالی",
                    "مشاور عالی انجمن مدیران صنایع",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group bg-white/80 hover:bg-white backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-100 shadow-xs hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 text-base sm:text-xl rounded-full bg-primary/10 text-primary  flex items-center justify-center mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-xs sm:text-sm self-center text-neutrals700 leading-relaxed">
                          {item}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 5: Expertise */}
            <section className="relative bg-gradient-to-br from-primary50 to-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-gray-100 mt-8">
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg sm:text-xl font-bold">
                ۵
              </div>
              <div className="space-y-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6">
                  تخصص من، دغدغه شماست
                </h2>
                <p className="text-sm sm:text-base text-neutrals600 mb-6">
                  زمینه‌هایی که بیشترین درخواست همکاری را از سمت مدیران و
                  شرکت‌ها داشته‌ام، عبارتند از:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    "طراحی و پیاده‌سازی نظام مالی، بودجه‌ای و کنترلی در سازمان‌ها",
                    "استقرار و ممیزی کنترل‌های داخلی و فرآیندهای مالی",
                    "بازسازی و نوسازی ساختار مالی شرکت‌های در حال رشد یا بحران‌زده",
                    "مشاوره به مدیران غیرمالی در حوزه تحلیل صورت‌های مالی و تصمیم‌گیری مالی",
                    "آموزش و پرورش نیروهای متخصص برای جایگاه‌های کلیدی مالی",
                    "حسابرسی داخلی، بازرسی، حسابرسی صورت‌های مالی و تهیه گزارشات حسابرسی",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <img src={correct} alt="check" className=" " />
                      </div>
                      <span className="text-xs sm:text-sm text-neutrals600 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3 sm:gap-4 mt-8">
                  <Button
                    link="/reservations"
                    text="درخواست مشاوره"
                    className="btn btn-primary flex-1 sm:flex-none"
                  />
                  <Button
                    text="درخواست خدمات"
                    className="btn btn-outline btn-primary flex-1 sm:flex-none"
                  />
                </div>
              </div>
            </section>

            {/* Download Resume Button */}
            <div className="flex justify-center mt-8">
              <Button
                text="دانلود رزومه کامل"
                icon={"material-symbols_download text-xl ml-2"}
                className="btn btn-outline btn-primary px-8"
              />
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default HeroAbout;
