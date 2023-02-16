import React from "react";

const FormLabel = ({ labelName, htmlFor }) => {
  return (
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={htmlFor}
    >
      {labelName}
    </label>
  );
};

export default FormLabel;
