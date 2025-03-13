import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import OnlyAdminPrivateRoute from "./OnlyAdminPrivateRoute";
import PrivateRoute from "./PrivateRoute";

import Posts from "../components/admin/Posts";
import Navbar from "../components/header/Navbar";
import Footer from "../components/Footer";
import AddPost from "../components/admin/AddPost";
import UpdatePost from "../components/admin/UpdatePost";

const Home = lazy(() => import("../pages/Home"));
const Aboutme = lazy(() => import("../pages/Aboutme"));
const Blogs = lazy(() => import("../pages/Blogs"));
const SinglePost = lazy(() => import("../pages/SinglePost"));
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
    path: "/about-me",
    element: renderLayout(<Aboutme />),
  },
  {
    path: "/search",
    element: renderLayout(<Blogs />),
  },
  {
    path: "/post/:postSlug",
    element: renderLayout(<SinglePost />),
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
    element: <OnlyAdminPrivateRoute element={renderLayout(<Posts />)} />, // Admin Private Route
  },
  {
    // path: "/add-post",
    element: <OnlyAdminPrivateRoute element={renderLayout(<AddPost />)} />, // Admin Private Route
  },
  {
    path: "/update-post/:postId",
    element: <PrivateRoute element={renderLayout(<UpdatePost />)} />, // Admin Private Route
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default routes;
