import React from "react";
import FormError from "./FormError";
import FormField from "./FormField";
import FormLabel from "./FormLabel";

const FormGroup = ({ type, name, labelName, disabled,value }) => {
  return (
    <div className="my-5">
      <FormLabel htmlFor={name} labelName={labelName} />
      <FormField type={type} name={name} disabled={disabled} value={value} />
      <FormError name={name} />
    </div>
  );
};

export default FormGroup;
