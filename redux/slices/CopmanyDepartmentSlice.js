import { createSlice } from "@reduxjs/toolkit";
import { fetchDepartmentList } from "../services/CompanyDepartmentService";

const initialState = {
  departmentList: {
    status: "idle",
    data: [],
  },
};

export const CompanyDepartmentSlice = createSlice({
  name: "companyDepartment",
  initialState,
  reducers: {
    addDepartment: (state, action) => {
      state.departmentList.data.push(action.payload.data.result);
    },
    updateDepartment: (state, action) => {
      console.log("updated", action.payload);
      const updatedCompany = action.payload;
      const updatedList = state.departmentList.data.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      );
      state.departmentList.data = updatedList;
    },
    removeDepartment: (state, action) => {
      const updatedList = state.departmentList.data.filter(
        (company) => company.id !== action.payload
      );
      state.departmentList.data = updatedList;
    },
  },
  extraReducers: (builder) => {
    //Company Branch Controller
    builder
      .addCase(fetchDepartmentList.pending, (state) => {
        state.departmentList.status = "loading";
      })
      .addCase(fetchDepartmentList.fulfilled, (state, action) => {
        state.departmentList.status = "succeeded";
        state.departmentList.data = action.payload;
      })
      .addCase(fetchDepartmentList.rejected, (state, action) => {
        console.log("rejected", action.error);
        state.departmentList.status = "failed";
      });
  },
});
export default CompanyDepartmentSlice.reducer;

export const { addDepartment, updateDepartment, removeDepartment } =
  CompanyDepartmentSlice.actions;

export const getDepartmentList = (state) =>
  state.companyDepartment.departmentList;
