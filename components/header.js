import { useSession } from "next-auth/react";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";

import { BsSun, BsFillMoonStarsFill } from "react-icons/bs";

const Header = () => {
  const [theme, setTheme] = useState();
  useEffect(() => {
    theme
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme ? "" : "dark");
  };

  const session = useSession();
  const user = jwt_decode(session.data.session.user.jwt);
  return (
    <div className="flex w-full justify-between items-center p-3 drop-shadow-lg shadow-lg h-16 dark:bg-darkMain dark:text-white z-10">
      <div className="font-semiboldw">{user.role.slice(5)}</div>
      <button className="  p-2 rounded-full" onClick={() => handleTheme()}>
        {theme ? <BsSun /> : <BsFillMoonStarsFill />}
      </button>
    </div>
  );
};

export default Header;
