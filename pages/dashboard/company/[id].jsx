import React, { useState } from "react";
import axios from "axios";

import PageHeader from "../../../components/PageHeader";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import FormGroup from "../../../components/form/FormGroup";
import FormButton from "../../../components/form/FormButton";
import FormToggle from "../../../components/form/FormToggle";
import { getSession, useSession } from "next-auth/react";
import { toast } from "react-toastify";

const UpdateCompany = ({ result }) => {
  console.log(result);
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
        header={"Update Company"}
        breadcrumb={["Company", "Update Company"]}
      />
      <Formik
        initialValues={{
          ...result
        }}
        validationSchema={Yup.object({})}
        onSubmit={async (values, { setSubmitting }) => {
          const payload = { ...values };
          console.log("values", values);
          const data = await axios({
            method: "put",
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
              <FormGroup
                type="text"
                name="name"
                labelName={"Company Name"}
                value={values.name}
              />
              <FormGroup
                type="text"
                name="companyShortName"
                labelName={"Company Short Name"}
                value={values.companyShortName}
              />
              <FormGroup
                type="email"
                name="email"
                labelName={"Email"}
                value={values.email}
              />
              <FormGroup
                type="text"
                name="webSite"
                labelName={"Web Site"}
                value={values.webSite}
              />
              <FormGroup
                type="text"
                name="taxName"
                labelName={"Tax Name"}
                value={values.taxName}
              />
              <FormGroup
                type="text"
                name="taxNo"
                labelName={"Tax No"}
                value={values.taxNo}
              />
              <FormGroup
                type="text"
                name="tel"
                labelName={"Tel No"}
                value={values.tel}
              />
              <FormGroup
                type="text"
                name="tel2"
                labelName={"Tel No 2"}
                value={values.tel2}
              />
              <FormButton type="submit" buttonName="Update Company" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

UpdateCompany.auth = true;

export default UpdateCompany;

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const {
    session: {
      user: { jwt },
    },
  } = await getSession(context);

  const {
    data: { result },
  } = await axios({
    method: "get",
    url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/company/${id}`,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return {
    props: {
      result,
    },
  };
};
