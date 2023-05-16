import React, { useState } from "react";

import FormGroup from "../form/FormGroup";
import DropDown from "../form/DropDown";

const CompanyLicence = () => {
  const [licenseType, setLicencetype] = useState([
    { id: 0, name: "Monthly Licence" },
    { id: 1, name: "Yearly Licence" },
  ]);
  return (
    <div className="mt-8">
      <DropDown
        options={licenseType}
        name="companyPayment.licenseType"
        labelName={"License Type"}
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
