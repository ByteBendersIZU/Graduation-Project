import React, { useState } from "react";
import DropDown from "../form/DropDown";
import FormGroup from "../form/FormGroup";

import { Country, State, City } from "country-state-city";

const AddCompanyForm = () => {
  const [cities, setCities] = useState(State.getStatesOfCountry("TR"));
  return (
    <div>
      <h3 className="text-2xl text-red-500">Company Informations</h3>
      <hr />
      <FormGroup type="text" name="company.name" labelName={"Company Name*"} />
      <FormGroup
        type="text"
        name="company.companyShortName"
        labelName={"Company Short Name*"}
      />
      <FormGroup
        type="email"
        name="company.email"
        labelName={"Company Email*"}
      />
      <FormGroup type="text" name="company.webSite" labelName={"Web Site"} />
      <FormGroup type="text" name="company.taxName" labelName={"Tax Name*"} />
      <FormGroup type="text" name="company.taxNo" labelName={"Tax No"} />
      <FormGroup type="text" name="company.tel" labelName={"Tel No"} />
      <FormGroup type="text" name="company.tel2" labelName={"Tel No 2"} />
      {/* <DropDown options={cities} name="company.cityId" labelName={"City"} /> */}
      <FormGroup type="text" name="company.zipCode" labelName={"Zip Code*"} />
      <FormGroup type="text" name="company.address" labelName={"Address*"} />

      <h3 className="mt-10 text-2xl text-red-500">Company Managament</h3>
      <hr />
      <FormGroup
        type="text"
        name="company.adminName"
        labelName={"Admin Name*"}
      />
      <FormGroup
        type="text"
        name="company.adminSecondName"
        labelName={"Admin Second Name"}
      />
      <FormGroup
        type="text"
        name="company.adminSurname"
        labelName={"Admin Surname*"}
      />
      <FormGroup
        type="text"
        name="company.adminEmail"
        labelName={"Admin Email*"}
      />
      <FormGroup
        type="password"
        name="company.password"
        labelName={"Password*"}
      />
    </div>
  );
};

export default AddCompanyForm;
