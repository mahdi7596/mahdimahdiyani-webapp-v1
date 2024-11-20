import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import moment from "jalali-moment";

import Card from "../components/shared/Card";

const SinglePost = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

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
    <section className="section-container flex gap-x-12 py-6">
      <div className="flex-1 flex flex-col gap-y-6 p-6 bg-surfaceBg rounded border border-surfaceBorder shadow-sm">
        <div className="px-2 flex flex-col gap-y-6">
          <h1 className="text-neutrals text-xl font-semibold">{post?.title}</h1>
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
          className="h-96 object-cover rounded-sm"
          alt={post && post.title}
        />
        {/* title && featured image */}
        <div
          className="custom-post-content px-2"
          dangerouslySetInnerHTML={{ __html: post && post.content }}
        ></div>
      </div>
      <aside className="w-1/4 bg-orange-50 p-6">sidebar</aside>
    </section>
  );
};

export default SinglePost;
