import { Button, Modal } from "flowbite-react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";

import { toast } from "react-toastify";
import React, { useState } from "react";
import FormGroup from "../form/FormGroup";
import FormButton from "../form/FormButton";
import { addNewBranchYup } from "../../yupValidations/yupValidations";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { fetchBranchList } from "../../redux/services/CompanyBranchService";

const UpdateBranch = ({ branch }) => {
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
        <Modal.Header>Update Branch</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <Formik
              initialValues={{
                ...branch,
              }}
              validationSchema={addNewBranchYup}
              onSubmit={async (values, { setSubmitting }) => {
                const payload = { ...values };
                setSubmitting(false);
                setShow(false);
                console.log("values", values);
                const data = await axios({
                  method: "put",
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
                  dispatch(fetchBranchList());
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
                      labelName={"Branch Name"}
                    />
                    <FormGroup
                      type="text"
                      name="address"
                      value={values.address}
                      labelName={"Branch Location"}
                    />

                    <FormButton type="submit" buttonName="Update Branch" />
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

export default UpdateBranch;
