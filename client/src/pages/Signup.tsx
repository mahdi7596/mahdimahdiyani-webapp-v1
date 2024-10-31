import Input from "../components/shared/Input";
import useInput from "../hooks/useInput";

import art from "../assets/images/auth-thumbnail.png";
import Button from "../components/shared/Button";
import { Link } from "react-router-dom";

interface IRegister {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const username = useInput("", { required: true, minLength: 3 });
  const email = useInput("", { required: true, email: true });
  const password = useInput("", { required: true, minLength: 6 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors before validation
    username.resetError();
    email.resetError();
    password.resetError();

    // Collect and validate form data
    const formData: IRegister = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    console.log(formData); // Handle form submission

    // sending request to backend
    // try {
    //   const res = await fetch("/api/auth/signup", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(formData),
    //   });
    //   const data = await res.json();
    // } catch (error) {}
  };

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
              to={"/register"}
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

          <Link to={"/register"} className="hover:btn-link self-end text-xs">
            فراموشی کلمه عبور
          </Link>
          <Button
            text="ثبت نام"
            type="submit"
            className="btn-primary btn-block"
          />
        </form>
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
