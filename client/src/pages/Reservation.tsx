import { useLocation, useParams } from "react-router-dom";
import { ReservationType } from "../models/reservation";

interface ReservationProps {}

const Reservation = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const reservation: ReservationType = state?.reservation;
  console.log(reservation, "reservation inside reservatioin page");

  return <div>Reservation: {id}</div>;
};

export default Reservation;
