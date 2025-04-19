import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  flatReservationDates,
  ReservationStatus,
  ReservationType,
} from "../models/reservation";

import { EnglishMonthNames, PersianMonthNames } from "../utils/monthNames";

import Input from "../components/shared/Input";
import Button from "../components/shared/Button";

import moment from "jalali-moment";

import CheckIcon from "../assets/images/landing/check.svg";

import { ToastContainer, toast } from "react-toastify";
import { getRemainingTime } from "../utils/timeUtils";
import { useSelector } from "react-redux";

const Reservation = () => {
  const { id } = useParams();

  const { currentUser } = useSelector(
    (state: { user: { currentUser: any } }) => state.user
  );
  const navigate = useNavigate();
  const location = useLocation();

  const [reservation, setReservation] = useState<ReservationType | null>(null);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedTime, setSelectedTime] = useState<{
    _id: string;
    time: string;
  }>();
  const [reservedTimes, setReservedTimes] = useState<
    { time: string; status: string; createdAt: string }[]
  >([]);
  const [countdowns, setCountdowns] = useState<{ [time: string]: string }>({});
  const [restoredFromSession, setRestoredFromSession] = useState(false);

  const preselectedDate = location.state?.date;
  const preselectedTime = location.state?.timeSlot;

  const currentDate = moment(); // full moment object
  // const today = new Date(); old way
  // const todaysDate = today.toISOString().split("T")[0]; old way

  const today = currentDate.format("YYYY-MM-DD"); // e.g., "2025-04-09"
  const currentTime = currentDate.format("HH:mm"); // e.g., "15:10"

  const groupedDates: flatReservationDates[] =
    reservation &&
    reservation.availableDates.reduce((acc, availableDate) => {
      // Get month number from original date
      const enMonthNumber = availableDate.date.slice(5, 7); // Gregorian month like "04"
      const enMonthName = EnglishMonthNames[enMonthNumber]; // English Month like "April"

      // Convert to Jalaali date
      const jalaaliDate = moment(availableDate.date, "YYYY-MM-DD").locale("fa");

      const faMonthNumber = jalaaliDate.format("MM"); // Persian month number like "01"
      const faYearMonthNumber = jalaaliDate.format("YYYY-MM"); // Persian year-month number like "1404-01"
      const faMonthName = PersianMonthNames[faMonthNumber]; // Persian month name like "فروردین"

      const existingMonth = acc.find(
        // (item) => item.month.en === enMonthName && item.month.fa === faMonthName
        (item) => item.month.fa === faMonthName
      );

      if (existingMonth) {
        existingMonth.daysInsideMonth.push({
          date: availableDate.date,
          timeSlots: availableDate.timeSlots,
        });
      } else {
        acc.push({
          month: {
            en: enMonthName,
            fa: faMonthName,
            faNum: faYearMonthNumber,
          },
          daysInsideMonth: [
            {
              date: availableDate.date,
              timeSlots: availableDate.timeSlots,
            },
          ],
        });
      }

      return acc;
    }, []);

  const filteredGroupedDates =
    groupedDates &&
    groupedDates.filter((group) => {
      const groupMonth = group.month.faNum; // e.g., "1404-01"
      const currentMonth = moment().format("jYYYY-jMM");

      // If the month is in the future, keep it
      if (groupMonth > currentMonth) return true;

      // If it's the current month, check if it still has valid future days
      if (groupMonth === currentMonth) {
        const hasFutureDays = group.daysInsideMonth.some((day) => {
          return moment(day.date).isSameOrAfter(today, "day");
        });
        return hasFutureDays;
      }

      // Otherwise it's in the past
      return false;
    });

  const activeDay =
    filteredGroupedDates &&
    filteredGroupedDates[currentMonthIndex].daysInsideMonth.find(
      (f) => f.date == selectedDate
    );

  const fetchReservation = async () => {
    try {
      const response = await fetch(`/api/reservationtypes/${id}`);
      const data = await response.json();
      setReservation(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReservedTimes = async () => {
    const response = await fetch(
      `/api/reservations/by-date?date=${selectedDate}&reservationTypeId=${id}`
    );

    const data = await response.json();

    setReservedTimes(
      data.reservations.map((item) => ({
        time: item.timeSlot,
        status: item.status,
        createdAt: item.createdAt,
      }))
    );
  };

  const onReserve = async () => {
    const req = {
      reservationTypeId: id,
      date: selectedDate,
      timeSlot: selectedTime.time,
    };

    if (!currentUser) {
      // Save reservation info temporarily
      sessionStorage.setItem(
        "pendingReservation",
        JSON.stringify({
          reservationTypeId: id,
          date: selectedDate,
          timeSlot: selectedTime,
          monthIndex: currentMonthIndex,
          timestamp: Date.now(), // 🕒 for expiry check
        })
      );

      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`/api/reservations/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });

      const data = await response.json();

      setSelectedTime(null);

      if (!response.ok) {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (response.ok) {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReservation();
  }, [id]);

  // useEffect(() => {
  //   setSelectedDate(null);
  //   setSelectedTime(null);
  //   setReservedTimes(null);
  // }, [currentMonthIndex]);

  useEffect(() => {
    if (!restoredFromSession) {
      setSelectedDate(null);
      setSelectedTime(null);
    }

    setReservedTimes(null);
  }, [currentMonthIndex]);

  useEffect(() => {
    if (restoredFromSession) {
      setRestoredFromSession(false); // only use it once
    }
  }, [currentMonthIndex]);

  useEffect(() => {
    if (selectedDate) {
      fetchReservedTimes();
    }
    // fetchReservedTimes(); // initial fetch

    const interval = setInterval(() => {
      fetchReservedTimes(); // refresh every 30 seconds
    }, 30000); // 30,000ms = 30 sec

    return () => clearInterval(interval); // cleanup on unmount
  }, [selectedDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCountdowns: { [time: string]: string } = {};

      if (reservedTimes) {
        reservedTimes.forEach((r) => {
          if (r.status === "pending" && r.createdAt) {
            updatedCountdowns[r.time] = getRemainingTime(r.createdAt);
          }
        });
      }

      setCountdowns(updatedCountdowns);
    }, 1000); // every second

    return () => clearInterval(interval);
  }, [reservedTimes]);

  useEffect(() => {
    const sessionData = sessionStorage.getItem("pendingReservation");
    let restored = false;

    if (sessionData) {
      try {
        const parsed = JSON.parse(sessionData);
        const isExpired = Date.now() - parsed.timestamp > 5 * 60 * 1000;

        if (!isExpired) {
          setSelectedDate(parsed.date);
          setSelectedTime(parsed.timeSlot);
          if (typeof parsed.monthIndex === "number") {
            setCurrentMonthIndex(parsed.monthIndex);
          }
          restored = true;
          setRestoredFromSession(true); // ✅ set flag here
        }

        sessionStorage.removeItem("pendingReservation");
      } catch (err) {
        console.log(err);
        sessionStorage.removeItem("pendingReservation");
      }
    }

    if (!restored) {
      if (preselectedDate) setSelectedDate(preselectedDate);
      if (preselectedTime) setSelectedTime(preselectedTime);
    }
  }, []);

  console.log(groupedDates, "groupedDates");

  return (
    <section className="section-container section-inner-space grid grid-cols-12 gap-4 sm:gap-8">
      <div className="col-span-12 md:col-span-8">
        <h2 className="text-2xl xs:text-3xl font-bold text-center xs:text-right">
          رزرو {reservation?.title}
        </h2>
        <div className="mt-6 common-card">
          <div className="flex items-center justify-between">
            <p className="text-xl xs:text-2xl font-medium">
              {filteredGroupedDates &&
                filteredGroupedDates[currentMonthIndex].month.fa}
            </p>
            <div className="flex items-center gap-x-3.5">
              <Button
                onAction={() => setCurrentMonthIndex((prev) => prev + 1)}
                disabled={
                  currentMonthIndex === (filteredGroupedDates?.length ?? 0) - 1
                }
                title="بعد"
                className="btn btn-outline btn-primary btn-soft btn-sm xs:btn-md hover:btn-primary"
                icon="weui_arrow-filled text-3xl"
              />
              <Button
                onAction={() => setCurrentMonthIndex((prev) => prev - 1)}
                disabled={currentMonthIndex === 0}
                title="قبل"
                className="btn btn-outline btn-primary btn-soft btn-sm xs:btn-md hover:btn-primary"
                icon="weui_arrow-filled text-3xl rotate-180"
              />
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex flex-wrap items-center gap-8 mb-8">
            {filteredGroupedDates &&
              filteredGroupedDates[currentMonthIndex].daysInsideMonth
                .sort((a, b) => {
                  return a.date.localeCompare(b.date);
                })
                .map((day, index) => {
                  const isPastDate =
                    day.date < today ||
                    (day.date == today &&
                      day.timeSlots.every((e) => currentTime > e.time));
                  return (
                    <div
                      key={index}
                      className="group flex flex-col gap-y-3 items-center justify-center"
                    >
                      <Button
                        onAction={() => {
                          setSelectedDate(day.date);
                        }}
                        text={moment(day.date, "YYYY/MM/DD")
                          .locale("fa")
                          .format("DD")}
                        className={`btn rounded-full ${
                          isPastDate
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : `group-hover:bg-neutral group-hover:text-white ${
                                day.date === selectedDate
                                  ? "bg-neutral text-white pointer-events-none"
                                  : "btn-outline"
                              }`
                        }`}
                        disabled={isPastDate}
                      />
                      <span>
                        {/* {day.date}/{selectedDate} */}
                        {moment(day.date).locale("fa").format("dddd")}
                      </span>
                    </div>
                  );
                })}
          </div>
          {activeDay && (
            <div className="flex flex-col">
              <div className="flex items-center flex-wrap gap-3  justify-start">
                {activeDay.timeSlots.map((m) => {
                  const matchedTime =
                    reservedTimes &&
                    reservedTimes.find((i) => i.time === m.time);
                  return (
                    <div
                      key={m._id}
                      className="flex flex-col items-center gap-y-1.5"
                    >
                      <Button
                        onAction={() => setSelectedTime(m)}
                        text={m.time}
                        className={`btn text-white hover:!text-white btn-sm xs:btn-md ${
                          selectedTime && selectedTime._id === m._id
                            ? "btn-success"
                            : matchedTime?.status ===
                              ReservationStatus.Confirmed
                            ? "bg-blue-500 pointer-events-none"
                            : matchedTime?.status === ReservationStatus.Pending
                            ? "bg-orange-400 pointer-events-none"
                            : "btn-outline btn-success"
                        }`}
                        disabled={
                          today === selectedDate && currentTime >= m.time
                        }
                      />
                      <span
                        className={`flex items-center gap-x-0.5 text-xs font-light ${
                          matchedTime ? "text-black" : "text-white"
                        } ${
                          matchedTime &&
                          matchedTime.status === ReservationStatus.Pending &&
                          "animate-[pulse_2s_ease-in-out_infinite]"
                        }`}
                      >
                        {matchedTime && (
                          <i
                            className={`maicon-weui_info-filled ${
                              matchedTime?.status ===
                              ReservationStatus.Confirmed
                                ? "text-blue-400"
                                : "text-orange-400"
                            }`}
                          />
                        )}
                        {matchedTime?.status === ReservationStatus.Confirmed &&
                          "رزرو شده"}
                        {matchedTime?.status === ReservationStatus.Pending &&
                          `در حال رزرو (${getRemainingTime(
                            matchedTime.createdAt
                          )})`}

                        {!matchedTime && "mahdi"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="common-card col-span-12 md:col-span-4 flex flex-col">
        <p className="text-base">{reservation?.description}</p>
        {reservation && reservation.includedServices ? (
          <ul className="mt-2.5">
            {reservation.includedServices.map((service, index) => (
              <li key={index} className="flex items-center gap-0.5">
                <img src={CheckIcon} className="w-4" />
                {service}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="flex items-center gap-1 mt-4">
          <Input
            name="discountCode"
            // value={email.value}
            // onChange={email.onChange}
            // error={email.error}
            fieldsetClassName="w-full"
            inputClassName="py-0.5 px-2 mb-1.5"
            type="text"
            placeholder="کد تخفیف"
          />
          <Button text="اعمال" className="btn btn-outline btn-primary" />
        </div>
        <hr className="my-4" />
        <div className="flex items-center justify-between text-lg">
          <p>قیمت:</p>
          <span className="font-bold">
            {reservation && reservation.price.toLocaleString()} تومان
          </span>
        </div>
        <Button
          onAction={onReserve}
          disabled={!selectedDate || !selectedTime}
          text="پرداخت و رزرو"
          className="btn btn-primary mt-6 flex self-end"
        />
        <ToastContainer />
      </div>
    </section>
  );
};

export default Reservation;
