import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import Navbar from "../components/header/Navbar";
import Footer from "../components/Footer";
import PrivateRoute from "./PrivateRoute";
import DashPost from "../components/admin/DashPost";
import OnlyAdminPrivateRoute from "./OnlyAdminPrivateRoute";

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
    path: "/create-post",
    element: <OnlyAdminPrivateRoute element={renderLayout(<DashPost />)} />, // Admin Private Route
  },
  // {
  //   path: "/update-post/:postId",
  //   element: <PrivateRoute element={renderLayout(<UpdatePost />)} />, // Admin Private Route
  // },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default routes;
