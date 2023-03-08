import React from "react";

const Table = ({ data, column, titles }) => {
  return (
    <div className="relative my-10 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {titles.map((item, index) => (
              <TableHeadItem item={item} />
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <TableRow item={item} column={column} />
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
const TableRow = ({ item, column }) => (
  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    {column.map((columnItem, index) => (
      <td className="px-6 py-4">{item[`${columnItem}`]}</td>
    ))}
  </tr>
);

export default Table;
