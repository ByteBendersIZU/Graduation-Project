import React, { useState } from "react";
import axios from "axios";

import PageHeader from "../../../components/PageHeader";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import FormGroup from "../../../components/form/FormGroup";
import FormButton from "../../../components/form/FormButton";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import { Country, State, City } from "country-state-city";
import DropDown from "../../../components/form/DropDown";
import CompanyPack from "../../../components/companyForm/CompanyPack";

const CompanyLicence = () => {
  const [cities, setCities] = useState(State.getStatesOfCountry("TR"));
  const [adminGender, setAdminGender] = useState([
    { value: 0, name: "Erkek" },
    { value: 1, name: "Kadin" },
  ]);
  const {
    data: {
      session: {
        user: { jwt },
      },
    },
  } = useSession();
  return (
    <div>
      <PageHeader
        header={"Add Company"}
        breadcrumb={["Company", "Add Company"]}
      />
      <Formik
        initialValues={{
          startDate: "yyyy-MM-dd",
          licenceType: 0,
          currentType: 0,
          userLimit: 1,
          invoice: "",
          paymentType: 0,
        }}
        validationSchema={Yup.object({})}
        onSubmit={async (values, { setSubmitting }) => {
          const payload = { ...values };
          console.log("values", values);
          const data = await axios({
            method: "post",
            url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/company`,
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
            data: {
              ...values,
            },
          }).catch(function (error) {
            if (error.response) {
              toast.error(error.response.data.message);
            }
          });
          console.log(data);
          if (data.data.code) {
            toast.success(data.data.message);
          }
        }}
      >
        {({ values }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full dark:bg-darkMain">
            <div className=" w-3/4">
              <FormGroup type="text" name="name" labelName={"Company Name*"} />
              <FormGroup
                type="text"
                name="companyShortName"
                labelName={"Company Short Name*"}
              />
              <FormGroup
                type="email"
                name="email"
                labelName={"Company Email*"}
              />
              <FormGroup type="text" name="webSite" labelName={"Web Site"} />
              <FormGroup type="text" name="taxName" labelName={"Tax Name*"} />
              <DropDown options={cities} name="cityId" labelName={"City"} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

CompanyLicence.auth = true;

export default CompanyLicence;
