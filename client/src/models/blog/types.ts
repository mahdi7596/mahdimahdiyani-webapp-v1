export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  category: BlogCategory;
  createdAt: string;
}

export interface BlogCategory {
  _id: string;
  title: string;
}
