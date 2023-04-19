import React from "react";
import { FaBirthdayCake } from "react-icons/fa";

const EmployeeBirthdays = () => {
  return (
    <div className="bg-white shadow-md p-4 col-start-1 col-end-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <p className="flex items-center text-lg font-semibold">
          <span className="mr-3 ">
            <FaBirthdayCake />
          </span>
          Birthdays
        </p>
        <p className="underline">Tümünü Gör &rarr;</p>
      </div>
      <div className="flex items-center justify-center">
        <FaBirthdayCake className="text-4xl" />
      </div>
    </div>
  );
};

export default EmployeeBirthdays;
