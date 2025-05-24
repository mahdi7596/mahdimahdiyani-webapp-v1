import { motion } from "framer-motion";
import Button from "../shared/Button";

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
        "با مشاوره مالی تخصصی، بهترین تصمیمات را برای رشد کسب‌وکار و سازمانتان بگیرید.",
      link: "/reservations",
    },
    {
      icon: <i className="maicon-dashboard-solid text-3xl text-primary" />,
      title: "حسابرسی",
      description:
        "با دریافت گزارشات حسابرسی دقیق و شفاف، سلامت مالی سازمانتان را تضمین کنید و به ذینفعان ارائه نمایید.",
      link: "#",
    },
    {
      icon: <i className="maicon-dashboard-solid text-3xl text-primary" />,
      title: "آموزش ",
      description:
        "دوره‌های آموزشی سازمانی با تمرکز بر نیازهای مالی، مدیریتی و اجرایی ارائه می‌شود.",
      link: "/search",
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
          <h2 className="text-4xl md:text-5xl font-bold text-surfaceBg mb-8">
            من برای رشد مالی شما، برنامه دارم{" "}
          </h2>
          <p className="text-white/80 max-w-2xl text-lg mx-auto text-right leading-8">
            با پشتوانه‌ی نزدیک به دو دهه تجربه در مدیریت مالی، حسابرسی، مشاوره و
            آموزش تخصصی، در کنار شما هستم تا مسیر رشد و توسعه مالی را با رویکردی
            هدفمند، ساختاریافته و اثربخش طی کنیم.
            <span>همین حالا گام اول را بردارید؛</span>
            با هم آینده مالی را متفاوت خواهیم ساخت.
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
              <div className="flex items-center gap-2 ">
                {card.icon}
                <h3 className="text-2xl font-bold text-white">{card.title}</h3>
              </div>
              <p className="text-gray-300 mt-6 mb-8">{card.description}</p>
              <Button
                text="اطلاعات بیشتر"
                link={card.link || "#"}
                icon="eva_arrow-up-fill text-lg -rotate-90"
                className="btn btn-sm btn-outline btn-primary w-fit self-center"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesAbout;
