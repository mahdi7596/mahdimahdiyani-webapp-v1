import { mockReservations } from "../../mocks/mockReservations";

import { motion } from "framer-motion";

import CheckIcon from "../../assets/images/landing/check.svg";

const ReservationCard = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title ">پلن‌های خدمات</h2>
          <p className="section-description">
            خدمات متنوع مشاوره و آموزش مالی، متناسب با نیازهای شما
          </p>
        </div>
        <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center">
          {mockReservations.map(({ title, includedServices, price }, index) => (
            <div
              key={index}
              className={`landing-card ${
                index === 1 && "border-black bg-black text-white/60"
              }`}
            >
              <div className="flex justify-between">
                <h3
                  className={`text-lg font-bold text-black/50 ${
                    index === 1 && "text-white/60"
                  }`}
                >
                  {title}
                </h3>
                {index === 1 && (
                  <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20 ">
                    <motion.span
                      animate={{ backgroundPositionX: "100%" }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop",
                      }}
                      className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF)] [background-size:200%] text-transparent bg-clip-text font-medium"
                    >
                      پرطرفدار
                    </motion.span>
                  </div>
                )}
              </div>
              <div className="flex items-baseline gap-1 mt-[30px]">
                <span className="text-4xl font-bold tracking-tighter leading-none">
                  {price === 0 ? "رایگان" : `${price} هزار تومان`}
                </span>
                {price !== 0 && (
                  <span className="tracking-tight font-bold text-black/50">
                    /ساعتی
                  </span>
                )}
              </div>
              <button
                className={`btn btn-primary w-full mt-[30px] ${
                  index === 1 && "bg-white text-black"
                }`}
              >
                درخواست مشاوره
              </button>
              <ul className="flex flex-col gap-5  mt-8">
                {includedServices.map((feature, index) => (
                  <li key={index} className="text-sm flex items-center gap-4">
                    <img src={CheckIcon} className="h-6 w-6" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReservationCard;
