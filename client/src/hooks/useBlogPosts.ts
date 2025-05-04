import { useEffect, useState } from "react";
import { fetchBlogPosts } from "../services/blogServices";
import { BlogPost } from "../models/blog/types";

export interface BlogFilters {
  searchTerm?: string;
  category?: string;
  // date?: string;
}

export const useBlogPosts = (filters: BlogFilters) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async (customFilters?: BlogFilters) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchBlogPosts(customFilters || filters);
      if (response.success) {
        setPosts(response.posts);
      } else {
        setError("خطا در دریافت اطلاعات");
      }
    } catch (error) {
      setError("خطا در دریافت اطلاعات: " + error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced filtering for search and others
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchBlogs();
    }, 500);

    return () => clearTimeout(timeout);
  }, [filters.searchTerm, filters.category]);

  return { posts, loading, error, refetch: () => fetchBlogs(filters) };
};
