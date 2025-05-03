import { BlogPostsResponse, BlogCategoriesResponse } from "../models/blog";

export const fetchBlogPosts = async (): Promise<BlogPostsResponse> => {
  const response = await fetch("/api/post/getposts");

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
