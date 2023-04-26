import React from "react";
import FormGroup from "../form/FormGroup";
import { Formik, Form, Field } from "formik";

const CompanyPack = () => {
  return (
    <div className="flex justify-around bg-white">
      <div>
        <div className="">
          <FormGroup
            type="text"
            name="companySetting[0].settingValue"
            labelName={"Puantaj"}
          />
        </div>
      </div>
      <div>
        <div className="">
          <FormGroup
            type="text"
            name="companySetting[1].settingValue"
            labelName={"Working Hours"}
          />
        </div>
      </div>
      <div>
        <div className="">
          <FormGroup
            type="text"
            name="companySetting[2].settingValue"
            labelName={"Connect puantaj with shift"}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyPack;
