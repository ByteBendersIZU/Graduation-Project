import React from "react";
import { useSession } from "next-auth/react";

//HELPERS
import jwt_decode from "jwt-decode";

//COMPONENTS
import PageHeader from "../../components/PageHeader";
import AdminPage from "../../components/userPages/adminPage";

const Dashboard = () => {
  const session = useSession();
  const user = jwt_decode(session.data.session.user.jwt);
  return (
    <div>
      <PageHeader header={`Home - ${user.sub.toUpperCase()}`} />
      <AdminPage />
    </div>
  );
};

Dashboard.auth = true;

export default Dashboard;
