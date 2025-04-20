import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

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

  return <p>در حال بررسی وضعیت پرداخت...</p>;
};

export default PaymentCallback;
