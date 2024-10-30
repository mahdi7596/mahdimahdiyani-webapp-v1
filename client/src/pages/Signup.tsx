import Input from "../components/shared/Input";
import useInput from "../hooks/useInput";

import art from "../assets/images/auth-thumbnail.png";
import Button from "../components/shared/Button";
import { Link } from "react-router-dom";

interface IRegister {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const name = useInput("");
  const email = useInput("");
  const password = useInput("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Collect and validate form data
    const formData: IRegister = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
    console.log(formData); // Handle form submission here
  };

  return (
    <section className="section-container h-screen flex items-center justify-between p-12">
      <div className="w-1/3 flex flex-col gap-y-6 mx-auto">
        <div className="flex flex-col gap-y-3.5">
          <h2 className="text-3xl text-neutral font-headingFont font-extrabold">
            خوش برگشتی
          </h2>
          <p className="text-justify text-neutrals500">
            امروز یک روز جدید است. این روز شماست. شما آن را شکل می‌دهید. وارد
            شوید تا مدیریت پروژه‌های خود را آغاز کنید.
            <Link
              to={"/register"}
              className="mr-2 font-bold text-primary hover:text-primary800 hover:btn-link"
            >
              ثبت نام
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-4">
          <Input
            name="name"
            value={name.value}
            onChange={name.onChange}
            error={name.error}
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
            value={password.value}
            onChange={password.onChange}
            error={password.error}
            type="password"
            label="کلمه عبور"
            placeholder="کلمه عبور خود را وارد کنید"
          />

          <Link to={"/register"} className="hover:btn-link self-end text-xs">
            فراموشی کلمه عبور{" "}
          </Link>
          <Button
            text="ثبت نام"
            type="submit"
            className="btn-primary btn-block"
          />
        </form>
      </div>
      <div className="w-1/2">
        <img src={art} className="max-h-screen w-full rounded-md" />
      </div>
    </section>
  );
};

export default Signup;
