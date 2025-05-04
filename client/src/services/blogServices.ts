import { BlogFilters } from "../hooks/useBlogPosts";
import { BlogPostsResponse, BlogCategoriesResponse } from "../models/blog";

export const fetchBlogPosts = async (
  filters: BlogFilters
): Promise<BlogPostsResponse> => {
  const query = new URLSearchParams(
    filters as Record<string, string>
  ).toString();

  const response = await fetch(`/api/post/getposts?${query}`, {
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
    const res = await fetch("/api/postcategory/getAllCategories");
    return await res.json();
  };
