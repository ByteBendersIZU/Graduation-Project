import React from "react";
import MainPageInfoBox from "../ui/MainPageInfoBox";
import CountUp from "react-countup";

//ICONS
import { FaBuilding } from "react-icons/fa";
import { GiBookAura } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

const AdminPage = () => {
  return (
    <div className="grid grid-flow-col grid-cols-3 gap-x-10">
      <div className="flex items-center justify-between bg-white shadow-md p-5 px-10 dark:bg-darkMain rounded-lg">
        <div>
          <p className="font-semibold text-3xl mb-1">
            <CountUp end={42} />
          </p>
          <p className="text-gray-500 font-normal">Number of Companies</p>
        </div>
        <FaBuilding />
      </div>
      <div className="flex items-center justify-between bg-white shadow-md p-5 px-10 dark:bg-darkMain rounded-lg">
        <div>
          <p className="font-semibold text-3xl mb-1">
            <CountUp end={4} />
          </p>
          <p className="text-gray-500 font-normal">Number of Distributor</p>
        </div>
        <GiBookAura />
      </div>
      <div className="flex items-center justify-between bg-white shadow-md p-5 px-10 dark:bg-darkMain rounded-lg">
        <div>
          <p className="font-semibold text-3xl mb-1">
            <CountUp end={8} />
          </p>
          <p className="text-gray-500 font-normal">Number of Accountant</p>
        </div>
        <CgProfile />
      </div>
    </div>
  );
};

export default AdminPage;
