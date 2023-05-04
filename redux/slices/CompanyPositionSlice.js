import { createSlice } from "@reduxjs/toolkit";
import { fetchPositionList } from "../services/CompanyPositionService";

const initialState = {
  positionList: {
    status: "idle",
    data: [],
  },
};

export const CompanyPositionSlice = createSlice({
  name: "companyPosition",
  initialState,
  reducers: {
    addPosition: (state, action) => {
      console.log("action payload", action.payload.data.result);
      state.positionList.data.push(action.payload.data.result);
    },
    updatePosition: (state, action) => {
      console.log("efefef", action.payload.data.result);
      const updatedCompany = action.payload.data.result;
      const updatedList = state.positionList.data.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      );
      state.positionList.data = updatedList;
    },
    removePosition: (state, action) => {
      const updatedList = state.positionList.data.filter(
        (company) => company.id !== action.payload
      );
      state.positionList.data = updatedList;
    },
  },
  extraReducers: (builder) => {
    //Customer List Controller
    builder
      .addCase(fetchPositionList.pending, (state) => {
        state.positionList.status = "loading";
      })
      .addCase(fetchPositionList.fulfilled, (state, action) => {
        state.positionList.status = "succeeded";
        state.positionList.data = action.payload;
      })
      .addCase(fetchPositionList.rejected, (state, action) => {
        console.log("rejected", action.error);
        state.positionList.status = "failed";
      });
  },
});

export const { addPosition, updatePosition, removePosition } =
  CompanyPositionSlice.actions;

export const getPositionList = (state) => state.companyPosition.positionList;

export default CompanyPositionSlice.reducer;
