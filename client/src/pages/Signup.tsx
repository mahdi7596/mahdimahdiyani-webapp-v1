import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useInput from "../hooks/useInput";

import Input from "../components/shared/Input";
import Button from "../components/shared/Button";

import art from "../assets/images/auth-thumbnail.png";

interface IRegister {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [loading, setLoading] = useState(false);

  const username = useInput("", { required: true, minLength: 3 });
  const email = useInput("", { required: true, email: true });
  const password = useInput("", { required: true, minLength: 6 });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors before validation
    username.resetError();
    email.resetError();
    password.resetError();

    if (username.value === "" || email.value === "" || password.value === "") {
      username.setError("پر کردن این فیلد الزامی است");
      email.setError("پر کردن این فیلد الزامی است");
      password.setError("پر کردن این فیلد الزامی است");
    }

    // Collect and validate form data
    const formData: IRegister = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    // console.log(formData); // Handle form submission

    // sending request to backend
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const isFormValid = !username.error && !email.error && !password.error;

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
              to={"/login"}
              className="mr-2 font-bold text-primary hover:text-primary800 hover:btn-link"
            >
              ورود به حساب کاربری
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-4">
          <Input
            name="username"
            value={username.value.trim()}
            onChange={username.onChange}
            error={username.error}
            type="text"
            label="نام کاربری"
            placeholder="نام کاربری خود را وارد کنید"
          />
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

          <Button
            onAction={handleSubmit}
            text="ثبت نام"
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

export default Signup;
