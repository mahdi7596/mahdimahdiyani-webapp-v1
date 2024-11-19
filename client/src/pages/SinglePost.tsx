import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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

  console.log(recentPosts);

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-spinner text-info loading-lg"></span>
      </div>
    );

  return (
    <main className="p-3 flex flex-col gap-y-4 max-w-6xl mx-auto min-h-screen">
      <h1>{post && post.title}</h1>
      <Link to={`/search?category=${post && post.category}`}>
        <button className="w-fit btn btn-xs btn-outline btn-secondary">
          {post && post.category}
        </button>
      </Link>
      <img src={post && post.image} alt={post && post.title} />
      <div className="flex items-center justify-between border-b border-gray-300 pb-3 px-1">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
      </div>
      <div
        className="custom-post-content p-3 max-w-2xl mx-auto w-full"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className="flex flex-col items-center justify-center mb-5">
        <h1 className="text-xl mt-5 mb-2">Recent Articles</h1>
        <div className="flex items-center gap-x-3">
          {recentPosts &&
            recentPosts.map((post) => (
              <Card key={post._id} title={post.title} />
            ))}
        </div>
      </div>
    </main>
  );
};

export default SinglePost;
