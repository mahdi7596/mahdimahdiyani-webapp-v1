import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const PaymentCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [paymentStatus, setPaymentStatus] = useState<
    "success" | "error" | null
  >(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const authority = params.get("Authority");
      const status = params.get("Status");
      const reservationId = JSON.parse(sessionStorage.getItem("reservationId"));

      if (!authority || !status || !reservationId) return;

      const res = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Authority: authority,
          Status: status,
          reservationId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setPaymentStatus("success");
        setTimeout(() => navigate("/dashboard"), 3000);
      } else {
        setPaymentStatus("error");
        // setTimeout(() => navigate("/"), 3000);
      }
    };

    verifyPayment();
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-transparent cursor-not-allowed"
        style={{ pointerEvents: "auto" }}
      ></div>
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="common-card w-full flex flex-col items-center justify-center"
          style={{ pointerEvents: "none" }}
        >
          {paymentStatus === null ? (
            <>
              <span className="loading loading-bars loading-lg text-info self-center mb-6"></span>
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
                <span>لطفا کمی صبر کنید</span>
              </div>
            </>
          ) : (
            <>
              <div className="ripple-container mb-6">
                <div
                  className={`ripple ripple-1 ${
                    paymentStatus === "success" ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <div
                  className={`ripple ripple-2 ${
                    paymentStatus === "success" ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <div
                  className={`ripple ripple-3 ${
                    paymentStatus === "success" ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <div
                  className={`checkmark-container ${
                    paymentStatus === "success" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {paymentStatus === "success" ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <h1
                className={`text-4xl font-bold mb-8 ${
                  paymentStatus === "success" ? "text-success" : "text-danger"
                }`}
              >
                {paymentStatus === "success"
                  ? "پرداخت موفق"
                  : "متأسفیم! پرداخت شما با مشکل مواجه شد"}
              </h1>
              <p className="text-lg text-neutral animate-[pulse_2s_ease-in-out_infinite]">
                {paymentStatus === "success"
                  ? "در حال انتقال به صفحه رزروهای شما..."
                  : "با پشتیبانی سایت تماس بگیرید"}
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentCallback;
