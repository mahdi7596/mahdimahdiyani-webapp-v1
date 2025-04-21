import { ReservationType } from "../../models/reservation";
import ReservationCard from "../shared/ReservationCard";

interface ReservationTypeListProps {
  reservationTypes: ReservationType[];
}

const ReservationTypeList = ({
  reservationTypes,
}: ReservationTypeListProps) => {
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
          {reservationTypes.slice(0, 3).map((reservation, index) => (
            <ReservationCard
              key={reservation._id}
              index={index}
              reservation={reservation}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReservationTypeList;
