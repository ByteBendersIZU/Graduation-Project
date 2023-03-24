import React, { useState } from "react";

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
        name="companyPayment.startDate"
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
