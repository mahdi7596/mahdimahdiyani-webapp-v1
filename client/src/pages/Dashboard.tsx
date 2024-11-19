import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import DashSidebar from "../components/admin/DashSidebar";
import DashProfile from "../components/admin/DashProfile";
import DashPosts from "../components/admin/DashPosts";
import DashAddPost from "../components/admin/DashAddPost";
import DashUpdatePost from "../components/admin/DashUpdatePost";

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
        {tab === "profile" && <DashProfile />}
        {tab === "posts" && <DashPosts />}
        {tab === "addPost" && <DashAddPost />}
        {tab === "update-post/:postId" && <DashUpdatePost />}
        {/* {tab === "users" && <DashUsers />} */}
        {/* {tab === "dash" && <DashboardComp />} */}
      </div>
      {/* sidebar */}
      <DashSidebar />
    </div>
  );
};

export default Dashboard;
