import { ChangeEvent } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectBoxProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}

const SelectBox = ({ options, value, onChange }: SelectBoxProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="select select-bordered w-full bg-surface text-right"
      dir="rtl"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
