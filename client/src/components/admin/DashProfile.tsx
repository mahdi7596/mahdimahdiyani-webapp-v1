import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../../redux/user/userSlice";

import Input from "../shared/Input";

import profilePic from "../../assets/images/mahdimahdiyani-profile-pic.png";
import useInput from "../../hooks/useInput";
import Button from "../shared/Button";

interface IUserCredentials {
  profilePicture?: string;
  username: string;
  email: string;
  password: string;
}

const DashProfile = () => {
  const username = useInput("", { minLength: 3 });
  const email = useInput("", { email: true });
  const password = useInput("", { minLength: 6 });

  const [updateUserError, setUpdateUserError] = useState<string | null>(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState<string | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const { currentUser, error, loading } = useSelector((state) => state.user);

  const formData: IUserCredentials = {
    username: username.value,
    email: email.value,
    password: password.value,
  };

  console.log(formData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.keys(formData).length === 0) {
      console.log("no change");
      setUpdateUserError("تغییری ایجاد نشده است");
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
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("اطلاعات کاربری به روز شد");
        // loading = false;
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  // const handleDeleteUser = async () => {
  //   setShowModal(false);
  //   try {
  //     dispatch(deleteUserStart());
  //     const res = await fetch(`/api/user/delete/${currentUser._id}`, {
  //       method: "DELETE",
  //     });
  //     const data = await res.json();
  //     if (!res.ok) {
  //       dispatch(deleteUserFailure(data.message));
  //     } else {
  //       dispatch(deleteUserSuccess(data));
  //     }
  //   } catch (error) {
  //     dispatch(deleteUserFailure(error.message));
  //   }
  // };

  // const handleSignout = async () => {
  //   try {
  //     const res = await fetch("/api/user/signout", {
  //       method: "POST",
  //     });
  //     const data = await res.json();
  //     if (!res.ok) {
  //       console.log(data.message);
  //     } else {
  //       dispatch(signoutSuccess());
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const isFormValid = !username.error && !email.error && !password.error;

  return (
    <div className="w-1/2 mx-auto flex flex-col">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-4">
        <div className="group/item relative avatar self-center flex flex-col items-center justify-center">
          <div className="w-24 ring ring-offset-2 ring-neutrals200 ring-offset-base-100 rounded-full">
            <img src={profilePic} />
            {/* upload image */}
          </div>
          <div className="invisible group-hover/item:visible w-full h-full !flex flex-col justify-center items-center bg-black bg-opacity-60 absolute rounded-full cursor-pointer">
            <span className="text-surfaceBg text-xs">بارگذاری تصویر</span>
          </div>
        </div>
        <Input
          name="username"
          defaultValue={currentUser.username}
          onChange={username.onChange}
          error={username.error}
          type="text"
          label="نام کاربری"
          placeholder="نام کاربری خود را وارد کنید"
        />
        <Input
          name="email"
          defaultValue={currentUser.email}
          onChange={email.onChange}
          error={email.error}
          type="email"
          label="ایمیل"
          placeholder="ایمیل خود را وارد کنید"
        />
        <Input
          name="password"
          defaultValue={currentUser.email}
          onChange={password.onChange}
          error={password.error}
          type="password"
          label="کلمه عبور"
          placeholder="کلمه عبور خود را وارد کنید"
        />
        <Button
          onAction={handleSubmit}
          text="ویرایش حساب کاربری"
          type="submit"
          className="btn-primary btn-block"
          // disabled={!isFormValid}
          loading={loading}
        />
      </form>

      {updateUserSuccess && (
        <div role="alert" className="alert alert-success">
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
      {updateUserError && (
        <div role="alert" className="alert alert-error">
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
          <span>{updateUserError} </span>
        </div>
      )}
      {error && (
        <div role="alert" className="alert alert-error">
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
          <span>{error} </span>
        </div>
      )}
    </div>
  );
};

export default DashProfile;
