interface SearchProps {
  className?: string;
  inputValue: string;
}

const Search = ({ inputValue, className }: SearchProps) => {
  return (
    <input
      type="text"
      placeholder="جستجو کنید"
      // onChange={inputValue}
      className={`input input-bordered ${className}`}
    />
  );
};

export default Search;
