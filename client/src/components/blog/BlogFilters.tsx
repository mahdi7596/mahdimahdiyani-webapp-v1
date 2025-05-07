import { BlogCategory } from "../../models/blog";
import Search from "../shared/Search";
import SelectBox, { SelectOption } from "../shared/SelectBox";

interface BlogFiltersProps {
  categories: BlogCategory[];
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedValue: string;
  onSelectedCategoryId: (value: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
  mediaMode?: boolean;
}

const BlogFilters = ({
  categories,
  searchValue,
  onSearchChange,
  selectedValue,
  onSelectedCategoryId,
  sortOrder,
  setSortOrder,
  mediaMode,
}: BlogFiltersProps) => {
  // wrote this code to convert the type of categories to the expected type of options inside select component
  const categoryOptions: SelectOption[] = [
    { value: "all", label: "همه" },
    ...categories.map((category) => ({
      value: category._id,
      label: category.title,
    })),
  ];

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
        value={sortOrder}
        onChange={setSortOrder}
        options={[
          { value: "desc", label: "جدیدترین" },
          { value: "asc", label: "قدیمی‌ترین" },
        ]}
        className="w-full sm:min-w-[175px] sm:w-fit"
      />

      <SelectBox
        value={selectedValue}
        onChange={onSelectedCategoryId}
        options={categoryOptions.filter((f) => f.label !== "رسانه")}
        className="w-full sm:min-w-[175px] sm:w-fit"
        disabled={mediaMode}
      />
    </form>
  );
};

export default BlogFilters;
