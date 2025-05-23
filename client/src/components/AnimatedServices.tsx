import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ExperienceItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  date: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    title: "توسعه وب‌سایت‌های مدرن",
    description:
      "طراحی و توسعه وب‌سایت‌های پیشرفته با استفاده از آخرین تکنولوژی‌های روز",
    icon: (
      <i
        className="maicon-dashboard-solid text-2xl text-primary leading-0"
        style={{ lineHeight: 0 }}
      />
    ),
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072",
    date: "۱۴۰۲-۱۴۰۳",
  },
  {
    id: 2,
    title: "طراحی رابط کاربری",
    description: "خلق تجربه‌های کاربری منحصر به فرد و جذاب برای کاربران",
    icon: (
      <i
        className="maicon-dashboard-solid text-2xl text-primary leading-0"
        style={{ lineHeight: 0 }}
      />
    ),
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=2064",
    date: "۱۴۰۱-۱۴۰۲",
  },
  {
    id: 3,
    title: "توسعه نرم‌افزارهای تجاری",
    description: "ایجاد راهکارهای نرم‌افزاری برای کسب و کارها",
    icon: (
      <i
        className="maicon-dashboard-solid text-2xl text-primary leading-0"
        style={{ lineHeight: 0 }}
      />
    ),
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015",
    date: "۱۴۰۰-۱۴۰۱",
  },
  {
    id: 4,
    title: "مشاوره فنی",
    description: "ارائه راهکارهای فنی و مشاوره در زمینه تکنولوژی",
    icon: (
      <i
        className="maicon-dashboard-solid text-2xl text-primary  leading-0"
        style={{ lineHeight: 0 }}
      />
    ),
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=2070",
    date: "۱۳۹۹-۱۴۰۰",
  },
];

const AnimatedServices = () => {
  const [selectedExp, setSelectedExp] = useState(experiences[0]);
  const [isAutoSlideEnabled, setIsAutoSlideEnabled] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoSlideEnabled) {
      interval = setInterval(() => {
        const nextIndex =
          (experiences.findIndex((exp) => exp.id === selectedExp.id) + 1) %
          experiences.length;
        setSelectedExp(experiences[nextIndex]);
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedExp, isAutoSlideEnabled, experiences]);

  const handleExpClick = (exp: ExperienceItem) => {
    setSelectedExp(exp);
    setIsAutoSlideEnabled(false);
  };

  return (
    <section
      id="showcase"
      className="py-24 bg-gradient-to-b from-[#ffffff] to-[#FFFBF5]"
    >
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-primary font-semibold"
            >
              نمونه کارها
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold mt-2 gradient-text"
            >
              پروژه‌های برجسته
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedExp.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    src={selectedExp.image}
                    alt={selectedExp.title}
                    className="w-full h-[600px] object-cover rounded-t-3xl"
                  />
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Experience Cards */}
            <div className="space-y-4">
              {experiences.map((exp) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: exp.id * 0.1 }}
                  className={`bg-surfaceBg p-6 rounded-2xl cursor-pointer border ${
                    selectedExp.id === exp.id
                      ? " border-primary shadow-lg bg-gradient-to-br from-primary0 to-primary100"
                      : ""
                  }`}
                  onClick={() => handleExpClick(exp)}
                >
                  <div className="flex items-start gap-4">
                    <div className="pt-4 px-2 pb-1.5 rounded-lg bg-primary200">
                      {exp.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutrals mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-neutrals-400">{exp.description}</p>
                      <p className="text-neutrals-400 text-sm">{exp.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedServices;
