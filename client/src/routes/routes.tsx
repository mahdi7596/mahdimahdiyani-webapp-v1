import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import OnlyAdminPrivateRoute from "./OnlyAdminPrivateRoute";
import PrivateRoute from "./PrivateRoute";

import DashPosts from "../components/admin/DashPosts";
import Navbar from "../components/header/Navbar";
import Footer from "../components/Footer";
import DashAddPost from "../components/admin/DashAddPost";
import DashUpdatePost from "../components/admin/DashUpdatePost";

const Home = lazy(() => import("../pages/Home"));
const Aboutus = lazy(() => import("../pages/Aboutus"));
const Signup = lazy(() => import("../pages/Signup"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const renderLayout = (element: React.ReactNode, showLayout = true) => (
  <>
    {showLayout && <Navbar />}
    {element}
    {showLayout && <Footer />}
  </>
);

const routes = createBrowserRouter([
  {
    path: "/",
    element: renderLayout(<Home />),
  },
  {
    path: "/about",
    element: renderLayout(<Aboutus />),
  },
  {
    path: "/signup",
    element: renderLayout(<Signup />, false),
  },
  {
    path: "/login",
    element: renderLayout(<Login />, false),
  },
  {
    path: "/dashboard",
    element: <PrivateRoute element={renderLayout(<Dashboard />)} />, // Private Route
  },
  {
    // path: "/create-post",
    element: <OnlyAdminPrivateRoute element={renderLayout(<DashPosts />)} />, // Admin Private Route
  },
  {
    // path: "/add-post",
    element: <OnlyAdminPrivateRoute element={renderLayout(<DashAddPost />)} />, // Admin Private Route
  },
  {
    path: "/update-post/:postId",
    element: <PrivateRoute element={renderLayout(<DashUpdatePost />)} />, // Admin Private Route
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default routes;
