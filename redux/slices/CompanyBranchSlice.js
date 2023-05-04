import { createSlice } from "@reduxjs/toolkit";
import { fetchBranchList } from "../services/CompanyBranchService";

const initialState = {
  branchList: {
    status: "idle",
    data: [],
  },
};

export const CompanyBranchSlice = createSlice({
  name: "companyBranch",
  initialState,
  reducers: {
    addBranch: (state, action) => {
      console.log(action.payload.data.result);
      state.branchList.data.push(action.payload.data.result);
    },
    updateBranch: (state, action) => {
      const updatedCompany = action.payload;
      const updatedList = state.branchList.data.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      );
      state.branchList.data = updatedList;
    },
    removeBranch: (state, action) => {
      const updatedList = state.branchList.data.filter(
        (company) => company.id !== action.payload
      );
      state.branchList.data = updatedList;
    },
  },
  extraReducers: (builder) => {
    //Company Branch Controller
    builder
      .addCase(fetchBranchList.pending, (state) => {
        state.branchList.status = "loading";
      })
      .addCase(fetchBranchList.fulfilled, (state, action) => {
        state.branchList.status = "succeeded";
        state.branchList.data = action.payload;
      })
      .addCase(fetchBranchList.rejected, (state, action) => {
        console.log("rejected", action.error);
        state.branchList.status = "failed";
      });
  },
});
export default CompanyBranchSlice.reducer;

export const { addBranch, updateBranch, removeBranch } =
  CompanyBranchSlice.actions;

export const getBranchList = (state) => state.companyBranch.branchList;
