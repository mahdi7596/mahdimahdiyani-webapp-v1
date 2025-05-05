import { useState } from "react";
import { useBlogPosts } from "../hooks/useBlogPosts";

import Banner from "../components/shared/Banner";
import Card from "../components/shared/Card";
import Loading from "../components/shared/Loading";
import BlogFilters from "../components/blog/BlogFilters";

import blogBanner from "../assets/images/banner.jpg";
import { useBlogCategories } from "../hooks/useBlogCategories";
import { Alert } from "../components/shared/Alert";

import { motion, AnimatePresence } from "framer-motion";

const Blogs = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filters = {
    searchTerm: searchText,
    category: selectedCategory,
    order: sortOrder,
  };

  const { posts, loading, error } = useBlogPosts(filters);
  const { categories } = useBlogCategories();

  return (
    <section className="section-container section-inner-space">
      <Banner
        banner={blogBanner}
        title="آموزشهای رایگان وب سایت"
        description="در این صفحه می‌توانید مجموعه‌ای از آموزشهای رایگان و نوشته‌های ما را مشاهده کنید که با دقت و توجه به موضوعات روز تهیه شده‌اند. هدف ما ارائه محتوای آموزنده، جذاب و کاربردی برای شماست. هر هفته مطالب جدید اضافه می‌کنیم تا همراه همیشگی شما در مسیر یادگیری و رشد باشیم. از بازخوردها و نظرات ارزشمندتان استقبال می‌کنیم!"
      />
      <div className="min-h-[400px] mt-20 flex flex-col">
        <BlogFilters
          categories={categories}
          searchValue={searchText}
          onSearchChange={setSearchText}
          selectedValue={selectedCategory}
          onSelectedCategoryId={setSelectedCategory}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        <div className="flex-1 flex items-center justify-center">
          {loading ? (
            <Loading />
          ) : posts.length === 0 ? (
            <Alert status="warning" title="هیچ پستی پیدا نشد">
              لطفاً فیلترها را بررسی کنید یا عبارت جستجو را تغییر دهید.
            </Alert>
          ) : (
            <motion.div
              layout
              className="w-full"
              transition={{ layout: { duration: 0.3 } }}
            >
              <AnimatePresence>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 mt-6">
                  {posts.map((post) => (
                    <motion.div
                      key={post._id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card
                        {...post}
                        link={`/post/${post?.slug}`}
                        img={`${import.meta.env.VITE_BACKEND_URL}${
                          post?.image
                        }`}
                        excerpt={post?.content}
                        tags={[
                          {
                            text: post?.category?.title,
                            link: `/search?category=${post?.category?.title}`,
                          },
                        ]}
                      />
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
