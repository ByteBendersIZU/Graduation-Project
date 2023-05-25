import { configureStore } from "@reduxjs/toolkit";
import CompanyCustomerSlice from "./slices/CompanyCustomerSlice";
import CompanyBranchSlice from "./slices/CompanyBranchSlice";
import CompanyDepartmentSlice from "./slices/CopmanyDepartmentSlice";
import CompanyPositionSlice from "./slices/CompanyPositionSlice";
import HelperSlice from "./slices/HelperSlice";
import CompanyEmployeeSlice from "./slices/CompanyEmployeeSlice";

export const store = configureStore({
  reducer: {
    companyCustomer: CompanyCustomerSlice,
    companyBranch: CompanyBranchSlice,
    companyDepartment: CompanyDepartmentSlice,
    companyPosition: CompanyPositionSlice,
    companyEmployee: CompanyEmployeeSlice,
    companyHelper: HelperSlice,
  },
});
