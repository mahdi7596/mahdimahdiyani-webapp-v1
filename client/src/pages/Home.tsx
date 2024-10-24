import { FormEvent } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/header/Navbar";
import Input from "../components/shared/Input";
import useInput from "../hooks/useInput";

const Home = () => {
  const { value, error, onChange, setError } = useInput("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("object");
    console.log(value);
    if (!value.trim()) {
      setError("خطایی وجود دارد");
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          label="نام"
          name="name"
          value={value}
          error={error}
          onChange={onChange}
          placeholder="نام خود را وارد کنید"
        />
        <button type="submit">Submit</button>
      </form>

      <Footer />
    </>
  );
};

export default Home;
