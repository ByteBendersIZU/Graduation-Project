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
      console.log("payload", action.payload);
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

    // //Add Branch
    // .addCase(addBranch.pending, (state) => {
    //   state.addBranchStatus = "loading";
    // })
    // .addCase(addBranch.fulfilled, (state, action) => {
    //   state.branchList.data.push(action.payload);
    //   state.addBranchStatus = "succeeded";
    //   console.log("payload", action.payload);
    // })
    // .addCase(addBranch.rejected, (state, action) => {
    //   console.log("rejected", action);
    //   state.addBranchStatus = "error";
    // });
  },
});
export default CompanyBranchSlice.reducer;

export const { addBranch } = CompanyBranchSlice.actions;

export const getBranchList = (state) => state.companyBranch.branchList;
