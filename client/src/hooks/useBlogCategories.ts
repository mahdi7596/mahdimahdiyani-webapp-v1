import { useEffect, useState } from "react";
import { BlogCategory } from "../models/blog";
import { fetchBlogCategories } from "../services/blogServices";

export const useBlogCategories = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchBlogCategories();
      if (response.success) {
        setCategories(response.categories);
      } else {
        new Error("خطا در دریافت اطلاعات: " + (error as Error).message);
      }
    } catch (error) {
      setError(new Error("خطا در دریافت اطلاعات: " + (error as Error).message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, refetch: () => fetchCategories() };
};
