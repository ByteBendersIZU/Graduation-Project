import { Button, Modal } from "flowbite-react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";

import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import FormGroup from "../../form/FormGroup";
import FormButton from "../../form/FormButton";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateAppointment } from "../../../redux/slices/inventory/InventoryAppointmentSlice";
import * as Yup from "yup";
import DropDown from "../../form/DropDown";

import { getProductList } from "../../../redux/slices/inventory/InventoryProductSlice";
import { getUserList } from "../../../redux/slices/timebook/TimebookUserSlice";
import { fetchProductList } from "../../../redux/services/inventory/InventoryProductService";
import { fetchUserList } from "../../../redux/services/timebook/TimebookUserService";
import Dropdown2 from "../../form/Dropdown2";

const UpdateAppointment = ({ values }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductList());
    dispatch(fetchUserList())
  }, []);
  const {
    data: {
      session: {
        user: { jwt },
      },
    },
  } = useSession();
  const [show, setShow] = useState(false);
  
  const [inventorySituation, setInventorySituation] = useState([
    { id: 0, name: "Brand New" },
    { id: 1, name: "Like New" },
    { id: 2, name: "Very Good" },
    { id: 3, name: "Good" },
    { id: 4, name: "Fair" },
  ]);
  const getInventory = useSelector(getProductList);
  const getUser = useSelector(getUserList);
  const getInventoryData = getInventory.data;
  const getUserData = getUser.data;
  return (
    <React.Fragment>
      <div
        className="text-blue-600 cursor-pointer"
        onClick={() => setShow(true)}
      >
        <MdOutlineModeEdit />
      </div>
      <Modal show={show} onClose={() => setShow(false)}>
        <Modal.Header>Update Appointment</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
          <Formik
                initialValues={{
                  ...values
                }}
                validationSchema={Yup.object({})}
                onSubmit={async (values, { setSubmitting }) => {
                  const payload = { ...values };
                  setSubmitting(false);
                  setShow(false);
                  const data = await axios({
                    method: "put",
                    url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/user-inventory/`,
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
                    dispatch(updateAppointment(data));
                  }
                }}
              >
                {({values}) => (
                  <Form className="px-8 pt-6 pb-8 mb-4 w-full dark:bg-darkMain">
                    <div>
                    <Dropdown2
                      options={getInventoryData}
                      name="inventoryId"
                      labelName={"Inventory Name"}
                      selected={values.inventory.name}
                    />
                    <Dropdown2
                      options={getUserData}
                      name="userId"
                      labelName={"User"}
                      selected={values.user.name}

                    />
                    <FormGroup
                      type="number"
                      name="amount"
                      labelName={"Amount"}
                      value={values.amount}

                    />
                    <Dropdown2
                      options={inventorySituation}
                      name="situation"
                      labelName={"Inventory Situation"}
                      selected={values.situation}

                    />
                    <FormGroup
                      type="date"
                      name="dateOfIssue"
                      labelName={"Date of Issue"}
                      value={values.dateOfIssue}

                    />
                      <FormButton type="submit" buttonName="Update Appoitment" />
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

export default UpdateAppointment;
