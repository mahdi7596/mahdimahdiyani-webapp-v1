import Search from "../shared/Search";

interface BlogFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const BlogFilters = ({ searchValue, onSearchChange }: BlogFiltersProps) => {
  return (
    <form
      // onSubmit={handleSubmit}
      className="flex flex-wrap sm:flex-nowrap items-center gap-y-3 gap-x-3"
    >
      <Search
        value={searchValue}
        onChange={onSearchChange}
        className="w-full"
      />
    </form>
  );
};

export default BlogFilters;
