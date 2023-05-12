import { createSlice } from "@reduxjs/toolkit";
import { fetchTypeList } from "../../services/inventory/InventoryTypeService";

const initialState = {
  inventoryList: {
    status: "idle",
    data: [],
  },
};

export const InventoryListSlice = createSlice({
  name: "inventoryList",
  initialState,
  reducers: {
    addType: (state, action) => {
      console.log("action payload", action.payload.data.result);
      state.typeList.data.push(action.payload.data.result);
    },
    updateType: (state, action) => {
      console.log("efefef", action.payload.data.result);
      const updatedCompany = action.payload.data.result;
      const updatedList = state.typeList.data.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      );
      state.typeList.data = updatedList;
    },
    removeType: (state, action) => {
      const updatedList = state.typeList.data.filter(
        (company) => company.id !== action.payload
      );
      state.typeList.data = updatedList;
    },
  },
  extraReducers: (builder) => {
    //Customer List Controller
    builder
      .addCase(fetchTypeList.pending, (state) => {
        state.typeList.status = "loading";
      })
      .addCase(fetchTypeList.fulfilled, (state, action) => {
        state.typeList.status = "succeeded";
        state.typeList.data = action.payload;
      })
      .addCase(fetchTypeList.rejected, (state, action) => {
        console.log("rejected", action.error);
        state.typeList.status = "failed";
      });
  },
});

export default InventoryListSlice.reducer;

export const { addList, updateList, removeList } = InventoryListSlice.actions;

export const getList = (state) => state.inventoryList.list;

