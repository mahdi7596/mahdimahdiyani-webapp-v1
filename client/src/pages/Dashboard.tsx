import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../components/admin/Sidebar";
import Profile from "../components/admin/Profile";
import Posts from "../components/admin/Posts";
import AddPost from "../components/admin/AddPost";
import Categories from "../components/admin/Categories";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    // console.log(urlParams);
    const tabFromUrl = urlParams.get("tab");
    // console.log(tabFromUrl);
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col p-8">
        {tab === "profile" && <Profile />}
        {tab === "posts" && <Posts />}
        {tab === "addPost" && <AddPost />}
        {tab === "categories" && <Categories />}
        {/* {tab === "update-post/:postId" && <DashUpdatePost />} */}
        {/* {tab === "users" && <DashUsers />} */}
        {/* {tab === "dash" && <DashboardComp />} */}
      </div>
      {/* sidebar */}
      <Sidebar />
    </div>
  );
};

export default Dashboard;
