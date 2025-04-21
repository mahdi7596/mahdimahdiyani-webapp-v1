interface SearchProps {
  className?: string;
}

const Search = ({ className }: SearchProps) => {
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
