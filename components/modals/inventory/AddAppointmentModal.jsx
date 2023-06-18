import {
  Button,
  Checkbox,
  Dropdown,
  Label,
  Modal,
  Progress,
  TextInput,
} from "flowbite-react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";

import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import FormGroup from "../../form/FormGroup";
import FormButton from "../../form/FormButton";
import DropDown from "../../form/DropDown";
import { addNewBranchYup } from "../../../yupValidations/yupValidations";
import { useDispatch, useSelector } from "react-redux";
import Dropdown2 from '../../../components/form/Dropdown2'

import * as Yup from "yup";
import { addAppointment } from "../../../redux/slices/inventory/InventoryAppointmentSlice";
import { getProductList } from "../../../redux/slices/inventory/InventoryProductSlice";
import { getUserList } from "../../../redux/slices/timebook/TimebookUserSlice";
import { fetchProductList } from "../../../redux/services/inventory/InventoryProductService";
import { fetchUserList } from "../../../redux/services/timebook/TimebookUserService";


const AddAppointment = ({}) => {
  const dispatch = useDispatch();
  const {
    data: {
      session: {
        user: { jwt },
      },
    },
  } = useSession();

  useEffect(() => {
    dispatch(fetchProductList());
    dispatch(fetchUserList())
  }, []);

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
      <Button onClick={() => setShow(true)}>Inventory Appointment</Button>
      <Modal show={show} onClose={() => setShow(false)}>
        <Modal.Header>Inventory Appointment</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <Formik
              initialValues={{
                inventoryId: "",
                userId: "",
                amount: 0,
                situation: 0,
                dateOfIssue: "",
              }}
              validationSchema={Yup.object({})}
              onSubmit={async (values, { setSubmitting }) => {
                const payload = { ...values };
                setSubmitting(false);
                setShow(false);
                const data = await axios({
                  method: "post",
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
                  dispatch(addAppointment(data));
                  // setAppointments((prevAppointments) => [...prevAppointments, data]); // Yeni randevuyu listeye ekleyin
                }
              }}
            >
              {() => (
                <Form className="px-8 pt-6 pb-8 mb-4 w-full dark:bg-darkMain">
                  <div>
                    <Dropdown2
                      options={getInventoryData}
                      name="inventoryId"
                      labelName={"Inventory Name"}
                    />
                    <Dropdown2 options={getUserData} name="userId" labelName={"User"} />
                    <FormGroup
                      type="number"
                      name="amount"
                      labelName={"Amount"}
                    />
                    <Dropdown2
                      options={inventorySituation}
                      name="situation"
                      labelName={"Inventory Situation"}
                    />
                    <FormGroup
                      type="date"
                      name="dateOfIssue"
                      labelName={"Date of Issue"}
                    />
                    <FormButton type="submit" buttonName="Add Appointment" />
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

export default AddAppointment;
