import { Field } from "formik";
import React from "react";

const FormField = ({ type, name, disabled,value }) => {
  return (
    <Field
      disabled={disabled}
      autoComplete="true"
      type={type}
      name={name}
      value={value}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-darkBg dark:text-white "
    />
  );
};

export default FormField;
