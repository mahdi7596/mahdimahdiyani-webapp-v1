// src/layouts/MainLayout.tsx
import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Navbar from "../components/header/Navbar";
import Footer from "../components/Footer";
import PageWrapper from "../components/PageWrapper";

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <PageWrapper key={location.pathname}>
          <Outlet />
        </PageWrapper>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
