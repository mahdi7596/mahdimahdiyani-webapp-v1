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
  const [visibleCategories, setVisibleCategories] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (category.title === "") {
      setPublishError("عنوان دسته بندی نمی‌تواند خالی باشد");
      return false;
    }
    if (category.title.length < 3) {
      setPublishError("عنوان دسته بندی باید حداقل ۳ کاراکتر باشد");
      return;
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
      toast.success("دسته بندی با موفقیت اضافه شد!", {
        position: "top-right",
        autoClose: 5000, // Close after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast-success", // Custom class for styling
      });

      fetchCategories();
    } catch (error) {
      setPublishError("مشکلی در ارتباط با سرور رخ داده است");
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/postcategory/getAllCategories`);
      const data = await response.json();
      if (response.ok) {
        setCategoriesList(data);
        setLoading(false);
      }
    } catch (error) {
      setPublishError(error);
    }
  };

  const handleShowMore = () => {
    setVisibleCategories((prevVisibleCategories) => prevVisibleCategories + 5);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Slice the categories list to show only the visible categories
  const visibleCategoriesList = categoriesList.slice(0, visibleCategories);

  // console.log(categoriesList, "categoriesList");

  return (
    <div className="w-full xs:w-5/6 h-fit mx-auto flex flex-col gap-y-3 bg-surfaceBg p-6 border border-surfaceBorder rounded">
      <ToastContainer />
      <Button
        onAction={() => {
          addCategoryModalRef.current?.showModal();
        }}
        text="افزودن دسته جدید"
        className="btn-primary w-fit btn-sm"
      />
      {loading ? (
        <span className="loading loading-bars loading-xl text-primary400 self-center"></span>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra text-right border rounded-sm">
            <thead>
              <tr>
                <th>عنوان</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {visibleCategoriesList.map((category, i) => (
                <tr key={i}>
                  <td>
                    <span>{category?.title}</span>
                  </td>
                  <td className="flex flex-col gap-y-1.5">
                    <Button
                      // link={`/update-post/${category?._id}`}
                      title="ویرایش"
                      className="btn-sm btn-outline btn-primary"
                      icon="ic_round-edit text-lg"
                    />
                    {/* <Button
                      onAction={() => {
                        deleteModalRef.current?.showModal();
                        setPostIdToDelete(userPost?._id);
                      }}
                      title="حذف"
                      className="btn-sm btn-outline btn-error"
                      icon="bxs_trash text-lg"
                    /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {visibleCategories < categoriesList.length && (
            <Button
              onAction={handleShowMore}
              text="مشاهده بیشتر"
              className="btn-sm btn-outline btn-neutral w-fit mt-6"
            />
          )}
        </div>
      )}
      {/* modals */}
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
                disabled={category.title === ""}
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
      {/* delete category modal */}
    </div>
  );
};

export default Categories;
