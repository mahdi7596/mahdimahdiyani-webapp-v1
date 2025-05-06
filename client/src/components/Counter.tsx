import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Statistic {
  value: number;
  label: string;
  suffix: string;
}

const statistics: Statistic[] = [
  { value: 20, label: "سابقه تدریس", suffix: "+" },
  { value: 2720, label: "تدریس", suffix: " ساعت" },
  { value: 50, label: "مشاوره", suffix: " ساعت" },
  { value: 75, label: "سخنرانی", suffix: " ساعت" },
];

const AnimatedCounter = ({ value, label, suffix }: Statistic) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      const duration = 4000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <div className="text-5xl md:text-6xl font-heavyBlack mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-gray-500">{label}</div>
    </motion.div>
  );
};

const About = () => {
  return (
    <div className="mt-24 mb-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
      {statistics.map((stat) => (
        <AnimatedCounter key={stat.label} {...stat} />
      ))}
    </div>
  );
};

export default About;
