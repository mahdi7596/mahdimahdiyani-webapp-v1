import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Aboutus = lazy(() => import("../pages/Aboutus"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <Aboutus />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default routes;
