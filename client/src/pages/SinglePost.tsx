import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import moment from "jalali-moment";

import Card from "../components/shared/Card";
import Badge from "../components/shared/Badge";

import Button from "../components/shared/Button";
import { useSelector } from "react-redux";

import image68 from "../assets/images/68.jpeg";
import image69 from "../assets/images/69.jpeg";

interface IProduct {
  id: number;
  image: string;
  title: string;
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
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  // console.log(postSlug);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
            link={`/update-post/${post._id}`}
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
        <div className="flex-1 flex flex-col gap-y-6 p-6 bg-surfaceBg border border-surfaceBorder rounded shadow-sm">
          <div className="px-2 flex flex-col gap-y-6">
            <h1 className="text-neutrals text-xl font-semibold">
              {post?.title}
            </h1>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutrals300 font-medium flex items-center gap-x-0.5">
                <i className="maicon-mingcute_calendar-line text-lg"></i>
                {moment(post?.updatedAt, "YYYY/MM/DD")
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
            src={post && post.image}
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
              text={post?.category}
              link={`/search?category=${post && post?.category}`}
              className="badge-outline hover:bg-neutral hover:text-neutral-content"
            />
          </div>
        </div>
        <aside className="md:sticky md:top-3 w-full md:w-4/12 lg:w-1/4 h-fit flex flex-col gap-y-6 px-3 pt-3 pb-6 border border-surfaceBorder rounded shadow-sm">
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
              .map((post) => (
                <Link to={`/post/${post.slug}`}>
                  <div
                    key={post?._id}
                    className="group flex gap-x-3 bg-surfaceBg border border-surfaceBorder py-2 px-1.5 rounded-sm cursor-pointer"
                  >
                    <img
                      src={post?.image}
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
                          {moment(post?.updatedAt, "YYYY/MM/DD")
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
