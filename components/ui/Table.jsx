import React from "react";
import Link from "next/link";
import ChangingState from "../changingState";

const Table = ({ data, column, titles, buttons,stateButtons, inputSearch }) => {
  return (
    <div className="relative my-10 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {titles.map((item) => (
              <TableHeadItem item={item} />
            ))}
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) =>
              column.some((key) =>
                item[key].toLowerCase().includes(inputSearch.toLowerCase())
              )
            )
            .map((item) => (
              <TableRow item={item} column={column} buttons={buttons} stateButtons={stateButtons} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

const TableHeadItem = ({ item }) => (
  <th scope="col" className="px-6 py-3">
    {item}
  </th>
);
const TableRow = ({ item, column, buttons,stateButtons }) => {
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        {column.map((columnItem) => (
          <td className="px-6 py-4">{item[`${columnItem}`]}</td>
        ))}
        <td className="px-6 py-4">
          {buttons.map((button, index) => (
            <Link
              key={index}
              href={`${button.href}/${item.id}`}
              className="mr-3 font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              {button.name}
            </Link>
          ))}
        </td>
        {/* <td className="px-6 py-4">
          {stateButtons.map((stateButton, index) => (
            <ChangingState id={item.companyAdminId} stateButton={stateButton} />
          ))}
        </td> */}
      </tr>
    </>
  );
};

export default Table;
