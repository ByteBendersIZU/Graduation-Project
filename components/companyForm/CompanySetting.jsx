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
            labelName={"Timebook"}
            placeholder={"0: Daily - 1: Hourly"}
          />
        </div>
      </div>
      <div>
        <div className="">
          <FormGroup
            type="text"
            name="companySetting[1].settingValue"
            labelName={"Working Hours"}
            placeholder={"Daily working hours"}
          />
        </div>
      </div>
      <div>
        <div className="">
          <FormGroup
            type="text"
            name="companySetting[2].settingValue"
            labelName={"Connect timebook with shift"}
            placeholder={"0: No - 1: Yes"}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyPack;
