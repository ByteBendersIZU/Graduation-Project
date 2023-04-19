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
