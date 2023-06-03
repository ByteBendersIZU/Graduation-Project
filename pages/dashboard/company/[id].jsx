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
import { updateCompanyYup } from "../../../yupValidations/companyValidations";

const UpdateCompany = ({ company, shift }) => {
  const {
    data: {
      session: {
        user: { jwt },
      },
    },
  } = useSession();
  console.log(company.result.id);

  const updateCompanyFunc = async (values, id) => {
    const stringId = id.toString();
    const data = await axios({
      method: "put",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/company`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data: {
        id: stringId,
        areaCode:'',
        cityId:0,
        cityName:'',
        countryId:0,
        districtId:0,
        neighborhoodId:0,
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
  };

  const updateShift = async (values, id) => {
    console.log(values);
    const data = await axios({
      method: "put",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/company-setting/${id}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data: values,
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
        header={"Update Company"}
        breadcrumb={["Company", "Update Company"]}
      />
      <Formik
        initialValues={{
          company: {
            name: company.result.name,
            companyShortName: company.result.companyShortName,
            email: company.result.email,
            webSite: company.result.webSite,
            taxName: company.result.taxName,
            taxNo: company.result.taxNo,
            tel: company.result.tel,
            tel2: company.result.tel,
            zipCode: company.result.zipCode,
            address: company.result.address,
          },
          companySetting: [
            {
              settingKey: "timebookType",
              settingValue: shift.result[0].settingValue,
            },
            {
              settingKey: "workingHour",
              settingValue: shift.result[1].settingValue,
            },
            {
              settingKey: "timeBookConnectionShift",
              settingValue: shift.result[2].settingValue,
            },
          ],
        }}
        validationSchema={Yup.object()}
        onSubmit={async (values, { setSubmitting }) => {
          const compId = company.result.id;
          await updateCompanyFunc(values.company, compId);
          await updateShift(values.companySetting, compId);
        }}
      >
        {({ values }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full dark:bg-darkMain">
            <div className=" w-3/4">
              <FormGroup
                type="text"
                name="company.name"
                labelName={"Company Name"}
                value={values.company.name}
              />
              <FormGroup
                type="text"
                name="company.companyShortName"
                labelName={"Company Short Name"}
                value={values.company.companyShortName}
              />
              <FormGroup
                type="email"
                name="company.email"
                labelName={"Email"}
                value={values.company.email}
              />
              <FormGroup
                type="text"
                name="company.webSite"
                labelName={"Web Site"}
                value={values.company.webSite}
              />
              <FormGroup
                type="text"
                name="company.taxName"
                labelName={"Tax Name"}
                value={values.company.taxName}
              />
              <FormGroup
                type="text"
                name="company.taxNo"
                labelName={"Tax No"}
                value={values.company.taxNo}
              />
              <FormGroup
                type="text"
                name="company.tel"
                labelName={"Tel No"}
                value={values.company.tel}
              />
              <FormGroup
                type="text"
                name="company.tel2"
                labelName={"Tel No 2"}
                value={values.company.tel2}
              />
              <FormGroup
                type="text"
                name="company.zipCode"
                labelName={"Zip Code"}
                value={values.company.zipCode}
              />
              <FormGroup
                type="text"
                name="company.address"
                labelName={"Address"}
                value={values.company.address}
              />
              <br />
              <FormGroup
                type="text"
                name="companySetting[0].settingValue"
                labelName={"Puantaj"}
                value={values.companySetting[0].settingValue}
              />
              <FormGroup
                type="text"
                name="companySetting[1].settingValue"
                labelName={"Working Hours"}
                value={values.companySetting[1].settingValue}
              />
              <FormGroup
                type="text"
                name="companySetting[2].settingValue"
                labelName={"Connect puantaj with shift"}
                value={values.companySetting[2].settingValue}
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

  const [companyResponse, shiftResponse] = await Promise.all([
    axios({
      method: "get",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/company/${id}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }),
    axios({
      method: "get",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/company-setting/${id}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }),
  ]);

  const company = companyResponse.data;
  const shift = shiftResponse.data;

  return {
    props: { company, shift },
  };
};
