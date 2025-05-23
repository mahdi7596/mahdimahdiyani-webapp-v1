import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import OnlyAdminPrivateRoute from "./OnlyAdminPrivateRoute";
import PrivateRoute from "./PrivateRoute";

import Posts from "../components/admin/Posts";
import AddPost from "../components/admin/AddPost";
import UpdatePost from "../components/admin/UpdatePost";
import Categories from "../components/admin/Categories";
import Reservation from "../pages/Reservation";
import MainLayout from "../layouts/MainLayout";
import Reservations from "../pages/Reservations";
import PaymentCallback from "../pages/PaymentCallback";
import Services from "../pages/Services";

const Home = lazy(() => import("../pages/Home"));
const Aboutme = lazy(() => import("../pages/Aboutme"));
const Blogs = lazy(() => import("../pages/Blogs"));
const SinglePost = lazy(() => import("../pages/SinglePost"));
const Signup = lazy(() => import("../pages/Signup"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // ✅ Router context exists here
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-me",
        element: <Aboutme />,
      },
      {
        path: "/reservations",
        element: <Reservations />,
      },
      {
        path: "/reservation/:id",
        element: <Reservation />,
      },
      {
        path: "/search",
        element: <Blogs />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/post/:postSlug",
        element: <SinglePost />,
      },
      {
        path: "/media",
        element: <Blogs mediaMode={true} />,
      },
      {
        path: "/media/:postSlug",
        element: <SinglePost />,
      },
      {
        path: "/payment/callback",
        element: <PrivateRoute element={<PaymentCallback />} />,
      },
      {
        path: "/dashboard",
        element: <PrivateRoute element={<Dashboard />} />,
        children: [
          {
            path: "updatePost/:postId",
            element: <OnlyAdminPrivateRoute element={<UpdatePost />} />,
          },
        ],
      },
      {
        element: <OnlyAdminPrivateRoute element={<Posts />} />, //Admin Private Route
      },
      {
        element: <OnlyAdminPrivateRoute element={<AddPost />} />, //Admin Private Route
      },
      {
        element: <OnlyAdminPrivateRoute element={<Categories />} />, //Admin Private Route
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  // ... the rest of your routes
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default routes;
