import { Link, useNavigate } from "react-router-dom";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

import { useDispatch, useSelector } from "react-redux";

import useInput from "../hooks/useInput";

import Input from "../components/shared/Input";
import Button from "../components/shared/Button";

import art from "../assets/images/auth-thumbnail.png";

interface ILogin {
  email: string;
  password: string;
}

const Login = () => {
  const { loading, error: errorMessage } = useSelector(
    (state: { user: { loading: boolean; error: string } }) => state.user
  );

  const email = useInput("", { required: true, email: true });
  const password = useInput("", { required: true });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    email.resetError();
    password.resetError();

    if (email.value === "" || password.value === "") {
      email.setError("پر کردن این فیلد الزامی است");
      password.setError("پر کردن این فیلد الزامی است");
      return;
    }

    const formData: ILogin = {
      email: email.value,
      password: password.value,
    };

    try {
      dispatch(signInStart());

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      if (res.ok) {
        dispatch(signInSuccess(data));

        // ✅ بررسی رزرواسیون ذخیره شده
        const stored = sessionStorage.getItem("pendingReservation");

        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            const isExpired = Date.now() - parsed.timestamp > 5 * 60 * 1000;

            if (
              parsed.reservationTypeId &&
              parsed.date &&
              parsed.timeSlot &&
              parsed.monthIndex !== undefined &&
              parsed.monthIndex !== null &&
              !isExpired
            ) {
              // sessionStorage.removeItem("pendingReservation");
              // navigate(
              //   `/reservation/${parsed.reservationTypeId}?date=${parsed.date}&timeSlot=${parsed.timeSlot.time}`
              // );
              navigate(`/reservation/${parsed.reservationTypeId}`, {
                state: {
                  date: parsed.date,
                  timeSlot: parsed.timeSlot, // includes both `time` and `_id`
                  monthIndex: parsed.monthIndex, // includes both `time` and `_id`
                },
              });

              return;
            }
          } catch (err) {
            console.warn("داده‌های سشن نامعتبر است", err);
          }

          // پاک‌سازی در صورت نامعتبر/منقضی شدن
          sessionStorage.removeItem("pendingReservation");
        }

        // ✅ انتقال پیش‌فرض در صورت عدم وجود رزرواسیون
        navigate("/dashboard?tab=profile");
      }
    } catch (error: any) {
      dispatch(signInFailure(error.message));
    }
  };

  const isFormValid = !email.error && !password.error;

  return (
    <section className="section-container h-screen flex flex-col-reverse sm:flex-row items-center gap-y-6 justify-center sm:justify-between gap-x-6 lg:gap-x-0 px-6 lg:p-12">
      <div className="w-full sm:w-1/3 md:w-1/2 lg:w-1/3 flex flex-col gap-y-6 mx-auto h-fit">
        <div className="flex flex-col gap-y-3.5">
          <h2 className="text-2xl lg:text-3xl text-neutral font-headingFont font-extrabold">
            خوش برگشتی
          </h2>
          <p className="text-sm lg:text-base text-justify text-neutrals500">
            امروز یک روز جدید است. این روز شماست. شما آن را شکل می‌دهید. وارد
            شوید تا مدیریت پروژه‌های خود را آغاز کنید.
            <Link
              to={"/signup"}
              className="mr-2 font-bold text-primary hover:text-primary800 hover:btn-link"
            >
              ثبت نام
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-4">
          <Input
            name="email"
            value={email.value}
            onChange={email.onChange}
            error={email.error}
            type="email"
            label="ایمیل"
            placeholder="ایمیل خود را وارد کنید"
          />
          <Input
            name="password"
            value={password.value.trim()}
            onChange={password.onChange}
            error={password.error}
            type="password"
            label="کلمه عبور"
            placeholder="کلمه عبور خود را وارد کنید"
          />
          <Link
            to={"/forgot-password"}
            className="hover:btn-link self-end text-xs"
          >
            فراموشی کلمه عبور
          </Link>
          <Button
            onAction={handleSubmit}
            text="ورود"
            type="submit"
            className="btn-primary btn-block"
            disabled={!isFormValid}
            loading={loading}
          />
        </form>
        {errorMessage && (
          <p className="bg-red-100 border border-red-300 text-red-600 rounded-sm p-3">
            {errorMessage}
          </p>
        )}
      </div>
      <div className="w-full sm:w-8/12 md:w-1/2">
        <img
          src={art}
          className="h-56 sm:h-full sm:max-h-screen w-full rounded-md object-cover "
        />
      </div>
    </section>
  );
};

export default Login;
