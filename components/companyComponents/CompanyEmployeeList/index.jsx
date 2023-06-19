import React from "react";
import { BsFillPeopleFill } from "react-icons/bs";

const CompanyEmployeeList = ({ getEmployees }) => {
  console.log(getEmployees);
  return (
    <div className="col-start-1 col-end-7 bg-white p-4 rounded-lg shadow-md grid-rows-2 ">
      <div className="flex items-center justify-between mb-4">
        <p className="flex items-center text-lg font-semibold">
          <span className="mr-3 ">
            <BsFillPeopleFill />
          </span>
          Kişi Listesi
        </p>
        <input
          type="text"
          placeholder="Search Employee"
          className="border border-gray p-4 py-1 rounded-lg"
        />
      </div>
      <div className="grid grid-cols-7 h-32 gap-4 overflow-y-auto ">
        {getEmployees.status === "succeeded" &&
          getEmployees.data.slice(1, 7).map((employee) => (
            <div className="shadow-md rounded flex flex-col items-center justify-around p-4">
              <img
                src="https://pic.onlinewebfonts.com/svg/img_237553.png"
                className="w-10"
              />
              <p>{employee.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CompanyEmployeeList;
