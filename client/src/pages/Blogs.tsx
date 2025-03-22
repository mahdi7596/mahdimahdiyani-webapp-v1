import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Button from "../components/shared/Button";
import Card from "../components/shared/Card";

import banner from "../assets/images/banner.jpg";
import { Category } from "../components/admin/Categories";

const Blogs = () => {
  // const [sidebarData, setSidebarData] = useState({
  //   searchTerm: "",
  //   sort: "desc",
  //   category: "all",
  // });

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDateQuery, setsearchDateQuery] = useState("desc");
  const [categories, setCategories] = useState<Category[]>([]);

  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const fetchPosts = async () => {
    setLoading(true);
    const res = await fetch(
      `/api/post/getposts?category=${searchQuery}&&order=${searchDateQuery}`
    );
    if (!res?.ok) {
      setLoading(false);
      return;
    }
    if (res?.ok) {
      const data = await res?.json();
      setPosts(data?.posts);
      setLoading(false);
      // if(data?.posts.length ===)
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/postcategory/getAllCategories");
      const data = await response.json();

      if (!response) {
        return false;
      }

      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (e) => {
    e?.preventDefault();

    setSearchQuery(category === "all" ? "" : category);
    setsearchDateQuery(dateFilter);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex.toString());
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [searchQuery, searchDateQuery]);

  console.log(dateFilter, "dateFilter");
  console.log(category, "category");

  return (
    <div className="section-container section-inner-space">
      <div
        style={{ backgroundImage: `url(${banner})` }}
        className="relative min-h-fit lg:h-48 flex flex-col items-center gap-y-4 py-8 px-6 md:px-16 lg:px-24 bg-no-repeat bg-cover bg-center rounded-lg"
      >
        <h2 className="z-10 text-2xl text-white">مقالات وب سایت</h2>
        <p className="z-10 text-neutrals100 text-center">
          در این صفحه می‌توانید مجموعه‌ای از مقالات و نوشته‌های ما را مشاهده
          کنید که با دقت و توجه به موضوعات روز تهیه شده‌اند. هدف ما ارائه محتوای
          آموزنده، جذاب و کاربردی برای شماست. هر هفته مطالب جدید اضافه می‌کنیم
          تا همراه همیشگی شما در مسیر یادگیری و رشد باشیم. از بازخوردها و نظرات
          ارزشمندتان استقبال می‌کنیم!
        </p>
        <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-black bg-opacity-60" />
      </div>
      <form
        // onSubmit={handleSubmit}
        className="flex flex-wrap sm:flex-nowrap items-center gap-y-3 gap-x-3 mt-6 md:mt-12 mb-8"
      >
        <input
          id="searchTerm"
          value={searchTerm}
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="جستجو کنید"
          className="input input-bordered w-full"
        />
        <select
          id="sort"
          value={dateFilter}
          onChange={(e) => setDateFilter(e?.target?.value)}
          className="select select-bordered ltr  flex-1 xxs:flex-none"
        >
          <option value="asc"> قدیمی ترین</option>
          <option value="desc">جدید ترین</option>
        </select>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e?.target?.value)}
          className="select select-bordered ltr flex-1 sm:flex-none"
        >
          <option selected value={""}>
            همه دسته بندی ها
          </option>
          {categories?.map((category) => (
            <option key={category._id} id={category._id} value={category._id}>
              {category?.title}
            </option>
          ))}
        </select>

        <Button
          onAction={(e) => handleFilter(e)}
          text="اعمال فیلتر"
          className="btn-primary w-full sm:w-fit"
          disabled={true}
          // disabled={!dateFilter || !category}
        />
      </form>
      {loading && (
        <div className="w-full flex flex-col justify-center items-center self-center">
          <div className="loading loading-bars loading-lg text-primary"></div>
        </div>
      )}
      <div
        className={
          posts.length === 0
            ? "w-full"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        }
      >
        {!loading && posts.length === 0 && (
          <p className=" p-3 bg-red-100 border border-red-300 text-red-600 text-base md:text-lg rounded-sm">
            وبلاگ مد نظر شما یافت نشد
          </p>
        )}
        {!loading &&
          posts &&
          posts
            .filter((f) => f?.title.includes(searchTerm))
            .map((post) => (
              <Card
                {...post}
                key={post._id}
                link={`/post/${post?.slug}`}
                img={`http://localhost:3000${post?.image}`} // Use the full backend URL
                excerpt={post?.content}
                tags={[
                  {
                    text: post?.category?.title,
                    link: `/search?category=${post && post?.category?.title}`,
                  },
                ]}
              />
            ))}
      </div>
      {showMore && (
        <Button
          onAction={handleShowMore}
          text="مشاهده بیشتر"
          className="btn-sm btn-outline btn-neutral w-fit mt-6"
        />
      )}
    </div>
  );
};

export default Blogs;
