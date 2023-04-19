import React from "react";
import { BsCupStraw } from "react-icons/bs";

const EmployeePermissions = () => {
  return (
    <div className="bg-white shadow-md p-4 col-start-4 col-end-7 rounded-lg h-56">
      <div className="flex items-center justify-between mb-4">
        <p className="flex items-center text-lg font-semibold">
          <span className="mr-3 ">
            <BsCupStraw />
          </span>
          Employee Permissions
        </p>
        <p className="underline">Tümünü Gör &rarr;</p>
      </div>
      <div className="flex items-center justify-center">
        <BsCupStraw className="text-4xl" />
      </div>
    </div>
  );
};

export default EmployeePermissions;
