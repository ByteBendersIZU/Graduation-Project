import React from "react";
import { useSession } from "next-auth/react";

//HELPERS
import jwt_decode from "jwt-decode";

//COMPONENTS
import PageHeader from "../../components/PageHeader";
import AdminPage from "../../components/userPages/adminPage";
import DistributorPage from "../../components/userPages/DistributorPage";
import CompanyPage from "../../components/userPages/CompanyPage";

const Dashboard = () => {
  const session = useSession();
  console.log(session);
  const user = jwt_decode(session.data.session.user.jwt);
  console.log(user);
  return (
    <div>
      <PageHeader header={`Home - ${user.role.toUpperCase().slice(5)}`} />
      {user.role === "ROLE_SUPER_ADMIN" && <AdminPage />}
      {user.role === "ROLE_DISTRIBUTOR" && <DistributorPage />}
      {user.role === "ROLE_COMPANY_ADMIN" && <CompanyPage />}
    </div>
  );
};

Dashboard.auth = true;

export default Dashboard;
