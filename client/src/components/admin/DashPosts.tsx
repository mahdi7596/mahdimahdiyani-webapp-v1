import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "jalali-moment";

import Button from "../shared/Button";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const deleteModalRef = useRef(null); // Create a ref for the input element

  useEffect(() => {
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
    <div className="w-full xs:w-5/6  h-fit mx-auto flex flex-col gap-y-3 bg-surfaceBg p-6 border border-surfaceBorder rounded">
      <Button
        link="/dashboard?tab=addPost"
        text="افزودن مقاله جدید"
        className="btn-primary w-fit btn-sm"
      />
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra text-right">
            {/* head */}
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
                            <img src={userPost?.image} alt={userPost?.title} />
                          </div>
                        </div>
                        <span className="hover:text-primary">
                          {userPost?.title}
                        </span>
                      </Link>
                    </div>
                  </td>
                  <td>
                    <span>{userPost?.category}</span>
                  </td>
                  <td>
                    {/* {new Date(userPost?.updatedAt).toLocaleDateString()} */}
                    {moment(userPost?.updatedAt, "YYYY/MM/DD")
                      .locale("fa")
                      .format("YYYY/MM/DD")}
                  </td>
                  <td>
                    <Button
                      // link={`/dashboard?tab=update-post/${userPost?._id}`}
                      link={`/update-post/${userPost?._id}`}
                      title="ویرایش"
                      className="btn-sm btn-outline btn-primary ml-3"
                      icon="edit-solid text-lg"
                    />
                    <Button
                      onAction={() => {
                        deleteModalRef.current?.showModal();
                        setPostIdToDelete(userPost?._id);
                      }}
                      title="حذف"
                      className="btn-sm btn-outline btn-error"
                      icon="trash-solid text-lg"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>هنوز مقاله ای اضافه نکردید</p>
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
    </div>
  );
};

export default DashPosts;
