import { useEffect, useRef, useState } from "react";

import moment from "jalali-moment";

import { ToastContainer, toast } from "react-toastify";

import Button from "../shared/Button";
import { apiFetch } from "../../utils/apiFetch";

export interface Category {
  _id?: string; // Optional because it's assigned by the database
  title: string;
  updatedAt?: string; // Optional because it's assigned by the database
}

const Categories = () => {
  const addCategoryModalRef = useRef(null);
  const editCategoryModalRef = useRef(null);
  const deleteModalRef = useRef(null);
  const categoryIdRef = useRef(null);

  const [category, setCategory] = useState<Category>({
    title: "",
  });
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>();
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
      const response = await apiFetch(`/api/postcategory/createCategory`, {
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
    } catch {
      setPublishError("مشکلی در ارتباط با سرور رخ داده است");
    }
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();

    if (selectedCategory.title === "") {
      setPublishError("عنوان دسته بندی نمی‌تواند خالی باشد");
      return false;
    }
    if (selectedCategory.title.length < 3) {
      setPublishError("عنوان دسته بندی باید حداقل ۳ کاراکتر باشد");
      return;
    }

    try {
      const response = await apiFetch(
        `/api/postcategory/updateCategory/${selectedCategory._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedCategory),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setPublishError(data.message || "مشکلی در سرور رخ داده است");
        return;
      }
      setPublishError(null);
      fetchCategories();
      editCategoryModalRef.current?.close();
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000, // Close after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast-success", // Custom class for styling
      });
    } catch (error) {
      setPublishError(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const response = await apiFetch(
        `/api/postcategory/deleteCategory/${categoryIdRef.current}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "مشکلی در سرور رخ داده است", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      deleteModalRef.current?.close();
      fetchCategories();
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      setPublishError(error);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await apiFetch(`/api/postcategory/getAllCategories`);
      const data = await response.json();
      if (response.ok) {
        setCategoriesList(data.categories);
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

  return (
    <div>
      <ToastContainer />
      <Button
        onAction={() => {
          addCategoryModalRef.current?.showModal();
        }}
        text="افزودن دسته جدید"
        className="btn-primary w-fit btn-md mb-3"
      />
      {loading ? (
        <span className="loading loading-bars loading-xl text-primary400 self-center"></span>
      ) : (
        // table
        <div className="overflow-x-auto">
          <table className="table table-zebra text-right border rounded-sm">
            <thead>
              <tr>
                <th>عنوان</th>
                <th>تاریخ بروزرسانی</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {visibleCategoriesList.map((category, index) => (
                <tr key={index}>
                  <td>
                    <span>{category?.title}</span>
                  </td>
                  {category?.updatedAt && (
                    <td>
                      {moment(category?.updatedAt, "YYYY/MM/DD")
                        .locale("fa")
                        .format("YYYY/MM/DD")}
                    </td>
                  )}
                  <td className="flex flex-wrap gap-1.5">
                    <Button
                      onAction={() => {
                        setSelectedCategory(category);
                        editCategoryModalRef.current?.showModal();
                      }}
                      title="ویرایش"
                      className="w-fit btn-sm btn-outline btn-primary"
                      icon="ic_round-edit text-lg"
                    />
                    <Button
                      onAction={() => {
                        deleteModalRef.current?.showModal();
                        categoryIdRef.current = category?._id;
                      }}
                      title="حذف"
                      className="w-fit btn-sm btn-outline btn-error"
                      icon="bxs_trash text-lg"
                    />
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
      {/* edit category modal */}
      <dialog ref={editCategoryModalRef} id="my_modal_1" className="modal">
        <div className="modal-box  max-w-xl">
          <div className="modal-action flex flex-col ">
            <form method="dialog" className="w-full flex items-center gap-x-3">
              <input
                value={selectedCategory?.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    title: e?.target?.value,
                  })
                }
                type="text"
                placeholder="عنوان دسته بندی"
                className="flex-1 input input-bordered"
              />
              <Button
                onAction={handleEditCategory}
                text="به روز رسانی"
                type="submit"
                className="w-fit btn-primary"
                // disabled={selectedCategory.title === ""}
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
      <dialog ref={deleteModalRef} id="my_modal_1" className="modal">
        <div className="modal-box  max-w-xl">
          <p className="py-4 text-base">
            آیا از حذف این دسته بندی اطمینان دارید؟
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex items-center gap-x-3">
              <button className="btn">انصراف</button>
              <Button
                onAction={handleDeleteCategory}
                text="حذف"
                type="submit"
                className="btn-error w-20"
              />
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Categories;
