import { useLocation, useParams } from "react-router-dom";
import { ReservationType } from "../models/reservation";
import Button from "../components/shared/Button";

// interface ReservationProps {}

const Reservation = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const reservation: ReservationType = state?.reservation;

  const monthNames = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  };

  console.log(reservation.availableDates, "reservation");
  // const filteredReservations = [];

  console.log(
    "iran",
    reservation.availableDates.map((availableDate) =>
      availableDate.date.slice(5, 7)
    )
  );

  return (
    <section className="section-container section-inner-space">
      <h2 className="text-lg">
        برای رزرو {reservation?.title} میتوانید یکی از تاریخ های زیر را انتخاب
        کنید
      </h2>
      <p className="mt-2">{reservation?.description}</p>
      <div className="bg-surfaceBg  p-6 rounded border border-surfaceBorder  mt-6 flex items-center justify-between">
        <p className="text-2xl font-medium">اسفند</p>
        <div className="flex items-center gap-x-3.5">
          <Button
            className="btn btn-outline btn-primary btn-soft hover:btn-primary"
            icon="weui_arrow-filled text-3xl"
          />
          <Button
            className="btn btn-outline btn-primary btn-soft hover:btn-primary"
            icon="weui_arrow-filled text-3xl rotate-180"
          />
        </div>
      </div>
    </section>
  );
};

export default Reservation;
