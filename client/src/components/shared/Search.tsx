interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Search = ({ value, onChange, className }: SearchProps) => {
  // console.log(value);
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="جستجو کنید"
      className={`input input-bordered ${className}`}
    />
  );
};

export default Search;
