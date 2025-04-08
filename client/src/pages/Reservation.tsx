import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { flatReservationDates, ReservationType } from "../models/reservation";
import { EnglishMonthNames, PersianMonthNames } from "../utils/monthNames";

import Button from "../components/shared/Button";

import moment from "jalali-moment";

import CheckIcon from "../assets/images/landing/check.svg";
import Input from "../components/shared/Input";

const Reservation = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [activeDayDate, setActiveDayDate] = useState<string>();
  const [selectedTime, setSelectedTime] = useState<{
    _id: string;
    time: string;
  }>();

  const reservation: ReservationType = state?.reservation;

  const groupedDates: flatReservationDates[] =
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

  const filteredGroupedDates = groupedDates.filter((date) => {
    const currentMonthYear = moment().format("jYYYY-jMM");
    return date.month.faNum >= currentMonthYear;
  });

  const activeDay = filteredGroupedDates[
    currentMonthIndex
  ].daysInsideMonth.find((f) => f.date == activeDayDate);

  console.log(activeDayDate, "activeDayDate");
  console.log(selectedTime, "selectedTime");

  useEffect(() => {
    setActiveDayDate(null);
  }, [currentMonthIndex]);

  const currentDate = moment(); // full moment object

  // const today = new Date(); old way
  // const todaysDate = today.toISOString().split("T")[0]; old way

  // console.log(filteredGroupedDates, "filteredGroupedDates");

  // console.log(todaysDate, "todaysDate");
  const currentDateFormatted = currentDate.format("YYYY-MM-DD"); // e.g., "2025-04-09"
  const currentTime = currentDate.format("HH:mm"); // e.g., "15:10"

  // console.log(currentDateFormatted, "currentDateFormatted");
  // console.log(currentTime, "currentTime");

  return (
    <section className="section-container section-inner-space grid grid-cols-12 gap-8">
      <div className="col-span-8">
        <h2 className="text-3xl font-bold">رزرو {reservation?.title}</h2>
        <div className="mt-6 common-card">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-medium">
              {filteredGroupedDates[currentMonthIndex].month.fa}
            </p>
            <div className="flex items-center gap-x-3.5">
              <Button
                onAction={() => setCurrentMonthIndex((prev) => prev + 1)}
                disabled={currentMonthIndex === filteredGroupedDates.length - 1}
                title="بعد"
                className="btn btn-outline btn-primary btn-soft hover:btn-primary"
                icon="weui_arrow-filled text-3xl"
              />
              <Button
                onAction={() => setCurrentMonthIndex((prev) => prev - 1)}
                disabled={currentMonthIndex === 0}
                title="قبل"
                className="btn btn-outline btn-primary btn-soft hover:btn-primary"
                icon="weui_arrow-filled text-3xl rotate-180"
              />
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex flex-wrap items-center gap-8 mb-8">
            {filteredGroupedDates[currentMonthIndex].daysInsideMonth
              .sort((a, b) => {
                return a.date.localeCompare(b.date);
              })
              .map((day, index) => {
                const isPastDate = day.date < currentDateFormatted;
                return (
                  <div
                    key={index}
                    className="group flex flex-col gap-y-3 items-center justify-center"
                  >
                    <Button
                      onAction={() => {
                        setActiveDayDate(day.date);
                      }}
                      text={moment(day.date, "YYYY/MM/DD")
                        .locale("fa")
                        .format("DD")}
                      className={`btn rounded-full ${
                        isPastDate
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : `group-hover:bg-neutral group-hover:text-white ${
                              day.date === activeDayDate
                                ? "bg-neutral text-white pointer-events-none"
                                : "btn-outline"
                            }`
                      }`}
                      disabled={isPastDate}
                    />
                    <span>{moment(day.date).locale("fa").format("dddd")}</span>
                  </div>
                );
              })}
          </div>
          {activeDay && (
            <div className="flex items-center flex-wrap gap-3">
              {activeDay.timeSlots.map((m) => (
                <Button
                  onAction={() => setSelectedTime(m)}
                  key={m._id}
                  text={m.time}
                  className={`btn ${
                    selectedTime && selectedTime._id === m._id
                      ? "btn-primary"
                      : "btn-outline btn-primary"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="common-card col-span-4 flex flex-col">
        <p className="text-base">{reservation?.description}</p>
        {reservation.includedServices ? (
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
            {reservation.price.toLocaleString()} تومان
          </span>
        </div>
        <Button
          text="پرداخت و رزرو"
          className="btn btn-primary mt-6 flex self-end"
        />
      </div>
    </section>
  );
};

export default Reservation;
