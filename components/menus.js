import React from "react";
import { useSession } from "next-auth/react";

const Menus = () => {
  const session = useSession();
  return (
    <div className="bg-orange-300 w-2/12 h-screen top-0 z-10">
      {session.data.session.user.sub}
    </div>
  );
};

export default Menus;
