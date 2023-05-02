import { createSlice } from "@reduxjs/toolkit";
import { fethcCustomerList } from "../services/CompanyCustomerService";

const initialState = {
  companyList: {
    status: "idle",
    data: [],
  },
};

export const CompanyCustomerSlice = createSlice({
  name: "companyCustomer",
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      state.companyList.data.push(action.payload.data.result);
      console.log(action.payload.data.result);
    },
    updateCustomer: (state, action) => {
      console.log(action.payload.data.result);
      const updatedCompany = action.payload.data.result;
      const updatedList = state.companyList.data.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      );
      state.companyList.data = updatedList;
    },
    removeCustomer: (state, action) => {
      const updatedList = state.companyList.data.filter(
        (company) => company.id !== action.payload
      );
      state.companyList.data = updatedList;
    },
  },
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
      });

    // // //Add Customer
    // .addCase(addCustomer.pending, (state) => {
    //   state.addCustomerStatus = "loading";
    // })
    // .addCase(addCustomer.fulfilled, (state, action) => {
    //   console.log(action);
    //   state.companyList.data.push(action.payload.result);
    //   state.addCustomerStatus = "succeeded";

    //   state.message.code = action.payload.code;
    //   state.message.message = action.payload.message;
    // })
    // .addCase(addCustomer.rejected, (state, action) => {
    //   console.log("rejected", action);
    //   state.addCustomerStatus = "error";
    // })

    // //Update Customer
    // .addCase(updateCustomer.pending, (state) => {
    //   state.updateCustomerStatus = "loading";
    // })
    // .addCase(updateCustomer.fulfilled, (state, action) => {
    //   const updatedCompany = action.payload;
    //   const updatedList = state.companyList.data.map((company) =>
    //     company.id === updatedCompany.id ? updatedCompany : company
    //   );
    //   state.companyList.data = updatedList;
    //   state.updateCustomerStatus = "succeeded";
    // })
    // .addCase(updateCustomer.rejected, (state, action) => {
    //   console.log("rejected", action);
    //   state.updateCustomerStatus = "error";
    // })

    // //Remove Customer
    // .addCase(removeCustomer.pending, (state) => {
    //   state.removeCustomerStatus = "loading";
    // })
    // .addCase(removeCustomer.fulfilled, (state, action) => {
    //   console.log("payloadddd", action.payload);
    //   const updatedList = state.companyList.data.filter(
    //     (company) => company.id !== action.payload
    //   );
    //   state.companyList.data = updatedList;
    // })
    // .addCase(removeCustomer.rejected, (state, action) => {
    //   console.log("rejected", action);
    //   state.removeCustomerStatus = "error";
    // });
  },
});
export default CompanyCustomerSlice.reducer;

export const { addCustomer, updateCustomer, removeCustomer } =
  CompanyCustomerSlice.actions;

export const getCustomerList = (state) => state.companyCustomer.companyList;
// export const getCustomerMessage = (state) => state.companyCustomer.message;
