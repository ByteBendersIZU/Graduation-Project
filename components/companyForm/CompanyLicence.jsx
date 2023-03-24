import React, { useState } from "react";
import axios from "axios";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import { Country, State, City } from "country-state-city";
import FormGroup from "../form/FormGroup";
import DropDown from "../form/DropDown";

const CompanyLicence = () => {
  const [licenceType, setLicencetype] = useState([
    { value: 0, name: "Monthly Licence" },
    { value: 1, name: "Yearly Licence" },
  ]);
  return (
    <div className="mt-8">
      <FormGroup
        type="date"
        name="companyPayment.dartDate"
        labelName={"Company Name"}
      />
      <DropDown
        options={licenceType}
        name="companyPayment.licenceType"
        labelName={"Licence Type"}
      />
      <FormGroup
        type="number"
        name="companyPayment.userLimit"
        labelName={"User Limit"}
      />
      <FormGroup
        type="number"
        value='99'
        disabled={true}
        name="companyPayment.totalPrice"
        labelName={"Total Price"}
      />
    </div>
  );
};

CompanyLicence.auth = true;

export default CompanyLicence;
