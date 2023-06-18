import React, { useEffect, useState } from "react";
import axios from "axios";

import PageHeader from "../../../components/PageHeader";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import FormGroup from "../../../components/form/FormGroup";
import FormButton from "../../../components/form/FormButton";
import FormToggle from "../../../components/form/FormToggle";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const TimebookSubmit = ({ userId, dateValue, date }) => {
  const {
    data: {
      session: {
        user: { jwt },
      },
    },
  } = useSession();

  const TimebookSubmit = async (values) => {
    const data = await axios({
      method: "put",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/timebook`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data: {
        ...values,
        dateValue,
      },
    }).catch(function (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    });
    if (data.data.code) {
      toast.success(data.data.message);
      console.log(data)
    }
    return data;
  };

  return (
    <div>
      <Formik
        initialValues={{
          userId: userId,
          date: date,
          datevalue: dateValue
        }}
        validationSchema={Yup.object({})}
        onSubmit={async (values, { setSubmitting }) => {
          await TimebookSubmit(values);
        }}
      >
        {() => (
          <Form>
            <div>
              <FormButton type="submit" buttonName="Save" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
TimebookSubmit.auth = true;

export default TimebookSubmit;
