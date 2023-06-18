import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import CompanyCustomerSlice from "./slices/CompanyCustomerSlice";
import CompanyBranchSlice from "./slices/CompanyBranchSlice";
import CompanyDepartmentSlice from "./slices/CopmanyDepartmentSlice";
import CompanyPositionSlice from "./slices/CompanyPositionSlice";
import HelperSlice from "./slices/HelperSlice";
import CompanyEmployeeSlice from "./slices/CompanyEmployeeSlice";
import InventoryTypeSlice from "./slices/inventory/InventoryTypeSlice";
import InventoryAppointmentSlice from "./slices/inventory/InventoryAppointmentSlice";
import TimebookUserSlice from "./slices/timebook/TimebookUserSlice";
import InventoryProductSlice from "./slices/inventory/InventoryProductSlice";
import timebookReducer from "./slices/timebook/TimebookUserSlice";

export const store = configureStore({
  reducer: {
    companyCustomer: CompanyCustomerSlice,
    companyBranch: CompanyBranchSlice,
    companyDepartment: CompanyDepartmentSlice,
    companyPosition: CompanyPositionSlice,
    companyEmployee: CompanyEmployeeSlice,
    companyHelper: HelperSlice,
    inventoryType: InventoryTypeSlice,
    inventoryProduct: InventoryProductSlice,
    inventoryAppointment: InventoryAppointmentSlice,
    timebookUser: timebookReducer,

    
  },
  middleware: [...getDefaultMiddleware({ serializableCheck: false })],
});
