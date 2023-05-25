import { Button, Modal } from "flowbite-react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";

import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import FormGroup from "../../form/FormGroup";
import FormButton from "../../form/FormButton";
import {
  addNewCustomerYup,
  addNewUserYup,
} from "../../../yupValidations/yupValidations";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer } from "../../../redux/slices/CompanyCustomerSlice";
import { addEmployee } from "../../../redux/slices/CompanyEmployeeSlice";
import { fetchBranchList } from "../../../redux/services/CompanyBranchService";
import { getBranchList } from "../../../redux/slices/CompanyBranchSlice";
import Dropdown2 from "../../form/Dropdown2";
import { fetchMe } from "../../../redux/services/HelperService";
import { getMyCompanyId } from "../../../redux/slices/HelperSlice";

const UpdateUserModal = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBranchList());
  }, []);
  const branches = useSelector(getBranchList);
  const companyId = useSelector(getMyCompanyId);

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
      <Button onClick={() => setShow(true)}>Add Employee</Button>
      <Modal show={show} onClose={() => setShow(false)}>
        <Modal.Header>Add New User</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <Formik
              initialValues={{ companyId }}
              onSubmit={async (values, { setSubmitting }) => {
                const payload = { ...values };
                setSubmitting(false);
                setShow(false);
                console.log(values);
                const data = await axios({
                  method: "post",
                  url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/user`,
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
                  dispatch(addEmployee(data));
                }
              }}
            >
              {() => (
                <Form className="px-8 pt-6 pb-8 mb-4 w-full dark:bg-darkMain">
                  <div>
                    <FormGroup type="text" name="name" labelName={"Name"} />
                    <FormGroup
                      type="text"
                      name="secondName"
                      labelName={"Second Name"}
                    />
                    <FormGroup
                      type="text"
                      name="surname"
                      labelName={"Surname"}
                    />
                    <FormGroup
                      type="text"
                      name="username"
                      labelName={"Username"}
                    />
                    <Dropdown2
                      placeholder="Select Branch"
                      type="text"
                      name="branch"
                      options={branches.data}
                      labelName={"Branch"}
                    />
                    <FormGroup
                      type="number"
                      name="gender"
                      labelName={"Gender (Male:0, Female:1)"}
                    />
                    <FormGroup
                      type="text"
                      name="identificationNumber"
                      labelName={"Identification Number"}
                    />
                    <FormGroup
                      type="text"
                      name="tel"
                      labelName={"Phone Number"}
                    />
                    <FormGroup type="text" name="email" labelName={"Email"} />

                    <FormGroup
                      type="password"
                      name="password"
                      labelName={"Password"}
                    />

                    <FormButton type="submit" buttonName="Add User" />
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

export default UpdateUserModal;

// {
//                 companyId: useSelector(getMyCompanyId),
//                 accountant: true,
//                 active: true,
//                 distributorId: "string",
//                 id: "string",
//                 nationalityId: 0,
//                 profilePicture: "string",
//                 roles: [
//                   {
//                     description: "company user",
//                     name: "COMPANY_USER",
//                   },
//                 ],
//                 superAdminId: "string",
//               }
