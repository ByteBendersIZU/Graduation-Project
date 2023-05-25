import { Button, Modal } from "flowbite-react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";

import { toast } from "react-toastify";
import React, { useState } from "react";
import FormGroup from "../../form/FormGroup";
import FormButton from "../../form/FormButton";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../redux/slices/inventory/InventoryProductSlice";
import * as Yup from "yup";
import DropDown from "../../form/DropDown";


const UpdateProduct = ({ values }) => {
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
        <Modal.Header>Update Product</Modal.Header>
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
                    dispatch(updateProduct(data));
                  }
                }}
              >
                {({values}) => (
                  <Form className="px-8 pt-6 pb-8 mb-4 w-full dark:bg-darkMain">
                    <div>
                      <FormGroup
                        type="text"
                        name="name"
                        labelName={"Inventory Name"}
                        value={values.name}
                      />
                      <FormGroup
                        type="text"
                        name="branch"
                        labelName={"Branch Name"}
                        value={values.branch}

                      />
                      <FormGroup
                        type="text"
                        name="serialNumber"
                        labelName={"Serial Number"}
                        value={values.serialNumber}

                      />
                      <FormGroup
                        type="text"
                        name="quantity"
                        labelName={"Quantity"}
                        value={values.quantity}

                      />
                      <FormGroup
                        type="text"
                        name="inventoryTypeId"
                        labelName={"Inventory Type"}
                        value={values.inventoryTypeId}

                      />
                      <FormGroup
                        type="text"
                        name="features"
                        labelName={"Inventory Features"}
                        value={values.features}

                      />
                      <FormButton type="submit" buttonName="Update Product" />
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

export default UpdateProduct;
