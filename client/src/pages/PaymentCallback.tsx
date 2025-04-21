import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import success from "../assets/images/common/success.gif";

const PaymentCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

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
      console.log(data, "data");

      if (res.ok) {
        alert("پرداخت موفق بود 🎉");
        navigate("/dashboard");
      } else {
        alert("پرداخت ناموفق بود 😞");
        navigate("/");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm max-w-md w-full">
        <div className="ripple-container mb-6">
          <div className="ripple ripple-1"></div>
          <div className="ripple ripple-2"></div>
          <div className="ripple ripple-3"></div>
          <div className="checkmark-container">
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
            </svg>{" "}
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#8470FF] mt-4 mb-2">
          پرداخت موفق
        </h1>

        <div className="text-center space-y-2">
          <p className="text-gray-500 text-base">
            مبلغ پرداخت شده توسط مسترکارت.
          </p>
          <p className="text-gray-500 text-base">
            لطفا، ما را با نظرات خود درباره محصول یاری کنید.
          </p>
        </div>
      </div>{" "}
    </div>
  );
};

export default PaymentCallback;
