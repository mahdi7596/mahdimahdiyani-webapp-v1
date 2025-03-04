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

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDateQuery, setsearchDateQuery] = useState("desc");
  console.log(searchTerm, "searchTerm");
  console.log(category, "category");
  console.log(dateFilter, "dateFilter");

  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   if (e.target.id === "searchTerm") {
  //     setSidebarData({ ...sidebarData, searchTerm: e.target.value });
  //   }

  //   if (e.target.id === "sort") {
  //     const order = e.target.value || "desc";
  //     setSidebarData({ ...sidebarData, sort: order });
  //   }
  //   if (e.target.id === "category") {
  //     let category = "";
  //     if (e.target.value === "all") {
  //       category = "";
  //     } else {
  //       category = e.target.value;
  //     }
  //     setSidebarData({ ...sidebarData, category });
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const urlParams = new URLSearchParams(location.search);

  //   urlParams.set("searchTerm", sidebarData?.searchTerm);

  //   urlParams.set("sort", sidebarData?.sort);

  //   if (sidebarData?.category !== "all") {
  //     urlParams.set("category", sidebarData?.category);
  //   }

  //   const searchQuery = urlParams.toString();
  //   navigate(`/search?${searchQuery}`);
  // };

  const handleFilter = (e) => {
    console.log("object");
    e?.preventDefault();

    setSearchQuery(category === "all" ? "" : category);
    setsearchDateQuery(dateFilter);
  };
  console.log(searchQuery, "setSearchQuery");
  console.log(searchDateQuery, "setSearchDateQuery");

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

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(location.search);

  //   const searchTermFromUrl = urlParams.get("searchTerm");
  //   const sortFromUrl = urlParams.get("sort");
  //   const categoryFromUrl = urlParams.get("category");

  //   if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
  //     setSidebarData({
  //       ...sidebarData,
  //       searchTerm: searchTermFromUrl,
  //       sort: sortFromUrl,
  //       category: categoryFromUrl,
  //     });
  //   }

  //   const fetchPosts = async () => {
  //     setLoading(true);
  //     const searchQuery = urlParams.toString();
  //     const res = await fetch(`/api/post/getposts?${searchQuery}`);
  //     if (!res.ok) {
  //       setLoading(false);
  //       return;
  //     }
  //     if (res.ok) {
  //       const data = await res.json();
  //       setPosts(data.posts);
  //       setLoading(false);
  //       if (data.posts.length === 9) {
  //         setShowMore(true);
  //       } else {
  //         setShowMore(false);
  //       }
  //     }
  //   };

  //   fetchPosts();
  // }, [location.search]);

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

  useEffect(() => {
    fetchPosts();
  }, [searchQuery, searchDateQuery]);

  console.log(posts, "posts");

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
        {/* <Search className="w-full" /> */}
        {/* <input
          id="searchTerm"
          type="text"
          onChange={handleChange}
          placeholder="جستجو کنید"
          className="input input-bordered w-full"
        /> */}
        <input
          id="searchTerm"
          value={searchTerm}
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="جستجو کنید"
          className="input input-bordered w-full"
        />
        {/* <select
          id="sort"
          value={sidebarData.sort}
          onChange={handleChange}
          className="select select-bordered ltr  flex-1 xxs:flex-none"
        >
          <option value="desc">قدیمی ترین</option>
          <option value="asc">جدید ترین</option>
        </select>
        <select
          id="category"
          onChange={handleChange}
          className="select select-bordered ltr flex-1 sm:flex-none"
        >
          <option value="all"> تمام دسته بندی ها</option>
          <option value="uncategorized">دسته بندی نشده</option>
          <option value="reactjs">دسته بندی ۲</option>
          <option value="nodejs">دسته بندی ۳</option>
          <option value="express">دسته بندی ۴</option>
          <option value="mongo">دسته بندی ۵</option>
        </select> */}
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
          <option value="all"> تمام دسته بندی ها</option>
          <option value="uncategorized">دسته بندی نشده</option>
          <option value="reactjs">دسته بندی ۲</option>
          <option value="nodejs">دسته بندی ۳</option>
          <option value="express">دسته بندی ۴</option>
          <option value="mongo">دسته بندی ۵</option>
        </select>
        {/* <Button
          onAction={handleSubmit}
          text="اعمال فیلتر"
          className="btn-primary w-full xsm:w-fit"
        /> */}
        <Button
          onAction={(e) => handleFilter(e)}
          text="اعمال فیلتر"
          className="btn-primary w-full xsm:w-fit"
        />
      </form>
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
            // .filter((f) => f?.title.includes(sidebarData.searchTerm))
            .filter((f) => f?.title.includes(searchTerm))
            .map((post) => (
              <Card
                key={post._id}
                {...post}
                img={`http://localhost:3000${post?.image}`} // Use the full backend URL
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
