import React, { useState } from "react";
import Link from "next/link";

const ListComp = ({ list }) => {
  const keys = ["name", "surname", "email", "phoneNumber"];
  const listKeys = Object.keys(list);
  const [inputSearch, setInputSearch] = useState("");
  const changeInput = (value) => {
    setInputSearch(value);
  };
  const [rows, setRows] = useState({
    titles: ["Distributor name", "Surname"],
    contents: listKeys,
  });
  return (
    <div>
      <div className="flex">
        <input
          type="text"
          onChange={(e) => changeInput(e.target.value)}
          placeholder="Search"
          className=" w-full p-2 border border-gray-300 rounded-lg dark:text-black bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 s dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="relative my-10 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {titles.map((title) => (
              <tr>
                <th scope="col" className="px-6 py-3">
                  Distributor name
                </th>
              </tr>
            ))}
          </thead>
          <tbody>
            {list
              .filter((distributor) =>
                keys.some((key) =>
                  distributor[key]
                    .toLowerCase()
                    .includes(inputSearch.toLowerCase())
                )
              )
              .map((distributor) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={distributor.id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {distributor.name}
                  </th>
                  <td className="px-6 py-4">{distributor.surname}</td>
                  <td className="px-6 py-4">{distributor.email}</td>
                  <td className="px-6 py-4">{distributor.phoneNumber}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`update-distributor/${distributor.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      // onClick={()=handleDelete(distributor.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListComp;
