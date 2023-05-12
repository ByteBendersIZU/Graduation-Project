import { createSlice } from "@reduxjs/toolkit";
import { fetchList } from "../../services/inventory/InventoryListService";

const initialState = {
  inventoryList: {
    status: "idle",
    data: [],
  },
};

export const InventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addType: (state, action) => {
      console.log("action payload", action.payload.data.result);
      state.inventoryList.data.push(action.payload.data.result);
    },
    updateType: (state, action) => {
      console.log("efefef", action.payload.data.result);
      const updatedCompany = action.payload.data.result;
      const updatedList = state.inventoryList.data.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      );
      state.inventoryList.data = updatedList;
    },
    removeType: (state, action) => {
      const updatedList = state.inventoryList.data.filter(
        (company) => company.id !== action.payload
      );
      state.inventoryList.data = updatedList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.inventoryList.status = "loading";
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.inventoryList.status = "succeeded";
        state.inventoryList.data = action.payload;
      })
      .addCase(fetchList.rejected, (state, action) => {
        console.log("rejected", action.error);
        state.inventoryList.status = "failed";
      });
  },
});

export default InventorySlice.reducer;

export const { addType, updateType, removeType } = InventorySlice.actions;

export const getList = (state) => state.inventory.inventoryList;
