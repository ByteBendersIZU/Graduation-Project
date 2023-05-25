import { Button, Modal } from "flowbite-react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";

import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import FormGroup from "../../form/FormGroup";
import FormButton from "../../form/FormButton";
import { addNewCustomerYup } from "../../../yupValidations/yupValidations";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer } from "../../../redux/slices/CompanyCustomerSlice";
import { updateEmployee } from "../../../redux/slices/CompanyEmployeeSlice";

const UpdateUserModal = ({ user }) => {
  const dispatch = useDispatch();

  const {
    data: {
      session: {
        user: { jwt },
      },
    },
  } = useSession();
  const [show, setShow] = useState(false);
  return (
    <React.Fragment>
      <div
        className="text-blue-600 cursor-pointer"
        onClick={() => setShow(true)}
      >
        <MdOutlineModeEdit />
      </div>
      <Modal show={show} onClose={() => setShow(false)}>
        <Modal.Header>Update User</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <Formik
              initialValues={{
                ...user,
              }}
              //   validationSchema={addNewCustomerYup}
              onSubmit={async (values, { setSubmitting }) => {
                const payload = { ...values };
                setSubmitting(false);
                setShow(false);
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
                  dispatch(updateEmployee(values));
                }
              }}
            >
              {({ values }) => (
                <Form className="px-8 pt-6 pb-8 mb-4 w-full dark:bg-darkMain">
                  <div>
                    <FormGroup
                      type="text"
                      name="name"
                      value={values.name}
                      labelName={"Name"}
                    />
                    <FormGroup
                      type="text"
                      name="secondName"
                      value={
                        values.secondName === "string" ? "" : values.secondName
                      }
                      labelName={"Second Name"}
                    />
                    <FormGroup
                      type="text"
                      name="surname"
                      value={values.surname}
                      labelName={"Surname"}
                    />
                    <FormGroup
                      type="text"
                      name="gender"
                      value={values.gender}
                      labelName={"Gender (Male:0, Female:1)"}
                    />
                    <FormGroup
                      type="text"
                      name="gender"
                      value={values.identificationNumber}
                      labelName={"Identification Number"}
                    />
                    <FormGroup
                      type="text"
                      name="tel"
                      value={values.tel}
                      labelName={"Phone Number"}
                    />
                    <FormGroup
                      type="text"
                      name="email"
                      value={values.email}
                      labelName={"Email"}
                    />
                    <FormButton type="submit" buttonName="Update User" />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default UpdateUserModal;
