import zarinpalCheckout from "zarinpal-checkout";
import Reservation from "../models/reservation.model.js";
import ReservationType from "../models/reservationType.model.js";

import { errorHandler } from "../utils/error.js";

const zarinpal = zarinpalCheckout.create(
  "f42633f6-39f2-43d1-8a23-abce5430b2fe",
  true
); // true = sandbox mode

export const initiatePayment = async (req, res, next) => {
  try {
    const { reservationId } = req.body;

    if (!reservationId) {
      return next(errorHandler(400, "شناسه رزرو ارسال نشده است"));
    }

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return next(errorHandler(404, "رزرو یافت نشد"));
    }

    if (reservation.userId.toString() !== req.user.id) {
      return next(errorHandler(403, "دسترسی غیرمجاز"));
    }

    if (reservation.status !== "pending") {
      return next(errorHandler(400, "رزرو در وضعیت مناسب برای پرداخت نیست"));
    }

    // 🔥 Get the price from ReservationType
    const reservationType = await ReservationType.findById(
      reservation.reservationTypeId
    );
    if (!reservationType) {
      return next(errorHandler(404, "نوع رزرو یافت نشد"));
    }

    const amount = reservationType.price; // 💰 final price

    // 🟢 Create Zarinpal payment request
    const response = await zarinpal.PaymentRequest({
      Amount: amount,
      CallbackURL: `http://localhost:5173/payment/callback`, // or your production domain
      Description: "پرداخت رزرو وقت",
      // Email: req.user.email,
    });

    if (response.status !== 100) {
      return next(errorHandler(500, "خطا در ایجاد پرداخت"));
    }

    res.status(200).json({
      message: "لینک پرداخت ایجاد شد",
      paymentUrl: response.url, // ➡️ redirect user here
      authority: response.authority,
    });
  } catch (err) {
    console.error(err);
    next(errorHandler(500, "مشکلی در پرداخت به وجود آمده است"));
  }
};

// POST /api/payments/verify
export const verifyPayment = async (req, res, next) => {
  try {
    const { Authority, Status, reservationId } = req.body;

    if (!Authority || !Status || !reservationId) {
      return next(errorHandler(400, "اطلاعات ناقص است"));
    }

    if (Status !== "OK") {
      return next(errorHandler(400, "پرداخت توسط کاربر لغو شد"));
    }

    // Get reservation price
    const reservation = await Reservation.findById(reservationId).populate(
      "reservationTypeId"
    );
    if (!reservation) return next(errorHandler(404, "رزرو یافت نشد"));

    const amount = reservation.reservationTypeId.price;

    // 🟢 Replace axios with fetch here:
    const response = await fetch(
      "https://sandbox.zarinpal.com/pg/v4/payment/verify.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merchant_id: process.env.ZARINPAL_MERCHANT,
          amount,
          authority: Authority,
        }),
      }
    );

    const data = await response.json();

    if (data.data?.code === 100 || data.data?.code === 101) {
      // ✅ Payment successful
      reservation.status = "confirmed";
      await reservation.save();

      return res.status(200).json({
        message: "پرداخت با موفقیت انجام شد",
        refId: data.data.ref_id,
      });
    } else {
      return next(errorHandler(400, "پرداخت تایید نشد"));
    }
  } catch (err) {
    next(err);
  }
};
