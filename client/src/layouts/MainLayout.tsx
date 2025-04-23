// src/layouts/MainLayout.tsx
import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Navbar from "../components/header/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
