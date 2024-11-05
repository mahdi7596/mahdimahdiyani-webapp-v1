import { ChangeEvent, useState } from "react";
import { FieldValidation, validateField } from "../utils/fieldValidation";

type FormFields = {
  [key: string]: {
    value: string;
    rules: FieldValidation;
    error?: string;
  };
};

const useFormFields = (initialFields: FormFields) => {
  const [fields, setFields] = useState(initialFields);
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFields((prevFields) => {
      const errorMessage = validateField(value, prevFields[name].rules);

      return {
        ...prevFields,
        [name]: {
          ...prevFields[name],
          value,
          error: errorMessage || "",
        },
      };
    });
  };

  const validateAllFields = () => {
    setIsTouched(true);
    let isValid = true;

    setFields((prevFields) => {
      const newFields = { ...prevFields };

      Object.keys(newFields).forEach((key) => {
        const { value, rules } = newFields[key];
        const errorMessage = validateField(value, rules);

        if (errorMessage) isValid = false;

        newFields[key].error = errorMessage || "";
      });

      return newFields;
    });

    return isValid;
  };

  const resetErrors = () => {
    setFields((prevFields) => {
      const newFields = { ...prevFields };
      Object.keys(newFields).forEach((key) => {
        newFields[key].error = "";
      });
      return newFields;
    });
  };

  return {
    fields,
    handleChange,
    validateAllFields,
    resetErrors,
    isTouched,
  };
};

export default useFormFields;
