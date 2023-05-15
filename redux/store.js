import { configureStore } from "@reduxjs/toolkit";
import CompanyCustomerSlice from "./slices/CompanyCustomerSlice";
import CompanyBranchSlice from "./slices/CompanyBranchSlice";
import CompanyDepartmentSlice from "./slices/CopmanyDepartmentSlice";
import CompanyPositionSlice from "./slices/CompanyPositionSlice";
import InventoryTypeSlice from "./slices/inventory/InventoryTypeSlice";
import InventoryListSlice from "./slices/inventory/InventoryListSlice";
import InventoryAppointmentSlice from "./slices/inventory/InventoryAppointmentSlice";
import TimebookUserSlice from "./slices/timebook/TimebookUserSlice";

export const store = configureStore({
  reducer: {
    companyCustomer: CompanyCustomerSlice,
    companyBranch: CompanyBranchSlice,
    companyDepartment: CompanyDepartmentSlice,
    companyPosition: CompanyPositionSlice,
    inventoryType: InventoryTypeSlice,
    inventoryList: InventoryListSlice,
    inventoryAppointment: InventoryAppointmentSlice,
    timebookUser: TimebookUserSlice,
  },
});
