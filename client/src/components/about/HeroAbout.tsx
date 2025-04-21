import { motion } from "framer-motion";

const HeroAbout = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Free Trial Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm mb-8"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-neutrals500">دوره آزمایشی رایگان</span>
            <span className="text-neutrals400">
              استخدام بعدی خود را با دوره آزمایشی رایگان ما شروع کنید
            </span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-5xl font-bold text-neutrals mb-6 leading-tight">
            اتصال استعدادهای برتر با شرکت‌های پیشرو
          </h1>

          {/* Description */}
          <p className="text-neutrals400 text-lg mb-8">
            چه به دنبال فرصت شغلی بعدی خود باشید و چه به دنبال استعدادهای برتر
            برای پیوستن به تیم خود، کارشناسان استخدام ما در هر مرحله از مسیر
            راهنمای شما هستند.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary gap-2"
            >
              شروع فرآیند استخدام
              <i className="maicon-file -rotate-90"></i>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline gap-2"
            >
              اطلاعات بیشتر
              <i className="maicon-bxs_up-arrow -rotate-90"></i>
            </motion.button>
          </div>
        </motion.div>

        {/* Right Column */}
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
              className="absolute top-4 right-4 bg-white rounded-lg px-4 py-2 shadow-lg"
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
              className="absolute bottom-4 right-4 bg-white rounded-lg px-4 py-2 shadow-lg"
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

          {/* Stats Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-16 left-4 bg-white rounded-xl p-4 shadow-lg max-w-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
                alt="Team meeting"
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-bold text-neutrals mb-1">مشتریان راضی</h3>
                <div className="text-2xl font-bold text-primary mb-1">
                  15,290
                </div>
                <p className="text-sm text-neutrals400">
                  فرآیند استخدام فروش را ساده می‌کند تا بتوانید روی رشد تمرکز
                  کنید
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroAbout;
