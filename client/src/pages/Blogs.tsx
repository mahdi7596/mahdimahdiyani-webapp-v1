import { useEffect, useState } from "react";

import { useSearchParams, useNavigate } from "react-router-dom";

import { buildSearchParams } from "../utils/url";

import { useBlogPosts } from "../hooks/useBlogPosts";
import { useBlogCategories } from "../hooks/useBlogCategories";

import Banner from "../components/shared/Banner";
import Card from "../components/shared/Card";
import Loading from "../components/shared/Loading";
import BlogFilters from "../components/blog/BlogFilters";
import { Alert } from "../components/shared/Alert";

import { motion, AnimatePresence } from "framer-motion";

import blogBanner from "../assets/images/banner.jpg";
import { BlogCategory } from "../models/blog";

interface BlogsProps {
  mediaMode?: boolean;
}
const Blogs = ({ mediaMode }: BlogsProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const navigate = useNavigate();

  const filters = {
    searchTerm: searchText,
    category: selectedCategory,
    order: sortOrder,
  };

  const { posts, loading } = useBlogPosts(filters);
  const { categories } = useBlogCategories();

  const mediaCategory: BlogCategory = categories.find(
    (category) => category.title === "رسانه"
  );

  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const searchTermFromUrl = searchParams.get("searchTerm");

  useEffect(() => {
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  useEffect(() => {
    if (mediaMode && mediaCategory && mediaCategory._id !== selectedCategory) {
      setSelectedCategory(mediaCategory._id);
    }
  }, [mediaMode, mediaCategory]);

  useEffect(() => {
    if (searchTermFromUrl && searchTermFromUrl !== searchText) {
      setSearchText(searchTermFromUrl);
    }
  }, [searchTermFromUrl]);

  useEffect(() => {
    if (!mediaMode) {
      const query = buildSearchParams(filters);
      navigate(`/search?${query}`, { replace: true });
    }
  }, [filters.searchTerm, filters.category, filters.order]);

  return (
    <section className="section-container section-inner-space">
      <Banner
        banner={blogBanner}
        title={
          mediaMode
            ? "یک عوان برای حضور در رسانه بنویسیم"
            : "آموزشهای رایگان وب سایت"
        }
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
          mediaMode={mediaMode}
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
                  {posts
                    .filter((item) =>
                      mediaMode
                        ? item.category._id === mediaCategory._id
                        : item.category._id !== mediaCategory._id
                    )
                    .map((post) => (
                      <motion.div
                        key={post._id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="grid"
                      >
                        <Card
                          {...post}
                          link={`/${mediaMode ? "media" : "post"}/${
                            post?.slug
                          }`}
                          img={`${import.meta.env.VITE_BACKEND_URL}${
                            post?.image
                          }`}
                          excerpt={post?.content}
                          tags={[
                            {
                              text: post?.category?.title,
                              link: `/${
                                mediaMode ? "media" : "search"
                              }?category=${post?.category?._id}`,
                            },
                          ]}
                          cardClassName="row-span-full"
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
