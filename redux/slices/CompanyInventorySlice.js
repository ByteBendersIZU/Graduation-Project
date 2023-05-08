import { createSlice } from "@reduxjs/toolkit";
import { fetchInventoryTypeList } from "../services/CompanyInventoryService";

const initialState = {
  inventoryTypeList: {
    status: "idle",
    data: [],
  },
};

export const CompanyInventoryTypeSlice = createSlice({
  name: "companyInventoryType",
  initialState,
  reducers: {
    addInventoryType: (state, action) => {
      state.inventoryTypeList.data.push(action.payload.data.result);
      console.log(action.payload.data.result);
    },
    updateInventoryType: (state, action) => {
      console.log(action.payload.data.result);
      const updatedCompany = action.payload.data.result;
      const updatedList = state.inventoryTypeList.data.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      );
      state.inventoryTypeList.data = updatedList;
    },
    removeInventoryType: (state, action) => {
      const updatedList = state.inventoryTypeList.data.filter(
        (company) => company.id !== action.payload
      );
      state.inventoryTypeList.data = updatedList;
    },
  },
  extraReducers: (builder) => {
    //Customer List Controller
    builder
      .addCase(fetchInventoryTypeList.pending, (state) => {
        state.inventoryTypeList.status = "loading";
      })
      .addCase(fetchInventoryTypeList.fulfilled, (state, action) => {
        state.inventoryTypeList.status = "succeeded";
        state.inventoryTypeList.data = action.payload;
      })
      .addCase(fetchInventoryTypeList.rejected, (state, action) => {
        console.log("rejected", action.error);
        state.inventoryTypeList.status = "failed";
      });

    // // //Add Customer
    // .addCase(addCustomer.pending, (state) => {
    //   state.addCustomerStatus = "loading";
    // })
    // .addCase(addCustomer.fulfilled, (state, action) => {
    //   console.log(action);
    //   state.inventoryTypeList.data.push(action.payload.result);
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
    //   const updatedList = state.inventoryTypeList.data.map((company) =>
    //     company.id === updatedCompany.id ? updatedCompany : company
    //   );
    //   state.inventoryTypeList.data = updatedList;
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
    //   const updatedList = state.inventoryTypeList.data.filter(
    //     (company) => company.id !== action.payload
    //   );
    //   state.inventoryTypeList.data = updatedList;
    // })
    // .addCase(removeCustomer.rejected, (state, action) => {
    //   console.log("rejected", action);
    //   state.removeCustomerStatus = "error";
    // });
  },
});
export default CompanyInventoryTypeSlice.reducer;

export const { addInventoryType, updateInventoryType, removeInventoryType } =
  CompanyInventoryTypeSlice.actions;

export const getInventoryTypeList = (state) =>
  state.companyInventoryType.inventoryTypeList;
// export const getCustomerMessage = (state) => state.companyCustomer.message;
