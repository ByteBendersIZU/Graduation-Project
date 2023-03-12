import React from "react";

//ICONS
import { FaBuilding } from "react-icons/fa";
import { GiBookAura } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
const MainPageInfoBox = ({ number, text, icon }) => {
  return (
    <div className="flex items-center justify-between bg-white shadow-md p-5 px-10 dark:bg-darkMain">
      <div>
        <p className="font-semibold text-3xl mb-1">42</p>
        <p className="text-gray-500 font-normal">Number of Companies</p>
      </div>
      <icon />
    </div>
  );
};

export default MainPageInfoBox;
