import zarinpalCheckout from "zarinpal-checkout";
import Reservation from "../models/reservation.model.js";
import ReservationType from "../models/reservationType.model.js";

import { errorHandler } from "../utils/error.js";

// const zarinpal = zarinpalCheckout.create(
//   "f42633f6-39f2-43d1-8a23-abce5430b2fe",
//   true
// ); // true = sandbox mode

const zarinpal = zarinpalCheckout.create(
  // process.env.ZARINPAL_MERCHANT,
  "f42633f6-39f2-43d1-8a23-abce5430b2fe",
  true // sandbox
);

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

    const reservation = await Reservation.findById(reservationId).populate(
      "reservationTypeId"
    );
    if (!reservation) return next(errorHandler(404, "رزرو یافت نشد"));

    const amount = reservation.reservationTypeId.price;

    const response = await zarinpal.PaymentVerification({
      Amount: amount,
      Authority,
    });

    console.log("Zarinpal verify response:", response);

    if (response.status === 100 || response.status === 101) {
      reservation.status = "confirmed";
      await reservation.save();

      return res.status(200).json({
        message: "پرداخت با موفقیت انجام شد",
        refId: response.RefID,
      });
    } else {
      return next(errorHandler(400, "پرداخت تایید نشد"));
    }
  } catch (err) {
    next(err);
  }
};
