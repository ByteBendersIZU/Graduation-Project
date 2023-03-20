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

  const companyFunc = async ({ values }) => {
    // const data = await axios({
    //   method: "post",
    //   url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/company`,
    //   headers: {
    //     Authorization: `Bearer ${jwt}`,
    //   },
    //   data: {
    //     ...values,
    //   },
    // }).catch(function (error) {
    //   if (error.response) {
    //     toast.error(error.response.data.message);
    //   }
    // });
    // console.log(data);
    // if (data.data.code) {
    //   toast.success(data.data.message);
    // }
    console.log(values);
  };
  const companyPackFunc = async ({ values }) => {
    // const data = await axios({
    //   method: "post",
    //   url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/company-packages`,
    //   headers: {
    //     Authorization: `Bearer ${jwt}`,
    //   },
    //   data: {
    //     ...values,
    //   },
    // }).catch(function (error) {
    //   if (error.response) {
    //     toast.error(error.response.data.message);
    //   }
    // });
    // console.log(data);
    // if (data.data.code) {
    //   toast.success(data.data.message);
    // }
    console.log(values);
  };
  const companyPaymentFuck = async ({ values }) => {
    // const data = await axios({
    //   method: "post",
    //   url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/company-payment`,
    //   headers: {
    //     Authorization: `Bearer ${jwt}`,
    //   },
    //   data: {
    //     ...values,
    //   },
    // }).catch(function (error) {
    //   if (error.response) {
    //     toast.error(error.response.data.message);
    //   }
    // });
    // console.log(data);
    // if (data.data.code) {
    //   toast.success(data.data.message);
    // }
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
            identificationNumber: "",
            distributorId: "",
            active: false,
            name: "",
            companyShortName: "",
            email: "",
            webSite: "",
            taxName: "",
            taxNo: "",
            tel: "",
            tel2: "",
            countryId: "",
            cityId: 0,
            districtId: 0,
            neighborhoodId: 0,
            zipCode: "",
            address: "",
            adminName: "",
            adminSecondName: "",
            adminSurname: "",
            adminGender: 0,
            adminNationalityId: 0,
            adminEmail: "",
            password: "",
          },
          companyPackages: {
            packages: [
              {
                packagesName: "",
                price: "",
              },
            ],
          },
          companyPayment: {
            startDate: new Date(),
            licenseType:0,
            userLimit:0,
            totalPrice:0,
            paymentType:0,
            
          },
        }}
        validationSchema={Yup.object({})}
        onSubmit={async (values, { setSubmitting }) => {
          const payload = { ...values };
          console.log("values", values);
          await companyFunc(values.company);
          await companyPaymentFuck(values.companyPackages);
          await companyPackFunc(values.companyPayment);
        }}
      >
        {({ values }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full dark:bg-darkMain">
            <div className=" w-3/4">
              <FormGroup type="text" name="name" labelName={"Company Name*"} />
              <FormGroup
                type="text"
                name="companyShortName"
                labelName={"Company Short Name*"}
              />
              <FormGroup
                type="email"
                name="email"
                labelName={"Company Email*"}
              />
              <FormGroup type="text" name="webSite" labelName={"Web Site"} />
              <FormGroup type="text" name="taxName" labelName={"Tax Name*"} />
              <FormGroup type="text" name="taxNo" labelName={"Tax No"} />
              <FormGroup type="text" name="tel" labelName={"Tel No"} />
              <FormGroup type="text" name="tel2" labelName={"Tel No 2"} />
              <DropDown options={cities} name="cityId" labelName={"City"} />
              <FormGroup type="text" name="zipCode" labelName={"Zip Code*"} />
              <FormGroup type="text" name="address" labelName={"Address*"} />
              <h3>Company Managament</h3>
              <FormGroup
                type="text"
                name="adminName"
                labelName={"adminName*"}
              />
              <FormGroup
                type="text"
                name="adminSecondName"
                labelName={"adminSecondName"}
              />
              <FormGroup
                type="text"
                name="adminSurname"
                labelName={"adminSurname*"}
              />
              <FormGroup
                type="text"
                name="adminEmail"
                labelName={"adminEmail*"}
              />
              <FormGroup
                type="password"
                name="password"
                labelName={"password*"}
              />
              <h3 className="mb-5">{values.countryId}</h3>
              <CompanyPack values={values.companyPackages} />

              <h3 className="mb-5">Company Licance</h3>

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
