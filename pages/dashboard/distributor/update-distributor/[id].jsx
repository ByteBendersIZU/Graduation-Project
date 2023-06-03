import { getSession, useSession } from "next-auth/react";
import React from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import PageHeader from "../../../../components/PageHeader";
import FormGroup from "../../../../components/form/FormGroup";
import FormButton from "../../../../components/form/FormButton";
import { toast } from "react-toastify";
import { distributorLicenseYup } from "../../../../yupValidations/distributorValidations";

const Id = ({ distibutorUpdate, distributorLicenseUpdate }) => {
  const {
    data: {
      session: {
        user: { jwt },
      },
    },
  } = useSession();

  const updateDist = async (values) => {
    const data = await axios({
      method: "put",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/distributor`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data: { ...values },
    }).catch(function (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    });
    if (data.data.code) {
      toast.success(data.data.message);
    }
  };
  const updateDistLicense = async (values, distId, licenseId) => {
    const strigId = distId.toString();
    const strigLicId = licenseId.toString();
    const data = await axios({
      method: "put",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/distributor-license`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data: { distributorId: strigId, id: strigLicId, ...values },
    }).catch(function (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    });
    if (data.data.code) {
      toast.success(data.data.message);
    }
  };

  return (
    <div>
      <PageHeader
        header={"Add Distributor"}
        breadcrumb={["Distributor", "Update Distributor"]}
      />
      <Formik
        initialValues={{
          distributor: {
            email: distibutorUpdate.email,
            name: distibutorUpdate.name,
            surname: distibutorUpdate.surname,
            phoneNumber: distibutorUpdate.phoneNumber,
          },
          // distLicense: {
          //   startDate: distributorLicenseUpdate.startDate,
          //   endDate: distributorLicenseUpdate.endDate,
          //   userLimit: distributorLicenseUpdate.userLimit,
          // },
        }}
        validationSchema={distributorLicenseYup}
        onSubmit={async (values, { setSubmitting }) => {
          // const distId = distributorLicenseUpdate.distributorId;
          // const licenseId = distributorLicenseUpdate.id;
          await updateDist(values.distributor);
          // await updateDistLicense(values.distLicense, distId, licenseId);
        }}
      >
        {({ values }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full dark:bg-darkMain">
            <div className=" w-3/4">
              <h3 className="text-2xl text-blue-500">Distributor Update</h3>
              <FormGroup
                type="text"
                name="distributor.name"
                labelName={"Name"}
                value={values.distributor.name}
              />
              <FormGroup
                type="text"
                name="distributor.surname"
                labelName={"Surname"}
                value={values.distributor.surname}
              />
              <FormGroup
                value={values.distributor.phoneNumber}
                type="text"
                name="distributor.phoneNumber"
                labelName={"Phone Number"}
              />
              <FormGroup
                type="email"
                name="distributor.email"
                labelName={"Email"}
                value={values.distributor.email}
              />
              <br />
              {/* <h3 className="text-2xl text-blue-500">License Update</h3>
              <div>
                <FormGroup
                  type="date"
                  name="distLicense.startDate"
                  labelName={"License Start Date"}
                  value={values.distLicense.startDate}
                />
                <FormGroup
                  type="date"
                  name="distLicense.endDate"
                  labelName={"License End Date"}
                  value={values.distLicense.endDate}
                />
                <FormGroup
                  type="number"
                  name="distLicense.userLimit"
                  labelName={"User Limit"}
                  value={values.distLicense.userLimit}
                />
              </div>
              <FormButton type="submit" buttonName="Update Distributor" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

Id.auth = true;
export default Id;

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const {
    session: {
      user: { jwt },
    },
  } = await getSession(context);

  const [distributorResponse, distLicenseResponse] = await Promise.all([
    axios({
      method: "get",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/distributor/${id}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }),
    // axios({
    //   method: "get",
    //   url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/distributor-license/${id}`,
    //   headers: {
    //     Authorization: `Bearer ${jwt}`,
    //   },
    // }),
  ]);

  const distibutorUpdate = distributorResponse.data.result;
  // const distributorLicenseUpdate = distLicenseResponse.data.result;

  return {
    props: { distibutorUpdate },
  };
};
