interface SearchProps {
  className?: string;
}

const Search = ({ className }: SearchProps) => {
  return (
    <input
      type="text"
      placeholder="جستجو کنید"
      className={`input input-bordered ${className}`}
    />
  );
};

export default Search;
