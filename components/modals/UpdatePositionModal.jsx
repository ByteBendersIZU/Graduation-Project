import { Button, Modal } from "flowbite-react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";

import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import FormGroup from "../form/FormGroup";
import FormButton from "../form/FormButton";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { fetchDepartmentList } from "../../redux/services/CompanyDepartmentService";
import { getDepartmentList } from "../../redux/slices/CopmanyDepartmentSlice";
import Dropdown2 from "../form/Dropdown2";
import FormToggle from "../form/FormToggle";
import { addNewPositionYup } from "../../yupValidations/yupValidations";
import { updatePosition } from "../../redux/slices/companyPositionSlice";

const UpdatePositionModal = ({ position }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDepartmentList());
  }, []);
  const getDepartments = useSelector(getDepartmentList);
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
        <Modal.Header>Update position</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <Formik
              initialValues={{
                ...position,
                departmentId: "",
              }}
              validationSchema={addNewPositionYup}
              onSubmit={async (values, { setSubmitting }) => {
                const payload = { ...values };
                setSubmitting(false);
                setShow(false);
                const data = await axios({
                  method: "put",
                  url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/position`,
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
                  dispatch(updatePosition(data));
                }
              }}
            >
              {({ values }) => (
                <Form className="px-8 pt-6 pb-8 mb-4 w-full dark:bg-darkMain">
                  <div>
                    <Dropdown2
                      name="departmentId"
                      labelName={"Department Name"}
                      selected={values.department.name}
                      options={getDepartments.data}
                      placeholder={"Select Department"}
                    />
                    <FormGroup
                      type="text"
                      name="name"
                      value={values.name}
                      labelName={"Position Name"}
                    />
                    <FormToggle
                      name="highestPosition"
                      labelName={"is higher position ?"}
                    />
                    <FormButton type="submit" buttonName="Update Position" />
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

export default UpdatePositionModal;
