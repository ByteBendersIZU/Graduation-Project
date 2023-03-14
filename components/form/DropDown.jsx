import { Field } from "formik";
import React from "react";
import FormError from "./FormError";
import FormLabel from "./FormLabel";

import { Country, State, City } from "country-state-city";

const DropDown = ({ name, labelName }) => {
  return (
    <div className="my-5">
      <FormLabel htmlFor={name} labelName={labelName} />
      <Field
        as="select"
        name="color"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-darkBg dark:text-white "
      >
        {Country.getAllCountries().map((country, index) => (
          <option key={country.index} value={country.index}>{country.name}</option>
        ))}
      </Field>
      <FormError name={name} />
    </div>
  );
};

export default DropDown;
