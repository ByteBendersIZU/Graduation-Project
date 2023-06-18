import * as Yup from "yup";

export const addTypeYup = Yup.object().shape({
    inventoryTypeName: Yup.string().required("Inventory Type is required"),
});
export const updateTypeYup = Yup.object().shape({
    inventoryTypeName: Yup.string().required("Inventory Type is required"),
});
  