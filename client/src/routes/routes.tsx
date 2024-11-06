import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import Navbar from "../components/header/Navbar";
import Footer from "../components/Footer";
import Test from "../pages/Test";
import SingleTest from "../pages/SingleTest";
import GiftTest from "../pages/GiftTest";
import PrivateRoute from "./PrivateRoute";

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
    path: "/test",
    element: renderLayout(<Test />),
  },
  {
    path: "/signletest",
    element: renderLayout(<SingleTest />),
  },
  {
    path: "/gifttest",
    element: renderLayout(<GiftTest />),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default routes;
