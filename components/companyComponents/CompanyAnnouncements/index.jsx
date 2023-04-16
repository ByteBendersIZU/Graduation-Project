import React from "react";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { AiOutlinePlusCircle } from "react-icons/ai";

const CompanyAnnouncements = () => {
  return (
    <div className="col-start-1 col-end-7 bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <p className="flex items-center text-lg font-semibold">
          <span className="mr-3 ">
            <TfiAnnouncement />
          </span>
          Announcements
        </p>
        <p className="text-sm flex items-center">
          <AiOutlinePlusCircle className="mr-2" />
          Add Announcement
        </p>
      </div>
      <div className="flex flex-col max-h-56 overflow-scroll">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sender
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Message
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
                  <td className="px-6 py-4">Message Ttitle</td>
                  <td className="px-6 py-4">22 November 2022</td>
                  <td className="px-6 py-4  flex justify-end text-xl">
                    <a
                      href="#"
                      className="font-medium text-blue-600  hover:underline mr-3"
                    >
                      <MdOutlineModeEdit />
                    </a>
                    <a
                      href="#"
                      className="font-medium text-red-600  hover:underline "
                    >
                      <MdDeleteOutline />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyAnnouncements;
