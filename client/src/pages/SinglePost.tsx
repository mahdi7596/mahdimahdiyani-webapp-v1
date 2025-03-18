import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import moment from "jalali-moment";

import Card from "../components/shared/Card";
import Badge from "../components/shared/Badge";

import Button from "../components/shared/Button";
import { useSelector } from "react-redux";

import image68 from "../assets/images/68.jpeg";
import image69 from "../assets/images/69.jpeg";
import { Category } from "../components/admin/Categories";

interface IProduct {
  id: number;
  image: string;
  title: string;
  category?: string;
  updatedAt?: string;
  content?: string;
  _id?: string;
}

const suggestedProducts: IProduct[] = [
  {
    id: 68,
    image: image68,
    title: "۶۸مین رویداد همکلان - مالیات اشخاص حقوقی",
  },
  {
    id: 69,
    image: image69,
    title: "۶۹مین رویداد همکلان - مسئولیت های قانونی مدیران شرکت ها",
  },
];

const SinglePost = () => {
  const { postSlug } = useParams();

  const [loading, setLoading] = useState(true);

  const [post, setPost] = useState<IProduct>();
  const [recentPosts, setRecentPosts] = useState(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const { currentUser } = useSelector(
    (state: { user: { currentUser: any } }) => state.user
  );

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/post/getposts?slug=${postSlug}`);
      const data = await response.json();
      if (!response.ok) {
        // setError(true);
        setLoading(false);
        return;
      }
      if (response.ok) {
        setPost(data.posts[0]);
        setLoading(false);
        // setError(false);
      }
    } catch (error) {
      console.log(error);
      // setError(true);
      setLoading(false);
    }
  };

  const fetchRecentPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/post/getposts?limit=3`);
      const data = await response.json();
      if (response.ok) {
        setRecentPosts(data.posts);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/postcategory/getAllCategories");
      const data = await response.json();
      if (!response?.ok) {
        return false;
      }
      if (response.ok) {
        setCategories(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchRecentPosts();
    fetchCategories();
  }, [postSlug]);

  const categoryTitle = categories.find(
    (category) => category?._id === post?.category
  );

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner text-info loading-lg"></span>
      </div>
    );

  return (
    <section className="section-container section-inner-space ">
      {currentUser && currentUser.isAdmin && (
        <div className="flex items-center gap-x-4 mb-3">
          <Button
            link={`/update-post/${post?._id}`}
            text="ویرایش"
            className="btn-sm btn-outline btn-primary w-fit"
          />
          <Button
            link="/dashboard?tab=posts"
            text="مشاهده تمام مقالات"
            className="btn-sm btn-outline btn-neutral w-fit"
          />
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-6 xl:gap-x-12">
        <div className="flex-1 flex flex-col gap-y-6  p-3 md:p-6 bg-surfaceBg border border-surfaceBorder rounded shadow-sm">
          <div className="px-2 flex flex-col gap-y-6">
            <h1 className="text-neutrals text-xl font-semibold">
              {post?.title}
            </h1>
            <div className="flex flex-wrap gap-3 items-center justify-between">
              <span className="text-xs text-neutrals300 font-medium flex items-center gap-x-0.5">
                <i className="maicon-mingcute_calendar-line text-lg"></i>
                {moment(post && post?.updatedAt, "YYYY/MM/DD")
                  .locale("fa")
                  .format("YYYY/MM/DD")}
              </span>
              <p className="text-xs text-neutrals200 flex items-center gap-x-0.5">
                زمان مورد نیاز برای مطالعه:
                <span className="mr-1 text-neutrals300 font-medium">
                  {post && (post.content.length / 1000).toFixed(0) + " دقیقه"}
                </span>
                <i className="maicon-mdi_clock-outline text-lg"></i>
              </p>
            </div>
          </div>
          <img
            src={`http://localhost:3000${post?.image}`} // Use the full backend URL
            alt={post && post.title}
            className="h-96 object-cover rounded"
          />
          {/* title && featured image */}
          <div
            className="custom-post-content px-2"
            dangerouslySetInnerHTML={{ __html: post && post.content }}
          ></div>
          <hr />
          <div className="flex items-center gap-x-1.5">
            <span className=" text-xs text-neutrals500">دسته بندی:</span>
            <Badge
              text={categoryTitle?.title}
              link={`/search?category=${post && categoryTitle?.title}`}
              className="badge-outline hover:bg-neutral hover:text-neutral-content"
            />
          </div>
        </div>
        <aside className="md:sticky md:top-3 w-full md:w-4/12 lg:w-1/4 h-fit flex flex-col gap-y-6 px-3 pt-3 pb-6 border border-surfaceBorder rounded shadow-sm">
          {/*  suggested courses */}
          <div className="flex flex-col gap-y-4">
            <Button
              text="دوره های پیشنهادی همکلان"
              link="http://hamkalan.com/"
              className="btn-sm btn-ghost self-center"
            />
            <div className="carousel w-full">
              <div className="carousel">
                {suggestedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="carousel-item w-full flex flex-col"
                  >
                    <Card
                      key={product.id}
                      title={product.title}
                      img={product.image}
                      cardClassName="self-center"
                      actionButton={{
                        text: "خرید دوره",
                        className: "btn-primary",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr />
          {recentPosts &&
            recentPosts
              .filter((f) => f.slug != postSlug)
              .map((post, index) => (
                <Link key={index} to={`/post/${post.slug}`}>
                  <div
                    key={post?._id}
                    className="group flex gap-x-3 bg-surfaceBg border border-surfaceBorder py-2 px-1.5 rounded-sm cursor-pointer"
                  >
                    <img
                      src={`http://localhost:3000${post?.image}`} // Use the full backend URL
                      className="object-cover size-20 rounded"
                      alt={post?.title}
                    />
                    <div className="flex flex-col justify-between gap-y-1.5 w-full">
                      <h4 className="flex-1 text-xs line-clamp-2 group-hover:text-primary">
                        {post?.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-neutrals300 font-medium flex items-center gap-x-0.5">
                          <i className="maicon-mingcute_calendar-line text-lg"></i>
                          {moment(post && post?.updatedAt, "YYYY/MM/DD")
                            .locale("fa")
                            .format("YYYY/MM/DD")}
                        </span>
                        <p className="text-[10px] text-neutrals200 flex items-center gap-x-0.5">
                          <span className="mr-1 text-neutrals300 font-medium">
                            {post &&
                              (post.content.length / 1000).toFixed(0) +
                                " دقیقه"}
                          </span>
                          <i className="maicon-mdi_clock-outline text-lg"></i>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </aside>
      </div>
    </section>
  );
};

export default SinglePost;
