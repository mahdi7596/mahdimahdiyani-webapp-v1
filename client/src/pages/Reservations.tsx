import { useReservationTypes } from "../hooks/useReservationTypes";

import ReservationTypeList from "../components/landing/ReservationTypeList";

const Reservations = () => {
  const { reservationTypes, loading } = useReservationTypes();

  return (
    <div className="section-container section-inner-space">
      {loading && (
        <span className="loading loading-bars loading-lg text-info self-center mb-6"></span>
      )}
      {reservationTypes.length > 0 ? (
        <ReservationTypeList
          reservationTypes={reservationTypes}
          containerClass="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-6 mt-12 sm:mt-20 px-4"
        />
      ) : (
        !loading && (
          <div
            role="alert"
            className="alert bg-info text-primary-content  animate-[pulse_2s_ease-in-out_infinite]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>هیچ نوع رزروی پیدا نشد</span>
          </div>
        )
      )}
    </div>
  );
};

export default Reservations;
