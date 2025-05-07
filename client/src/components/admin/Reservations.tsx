import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReservationsStart,
  fetchReservationsSuccess,
  fetchReservationsFailure,
} from "../../redux/reservations/reservationsSlice";

import moment from "jalali-moment";
import { Link } from "react-router-dom";

const Reservations = () => {
  const dispatch = useDispatch();

  const { reservations, loading, error } = useSelector(
    (state: any) => state.reservations
  );

  const { currentUser } = useSelector(
    (state: { user: { currentUser: any } }) => state.user
  );

  useEffect(() => {
    const fetchReservations = async () => {
      dispatch(fetchReservationsStart());
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/reservations`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          dispatch(fetchReservationsSuccess(data));
        } else {
          dispatch(fetchReservationsFailure(data.message));
        }
      } catch (err) {
        console.log(err);
        dispatch(fetchReservationsFailure("خطا در دریافت اطلاعات رزروها"));
      }
    };

    fetchReservations();
  }, [dispatch]);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">
        {currentUser.isAdmin ? "لیست تمام رزروها" : "رزروهای من"}
      </h1>
      {reservations.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra text-right border rounded-sm">
            <thead>
              <tr>
                <th>نام رزرو</th>
                <th>تاریخ رزرو </th>
                <th>ساعت رزرو</th>
                <th>قیمت</th>
                {currentUser.isAdmin && <th>مشخصات کاربر</th>}
              </tr>
            </thead>
            <tbody>
              {[...reservations].map((reserve, i) => (
                <tr key={i}>
                  <td>
                    <span>{reserve.type}</span>
                  </td>
                  <td>
                    <span>
                      {moment(reserve.date, "YYYY/MM/DD")
                        .locale("fa")
                        .format("YYYY/MM/DD")}
                    </span>
                  </td>
                  <td>
                    <span>{reserve.time}</span>
                  </td>
                  <td>
                    <span>{reserve.price.toLocaleString()}</span>
                    <span className="text-[10px] mr-0.5 text-neutrals300">
                      تومان
                    </span>
                  </td>
                  {currentUser.isAdmin && (
                    <td>
                      <span>{reserve.user?.username}</span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div role="alert" className="alert bg-info text-primary-content">
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
          <span>
            تا حالا هیچ رزروی ثبت نکرده‌اید. برای شروع، روی{" "}
            <Link to="/" className="font-heavyBlack hover:text-blue-200">
              لینک
            </Link>{" "}
            کلیک کنید
          </span>
        </div>
      )}
    </div>
  );
};

export default Reservations;
