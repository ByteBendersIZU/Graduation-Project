import React from "react";
import { useSession } from "next-auth/react";
import jwt_decode from "jwt-decode";

const Menus = () => {
  const session = useSession();
  const decode = jwt_decode(session.data.session.user.jwt);
  return (
    <div className="bg-orange-300 w-2/12 h-screen top-0 z-10">{decode.sub}</div>
  );
};

export default Menus;
