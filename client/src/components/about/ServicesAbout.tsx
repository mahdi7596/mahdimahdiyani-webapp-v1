import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Interface for service cards
interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
}

const ServicesAbout = () => {
  // Data for service cards
  const serviceCards: ServiceCard[] = [
    {
      icon: <i className="maicon-dashboard-solid text-3xl text-primary" />,
      title: "مشاوره",
      description:
        "مشاوره تخصصی برای رشد کسب و کار شما با راهکارهای هدفمند و استراتژیک",
      link: "/reservations",
    },
    {
      icon: <i className="maicon-dashboard-solid text-3xl text-primary" />,
      title: "آموزش‌های رایگان",
      description:
        "ارائه آموزش‌های تخصصی و کاربردی برای توسعه مهارت‌های حرفه‌ای",
      link: "#",
    },
    {
      icon: <i className="maicon-dashboard-solid text-3xl text-primary" />,
      title: "همکلان",
      description: "ایجاد فرصت‌های همکاری و شبکه‌سازی حرفه‌ای برای رشد مشترک",
      link: "#",
    },
  ];

  return (
    <div className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-900/90">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
          alt="Office background"
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            مشاوره برای رشد آنلاین شما
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            راهکارهای تخصصی برای موفقیت کسب و کار شما
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {serviceCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
            >
              {card.icon}
              <h3 className="text-2xl font-bold text-white mb-3 mt-4">
                {card.title}
              </h3>
              <p className="text-gray-300 mb-4">{card.description}</p>
              <motion.a
                href={card.link || "#"}
                className="inline-flex items-center text-primary hover:text-primary-600"
                whileHover={{ x: 5 }}
              >
                اطلاعات بیشتر
                <i className="maicon-eva_arrow-up-fill text-lg -rotate-90"></i>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesAbout;
