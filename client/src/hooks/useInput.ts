import { ChangeEvent, useState } from "react";

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  return {
    value,
    onChange: handleChange,
    error,
    setError,
  };
};

export default useInput;
