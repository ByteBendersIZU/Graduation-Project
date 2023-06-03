import * as Yup from "yup";

export const addNewBranchYup = Yup.object({
  name: Yup.string()
    .max(30, "Branch Name must be 30 characters or less")
    .min(3, "Branch Name must be 3 characters or more")
    .required("Branch Name is Required"),
  address: Yup.string()
    .required("Branch Location is Required")
    .min(3, "Location name must be 3 characters or more")
    .max(60, "Location name must be 60 characters or less"),
});
export const addNewDepartmentYup = Yup.object({
  name: Yup.string()
    .max(30, "Department Name must be 30 characters or less")
    .min(3, "Department Name must be 3 characters or more")
    .required("Department Name is Required"),
});
export const addNewCustomerYup = Yup.object({
  customer: Yup.string()
    .max(30, "Customer Name must be 30 characters or less")
    .min(3, "Customer Name must be 3 characters or more")
    .required("Customer Name is Required"),
});
export const addNewPositionYup = Yup.object({
  name: Yup.string()
    .max(30, "Customer Name must be 30 characters or less")
    .min(3, "Customer Name must be 3 characters or more")
    .required("Customer Name is Required"),
  departmentId: Yup.string().required("Department Name is Required"),
});
export const addNewUserYup = Yup.object({
  name: Yup.string()
    .max(30, "Name must be 30 characters or less")
    .min(3, "Name must be 3 characters or more")
    .required("Name is Required"),
  secondName: Yup.string()
    .max(30, "Second Name must be 30 characters or less")
    .min(3, "Second Name must be 3 characters or more"),
  surname: Yup.string()
    .max(30, "Surname must be 30 characters or less")
    .min(3, "Surname must be 3 characters or more")
    .required("Surname is Required"),
  username: Yup.string()
    .max(30, "Second Name must be 30 characters or less")
    .min(3, "Second Name must be 3 characters or more")
    .required("Username is Required"),
  branch: Yup.string().required("Branch is Required"),
  gender: Yup.number()
    .max(1, "0 for Male")
    .min(0, "1 for Female")
    .required("Gender is Required"),
  identificationNumber: Yup.string()
    .length(11, "Length must be 11 characters")
    .required("Identification Number is Required"),
  tel: Yup.string().required("Phone Number is Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string()
    .max(30, "Max 30 character")
    .min(5, "Min 5 Characters")
    .required("Password is Required"),
});
