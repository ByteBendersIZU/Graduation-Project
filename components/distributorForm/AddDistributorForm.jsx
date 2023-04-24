import React from "react";
import FormGroup from "../form/FormGroup";
import FormToggle from "../form/FormToggle";

const AddDistributorForm = () => {
  return (
    <div>
      <FormGroup type="text" name="distributor.name" labelName={"Name"} />
      <FormGroup type="text" name="distributor.surname" labelName={"Surname"} />
      <FormGroup
        type="text"
        name="distributor.phoneNumber"
        labelName={"Phone Number"}
      />
      <FormGroup type="email" name="distributor.email" labelName={"Email"} />
      <FormGroup
        type="password"
        name="distributor.password"
        labelName={"Password"}
      />
      <FormToggle
        type="checkbox"
        labelName="Accountant"
        name="distributor.accountant"
      />
    </div>
  );
};

export default AddDistributorForm;
