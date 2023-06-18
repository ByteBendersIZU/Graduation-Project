import { Button, Modal } from "flowbite-react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";

import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import FormGroup from "../../form/FormGroup";
import FormButton from "../../form/FormButton";
import {
  addNewCustomerYup,
  changeUserPasswordYup,
} from "../../../yupValidations/yupValidations";
import { BiLockOpenAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer } from "../../../redux/slices/CompanyCustomerSlice";
import { updateEmployee } from "../../../redux/slices/CompanyEmployeeSlice";
import { getMyCompanyId } from "../../../redux/slices/HelperSlice";

const ChangeUserPasswordModal = ({ user }) => {
  const dispatch = useDispatch();
  const companyId = useSelector(getMyCompanyId);

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
        className="text-orange-400 cursor-pointer"
        onClick={() => setShow(true)}
      >
        <BiLockOpenAlt />
      </div>
      <Modal show={show} onClose={() => setShow(false)}>
        <Modal.Header>Change User Password</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <Formik
              initialValues={{
                userId: user.id,
                password: "",
                rePassword: "",
                companyId,
              }}
              validationSchema={changeUserPasswordYup}
              onSubmit={async (values, { setSubmitting }) => {
                const payload = { ...values };
                setSubmitting(false);
                setShow(false);
                console.log("values", values);
                const data = await axios({
                  method: "post",
                  url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/user/change-password`,
                  headers: {
                    Authorization: `Bearer ${jwt}`,
                  },
                  data: {
                    ...values,
                    companyId,
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
                      type="password"
                      name="password"
                      labelName={"Password"}
                    />
                    <FormGroup
                      type="password"
                      name="rePassword"
                      labelName={"Re Password"}
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

export default ChangeUserPasswordModal;
