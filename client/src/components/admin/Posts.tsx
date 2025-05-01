import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "jalali-moment";

import { ToastContainer, toast } from "react-toastify";

import Button from "../shared/Button";

const Posts = () => {
  const { currentUser } = useSelector(
    (state: { user: { currentUser: any } }) => state.user
  );
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const deleteModalRef = useRef(null); // Create a ref for the input element

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/post/getPosts?userId=${currentUser._id}`);
      const data = await res.json();
      if (res.ok) {
        setUserPosts(data.posts);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        toast.success("مقاله با موفقیت حذف شد");
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
        deleteModalRef.current?.close();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Button
        link="/dashboard?tab=addPost"
        text="افزودن مقاله جدید"
        className="btn-primary w-fit btn-md  "
      />
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra text-right border rounded-sm">
            <thead>
              <tr>
                <th>عنوان</th>
                <th>دسته بندی</th>
                <th>تاریخ بروزرسانی</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {userPosts.map((userPost, i) => (
                <tr key={i}>
                  <td>
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/post/${userPost?.slug}`}
                        className="flex items-center gap-x-1.5"
                      >
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              // src={userPost?.image}
                              // src={`http://localhost:3000${userPost?.image}`} // Use the full backend URL
                              src={`${import.meta.env.VITE_BACKEND_URL}${
                                userPost?.image
                              }`}
                              alt={userPost?.title}
                            />
                          </div>
                        </div>
                        <span className="hover:text-primary">
                          {userPost?.title}
                        </span>
                      </Link>
                    </div>
                  </td>
                  <td>
                    <span>{userPost?.category?.title}</span>
                  </td>
                  <td>
                    {/* {new Date(userPost?.updatedAt).toLocaleDateString()} */}
                    {moment(userPost?.updatedAt, "YYYY/MM/DD")
                      .locale("fa")
                      .format("YYYY/MM/DD")}
                  </td>
                  <td className="flex flex-wrap gap-1.5">
                    <Button
                      link={`/dashboard?tab=updatePost/${userPost?._id}`}
                      title="ویرایش"
                      className="w-fit btn-sm btn-outline btn-primary "
                      icon="ic_round-edit text-lg"
                    />
                    <Button
                      onAction={() => {
                        deleteModalRef.current?.showModal();
                        setPostIdToDelete(userPost?._id);
                      }}
                      title="حذف"
                      className="w-fit btn-sm btn-outline btn-error "
                      icon="bxs_trash text-lg"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showMore && (
            <Button
              onAction={handleShowMore}
              text="مشاهده بیشتر"
              className="btn-sm btn-outline btn-neutral w-fit mt-6"
            />
          )}
        </div>
      ) : (
        <div role="alert" className="alert bg-info text-primary-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>هنوز مقاله ای اضافه نکردید</span>
        </div>
      )}
      {/* delete modal */}
      <dialog ref={deleteModalRef} id="my_modal_1" className="modal">
        <div className="modal-box  max-w-xl">
          <p className="py-4 text-base">آیا از حذف این مقاله اطمینان دارید؟</p>
          <div className="modal-action">
            <form method="dialog" className="flex items-center gap-x-3">
              <button className="btn">انصراف</button>
              <Button
                onAction={handleDeletePost}
                text="حذف"
                type="submit"
                className="btn-error w-20"
              />
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Posts;
