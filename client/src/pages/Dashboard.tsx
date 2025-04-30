import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../components/admin/Sidebar";
import Profile from "../components/admin/Profile";
import Posts from "../components/admin/Posts";
import AddPost from "../components/admin/AddPost";
import Categories from "../components/admin/Categories";
import Reservations from "../components/admin/Reservations";
import UpdatePost from "../components/admin/UpdatePost";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [postId, setPostId] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      // Check if the tab includes updatePost
      if (tabFromUrl.startsWith("updatePost/")) {
        setTab("updatePost");
        setPostId(tabFromUrl.split("/")[1]);
      } else {
        setTab(tabFromUrl);
        setPostId("");
      }
    }
  }, [location.search]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSidebarItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Hamburger menu for mobile */}
      <button
        className="lg:hidden absolute top-4 left-4 z-50 p-2 
        hover:bg-gray-100 rounded-full transition-all duration-300 
        active:scale-90 group"
        onClick={toggleMobileMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-6 h-6 stroke-current group-hover:stroke-primary transition-colors duration-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      <div className="drawer lg:drawer-open flex-grow px-3 lg:px-0">
        <input
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
          checked={isMobileMenuOpen}
          onChange={toggleMobileMenu}
        />

        <div className="drawer-content w-full flex flex-col p-4 h-fit gap-y-3 mt-20 lg:mt-0 bg-surfaceBg border border-surfaceBorder rounded flex-grow">
          {tab === "profile" && <Profile />}
          {tab === "posts" && <Posts />}
          {tab === "addPost" && <AddPost />}
          {tab === "updatePost" && <UpdatePost postId={postId} />}
          {tab === "categories" && <Categories />}
          {tab === "reservations" && <Reservations />}
        </div>

        <div
          className={`
            drawer-side 
            transform transition-all duration-500 ease-in-out
            ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
            lg:translate-x-0 
            fixed top-0 right-0 min-h-screen h-full bg-surfaceBg
          `}
        >
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={toggleMobileMenu}
          ></label>
          <Sidebar onItemClick={handleSidebarItemClick} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
