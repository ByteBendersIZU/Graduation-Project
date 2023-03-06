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

const AddDistributor = () => {
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
        header={"Add Distributeur"}
        breadcrumb={["Distributeur", "Add Distributeur"]}
      />
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
          surname: "",
          phoneNumber: "",
          accountant: false,
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
            url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/distributor`,
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
              <FormGroup type="text" name="name" labelName={"Name"} />
              <FormGroup type="text" name="surname" labelName={"Surname"} />
              <FormGroup
                type="text"
                name="phoneNumber"
                labelName={"Phone Number"}
              />
              <FormGroup type="email" name="email" labelName={"Email"} />
              <FormGroup
                type="password"
                name="password"
                labelName={"Password"}
              />
              <FormToggle
                type="checkbox"
                labelName="Accountant"
                name="accountant"
              />
              <FormButton type="submit" buttonName="Add Distributor" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
AddDistributor.auth = true;

export default AddDistributor;
