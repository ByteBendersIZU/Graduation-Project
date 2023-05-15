import { configureStore } from "@reduxjs/toolkit";
import CompanyCustomerSlice from "./slices/CompanyCustomerSlice";
import CompanyBranchSlice from "./slices/CompanyBranchSlice";
import CompanyDepartmentSlice from "./slices/CopmanyDepartmentSlice";
import CompanyPositionSlice from "./slices/CompanyPositionSlice";
import InventoryTypeSlice from "./slices/inventory/InventoryTypeSlice";
import InventoryAppointmentSlice from "./slices/inventory/InventoryAppointmentSlice";
import TimebookUserSlice from "./slices/timebook/TimebookUserSlice";
import InventoryProductSlice from "./slices/inventory/InventoryProductSlice";

export const store = configureStore({
  reducer: {
    companyCustomer: CompanyCustomerSlice,
    companyBranch: CompanyBranchSlice,
    companyDepartment: CompanyDepartmentSlice,
    companyPosition: CompanyPositionSlice,
    inventoryType: InventoryTypeSlice,
    inventoryProduct: InventoryProductSlice,
    inventoryAppointment: InventoryAppointmentSlice,
    timebookUser: TimebookUserSlice,
  },
});
