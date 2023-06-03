import { createSlice } from "@reduxjs/toolkit";
import { fetchEmployeeList } from "../services/CompanyEmployeeService";

const initialState = {
  employeeList: {
    status: "idle",
    data: [],
  },
};

export const CompanyEmployeeSlice = createSlice({
  name: "companyEmployee",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employeeList.data.push(action.payload.data.result);
      console.log(action.payload.data.result);
    },
    updateEmployee: (state, action) => {
      console.log("slice", action.payload);
      const updatedCompany = action.payload;
      const updatedList = state.employeeList.data.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      );
      state.employeeList.data = updatedList;
    },
    removeEmployee: (state, action) => {
      const updatedList = state.employeeList.data.filter(
        (company) => company.id !== action.payload
      );
      state.employeeList.data = updatedList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeList.pending, (state) => {
        state.employeeList.status = "loading";
      })
      .addCase(fetchEmployeeList.fulfilled, (state, action) => {
        state.employeeList.status = "succeeded";
        state.employeeList.data = action.payload;
      })
      .addCase(fetchEmployeeList.rejected, (state, action) => {
        console.log("rejected", action.error);
        state.employeeList.status = "failed";
      });
  },
});
export default CompanyEmployeeSlice.reducer;

export const { addEmployee, updateEmployee, removeEmployee } =
  CompanyEmployeeSlice.actions;

export const getEmployeeList = (state) => state.companyEmployee.employeeList;
