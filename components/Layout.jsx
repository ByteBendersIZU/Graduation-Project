import React from "react";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-row justify-start shadow-lg">
      <SideBar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
