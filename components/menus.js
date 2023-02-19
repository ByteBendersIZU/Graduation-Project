import React from "react";
import { useSession } from "next-auth/react";
import jwt_decode from "jwt-decode";

const Menus = () => {
  const session = useSession();
  console.log("session", session);
  // console.log("user", data.session.user.sub);
  return (
    <div className="bg-orange-300 w-2/12 absolute h-screen top-0">
      {session.data.session.user.sub}
    </div>
  );
};

export default Menus;
