import { ErrorMessage } from "formik";
import React from "react";

const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-700 text-sm font-medium"
    />
  );
};

export default FormError;
