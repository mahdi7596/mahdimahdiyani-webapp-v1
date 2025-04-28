import { ReservationType } from "../../models/reservation";
import Button from "../shared/Button";
import ReservationCard from "../shared/ReservationCard";

interface ReservationTypeListProps {
  reservationTypes: ReservationType[];
  sliceData?: boolean;
  containerClass?: string;
}

const ReservationTypeList = ({
  reservationTypes,
  sliceData,
  containerClass,
}: ReservationTypeListProps) => {
  return (
    <section id="services" className={`${sliceData ? "py-24" : "py-12"}`}>
      <div className="section-heading">
        <h2 className="section-title ">پلن‌های خدمات</h2>
        <p className="section-description">
          خدمات متنوع مشاوره و آموزش مالی، متناسب با نیازهای شما
        </p>
      </div>
      <div className={`${containerClass}`}>
        {(sliceData ? reservationTypes.slice(0, 3) : reservationTypes).map(
          (reservation, index) => (
            <ReservationCard
              key={reservation._id}
              index={index}
              reservation={reservation}
            />
          )
        )}
      </div>
      {sliceData ? (
        <Button
          link="/reservations"
          text="مشاهده تمام خدمات"
          className="w-fit btn-md btn-outline btn-primary  mx-auto mt-12"
        />
      ) : null}
    </section>
  );
};

export default ReservationTypeList;
