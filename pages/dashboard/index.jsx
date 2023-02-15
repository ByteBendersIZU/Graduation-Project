import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const Dashboard = () => {
  const { data: session } = useSession();
  console.log("session", session);
  return (
    <button
      style={{
        backgroundColor: "red",
        padding: "10px",
        fontSize: "20px",
        color: "white",
      }}
      onClick={() => {
        signOut({
          callbackUrl: "/",
        });
      }}
    >
      Sign Out
    </button>
  );
};

Dashboard.auth = true;

export default Dashboard;
