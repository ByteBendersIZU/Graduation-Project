import { decode } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import jwt_decode from "jwt-decode";
import React from "react";

const Header = () => {
  const session = useSession();
  const user = jwt_decode(session.data.session.user.jwt);
  console.log(user);
  return (
    <div className="flex w-full justify-between p-3 drop-shadow-lg shadow-lg h-16">
      ByteBenders - {user.sub}
    </div>
  );
};

export default Header;
