import React from "react";

const Input = () => {
  return (
    <div className="flex">
      <input
        type="text"
        onChange={(e) => changeInput(e.target.value)}
        placeholder="Search"
        className=" w-full p-2 border border-gray-300 rounded-lg dark:text-black bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 s dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
};

export default Input;
