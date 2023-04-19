import React, { useState } from "react";
import axios from "axios";

import PageHeader from "../../../../components/PageHeader";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import FormGroup from "../../../../components/form/FormGroup";
import FormButton from "../../../../components/form/FormButton";
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
        header={"Update Admin"}
        breadcrumb={["Company", "Update Admin"]}
      />
      <Formik
        initialValues={{
          name: result.name,
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
                name="company.adminEmail"
                labelName={"Admin Email*"}
              />
              <FormGroup
                type="password"
                name="company.password"
                labelName={"Password*"}
              />
              <FormButton type="submit" buttonName="Update" />
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
