import React, { useState } from "react";
import axios from "axios";

import PageHeader from "../../../../components/PageHeader";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import FormGroup from "../../../../components/form/FormGroup";
import FormButton from "../../../../components/form/FormButton";
import { getSession, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import {
  updateCompanyYup,
  updatePasswordAdminYup,
} from "../../../yupValidations/companyValidations";

const ChangePasswordDist = ({ result }) => {
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
          companyId: result.id,
          userId: result.companyAdmin.id,
          password: "",
          rePassword: "",
        }}
        validationSchema={updatePasswordAdminYup}
        onSubmit={async (values, { setSubmitting }) => {
          const payload = { ...values };
          console.log(values)
          const data = await axios({
            method: "post",
            url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/user/change-password`,
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
                name="adminEmail"
                labelName={"Email"}
                value={result.companyAdmin.email}
                disabled={true}
              />
              <FormGroup
                type="password"
                name="password"
                labelName={"New password"}
              />
              <FormGroup
                type="password"
                name="rePassword"
                labelName={"New password again"}
              />
              <FormButton type="submit" buttonName="Update" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

ChangePasswordDist.auth = true;

export default ChangePasswordDist;

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
