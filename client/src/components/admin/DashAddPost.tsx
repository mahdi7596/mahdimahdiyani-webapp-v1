import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Button from "../shared/Button";

const DashAddPost = () => {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(e);
    console.log(formData.image?.name);
    // console.log(formData, "formData");
    e.preventDefault();

    // Create FormData to handle the file and other fields
    // const form = new FormData();
    // for (const key in formData) {
    //   form.append(key, formData[key]);
    // }

    // Create FormData to handle the file and other fields
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    // Append the image separately
    const imageInput = document.querySelector('input[type="file"]');
    if (imageInput?.files[0]) {
      form.append("image", imageInput.files[0]); // Ensure image is correctly appended
    }

    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        body: form, // Send the FormData
      });

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
      setPublishError("مشکلی پیش آمده است");
    }
  };

  return (
    <div className="w-full xs:w-5/6 h-fit mx-auto flex flex-col gap-y-3 bg-surfaceBg p-6 border border-surfaceBorder rounded">
      <Link to="/dashboard?tab=addPost"></Link>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-6"
      >
        {/* File input */}
        <input
          type="file"
          accept=".png,.jpg,.jpeg"
          name="image"
          // onChange={(e) => {
          //   // console.log(e.target?.files[0]?.name);
          //   // setFormData({
          //   //   ...formData,
          //   //   image: e.target?.files[0], // Keep the file object instead of the name
          //   // });
          // }}
        />
        {/* Title input */}
        <div className="flex flex-wrap items-center gap-x-3">
          <input
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            id="title"
            required
            type="text"
            placeholder="عنوان مقاله"
            className="flex-1 input input-bordered"
          />
          {/* Category dropdown */}
          <select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="select select-bordered ltr"
          >
            <option disabled selected>
              انتخاب دسته بندی
            </option>
            <option value="uncategorized">دسته بندی نشده</option>
            <option value="reactjs">دسته بندی ۲</option>
            <option value="nodejs">دسته بندی ۳</option>
            <option value="express">دسته بندی ۴</option>
            <option value="mongo">دسته بندی ۵</option>
          </select>
        </div>
        {/* Rich text editor */}
        <ReactQuill
          onChange={(value) => setFormData({ ...formData, content: value })}
          theme="snow"
          className="bg-surfaceBg h-96"
        />
        {/* Submit button */}
        <Button
          onAction={handleSubmit}
          text="افزودن"
          type="submit"
          className="btn-primary w-44 mt-9"
        />
      </form>
      {/* Error alert */}
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

export default DashAddPost;
