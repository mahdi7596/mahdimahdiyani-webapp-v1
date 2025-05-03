import Search from "../shared/Search";

const BlogFilters = () => {
  return (
    <form
      // onSubmit={handleSubmit}
      className="flex flex-wrap sm:flex-nowrap items-center gap-y-3 gap-x-3"
    >
      <Search className="w-full" />
    </form>
  );
};

export default BlogFilters;
