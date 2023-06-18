import * as Yup from "yup";

export const addProductYup = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  branch: Yup.string().required("Branch is required"),
  serialNumber: Yup.string().required("Serial Number is required"),
  quantity: Yup.number()
    .min(0, "Quantity cannot be negative")
    .required("Quantity is required"),
  inventoryTypeId: Yup.string().required("Inventory Type is required"),
  features: Yup.string().required("Features are required"),
});
export const updateProductYup = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  branch: Yup.string().required("Branch is required"),
  serialNumber: Yup.string().required("Serial Number is required"),
  quantity: Yup.number()
    .min(0, "Quantity cannot be negative")
    .required("Quantity is required"),
  inventoryTypeId: Yup.string().required("Inventory Type is required"),
  features: Yup.string().required("Features are required"),
});
