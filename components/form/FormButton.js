import React from "react";

const FormButton = ({ type, buttonName }) => {
  return (
    <button
      type={type}
      className="bg-blue-500 mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
    >
      {buttonName}
    </button>
  );
};

export default FormButton;
