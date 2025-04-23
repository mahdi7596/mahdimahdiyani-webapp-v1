import { motion } from "framer-motion";

import CheckIcon from "../../assets/images/landing/check.svg";
import Button from "./Button";
import { ReservationType } from "../../models/reservation";

interface ReservationProps {
  index: number;
  reservation: ReservationType;
}

const ReservationCard = ({ reservation, index }: ReservationProps) => {
  return (
    <div
      key={index}
      className={`landing-card ${
        index === 1 ? "border-black bg-black text-white/60" : "bg-white"
      }`}
    >
      <div className="flex justify-between">
        <h3
          className={`text-lg font-bold text-black/50 ${
            index === 1 && "text-white/60"
          }`}
        >
          {reservation.title}
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
      <div className="flex flex-wrap items-baseline gap-1 mt-[30px]">
        <p className="text-4xl font-bold tracking-tighter leading-none">
          {reservation.price === 0
            ? "رایگان"
            : `${reservation.price.toLocaleString()}`}
          <span className="text-xs tracking-normal text-black/50">
            هزار تومان
          </span>
        </p>
        {reservation.price !== 0 && (
          <span className="tracking-tight font-bold text-base text-black/50">
            /ساعتی
          </span>
        )}
      </div>
      <Button
        link={`/reservation/${reservation._id}`}
        state={{ reservation }}
        text={"درخواست مشاوره"}
        className={`btn btn-primary w-full mt-[30px] ${
          index === 1 && "bg-white text-black"
        }`}
      />
      <ul className="flex flex-col gap-5  mt-8">
        {reservation.includedServices.map((feature, index) => (
          <li key={index} className="text-sm flex items-center gap-4">
            <img src={CheckIcon} className="h-6 w-6" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationCard;
