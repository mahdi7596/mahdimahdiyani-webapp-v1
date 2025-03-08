import { motion } from "framer-motion";

const ServicesAbout = () => {
  return (
    <div className="relative py-24 mt-24">
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
            ما به رشد آنلاین شما کمک می‌کنیم
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            از صفحات محصول شیک تا تجربه پرداخت یکپارچه، مجموعه ما با دقت برای
            بهبود هر جنبه از فروشگاه آنلاین شما طراحی شده است.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary gap-2"
          >
            شروع کنید
            {/* <ArrowRight className="w-4 h-4" /> */}
          </motion.button>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Digital Marketing Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
          >
            <i className="maicon-dashboard-solid text-3xl text-primary "></i>
            <h3 className="text-2xl font-bold text-white mb-3 mt-4">
              دیجیتال مارکتینگ
            </h3>
            <p className="text-gray-300 mb-4">
              افزایش حضور آنلاین خود با خدمات جامع دیجیتال مارکتینگ ما، متناسب
              با افزایش ترافیک.
            </p>
            <motion.a
              href="#"
              className="inline-flex items-center text-primary hover:text-primary-600"
              whileHover={{ x: 5 }}
            >
              اطلاعات بیشتر
              <i className="maicon-eva_arrow-up-fill text-lg -rotate-90"></i>
            </motion.a>
          </motion.div>

          {/* Video Advertising Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
          >
            <i className="maicon-dashboard-solid text-3xl text-primary"></i>
            <h3 className="text-2xl font-bold text-white mb-3 mt-4">
              تبلیغات ویدیویی
            </h3>
            <p className="text-gray-300 mb-4">
              افزایش حضور آنلاین خود با خدمات جامع دیجیتال مارکتینگ ما، متناسب
              با افزایش ترافیک.
            </p>
            <motion.a
              href="#"
              className="inline-flex items-center text-primary hover:text-primary-600"
              whileHover={{ x: 5 }}
            >
              اطلاعات بیشتر
              <i className="maicon-eva_arrow-up-fill text-lg -rotate-90"></i>
            </motion.a>
          </motion.div>

          {/* Brainstorm Idea Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
          >
            <i className="maicon-dashboard-solid text-3xl text-primary "></i>
            <h3 className="text-2xl font-bold text-white mb-3 mt-4">
              ایده‌پردازی
            </h3>
            <p className="text-gray-300 mb-4">
              افزایش حضور آنلاین خود با خدمات جامع دیجیتال مارکتینگ ما، متناسب
              با افزایش ترافیک.
            </p>
            <motion.a
              href="#"
              className="inline-flex items-center text-primary hover:text-primary-600"
              whileHover={{ x: 5 }}
            >
              اطلاعات بیشتر
              <i className="maicon-eva_arrow-up-fill text-lg -rotate-90"></i>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServicesAbout;
