import Search from "../shared/Search";
import SelectBox from "../shared/SelectBox";

interface BlogFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedValue: string;
  onSelectedCategoryId: (value: string) => void;
}

const BlogFilters = ({
  searchValue,
  onSearchChange,
  selectedValue,
  onSelectedCategoryId,
}: BlogFiltersProps) => {
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
      <SelectBox
        value={selectedValue}
        onChange={onSelectedCategoryId}
        options={[]}
      />
    </form>
  );
};

export default BlogFilters;
