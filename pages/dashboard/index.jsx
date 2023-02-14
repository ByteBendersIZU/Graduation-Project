import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const Dashboard = () => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
  });

  if (!session) {
    return <></>;
  }
  return (
    <button
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

export default Dashboard;
