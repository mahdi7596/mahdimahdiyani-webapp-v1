import { ChangeEvent } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectBoxProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
  disabled?: boolean;
}

const SelectBox = ({
  options,
  value,
  onChange,
  className,
  disabled,
}: SelectBoxProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={className} dir="rtl">
      <select
        value={value}
        onChange={handleChange}
        className="w-full select select-bordered bg-surface text-right"
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
