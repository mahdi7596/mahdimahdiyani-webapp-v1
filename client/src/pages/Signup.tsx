import { useState } from "react";

import art from "../assets/images/auth-thumbnail.png";

interface IRegister {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<IRegister>({
    name: "",
    email: "",
    password: "",
  });

  console.log(formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="section-container h-screen flex items-center justify-between p-12 bg-red-50">
      <div className="w-1/3 flex flex-col gap-y-6 mx-auto bg-blue-50">
        <div className="flex flex-col gap-y-3.5">
          <h2 className="text-3xl text-neutral font-headingFont font-extrabold">
            خوش برگشتی
          </h2>
          <p className="text-justify text-neutrals500">
            امروز یک روز جدید است. این روز شماست. شما آن را شکل می‌دهید. وارد
            شوید تا مدیریت پروژه‌های خود را آغاز کنید.
          </p>
        </div>
        <form>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
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
