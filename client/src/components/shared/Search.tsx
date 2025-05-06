interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

const Search = ({ value, onChange, onKeyDown, className }: SearchProps) => {
  // console.log(value);
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="جستجو کنید"
      className={`input input-bordered ${className}`}
    />
  );
};

export default Search;
