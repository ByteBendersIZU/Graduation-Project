import React from "react";
import axios from "axios";

import PageHeader from "../../../components/PageHeader";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import FormGroup from "../../../components/form/FormGroup";
import FormButton from "../../../components/form/FormButton";
import FormToggle from "../../../components/form/FormToggle";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import { Country, State, City } from "country-state-city";
import DropDown from "../../../components/form/DropDown";

console.log(Country.getAllCountries());

const AddCompany = () => {
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
          active: true,
          name: "",
          companyShortName: "",
          email: "",
          webSite: "",
          taxName: "",
          taxNo: "",
          tel: "",
          tel2: "",
          countryId: "",
          cityName: "",
          districtId: "",
          neighborhoodId: "",
          zipCode: "",
          address: "",
          adminName: "",
          adminSecondName: "",
          adminSurname: "",
          adminGender: "",
          adminNationalityId: "",
          adminEmail: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .max(30, "Email must be 30 characters or less")
            .email("Invalid email address")
            .required("Please enter your email"),
          password: Yup.string()
            .required("Please enter your password")
            .min(6, "Password must be 6 characters or more")
            .max(30, "Password must be 30 characters or less"),
          name: Yup.string()
            .required("Please enter your name")
            .min(3, "Name must be 3 characters or more")
            .max(30, "Name must be 30 characters or less"),
          surname: Yup.string()
            .required("Please enter your surname")
            .min(3, "Surname must be 3 characters or more")
            .max(30, "Surname must be 30 characters or less"),
        })}
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
        {() => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full dark:bg-darkMain">
            <div className=" w-3/4">
              <FormGroup type="text" name="name" labelName={"Company Name"} />
              <FormGroup
                type="text"
                name="companyShortName"
                labelName={"Company Short Name"}
              />
              <FormGroup type="email" name="email" labelName={"Email"} />
              <FormGroup type="text" name="webSite" labelName={"Web Site"} />
              <FormGroup type="text" name="taxName" labelName={"Tax Name"} />
              <FormGroup type="text" name="taxNo" labelName={"Tax No"} />
              <FormGroup type="text" name="tel" labelName={"Tel No"} />
              <FormGroup type="text" name="tel2" labelName={"Tel No 2"} />
              <DropDown name="countryId" labelName={"Country"} />
              <FormGroup type="text" name="zipCode" labelName={"Zip Code"} />
              <FormGroup type="text" name="address" labelName={"Address"} />
              <FormButton type="submit" buttonName="Add Distributor" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

AddCompany.auth = true;

export default AddCompany;
