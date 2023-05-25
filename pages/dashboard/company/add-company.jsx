import React, { useState } from "react";
import axios from "axios";

import PageHeader from "../../../components/PageHeader";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import FormButton from "../../../components/form/FormButton";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import { Country, State, City } from "country-state-city";
import CompanyPack from "../../../components/companyForm/CompanyPack";
import CompanyLicence from "../../../components/companyForm/CompanyLicence";
import AddCompanyForm from "../../../components/companyForm/AddCompanyForm";
import CompanySetting from "../../../components/companyForm/CompanySetting";
// import { addCompanyYup } from "../../../components/yupValidations/companyValidations";

const AddCompany = () => {
  const [cities, setCities] = useState(State.getStatesOfCountry("TR"));
  const [adminGender, setAdminGender] = useState([
    { value: 0, name: "Erkek" },
    { value: 1, name: "Kadin" },
  ]);
  const {
    data: {
      session: {
        user: { jwt },
      },
    },
  } = useSession();

  const companyFunc = async (values) => {
    const data = await axios({
      method: "post",
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
    if (data.data.code) {
      toast.success(data.data.message);
    }
    return data;
  };
  const companyPackFunc = async (values, compId) => {
    const stringId = compId.toString();
    const data = await axios({
      method: "post",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/company-packages`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data: {
        companyId: stringId,
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
  const companyPaymentFunc = async (values, compId) => {
    const startDate = new Date();
    let endDate = new Date();
    if (values.licenseType === 0) {
      const newDate = new Date(startDate);
      endDate = newDate.setMonth(newDate.getMonth() + 1);
    } else if (values.licenseType === 1) {
      const newDate = new Date(startDate);
      endDate = newDate.setFullYear(newDate.getFullYear() + 1);
    }
    const stringId = compId.toString();
    const data = await axios({
      method: "post",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/company-payment`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data: {
        companyId: stringId,
        startDate,
        endDate,
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
  const companySettingFunc = async (values) => {
    const data = await axios({
      method: "put",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/company-setting/6c75bfb3-02cb-4085-ae69-28d9593e9aa0`,
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
    console.log(data);
    return data;
  };
  return (
    <div>
      <PageHeader
        header={"Add Company"}
        breadcrumb={["Company", "Add Company"]}
      />
      <Formik
        initialValues={{
          company: {
            active: true,
            address: "",
            adminEmail: "",
            adminGender: 0,
            adminName: "",
            adminNationalityId: 0,
            adminSecondName: "",
            adminSurname: "",
            areaCode: "",
            cityId: 0,
            companyShortName: "",
            countryId: 0,
            email: "",
            identificationNumber: "",
            name: "",
            password: "",
            taxName: "",
            taxNo: "",
            tel: "",
            tel2: "",
            webSite: "",
            zipCode: "",
          },
          packages: {
            packages: [
              {
                packagesName: "Personel Paketi",
                price: "",
              },
              {
                packagesName: "Vardiya Paketi",
                price: "",
              },
              {
                packagesName: "Bordro Paketi",
                price: "",
              },
            ],
            toggle0: false,
            toggle1: false,
            toggle2: false,
          },
          companyPayment: {
            licenseType: 0,
            userLimit: 0,
            totalPrice: 0,
            invoice: "9000",
            paymentState: 0,
            paymentType: 0,
            currencyType: 0,
          },
          companySetting: [
            { settingKey: "timebookType", settingValue: "" },
            { settingKey: "workingHour", settingValue: "" },
            { settingKey: "timeBookConnectionShift", settingValue: "" },
          ],
        }}
        validationSchema={Yup.object()}
        onSubmit={async (values, { setSubmitting }) => {
          const newCompany = await companyFunc(values.company);
          const compId = await newCompany.data.result.id;
          await companyPackFunc(values.packages, compId);
          await companyPaymentFunc(values.companyPayment, compId);
          await companySettingFunc(values.companySetting);
        }}
      >
        {({ values }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full dark:bg-darkMain">
            <div className=" w-3/4">
              <AddCompanyForm company={values.company} />
              <h3 className="mt-10 text-2xl text-blue-500">
                Package Management
              </h3>
              <br />
              <CompanyPack packages={values.packages} />
              <h3 className="mt-10 text-2xl text-blue-500">Company Licence</h3>
              <br />
              <CompanyLicence companyPayment={values.companyPayment} />
              <h3 className="mt-10 text-2xl text-blue-500">Shift Setting</h3>
              <br />
              <CompanySetting />
              <FormButton type="submit" buttonName="Add Company" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

AddCompany.auth = true;

export default AddCompany;
