import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ExperienceItem {
  position: string;
  company: string;
  description?: string;
}

interface YearExperience {
  year: string;
  items: ExperienceItem[];
}

const timelineData: YearExperience[] = [
  {
    year: "۱۴۰۳",
    items: [
      {
        position: "معاون مالی و اقتصادی",
        company: "گروه تکین",
      },
      {
        position: "بازرس اصلی",
        company: "کانون انجمن های صنفی حسابداران ایران",
      },
      {
        position: "مشاور عالی دبیرکل",
        company: "انجمن مدیران صنایع ایران",
      },
    ],
  },
  {
    year: "۱۴۰۲",
    items: [
      {
        position: "بازرس",
        company: "سازمان اقتصاد اسلامی",
      },
    ],
  },
  {
    year: "۱۴۰۱",
    items: [
      {
        position: "دبیرکل و عضو هیات مدیره",
        company: "انجمن صنفی حسابداران استان تهران",
      },
      {
        position: "حسابرس داخلی",
        company: "هلدینگ سرمایه گذاری غدیر",
      },
    ],
  },
  {
    year: "۱۴۰۰",
    items: [
      {
        position: "بنیان گذار، صاحب امتیاز و رهبر",
        company: "رسانه همکلان",
      },
    ],
  },
  {
    year: "۱۳۹۹",
    items: [
      {
        position: "مدرس",
        company: "دانشگاه علمی-کاربردی",
      },
    ],
  },
  {
    year: "۱۳۹۸",
    items: [
      {
        position: "مدرس رسمی",
        company: "سازمان آموزش فنی و حرفه ای کشور",
      },
      {
        position: "معاون مالی و اداری",
        company: "هلدینگ فناوری آستان قدس رضوی",
      },
    ],
  },
  {
    year: "۱۳۹۷",
    items: [
      {
        position: "مدیر دپارتمان مالی و حسابداری",
        company: "مجتمع فنی پلی تکنیک تهران",
      },
    ],
  },
  {
    year: "۱۳۹۵",
    items: [
      {
        position: "رئیس هیات مدیره",
        company: "شرکت خدمات مالی کلان حساب پارسیان",
      },
      {
        position: "سرپرست ارشد",
        company: "موسسه حسابرسی کارآمد حساب ایرانیان",
      },
    ],
  },
  {
    year: "۱۳۹۲",
    items: [
      {
        position: "حسابرس ارشد",
        company: "موسسه حسابرسی آزموده کاران",
      },
    ],
  },
  {
    year: "۱۳۸۹",
    items: [
      {
        position: "حسابرس",
        company: "موسسه حسابرسی تدبیرمحاسب آریا",
      },
    ],
  },
];

const Timeline = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
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

        <div ref={ref} className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute right-1/2 left-1/2 w-0.5 h-full bg-gradient-to-b from-primary300 via-primary to-primary700 -translate-x-1/2" />

          {/* Timeline Items */}
          {timelineData.map((yearData, index) => (
            <motion.div
              key={yearData.year}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative mb-12"
            >
              {/* Year Badge */}
              <div className="flex items-center justify-center mb-6">
                <div className="bg-primary text-white font-bold px-6 py-2 rounded-full shadow-lg">
                  {yearData.year}
                </div>
              </div>

              {/* Experience Items */}
              <div className="space-y-4">
                {yearData.items.map((item, itemIndex) => (
                  <motion.div
                    key={`${yearData.year}-${itemIndex}`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + index * 0.1 + itemIndex * 0.05,
                    }}
                    className={`relative bg-gradient-to-br from-surfaceBg to-primary100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 max-w-2xl mx-auto ${
                      index % 2 === 0
                        ? "md:ml-auto md:mr-0"
                        : "md:mr-auto md:ml-0"
                    }`}
                  >
                    <h3 className="text-xl font-bold text-neutrals mb-2">
                      {item.position}
                    </h3>
                    <p className="text-primary font-semibold">{item.company}</p>
                    {item.description && (
                      <p className="text-neutrals400 mt-2">
                        {item.description}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
