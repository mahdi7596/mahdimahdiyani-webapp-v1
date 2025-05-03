import { useEffect, useState } from "react";
import { fetchBlogPosts } from "../services/blogServices";
import { BlogPost } from "../models/blog/types";

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchBlogPosts();
      if (response.success) {
        setPosts(response.posts);
      } else {
        setError("خطا در دریافت اطلاعات");
      }
    } catch (error) {
      setError("ایی در دریافت اطلاعات رخ داد: " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return { posts, loading, error, refetch: fetchBlogs };
};
