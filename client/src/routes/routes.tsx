import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Navbar from "../components/header/Navbar";
import Footer from "../components/Footer";

const Home = lazy(() => import("../pages/Home"));
const Aboutus = lazy(() => import("../pages/Aboutus"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const renderLayout = (element: React.ReactNode) => (
  <>
    <Navbar />
    {element}
    <Footer />
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
    path: "/dashboard",
    element: renderLayout(<Dashboard />),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default routes;
