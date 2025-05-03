import { BlogPost, BlogCategory } from "./types";

export interface BlogPostsResponse {
  success: boolean;
  posts: BlogPost[];
  total?: number;
}

export interface BlogCategoriesResponse {
  success: boolean;
  categories: BlogCategory[];
}
