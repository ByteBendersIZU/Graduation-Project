import { createSlice } from "@reduxjs/toolkit";
import {
  addCustomer,
  fethcCustomerList,
  removeCustomer,
  updateCustomer,
} from "../services/CompanyCustomerService";

const initialState = {
  companyList: {
    status: "idle",
    data: [],
  },
  addCustomerStatus: "idle",
  updateCustomerStatus: "idle",
  removeCustomerStatus: "idle",
};

export const CompanyCustomerSlice = createSlice({
  name: "companyCustomer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Customer List Controller
    builder
      .addCase(fethcCustomerList.pending, (state) => {
        state.companyList.status = "loading";
      })
      .addCase(fethcCustomerList.fulfilled, (state, action) => {
        state.companyList.status = "succeeded";
        state.companyList.data = action.payload;
      })
      .addCase(fethcCustomerList.rejected, (state, action) => {
        console.log("rejected", action.error);
        state.companyList.status = "failed";
      })

      //Add Customer
      .addCase(addCustomer.pending, (state) => {
        state.addCustomerStatus = "loading";
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.companyList.data.push(action.payload);
        state.addCustomerStatus = "succeeded";
      })
      .addCase(addCustomer.rejected, (state, action) => {
        console.log("rejected", action);
        state.addCustomerStatus = "error";
      })

      //Update Customer
      .addCase(updateCustomer.pending, (state) => {
        state.updateCustomerStatus = "loading";
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const updatedCompany = action.payload;
        const updatedList = state.companyList.data.map((company) =>
          company.id === updatedCompany.id ? updatedCompany : company
        );
        state.companyList.data = updatedList;
        state.updateCustomerStatus = "succeeded";
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        console.log("rejected", action);
        state.updateCustomerStatus = "error";
      })

      //Remove Customer
      .addCase(removeCustomer.pending, (state) => {
        state.removeCustomerStatus = "loading";
      })
      .addCase(removeCustomer.fulfilled, (state, action) => {
        console.log("payloadddd", action.payload);
        const updatedList = state.companyList.data.filter(
          (company) => company.id !== action.payload
        );
        state.companyList.data = updatedList;
        state.removeCustomerStatus = "succeeded";
      })
      .addCase(removeCustomer.rejected, (state, action) => {
        console.log("rejected", action);
        state.removeCustomerStatus = "error";
      });
  },
});
export default CompanyCustomerSlice.reducer;

export const getCustomerList = (state) => state.companyCustomer.companyList;
