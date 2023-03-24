import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import React, { useState } from "react";
import PageHeader from "../../../../components/PageHeader";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import FormGroup from "../../../../components/form/FormGroup";
import FormButton from "../../../../components/form/FormButton";
import DropDown from "../../../../components/form/DropDown";

import { Country, State, City } from "country-state-city";
import { toast } from "react-toastify";

const updatePeople = ({ user }) => {
  const [cities, setCities] = useState(Country.getAllCountries());
  console.log("USER", user);
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
        breadcrumb={["Personel", "Kişi Listesi", "Kişi Güncelle"]}
      />
      <Formik
        initialValues={{
          ...user,
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("Please enter your surname")
            .min(3, "Surname must be 3 characters or more")
            .max(30, "Surname must be 30 characters or less"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const payload = { ...values };
          console.log("values", values);
          const data = await axios({
            method: "put",
            url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/user`,
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
              <FormGroup
                type="text"
                name="secondName"
                labelName={"Second Name"}
              />
              <FormGroup type="text" name="surname" labelName={"Surname"} />
              {/* <DropDown
                name="gender"
                labelName={"Gender"}
                options={[
                  { name: "Erkek", value: 0 },
                  { name: "Kadın", value: 1 },
                ]}
              />
              <DropDown
                type="text"
                name="nationality"
                labelName={"Nationality"}
                options={cities}
              /> */}
              <FormGroup
                type="text"
                name="identificationNumber"
                labelName={"Identification Number"}
              />
              <FormGroup type="text" name="tel" labelName={"Tel No"} />
              <FormGroup type="email" name="email" labelName={"Email"} />
              <FormButton type="submit" buttonName="Update" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default updatePeople;

updatePeople.auth = true;

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
    url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/user/${id}`,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return {
    props: {
      user: result,
    },
  };
};

//deneme id : f9e1a7a1-acea-45ed-9e4b-d31ffcfb06c3
