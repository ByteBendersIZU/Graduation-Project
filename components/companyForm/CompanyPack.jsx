import React from "react";
import FormGroup from "../form/FormGroup";
import { Formik, Form, Field } from "formik";

const CompanyPack = ({ packages }) => {
  return (
    <div className="flex justify-around bg-white mt-8">
      {/* <div>
        <Field type="checkbox" name="packages.toggle0" />
        <h3>Personel Paketi</h3>
        <div className="">
          <FormGroup
            disabled={!packages.toggle0}
            type="text"
            name="packages.packages[0].price"
            labelName={"Price"}
          />
        </div>
      </div> */}
      <div>
        <Field type="checkbox" name="packages.toggle1" />
        <h3>Vardiya Paketi</h3>
        <div className="">
          <FormGroup
            disabled={!packages.toggle1}
            type="text"
            name="packages.packages[1].price"
            labelName={"Price"}
          />
        </div>
      </div>
      <div>
        <Field type="checkbox" name="packages.toggle2" />
        <h3>Bordro Paketi</h3>
        <div className="">
          <FormGroup
            disabled={!packages.toggle2}
            type="text"
            name="packages.packages[2].price"
            labelName={"Price"}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyPack;
