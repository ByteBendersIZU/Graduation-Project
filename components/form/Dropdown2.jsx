import { Field } from "formik";
import React, { useState } from "react";
import FormError from "./FormError";
import FormLabel from "./FormLabel";

const Dropdown2 = ({ name, labelName, options, selected }) => {
  return (
    <div className="my-5">
      <FormLabel htmlFor={name} labelName={labelName} />
      <Field
        as="select"
        name={name}
        defaultValue={selected}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-darkBg dark:text-white "
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </Field>
      <FormError name={name} />
    </div>
  );
};

export default Dropdown2;
