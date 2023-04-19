import React from "react";
import CountUp from "react-countup";
//ICONS
import { FaBuilding } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdPendingActions } from "react-icons/md";

const companyPageBoxes = () => {
  return (
    <div className="grid grid-flow-col grid-cols-3 grid-rows-2 gap-10 col-start-1 col-end-7">
      <div className="flex items-center justify-between bg-white shadow-md p-5 px-10 dark:bg-darkMain rounded-lg">
        <div>
          <p className="font-semibold text-3xl mb-1">
            <CountUp end={42} />
          </p>
          <p className="text-gray-500 font-normal">Number of Employees</p>
        </div>
        <FaBuilding className="text-2xl" />
      </div>
      <div className="flex items-center justify-between bg-white shadow-md p-5 px-10 dark:bg-darkMain rounded-lg">
        <div>
          <p className="font-semibold text-3xl mb-1">
            <CountUp end={4} />
          </p>
          <p className="text-gray-500 font-normal">Pending Requests</p>
        </div>
        <MdPendingActions className="text-2xl" />
      </div>
      <div className="flex items-center justify-between bg-white shadow-md p-5 px-10 dark:bg-darkMain rounded-lg">
        <div>
          <p className="font-semibold text-3xl mb-1">
            <CountUp end={8} />
          </p>
          <p className="text-gray-500 font-normal">
            Permissions Pending Approval
          </p>
        </div>
        <BsFillPeopleFill className="text-2xl" />
      </div>
      <div className="flex items-center justify-between bg-white shadow-md p-5 px-10 dark:bg-darkMain rounded-lg">
        <div>
          <p className="font-semibold text-3xl mb-1">
            <CountUp end={23} />
          </p>
          <p className="text-gray-500 font-normal">Spending Claims</p>
        </div>
        <BsFillPeopleFill className="text-2xl" />
      </div>
      <div className="flex items-center justify-between bg-white shadow-md p-5 px-10 dark:bg-darkMain rounded-lg">
        <div>
          <p className="font-semibold text-3xl mb-1">
            <CountUp end={65} />
          </p>
          <p className="text-gray-500 font-normal">Employee Notices</p>
        </div>
        <BsFillPeopleFill className="text-2xl" />
      </div>
      <div className="flex items-center justify-between bg-white shadow-md p-5 px-10 dark:bg-darkMain rounded-lg">
        <div>
          <p className="font-semibold text-3xl mb-1">
            <CountUp end={5} />
          </p>
          <p className="text-gray-500 font-normal">
            Number of Employees On Leave
          </p>
        </div>
        <BsFillPeopleFill className="text-2xl" />
      </div>
    </div>
  );
};

export default companyPageBoxes;
