import { BlogFilters } from "../hooks/useBlogPosts";
import { createSearchParams } from "react-router-dom";

export const buildSearchParams = (filters: BlogFilters) => {
  const params: Record<string, string> = {};

  if (filters.searchTerm?.trim()) {
    params.searchTerm = filters.searchTerm;
  }

  if (filters.category && filters.category !== "all") {
    params.category = filters.category;
  }

  if (filters.order && filters.order !== "desc") {
    params.order = filters.order;
  }

  return createSearchParams(params).toString();
};
