import { BlogFilters } from "../hooks/useBlogPosts";
import { BlogPostsResponse, BlogCategoriesResponse } from "../models/blog";

export const fetchBlogPosts = async (
  filters?: BlogFilters
): Promise<BlogPostsResponse> => {
  const params = new URLSearchParams();

  if (filters?.searchTerm) {
    params.append("searchTerm", filters.searchTerm);
  }

  if (filters?.category && filters.category !== "all") {
    params.append("category", filters.category);
  }

  if (filters?.order) {
    params.append("order", filters.order);
  }

  const response = await fetch(`/api/post/getposts?${params.toString()}`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await response.json();

  return {
    success: true,
    posts: data.posts,
    total: data.totalPosts,
  };
};

export const fetchBlogCategories =
  async (): Promise<BlogCategoriesResponse> => {
    const response = await fetch("/api/postcategory/getAllCategories", {
      method: "GET",
      cache: "no-store",
    });

    const data: BlogCategoriesResponse = await response.json();
    return data;
  };
