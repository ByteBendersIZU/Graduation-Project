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
import React, { useEffect, useState } from "react";
import FormGroup from "../../form/FormGroup";
import FormButton from "../../form/FormButton";
import { addNewBranchYup } from "../../../yupValidations/yupValidations";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup";
import { addProduct } from "../../../redux/slices/inventory/InventoryProductSlice";
import DropDown from "../../form/DropDown";

import { getTypeList } from "../../../redux/slices/inventory/InventoryTypeSlice";
import { fetchTypeList } from "../../../redux/services/inventory/InventoryTypeService";
import { getBranchList } from "../../../redux/slices/CompanyBranchSlice";
import { fetchBranchList } from "../../../redux/services/CompanyBranchService";

import Dropdown2 from "../../form/Dropdown2";
import { addProductYup } from "../../../yupValidations/inventoryProductValidations";

const AddInventory = () => {
  const dispatch = useDispatch();
  const {
    data: {
      session: {
        user: { jwt },
      },
    },
  } = useSession();
  const [show, setShow] = useState(false);
  useEffect(() => {
    dispatch(fetchTypeList());
    dispatch(fetchBranchList());
  }, []);
  const getType = useSelector(getTypeList);
  const getBranch = useSelector(getBranchList);
  const newType = {
    data: getType.data.map((item) => {
      return {
        name: item.inventoryTypeName,
        ...item,
      };
    }),
  };
  const newTypeData = newType.data
  const getBranchData = getBranch.data
  return (
    <React.Fragment>
      <Button onClick={() => setShow(true)}>Add Inventory</Button>
      <Modal show={show} onClose={() => setShow(false)}>
        <Modal.Header>Add New Inventory</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 overflow-y-auto max-h-96">
            <Formik
              initialValues={{
                name: "",
                branch: "",
                serialNumber: "",
                quantity: "",
                inventoryTypeId: "",
                features: "",
              }}
              validationSchema={addProductYup}
              onSubmit={async (values, { setSubmitting }) => {
                const payload = { ...values };
                setSubmitting(false);
                setShow(false);
                const data = await axios({
                  method: "post",
                  url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/inventory/`,
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
                  dispatch(addProduct(data));
                }
              }}
            >
              {() => (
                <Form className="px-8 pt-6 pb-8 mb-4 w-full dark:bg-darkMain">
                  <div>
                    <FormGroup
                      type="text"
                      name="name"
                      labelName={"Inventory Name"}
                    />
                    <Dropdown2
                      options={getBranchData}
                      name="branch"
                      labelName={"Branch Name"}
                    />
                    <FormGroup
                      type="text"
                      name="serialNumber"
                      labelName={"Serial Number"}
                    />
                    <FormGroup
                      type="number"
                      name="quantity"
                      labelName={"Quantity"}
                    />
                    <DropDown
                      options={newTypeData}
                      name="inventoryTypeId"
                      labelName={"Inventory Type"}
                    />
                    <FormGroup
                      type="text"
                      name="features"
                      labelName={"Inventory Features"}
                    />
                    <FormButton type="submit" buttonName="Add New Product" />
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

export default AddInventory;
