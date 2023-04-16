import React from "react";
import { BsSignpost } from "react-icons/bs";
import { TbMessageReport } from "react-icons/tb";

const EmployeeReports = () => {
  return (
    <div className="col-start-1 col-end-7 bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <p className="flex items-center text-lg font-semibold">
          <span className="mr-3 ">
            <TbMessageReport />
          </span>
          Reports
        </p>
        <p className="underline">See All &rarr;</p>
      </div>
      <div className="flex flex-col max-h-56 overflow-scroll">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Employer
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Furkan Lebit
              </th>
              <td className="px-6 py-4">Message Ttitle</td>
              <td className="pl-6 py-4">
                <p className="bg-green-500 inline-block p-1 px-2 text-white rounded">
                  Answered
                </p>
              </td>
              <td className="pl-3 py-4  text-right">
                <p className="bg-blue-600 inline-block p-1 px-5 text-white rounded">
                  Detail
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeReports;
