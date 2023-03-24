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
  return (
    <div className="mt-8">
      <FormGroup type="text" name="name" labelName={"Company Name*"} />
      <FormGroup
        type="text"
        name="companyShortName"
        labelName={"Company Short Name*"}
      />
      <FormGroup type="email" name="email" labelName={"Company Email*"} />
      <FormGroup type="text" name="webSite" labelName={"Web Site"} />
      <FormGroup type="text" name="taxName" labelName={"Tax Name*"} />
      <DropDown options={cities} name="cityId" labelName={"City"} />
    </div>
  );
};

CompanyLicence.auth = true;

export default CompanyLicence;
