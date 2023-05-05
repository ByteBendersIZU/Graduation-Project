import React, { useState } from "react";
import axios from "axios";

import PageHeader from "../../../../components/PageHeader";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import FormGroup from "../../../../components/form/FormGroup";
import FormButton from "../../../../components/form/FormButton";
import { getSession, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { updateAdminYup } from "../../../yupValidations/companyValidations";

const UpdateCompany = ({ result }) => {
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
          id: result.companyAdmin.id,
          name: result.companyAdmin.name,
          surname: result.companyAdmin.surname,
          email: result.companyAdmin.email,
        }}
        validationSchema={Yup.object()}
        onSubmit={async (values, { setSubmitting }) => {
          const payload = { ...values };
          console.log(values);
          const data = await axios({
            method: "put",
            url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/user/companyAdmin`,
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
                name="name"
                labelName={"Admin Name*"}
                value={values.name}
              />
              {/* <FormGroup
                type="text"
                name="company.adminSecondName"
                labelName={"Admin Second Name"}
              /> */}
              <FormGroup
                type="text"
                name="surname"
                labelName={"Admin Surname*"}
                value={values.surname}
              />
              <FormGroup
                type="text"
                name="email"
                labelName={"Admin Email*"}
                value={values.email}
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
