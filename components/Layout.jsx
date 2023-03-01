import React from "react";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-row justify-start">
      <SideBar />
      <div className="bg-primary flex-1 p-4 text-white">
          {children}
      </div>
    </div>
  );
};

export default Layout;
