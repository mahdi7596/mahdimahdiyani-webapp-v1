import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../components/shared/Button";
import Card from "../components/shared/Card";

import banner from "../assets/images/banner.jpg";

const Blogs = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "all",
  });

  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      let category = "";
      if (e.target.value === "all") {
        category = "";
      } else {
        category = e.target.value;
      }
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);

    urlParams.set("searchTerm", sidebarData?.searchTerm);
    urlParams.set("sort", sidebarData?.sort);
    if (sidebarData?.category !== "all") {
      urlParams.set("category", sidebarData?.category);
    }

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
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
    const urlParams = new URLSearchParams(location.search);

    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  return (
    <div className="section-container section-inner-space">
      <div
        style={{ backgroundImage: `url(${banner})` }}
        className="relative h-48 flex flex-col items-center gap-y-4 py-8 px-24 bg-no-repeat bg-cover bg-center rounded-lg"
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
        onSubmit={handleSubmit}
        className="flex items-center gap-x-6 mt-12 mb-6"
      >
        {/* <Search className="w-full" /> */}
        <input
          id="searchTerm"
          type="text"
          onChange={handleChange}
          placeholder="جستجو کنید"
          className="input input-bordered w-full"
        />
        <select
          id="sort"
          value={sidebarData.sort}
          onChange={handleChange}
          className="select select-bordered ltr"
        >
          <option value="desc">قدیمی ترین</option>
          <option value="asc">جدید ترین</option>
        </select>
        <select
          id="category"
          onChange={handleChange}
          className="select select-bordered ltr"
        >
          <option value="all"> تمام دسته بندی ها</option>
          <option value="uncategorized">دسته بندی نشده</option>
          <option value="reactjs">دسته بندی ۲</option>
          <option value="nodejs">دسته بندی ۳</option>
          <option value="express">دسته بندی ۴</option>
          <option value="mongo">دسته بندی ۵</option>
        </select>
        <Button
          onAction={handleSubmit}
          text="اعمال فیلتر"
          className="btn-primary"
        />
      </form>
      <div className="grid grid-cols-3 gap-6">
        {!loading && posts.length === 0 && (
          <p className="text-6xl text-red-500 text-center">
            پست مد نظر شما یافت نشد
          </p>
        )}
        {!loading &&
          posts &&
          posts.map((post) => (
            <Card
              key={post._id}
              {...post}
              excerpt={post?.content}
              tags={[
                {
                  text: post?.category,
                  link: `/search?category=${post && post?.category}`,
                },
              ]}
              actionButton={{
                text: "مشاهده بیشتر",
                className: "btn-primary w-fit self-end",
                link: `/post/${post?.slug}`,
              }}
            />
          ))}
        {showMore && (
          <Button
            onAction={handleShowMore}
            text="مشاهده بیشتر"
            className="btn-sm btn-outline btn-neutral w-fit mt-6"
          />
        )}
      </div>
    </div>
  );
};

export default Blogs;
