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
import { Country, State, City } from "country-state-city";

import DropDown from "../../../components/form/DropDown";
import { useRouter } from "next/router";

const UpdateCompany = ({ result }) => {
  console.log(result);
  const [cities, setCities] = useState(State.getStatesOfCountry("TR"));
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
          ...result,
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
              <DropDown
                name="cityName"
                labelName={"City Name"}
                options={cities}
              />
              <FormGroup type="text" name="zipCode" labelName={"Zip Code"} />
              <FormGroup type="text" name="address" labelName={"Address"} />
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

//deneme id : 84bbceee-1f9f-4122-a421-180047c59287
