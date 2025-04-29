import { useState, useRef } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../../redux/user/userSlice";

import profilePic from "../../assets/images/mahdimahdiyani-profile-pic.png";
import Button from "../shared/Button";

const Profile = () => {
  const { currentUser, error, loading } = useSelector(
    (state: { user: { currentUser: any; error: any; loading: any } }) =>
      state.user
  );
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState<string | null>(
    null
  );
  const dispatch = useDispatch();
  const deleteModalRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setUpdateUserSuccess(null);
    dispatch(updateFailure(null));

    if (Object.keys(formData).length === 0) {
      dispatch(updateFailure("هیچ تغییر اعمال نشده است"));
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("حساب کاربری با موفقیت بروزرسانی شد");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  if (updateUserSuccess) {
    setTimeout(() => {
      setUpdateUserSuccess(null);
    }, 5000);
  }

  if (error) {
    setTimeout(() => {
      dispatch(updateFailure(null));
    }, 5000);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-4">
        <div className="group/item relative avatar self-center flex flex-col items-center justify-center">
          {/* <div className="w-24 ring ring-offset-1 ring-gray-200 ring-offset-base-100 rounded-full">
            <img src={profilePic} />
          </div> */}
          <div className="invisible group-hover/item:visible w-full h-full !flex flex-col justify-center items-center bg-black bg-opacity-60 absolute rounded-full cursor-pointer">
            <span className="text-surfaceBg text-xs">بارگذاری تصویر</span>
          </div>
        </div>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            defaultValue={currentUser.username}
            onChange={handleChange}
            id="username"
            type="text"
            placeholder="نام کاربری"
            className="grow"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            defaultValue={currentUser.email}
            onChange={handleChange}
            id="email"
            type="email"
            className="grow"
            placeholder="ایمیل"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            onChange={handleChange}
            id="password"
            type="password"
            className="grow"
          />
        </label>

        <div className="flex items-center gap-x-3">
          <Button
            onAction={handleSubmit}
            text="ویرایش حساب کاربری"
            type="submit"
            className="btn-primary w-fit"
            loading={loading}
          />
          {/* <Button
            onAction={() => {
              deleteModalRef.current?.showModal();
            }}
            text="حذف حساب کاربری"
            className="w-fit btn-error btn-outline "
            loading={loading}
          /> */}
        </div>
      </form>
      {updateUserSuccess && (
        <div role="alert" className="alert bg-success  text-primary-content">
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
          <span>{updateUserSuccess} </span>
        </div>
      )}
      {error && (
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
          <span>{error}</span>
        </div>
      )}
      {/* delete modal */}
      <dialog ref={deleteModalRef} id="my_modal_1" className="modal">
        <div className="modal-box  max-w-xl">
          <p className="py-4 text-base">
            آیا از حذف حساب کاربری خود اطمینان دارید؟
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex items-center gap-x-3">
              <button className="btn">انصراف</button>
              <Button
                onAction={handleDeleteUser}
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

export default Profile;
