import { createSlice } from "@reduxjs/toolkit";
import {
  addCustomer,
  fethcCustomerList,
} from "../services/CompanyCustomerService";

const initialState = {
  companyList: {
    status: "idle",
    data: [],
  },
  addCustomerStatus: "idle",
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
      });
  },
});
export default CompanyCustomerSlice.reducer;

export const getCustomerList = (state) => state.companyCustomer.companyList;
