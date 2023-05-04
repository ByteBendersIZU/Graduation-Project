import { Button, Modal } from "flowbite-react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";

import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import FormGroup from "../form/FormGroup";
import FormButton from "../form/FormButton";
import DropDown from "../form/DropDown";
import {
  addNewCustomerYup,
  addNewPositionYup,
} from "../../yupValidations/yupValidations";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartmentList } from "../../redux/services/CompanyDepartmentService";
import { getDepartmentList } from "../../redux/slices/CopmanyDepartmentSlice";
import Dropdown2 from "../form/Dropdown2";
import FormToggle from "../form/FormToggle";
import { addPosition } from "../../redux/slices/companyPositionSlice";

const AddNewPositionModal = () => {
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
      <Button onClick={() => setShow(true)}>Add Position</Button>
      <Modal show={show} onClose={() => setShow(false)}>
        <Modal.Header>Add New Position</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <Formik
              initialValues={{
                name: "",
                departmentId: "",
                highestPosition: true,
              }}
              validationSchema={addNewPositionYup}
              onSubmit={async (values, { setSubmitting }) => {
                const payload = { ...values };
                setSubmitting(false);
                setShow(false);

                const data = await axios({
                  method: "post",
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
                if (data.data.code) {
                  toast.success(data.data.message);
                  dispatch(addPosition(data));
                }
              }}
            >
              {(values) => (
                <Form className="px-8 pt-6 pb-8 mb-4 w-full dark:bg-darkMain">
                  <div>
                    <Dropdown2
                      name="departmentId"
                      labelName={"Department Name"}
                      options={getDepartments.data}
                    />
                    <FormGroup
                      type="text"
                      name="name"
                      labelName={"Position Name"}
                    />
                    <FormToggle
                      name="highestPosition"
                      labelName={"is higher position ?"}
                    />

                    <FormButton type="submit" buttonName="Add New Position" />
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

export default AddNewPositionModal;
