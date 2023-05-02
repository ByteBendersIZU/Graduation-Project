import {
  Button,
  Checkbox,
  Label,
  Modal,
  Progress,
  TextInput,
} from "flowbite-react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";

import { toast } from "react-toastify";
import React, { useState } from "react";
import FormGroup from "../form/FormGroup";
import FormButton from "../form/FormButton";
import {
  addNewBranchYup,
  addNewCustomerYup,
} from "../../pages/yupValidations/yupValidations";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerMessage } from "../../redux/slices/CompanyCustomerSlice";
import { addCustomer } from "../../redux/slices/CompanyCustomerSlice";

const AddNewCustomerModal = () => {
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
      <Button onClick={() => setShow(true)}>Add Customer</Button>
      <Modal show={show} onClose={() => setShow(false)}>
        <Modal.Header>Add New Branch</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <Formik
              initialValues={{
                customer: "",
              }}
              validationSchema={addNewCustomerYup}
              onSubmit={async (values, { setSubmitting }) => {
                const payload = { ...values };
                setSubmitting(false);
                setShow(false);

                const data = await axios({
                  method: "post",
                  url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/company-customer`,
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
                  dispatch(addCustomer(data));
                }
              }}
            >
              {() => (
                <Form className="px-8 pt-6 pb-8 mb-4 w-full dark:bg-darkMain">
                  <div>
                    <FormGroup
                      type="text"
                      name="customer"
                      labelName={"Customer Name"}
                    />

                    <FormButton type="submit" buttonName="Add New Customer" />
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

export default AddNewCustomerModal;
