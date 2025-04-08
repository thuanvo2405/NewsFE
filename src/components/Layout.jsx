import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="top-[58px] relative bg-white w-5/6 mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
