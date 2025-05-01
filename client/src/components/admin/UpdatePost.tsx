import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Button from "../shared/Button";
import { Category } from "./Categories";

interface FormData {
  title: string;
  category: string;
  content: string;
  image?: File | string; // Add image to FormData type
}

const UpdatePost = ({ postId }: { postId?: string }) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "",
    content: "",
    image: "", // Initialize image as an empty string
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null); // Store existing image URL

  const navigate = useNavigate();

  const { currentUser } = useSelector(
    (state: { user: { currentUser: any } }) => state.user
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to handle file upload
    const form = new FormData();

    // Append all fields except the image
    for (const key in formData) {
      if (formData[key] && key !== "image") {
        form.append(key, formData[key]);
      }
    }

    // Append the image separately if it exists
    if (formData.image instanceof File) {
      form.append("image", formData.image); // Ensure the field name is "image"
    }

    try {
      const res = await fetch(
        `/api/post/updatepost/${postId}/${currentUser._id}`,
        {
          method: "PUT",
          body: form, // Use FormData instead of JSON
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
        setFormData({
          ...data.posts[0],
          category: data.posts[0].category?._id || "",
        });
        setExistingImage(data.posts[0].image); // Set existing image URL
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

  return (
    <div className="w-full h-full flex flex-col gap-y-3">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
        {/* Image upload section */}
        <div className="flex flex-col gap-y-3">
          {existingImage && (
            <img
              //  src={existingImage}
              src={`${import.meta.env.VITE_BACKEND_URL}${existingImage}`} // Use the full backend URL
              alt="Current Post Image"
              className="w-32 h-32 object-cover rounded"
            />
          )}
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFormData({ ...formData, image: e.target.files[0] }); // Set new image file
              }
            }}
          />
        </div>
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
            }}
            value={formData.category} // Use category _id
            className="select select-bordered ltr"
          >
            <option disabled value="">
              انتخاب دسته بندی
            </option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>
        <ReactQuill
          onChange={(value) => setFormData({ ...formData, content: value })}
          value={formData.content}
          theme="snow"
          className="bg-surfaceBg h-full"
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
