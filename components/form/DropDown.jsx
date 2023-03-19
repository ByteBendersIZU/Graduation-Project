import { Field } from "formik";
import React, { useState } from "react";
import FormError from "./FormError";
import FormLabel from "./FormLabel";

import { Country, State, City } from "country-state-city";

const DropDown = ({ name, labelName, options, handleCurrentCity }) => {
  const [city, setCity] = useState();
  return (
    <div className="my-5">
      <FormLabel htmlFor={name} labelName={labelName} />
      <Field
        as="select"
        name={name}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-darkBg dark:text-white "
      >
        {options.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
      </Field>
      <FormError name={name} />
    </div>
  );
};

export default DropDown;
