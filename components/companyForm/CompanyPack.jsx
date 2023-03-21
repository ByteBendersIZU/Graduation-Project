import React from "react";
import FormGroup from "../form/FormGroup";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

const CompanyPack = ({values}) => {
  return (
    <div className="flex justify-around bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full dark:bg-darkMain">
      <div >
        <Field type="checkbox" name={values.toggle} />
        <h3>Personel Paketi</h3>
        <div className="">
          <FormGroup
            disabled={!values.toggle1}
            type="text"
            name="price1"
            labelName={"Price"}
          />
        </div>
      </div>
      <div>
        <Field type="checkbox" name="toggle2" />
        <h3>Vardiya Paketi</h3>
        <div className="">
          <FormGroup
            disabled={!values.toggle2}
            type="text"
            name="price2"
            labelName={"Price"}
          />
        </div>
      </div>
      <div>
        <Field type="checkbox" name="toggle3" />
        <h3>Bordro Paketi</h3>
        <div className="">
          <FormGroup
            disabled={!values.toggle3}
            type="text"
            name="price3"
            labelName={"Price"}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyPack;
