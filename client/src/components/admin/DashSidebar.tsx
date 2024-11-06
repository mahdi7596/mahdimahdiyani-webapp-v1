import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../../redux/user/userSlice";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    // console.log(tabFromUrl);
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);

  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-surfaceBg text-base-content min-h-full w-80 p-4 border-l border-surfaceBorder">
        {currentUser && currentUser.isAdmin && (
          <li>
            <Link
              to="/dashboard?tab=dash"
              className={`hover:bg-primary200 focus:bg-primary100 ${
                tab === "dash" && "bg-primary100"
              }  `}
            >
              داشبور
            </Link>
            {currentUser.isAdmin && (
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-neutrals rounded-full text-white px-3 py-1">
                ادمین
              </span>
            )}
          </li>
        )}
        <li className="relative">
          <Link
            to="/dashboard?tab=profile"
            className={`hover:bg-primary200 focus:bg-primary100 ${
              tab === "profile" && "bg-primary100"
            }  `}
          >
            پروفایل کاربری
          </Link>
          {currentUser.isAdmin && (
            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-neutrals rounded-full text-white px-3 py-1">
              ادمین
            </span>
          )}
        </li>
        <li>
          <a onClick={handleSignout}>Sign Out</a>
        </li>
      </ul>
    </div>
  );
};

export default DashSidebar;
