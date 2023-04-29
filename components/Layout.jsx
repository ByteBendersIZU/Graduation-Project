import React from "react";
import SideBar from "./SideBar";
import jwt_decode from "jwt-decode";
import Denedene from "./Denedene";
import AdminSidebar from "./sidebar/AdminSidebar";
import CompanySidebar from "./sidebar/CompanySidebar";
import DistributorSidebar from "./sidebar/DistributorSidebar";
import { useSession } from "next-auth/react";

const Layout = ({ children }) => {
  const session = useSession();
  const user = jwt_decode(session.data.session.user.jwt);
  return (
    <div className="h-screen flex flex-row justify-start shadow-lg dark:bg-darkMain dark:text-white z-20">
      {/* <SideBar /> */}
      {user.role === "ROLE_SUPER_ADMIN" && <AdminSidebar />}
      {user.role === "ROLE_DISTRIBUTOR" && <DistributorSidebar />}
      {user.role === "ROLE_COMPANY_ADMIN" && <CompanySidebar />}
      <div>{children}</div>
    </div>
  );
};

export default Layout;
