import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Button from "../shared/Button";
import { Category } from "./Categories";

interface FormData {
  title: string;
  category: string;
  content: string;
}

const UpdatePost = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "",
    content: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [publishError, setPublishError] = useState<string | null>(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  const { currentUser } = useSelector(
    (state: { user: { currentUser: any } }) => state.user
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/post/updatepost/${postId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (data.success === false) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError(error + "مشکلی پیش آمده است");
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/post/getposts?postId=${postId}`);
      const data = await response.json();
      if (!response.ok) {
        setPublishError(data.message);
        return;
      }
      if (response.ok) {
        setPublishError(null);
        setFormData(data.posts[0]);
      }
    } catch (error) {
      setPublishError(error);
    }
  };

  const fetchCategories = async () => {
    const response = await fetch("/api/postcategory/getAllCategories");
    const data = await response.json();

    if (!response.ok) {
      setPublishError("خطایی رخ داده است");
      return false;
    }

    setCategories(data);
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [postId]);

  console.log(formData, "formData");
  console.log(formData.category?.title, "formData.category?.title");
  console.log(categories, "categories");

  return (
    <div className="my-6 w-full xs:w-5/6 h-fit mx-auto flex flex-col gap-y-3 bg-surfaceBg p-6 border border-surfaceBorder rounded">
      <Link to="/dashboard?tab=update-post"></Link>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
        <div className="flex flex-wrap items-center gap-x-3">
          <input
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
            id="title"
            required
            type="text"
            placeholder="عنوان مقاله"
            className="flex-1 input input-bordered"
          />
          <select
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
              // console.log(e.target.value);
            }}
            // value={formData.category?._id}
            className="select select-bordered ltr"
          >
            <option disabled selected>
              {formData.category?.title}
            </option>
            {categories
              .filter((f) => f._id != formData.category?._id)
              .map((cat) => (
                <option key={cat._id} id={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
          </select>
        </div>
        <ReactQuill
          onChange={(value) => setFormData({ ...formData, content: value })}
          value={formData.content}
          theme="snow"
          className="bg-surfaceBg h-96"
        />
        <Button
          onAction={handleSubmit}
          text="بروزرسانی"
          type="submit"
          className="btn-primary w-44 mt-9"
          // loading={loading}
        />
      </form>
      {publishError && (
        <div role="alert" className="alert bg-danger text-primary-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{publishError}</span>
        </div>
      )}
    </div>
  );
};

export default UpdatePost;
