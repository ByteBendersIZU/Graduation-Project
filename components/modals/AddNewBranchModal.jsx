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
import { addNewBranchYup } from "../../pages/yupValidations/yupValidations";

const AddNewBranchModal = () => {
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
      <Button onClick={() => setShow(true)}>Add Branch</Button>
      <Modal show={show} onClose={() => setShow(false)}>
        <Modal.Header>Add New Branch</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <Formik
              initialValues={{
                name: "",
                address: "",
              }}
              validationSchema={addNewBranchYup}
              onSubmit={async (values, { setSubmitting }) => {
                const payload = { ...values };
                setSubmitting(false);
                setShow(false);
                console.log("values", values);
                const data = await axios({
                  method: "post",
                  url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/branch`,
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
              {() => (
                <Form className="px-8 pt-6 pb-8 mb-4 w-full dark:bg-darkMain">
                  <div>
                    <FormGroup
                      type="text"
                      name="name"
                      labelName={"Branch Name"}
                    />
                    <FormGroup
                      type="text"
                      name="address"
                      labelName={"Branch Location"}
                    />

                    <FormButton type="submit" buttonName="Add New Branch" />
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

export default AddNewBranchModal;
