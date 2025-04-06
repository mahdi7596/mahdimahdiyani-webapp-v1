import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { flatReservationDates, ReservationType } from "../models/reservation";
import { EnglishMonthNames, PersianMonthNames } from "../utils/monthNames";

import Button from "../components/shared/Button";

import moment from "jalali-moment";

import CheckIcon from "../assets/images/landing/check.svg";

const Reservation = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  const reservation: ReservationType = state?.reservation;

  const groupedDates: flatReservationDates[] =
    reservation.availableDates.reduce((acc, availableDate) => {
      // Get month number from original date
      const enMonthNumber = availableDate.date.slice(5, 7); // Gregorian month like "04"
      const enMonthName = EnglishMonthNames[enMonthNumber]; // English Month like "April"

      // Convert to Jalaali date
      const jalaaliDate = moment(availableDate.date, "YYYY-MM-DD").locale("fa");

      const faMonthNumber = jalaaliDate.format("MM"); // Persian month number like "01"
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

  console.log(groupedDates, "groupedDates");
  console.log(reservation, "reservation");

  return (
    <section className="section-container section-inner-space grid grid-cols-12 gap-8">
      <div className="col-span-8">
        <h2 className="text-3xl font-bold">رزرو {reservation?.title}</h2>
        <div className="mt-6 common-card">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-medium">
              {groupedDates[currentMonthIndex].month.fa}
            </p>
            <div className="flex items-center gap-x-3.5">
              <Button
                onAction={() => setCurrentMonthIndex((prev) => prev + 1)}
                disabled={currentMonthIndex === groupedDates.length - 1}
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
          <div className="flex flex-wrap items-center gap-8 cursor-pointer">
            {groupedDates[currentMonthIndex].daysInsideMonth.map(
              (day, index) => (
                <div className="group flex flex-col gap-y-3 items-center justify-center">
                  <Button
                    text={moment(day.date, "YYYY/MM/DD")
                      .locale("fa")
                      .format("DD")}
                    key={index}
                    className="btn btn-outline rounded-full group-hover:bg-neutral group-hover:text-white"
                  />
                  <span>{moment(day.date).locale("fa").format("dddd")}</span>
                </div>
              )
            )}
          </div>
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
