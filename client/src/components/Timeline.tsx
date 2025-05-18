import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Experience {
  id: string;
  position: string;
  company: string;
  date: string;
  description: string;
}

const experiences: Experience[] = [
  {
    id: "01",
    position: "1-	رئیس هیات مدیره",
    company: "دیجی‌کالا",
    date: "1403 - اکنون",
    description:
      "توسعه و بهینه‌سازی رابط کاربری وب‌سایت دیجی‌کالا با استفاده از React و Next.js. پیاده‌سازی ویژگی‌های جدید و بهبود عملکرد سایت.",
  },
  {
    id: "02",
    position: "توسعه‌دهنده فول‌استک",
    company: "اسنپ",
    date: "۱۳۹۹ - ۱۴۰۱",
    description:
      "توسعه و نگهداری سرویس‌های مختلف اسنپ با استفاده از Node.js و React. همکاری با تیم‌های مختلف برای بهبود زیرساخت‌های نرم‌افزاری.",
  },
  {
    id: "03",
    position: "توسعه‌دهنده وب",
    company: "تپسی",
    date: "۱۳۹۷ - ۱۳۹۹",
    description:
      "طراحی و توسعه رابط کاربری اپلیکیشن وب تپسی. پیاده‌سازی ویژگی‌های جدید و بهینه‌سازی عملکرد سایت.",
  },
];

const Timeline = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutrals via-neutrals600 to-neutrals500" />

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-primary300 font-semibold"
          >
            تجربیات کاری
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mt-2 text-white"
          >
            سوابق حرفه‌ای
          </motion.h2>
        </div>

        <div ref={ref} className="max-w-6xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary300 via-primary to-primary700 -translate-x-1/2 max-md:hidden" />

          {/* Experience Items */}
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative mb-16 last:mb-0"
              >
                <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center">
                  {/* Right Side Content for Large Screens */}
                  <div
                    className={`hidden md:block ${
                      isEven ? "md:block" : "md:invisible"
                    } md:pl-8`}
                  >
                    <div className="max-w-xl mr-auto bg-gradient-to-br from-surfaceBg to-primary100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-neutrals">
                          {exp.position}
                        </h3>
                        <span className="text-primary font-semibold px-4 py-1 bg-primary100 rounded-full">
                          {exp.id}
                        </span>
                      </div>
                      <div className="mb-4">
                        <span className="text-primary font-semibold">
                          {exp.company}
                        </span>
                        <span className="text-neutrals400 mr-4">
                          {exp.date}
                        </span>
                      </div>
                      <p className="text-neutrals400 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Circle */}
                  <div className="w-8 h-8 bg-surfaceBg border-4 border-primary rounded-full z-10 mx-auto shadow-lg shadow-primary/20 max-md:hidden" />

                  {/* Left Side Content for Large Screens */}
                  <div
                    className={`hidden md:block ${
                      !isEven ? "md:block" : "md:invisible"
                    } md:pr-8`}
                  >
                    <div className="max-w-xl ml-auto bg-gradient-to-br from-surfaceBg to-primary100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-neutrals">
                          {exp.position}
                        </h3>
                        <span className="text-primary font-semibold px-4 py-1 bg-primary100 rounded-full">
                          {exp.id}
                        </span>
                      </div>
                      <div className="mb-4">
                        <span className="text-primary font-semibold">
                          {exp.company}
                        </span>
                        <span className="text-neutrals400 mr-4">
                          {exp.date}
                        </span>
                      </div>
                      <p className="text-neutrals400 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>

                  {/* Mobile View - Single Column */}
                  <div className="md:hidden px-4">
                    <div className="max-w-xl mx-auto bg-gradient-to-br from-surfaceBg to-primary100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-neutrals">
                          {exp.position}
                        </h3>
                        <span className="text-primary font-semibold px-4 py-1 bg-primary100 rounded-full">
                          {exp.id}
                        </span>
                      </div>
                      <div className="mb-4">
                        <span className="text-primary font-semibold">
                          {exp.company}
                        </span>
                        <span className="text-neutrals400 mr-4">
                          {exp.date}
                        </span>
                      </div>
                      <p className="text-neutrals400 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
