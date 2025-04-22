import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../../redux/user/userSlice";

const Sidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();

  const { currentUser } = useSelector(
    (state: { user: { currentUser: any } }) => state.user
  );

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
          </li>
        )}
        <li>
          <Link
            to="/dashboard?tab=profile"
            className={`hover:bg-primary200 focus:bg-primary100 ${
              tab === "profile" && "bg-primary100"
            }  `}
          >
            پروفایل کاربری
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard?tab=reservations"
            className={`hover:bg-primary200 focus:bg-primary100 ${
              tab === "reservations" && "bg-primary100"
            }  `}
          >
            زمان های رزرو شده
          </Link>
        </li>
        {currentUser.isAdmin && (
          <>
            <li>
              <Link
                to="/dashboard?tab=posts"
                className={`hover:bg-primary200 focus:bg-primary100 ${
                  tab === "posts" && "bg-primary100"
                }  `}
              >
                مدیریت آموزشهای رایگان
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard?tab=categories"
                className={`hover:bg-primary200 focus:bg-primary100 ${
                  tab === "categories" && "bg-primary100"
                }  `}
              >
                مدیریت دسته بندی
              </Link>
            </li>
            <li className="relative pointer-events-none text-gray-400">
              <span>مدیریت کاربران</span>
              {currentUser.isAdmin && (
                <span className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-teal pointer-events-none rounded-full text-white px-3 py-1">
                  به زودی
                </span>
              )}
            </li>
          </>
        )}
        <li>
          <a onClick={handleSignout}>خروج</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
