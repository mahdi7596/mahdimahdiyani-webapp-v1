import { BlogCategory } from "../../models/blog";
import Search from "../shared/Search";
import SelectBox from "../shared/SelectBox";

interface BlogFiltersProps {
  categories: BlogCategory[];
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedValue: string;
  onSelectedCategoryId: (value: string) => void;
}

const BlogFilters = ({
  categories,
  searchValue,
  onSearchChange,
  selectedValue,
  onSelectedCategoryId,
}: BlogFiltersProps) => {
  console.log(categories, "categories");
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
