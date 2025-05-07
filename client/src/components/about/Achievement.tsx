import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Import the image directly
import avatarImage from "../../assets/images/landing/certificate.jpg";

// Define the interface for Achievement
interface Achievement {
  image: string;
  title: string;
  description: string;
}

// Achievement data array with Persian content
const achievementsData: Achievement[] = [
  {
    image: avatarImage,
    title: "همکاری تیمی",
    description:
      "با تکیه بر قدرت کار تیمی و روحیه همکاری، موفق به دستاوردهای بزرگی شده‌ایم.",
  },
  {
    image: avatarImage,
    title: "همکاری تیمی",
    description:
      "با تکیه بر قدرت کار تیمی و روحیه همکاری، موفق به دستاوردهای بزرگی شده‌ایم.",
  },
  {
    image: avatarImage,
    title: "همکاری تیمی",
    description:
      "با تکیه بر قدرت کار تیمی و روحیه همکاری، موفق به دستاوردهای بزرگی شده‌ایم.",
  },
  {
    image: avatarImage,
    title: "همکاری تیمی",
    description:
      "با تکیه بر قدرت کار تیمی و روحیه همکاری، موفق به دستاوردهای بزرگی شده‌ایم.",
  },
  {
    image: avatarImage,
    title: "همکاری تیمی",
    description:
      "با تکیه بر قدرت کار تیمی و روحیه همکاری، موفق به دستاوردهای بزرگی شده‌ایم.",
  },
  {
    image: avatarImage,
    title: "همکاری تیمی",
    description:
      "با تکیه بر قدرت کار تیمی و روحیه همکاری، موفق به دستاوردهای بزرگی شده‌ایم.",
  },
];

const Achievements: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Calculate slides differently for mobile and desktop
  const getSlidesCount = () => {
    // On mobile, each slide is one card
    // On desktop, each slide is 3 cards
    return window.innerWidth < 768
      ? achievementsData.length
      : Math.ceil(achievementsData.length / 3);
  };

  const [slidesCount, setSlidesCount] = useState(getSlidesCount());

  // Update slides count on window resize
  useEffect(() => {
    const handleResize = () => {
      setSlidesCount(getSlidesCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesCount);
    }, 5000);

    return () => clearInterval(interval);
  }, [slidesCount]);

  // Get the achievements for the current slide
  const getCurrentSlideAchievements = () => {
    if (window.innerWidth < 768) {
      // Mobile: one card per slide
      return [achievementsData[currentSlide]];
    } else {
      // Desktop: 3 cards per slide
      const startIndex = currentSlide * 3;
      return achievementsData.slice(startIndex, startIndex + 3);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">افتخارات</h2>

        {/* Achievements Slider */}
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center mb-8"
        >
          {getCurrentSlideAchievements().map((achievement, index) => (
            <div key={index} className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
                {/* Image - Full width and larger */}
                <div className="w-full mb-6 flex justify-center">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full max-w-[300px] h-auto object-contain"
                  />
                </div>

                {/* Content - Centered */}
                <div className="w-full" dir="rtl">
                  <h3 className="text-2xl font-semibold mb-3">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 text-base">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Slider dots */}
        <div className="flex justify-center items-center gap-x-3">
          <div className="flex gap-x-3">
            {[...Array(slidesCount)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
