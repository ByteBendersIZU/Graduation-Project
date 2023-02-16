import React from "react";
import { useSession } from "next-auth/react";
import jwt_decode from "jwt-decode";

const Menus = () => {
  const { data: session } = useSession();

  // var decoded = jwt_decode(session.user);
  return <div>asf</div>;
};

export default Menus;
