import { signOut } from "next-auth/react";
import React from "react";

const Header = () => {
  return (
    <div className="flex w-full justify-between bg-blue-300 p-3">
      <h1>hrConncet</h1>
      <button
        className="bg-red-600 text-white text-l rounded-xl"
        onClick={() => {
          signOut({
            callbackUrl: "/",
          });
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Header;
