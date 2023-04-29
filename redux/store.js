import { configureStore } from "@reduxjs/toolkit";
import CompanyCustomerSlice from "./slices/CompanyCustomerSlice";

export const store = configureStore({
  reducer: {
    companyCustomer: CompanyCustomerSlice,
  },
});
