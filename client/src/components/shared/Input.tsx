import { ChangeEvent } from "react";

interface InputProps {
  type: "text" | "number" | "email" | "password";
  label: string;
  value: string | number;
  name: string;
  placeholder: string;
  error: string;
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
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        id={label}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
      />
      <div className="label">
        {error && <span className="label-text-alt text-danger">{error}</span>}
      </div>
    </label>
  );
};

export default Input;
