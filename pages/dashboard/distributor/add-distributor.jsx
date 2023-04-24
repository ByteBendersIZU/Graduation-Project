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
import AddDistributorForm from "../../../components/distributorForm/AddDistributorForm";
import AddDistLicenseForm from "../../../components/distributorForm/AddDistLicenseForm";
import { CheckLg } from "react-bootstrap-icons";

const AddDistributor = () => {
  const {
    data: {
      session: {
        user: { jwt },
      },
    },
  } = useSession();

  const addDistributor = async (values) => {
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
    return data;
  };

  const addDistLicense = async (values, distributorId) => {
    const stringId = distributorId.toString();
    const data = await axios({
      method: "post",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/distributor-license`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data: {
        distributorId: stringId,
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
    return data;
  };

  return (
    <div>
      <PageHeader
        header={"Add Distributor"}
        breadcrumb={["Distributor", "Add Distributor"]}
      />
      <Formik
        initialValues={{
          distributor: {
            email: "",
            password: "",
            name: "",
            surname: "",
            phoneNumber: "",
            accountant: false,
          },
          distLicense: {
            startDate: "",
            endDate: "",
            userLimit: 0,
          },
        }}
        validationSchema={Yup.object({
          // email: Yup.string()
          //   .max(30, "Email must be 30 characters or less")
          //   .email("Invalid email address")
          //   .required("Please enter your email"),
          // password: Yup.string()
          //   .required("Please enter your password")
          //   .min(6, "Password must be 6 characters or more")
          //   .max(30, "Password must be 30 characters or less"),
          // name: Yup.string()
          //   .required("Please enter your name")
          //   .min(3, "Name must be 3 characters or more")
          //   .max(30, "Name must be 30 characters or less"),
          // surname: Yup.string()
          //   .required("Please enter your surname")
          //   .min(3, "Surname must be 3 characters or more")
          //   .max(30, "Surname must be 30 characters or less"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const newDist = await addDistributor(values.distributor);
          const distId = await newDist.data.result.id;
          await addDistLicense(values.distLicense, distId);
        }}
      >
        {({ values }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full dark:bg-darkMain">
            <div className=" w-3/4">
              <h3 className="text-2xl text-blue-500">
                Distributor Informations
              </h3>
              <AddDistributorForm distributor={values.distributor} />
              <br />
              <h3 className="text-2xl text-blue-500">Distributor License</h3>
              <AddDistLicenseForm distLicense={values.distLicense} />
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
