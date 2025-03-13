import { useEffect, useRef, useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import Button from "../shared/Button";

interface Category {
  title: string;
}

const Categories = () => {
  const addCategoryModalRef = useRef(null); // Create a ref for the input element
  const [category, setCategory] = useState<Category>({ title: "" });
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [publishError, setPublishError] = useState<string | null>(null);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (category.title === "") {
      setPublishError("عنوان دسته بندی نمی‌تواند خالی باشد");
      return false;
    }
    try {
      const response = await fetch("/api/postcategory/createCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category), // Send the FormData
      });
      const data = await response.json();
      if (!response.ok) {
        setPublishError(data.message || "مشکلی در سرور رخ داده است");
        return;
      }
      setPublishError(null);
      setCategory({ title: "" });
      addCategoryModalRef.current?.close();
      toast("دسته بندی جدید با موفقیت اضافه شد");
      fetchCategories();
    } catch (error) {
      setPublishError("مشکلی در ارتباط با سرور رخ داده است");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`/api/postcategory/getAllCategories`);
      const data = await response.json();
      if (response.ok) {
        setCategoriesList([data]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  console.log(categoriesList, "categoriesList");

  return (
    <div className="w-full xs:w-5/6  h-fit mx-auto flex flex-col gap-y-3 bg-surfaceBg p-6 border border-surfaceBorder rounded">
      <ToastContainer />
      <Button
        onAction={() => {
          addCategoryModalRef.current?.showModal();
        }}
        text="افزودن دسته جدید"
        className="btn-primary w-fit btn-sm"
      />
      {/* add category modal */}
      <dialog ref={addCategoryModalRef} id="my_modal_1" className="modal">
        <div className="modal-box  max-w-xl">
          <div className="modal-action flex flex-col ">
            <form method="dialog" className="w-full flex items-center gap-x-3">
              <input
                value={category?.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCategory({ title: e.target.value })
                }
                type="text"
                // required
                placeholder="عنوان دسته بندی"
                className="flex-1 input input-bordered"
              />
              <Button
                onAction={handleAddCategory}
                text="اضافه کردن"
                type="submit"
                className="w-fit btn-primary"
              />
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            {publishError && (
              <p className="mt-3 bg-red-100 border border-red-300 text-red-600 rounded-sm p-3">
                {publishError}
              </p>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Categories;
