import React, { useState } from "react";
import axios from "axios";

import PageHeader from "../../../components/PageHeader";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import FormGroup from "../../../components/form/FormGroup";
import FormButton from "../../../components/form/FormButton";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import { Country, State, City } from "country-state-city";
import DropDown from "../../../components/form/DropDown";
import CompanyPack from "../../../components/companyForm/CompanyPack";
import CompanyLicence from "../../../components/companyForm/CompanyLicence";
import AddCompanyForm from "../../../components/companyForm/AddCompanyForm";

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
    console.log("compFunc", values);
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
  const companyPackFunc = async ({ values }) => {
    const data = await axios({
      method: "post",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/company-packages`,
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
    console.log(values);
  };
  const companyPaymentFuck = async ({ values }) => {
    const data = await axios({
      method: "post",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/company-payment`,
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
    console.log(values);
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
                packagesName1: "Vardiya Paketi",
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
            startDate: new Date(),
            licenceType: 0,
            userLimit: 0,
            totalPrice: 0,
          },
        }}
        validationSchema={Yup.object({})}
        onSubmit={async (values, { setSubmitting }) => {
          // console.log("submit values", values.company);
          const newCompany = await companyFunc(values.company);
          console.log("new comp", newCompany.data.result.id); // üstteki func istek atınca buraya comp id düşüyor halledersin ordan sonrasını
          // await companyPaymentFuck(values.packages);
          // await companyPackFunc(values.companyPayment);
        }}
      >
        {({ values }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full dark:bg-darkMain">
            <div className=" w-3/4">
              <AddCompanyForm company={values.company} />
              <h3 className="mt-10 text-2xl text-red-500">
                Package Management
              </h3>
              <hr />
              <CompanyPack packages={values.packages} />
              <h3 className="mt-10 text-2xl text-red-500">Company Licence</h3>
              <hr />
              <CompanyLicence companyPayment={values.companyPayment} />

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
