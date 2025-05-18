import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

interface SidebarProps {
  onItemClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onItemClick }) => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector(
    (state: { user: { currentUser: any } }) => state.user
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);

  const handleItemClick = (tabName: string) => {
    setTab(tabName);
    onItemClick && onItemClick();
  };

  return (
    <ul className="menu bg-surfaceBg text-base-content h-full w-80 p-4 border-l border-surfaceBorder pt-20 lg:pt-4">
      {currentUser && currentUser.isAdmin && (
        <li>
          <Link
            to="/dashboard?tab=profile"
            onClick={() => handleItemClick("profile")}
            className={`
              hover:bg-primary200 focus:bg-primary100 
              transition-all duration-300 ease-in-out
              group flex items-center
              ${tab === "profile" ? "bg-primary100" : ""}
            `}
          >
            <span className="group-hover:text-primary transition-colors duration-300">
              پروفایل
            </span>
          </Link>
        </li>
      )}
      <li>
        <Link
          to="/dashboard?tab=reservations"
          onClick={() => handleItemClick("reservations")}
          className={`
            hover:bg-primary200 focus:bg-primary100 
            transition-all duration-300 ease-in-out
            group flex items-center
            ${tab === "reservations" ? "bg-primary100" : ""}
          `}
        >
          <span className="group-hover:text-primary transition-colors duration-300">
            زمان های رزرو شده
          </span>
        </Link>
      </li>
      {currentUser.isAdmin && (
        <>
          <li>
            <Link
              to="/dashboard?tab=posts"
              onClick={() => handleItemClick("posts")}
              className={`
                hover:bg-primary200 focus:bg-primary100 
                transition-all duration-300 ease-in-out
                group flex items-center
                ${tab === "posts" ? "bg-primary100" : ""}
              `}
            >
              <span className="group-hover:text-primary transition-colors duration-300">
                مدیریت آموزش رایگان
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard?tab=categories"
              onClick={() => handleItemClick("categories")}
              className={`
                hover:bg-primary200 focus:bg-primary100 
                transition-all duration-300 ease-in-out
                group flex items-center
                ${tab === "categories" ? "bg-primary100" : ""}
              `}
            >
              <span className="group-hover:text-primary transition-colors duration-300">
                مدیریت دسته بندی
              </span>
            </Link>
          </li>
          <li className="relative pointer-events-none text-gray-400">
            {/* Existing content */}
          </li>
        </>
      )}
    </ul>
  );
};

export default Sidebar;
