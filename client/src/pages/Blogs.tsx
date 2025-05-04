import { useEffect, useState } from "react";
import { useBlogPosts } from "../hooks/useBlogPosts";

import Banner from "../components/shared/Banner";
import Card from "../components/shared/Card";
import Loading from "../components/shared/Loading";
import BlogFilters from "../components/blog/BlogFilters";

import blogBanner from "../assets/images/banner.jpg";
import { useBlogCategories } from "../hooks/useBlogCategories";

const Blogs = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filters = { searchTerm: searchText };
  const { posts, loading, error } = useBlogPosts(filters);
  const { categories } = useBlogCategories();

  console.log(categories, "categories");

  return (
    <section className="section-container section-inner-space">
      <Banner
        banner={blogBanner}
        title="آموزشهای رایگان وب سایت"
        description="در این صفحه می‌توانید مجموعه‌ای از آموزشهای رایگان و نوشته‌های ما را مشاهده کنید که با دقت و توجه به موضوعات روز تهیه شده‌اند. هدف ما ارائه محتوای آموزنده، جذاب و کاربردی برای شماست. هر هفته مطالب جدید اضافه می‌کنیم تا همراه همیشگی شما در مسیر یادگیری و رشد باشیم. از بازخوردها و نظرات ارزشمندتان استقبال می‌کنیم!"
      />
      <div className="min-h-[400px] mt-20 flex flex-col">
        <BlogFilters
          searchValue={searchText}
          onSearchChange={setSearchText}
          selectedValue={selectedCategory}
          onSelectedCategoryId={setSelectedCategory}
        />
        <div className="flex-1 flex items-center justify-center">
          {loading ? (
            <Loading />
          ) : (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
              {posts.map((post) => (
                <Card
                  {...post}
                  key={post._id}
                  link={`/post/${post?.slug}`}
                  img={`${import.meta.env.VITE_BACKEND_URL}${post?.image}`}
                  excerpt={post?.content}
                  tags={[
                    {
                      text: post?.category?.title,
                      link: `/search?category=${post?.category?.title}`,
                    },
                  ]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
