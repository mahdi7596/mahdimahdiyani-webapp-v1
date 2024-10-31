import { ChangeEvent } from "react";

interface InputProps {
  type: "text" | "number" | "email" | "password";
  label: string;
  value: string | number;
  name: string;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  label,
  value,
  name,
  placeholder,
  error,
  disabled,
  onChange,
}: InputProps) => {
  return (
    <fieldset>
      <label className="label-text text-neutrals300 text-sm">{label}</label>
      <input
        id={label}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className="input input-bordered w-full text-sm text-neutrals500"
      />
      {error && (
        <span className="label-text-alt text-danger mr-1">{error}</span>
      )}
    </fieldset>
  );
};

export default Input;
