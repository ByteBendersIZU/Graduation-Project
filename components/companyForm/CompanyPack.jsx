import React from "react";
import FormGroup from "../form/FormGroup";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

const CompanyPack = ({ packageName }) => {
  const packagesName = ["Personel Paketi", "Vardiya Paketi", "Bordro Paketi"];
  return (
    <div>
      <Formik
        initialValues={{
          packages: [
            {
              packagesName: "",
              price: "",
            },
          ],
          toggle1: false,
          toggle2: false,
          toggle3: false,
        }}
        validationSchema={Yup.object({})}
        onSubmit={async (values, { setSubmitting }) => {
          const payload = { ...values };
          console.log("values", values);
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
        }}
      >
        {({ values }) => (
          <Form className="flex justify-around bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full dark:bg-darkMain">
            <div>
              <Field type="checkbox" name="toggle1" />
              <h3>Personel Paketi</h3>
              <div className="">
                <FormGroup
                  disabled={!values.toggle1}
                  type="text"
                  name="price"
                  labelName={"Price"}
                />
              </div>
            </div>
            <div>
              <Field type="checkbox" name="toggle2" />
              <h3>Vardiya Paketi</h3>
              <div className="">
                <FormGroup
                  disabled={!values.toggle2}
                  type="text"
                  name="price"
                  labelName={"Price"}
                />
              </div>
            </div>
            <div>
              <Field type="checkbox" name="toggle3" />
              <h3>Bordro Paketi</h3>
              <div className="">
                <FormGroup
                  disabled={!values.toggle3}
                  type="text"
                  name="price"
                  labelName={"Price"}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CompanyPack;
