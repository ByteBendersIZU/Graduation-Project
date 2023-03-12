import React from "react";
import { useSession } from "next-auth/react";

//HELPERS
import jwt_decode from "jwt-decode";

//COMPONENTS
import PageHeader from "../../components/PageHeader";
import AdminPage from "../../components/userPages/adminPage";
import DistributorPage from "../../components/userPages/DistributorPage";

const Dashboard = () => {
  const session = useSession();
  const user = jwt_decode(session.data.session.user.jwt);
  console.log(user);
  return (
    <div>
      <PageHeader header={`Home - ${user.sub.toUpperCase()}`} />
      {user.role === "ROLE_SUPER_ADMIN" && <AdminPage />}
      {user.sub === "ROLE_DISTRIBUTOR" && <DistributorPage />}
    </div>
  );
};

Dashboard.auth = true;

export default Dashboard;
