import { decode } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";

import { BsSun, BsFillMoonStarsFill, BsGithub } from "react-icons/bs";

const Header = () => {
  const [theme, setTheme] = useState("light");
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
  console.log(user);
  return (
    <div className="flex w-full justify-between p-3 drop-shadow-lg shadow-lg h-16 dark:bg-darkMain dark:text-white">
      <div>ByteBenders - {user.sub}</div>
      <button className="  p-2 rounded-full" onClick={() => handleTheme()}>
        {theme ? <BsSun /> : <BsFillMoonStarsFill />}
      </button>
    </div>
  );
};

export default Header;
