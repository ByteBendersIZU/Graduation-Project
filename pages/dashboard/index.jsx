import Link from "next/link";
import React from "react";
import PageHeader from "../../components/PageHeader";

const Dashboard = () => {
  return (
    <div>
      <PageHeader header={"Home"} />
    </div>
  );
};

Dashboard.auth = true;

export default Dashboard;
