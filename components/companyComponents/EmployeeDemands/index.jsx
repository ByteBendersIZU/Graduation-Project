import React from "react";
import { BsSignpost } from "react-icons/bs";
import { HiOutlineHandRaised } from "react-icons/hi2";

const CompanyDemands = () => {
  return (
    <div className="col-start-1 col-end-7 bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <p className="flex items-center text-lg font-semibold">
          <span className="mr-3 ">
            <HiOutlineHandRaised />
          </span>
          Demands
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
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Date
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
              <td className="pl-6 py-4">
                <p className="bg-green-500 inline-block p-1 px-2 text-white rounded">
                  Answered
                </p>
              </td>
              <td className="px-6 py-4">08 December 2019</td>

              <td className="pl-3 py-4  text-right">
                <p className="bg-blue-600 inline-block p-1 px-5 text-white rounded">
                  Detail
                </p>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Furkan Lebit
              </th>
              <td className="pl-6 py-4">
                <p className="bg-gray-500 inline-block p-1 px-2 text-white rounded">
                  Waiting
                </p>
              </td>
              <td className="px-6 py-4">08 December 2019</td>

              <td className="pl-3 py-4  text-right">
                <p className="bg-blue-600 inline-block p-1 px-5 text-white rounded">
                  Answer
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyDemands;
