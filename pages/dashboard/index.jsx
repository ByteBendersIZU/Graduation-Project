import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <div className="mt-10">
      <Link href="/dashboard/distributor/list">DASHBOARD</Link>
    </div>
  );
};

Dashboard.auth = true;

export default Dashboard;
