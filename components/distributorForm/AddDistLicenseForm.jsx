import React from "react";
import FormGroup from "../form/FormGroup";

const AddDistLicenseForm = () => {
  return (
    <div>
      <FormGroup
        type="date"
        name="distLicense.startDate"
        labelName={"License Start Date"}
      />
      <FormGroup
        type="date"
        name="distLicense.endDate"
        labelName={"License End Date"}
      />
      <FormGroup
        type="number"
        name="distLicense.userLimit"
        labelName={"User Limit"}
      />
    </div>
  );
};

export default AddDistLicenseForm;
