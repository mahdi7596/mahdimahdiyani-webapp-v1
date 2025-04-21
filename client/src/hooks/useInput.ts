import { ChangeEvent, useState } from "react";
import { FieldValidation, validateField } from "../utils/fieldValidation";

const useInput = (initialValue: string, rules?: FieldValidation) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);

    setValue(e.target.value);
    // Validate value when it changes
    if (rules) {
      const errorMessage = validateField(e.target.value, rules);
      setError(errorMessage || ""); // Set error if there's a message
    }
  };

  // Function to reset error messages
  const resetError = () => setError("");

  return {
    value,
    onChange: handleChange,
    error,
    setError,
    resetError,
  };
};

export default useInput;
