import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { flatReservationDates, ReservationType } from "../models/reservation";
import { EnglishMonthNames, PersianMonthNames } from "../utils/monthNames";

import Button from "../components/shared/Button";

import moment from "jalali-moment";

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

  return (
    <section className="section-container section-inner-space">
      <h2 className="text-lg">
        برای رزرو {reservation?.title} میتوانید یکی از تاریخ های زیر را انتخاب
        کنید
      </h2>
      <p className="mt-2">{reservation?.description}</p>
      <div className="p-6 mt-6 bg-surfaceBg rounded border border-surfaceBorder">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-medium">
            {groupedDates[currentMonthIndex].month.fa}
          </p>
          <div className="flex items-center gap-x-3.5">
            <Button
              onAction={() => setCurrentMonthIndex((prev) => prev + 1)}
              disabled={currentMonthIndex === groupedDates.length - 1}
              className="btn btn-outline btn-primary btn-soft hover:btn-primary"
              icon="weui_arrow-filled text-3xl"
            />
            <Button
              onAction={() => setCurrentMonthIndex((prev) => prev - 1)}
              disabled={currentMonthIndex === 0}
              className="btn btn-outline btn-primary btn-soft hover:btn-primary"
              icon="weui_arrow-filled text-3xl rotate-180"
            />
          </div>
        </div>
        <div className="flex items-center gap-x-12">
          {groupedDates[currentMonthIndex].daysInsideMonth.map((day, index) => (
            <div key={index}>
              {moment(day.date, "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD")}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reservation;
