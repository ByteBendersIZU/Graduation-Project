import { Button, Modal } from "flowbite-react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";

import { toast } from "react-toastify";
import React, { use, useState } from "react";
import FormGroup from "../form/FormGroup";
import FormButton from "../form/FormButton";
import { addNewDepartmentYup } from "../../pages/yupValidations/yupValidations";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateDepartment } from "../../redux/slices/CopmanyDepartmentSlice";

const UpdateDepartmentModal = ({ department }) => {
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
        <Modal.Header>Update Department</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <Formik
              initialValues={{
                ...department,
              }}
              validationSchema={addNewDepartmentYup}
              onSubmit={async (values, { setSubmitting }) => {
                const payload = { ...values };
                setSubmitting(false);
                setShow(false);
                const data = await axios({
                  method: "put",
                  url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/department`,
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
                  dispatch(updateDepartment(values));
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
                      labelName={"Department Name"}
                    />

                    <FormButton type="submit" buttonName="Update Department" />
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

export default UpdateDepartmentModal;
