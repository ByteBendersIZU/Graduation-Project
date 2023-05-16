import { createSlice } from "@reduxjs/toolkit";
import { fetchAppointmentList } from "../../services/inventory/InventoryAppointmentService";

const initialState = {
  appointmentList: {
    status: "idle",
    data: [],
  },
};

export const InventoryAppointmentSlice = createSlice({
  name: "inventoryAppointment",
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      console.log("action payload", action.payload.data.result);
      state.appointmentList.data.push(action.payload.data.result);
    },
    updateAppointment: (state, action) => {
      console.log("efefef", action.payload.data.result);
      const updatedCompany = action.payload.data.result;
      const updatedList = state.appointmentList.data.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      );
      state.appointmentList.data = updatedList;
    },
    removeAppointment: (state, action) => {
      const updatedList = state.appointmentList.data.filter(
        (company) => company.id !== action.payload
      );
      state.appointmentList.data = updatedList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointmentList.pending, (state) => {
        state.appointmentList.status = "loading";
      })
      .addCase(fetchAppointmentList.fulfilled, (state, action) => {
        state.appointmentList.status = "succeeded";
        state.appointmentList.data = action.payload;
      })
      .addCase(fetchAppointmentList.rejected, (state, action) => {
        console.log("rejected", action.error);
        state.appointmentList.status = "failed";
      });
  },
});

export default InventoryAppointmentSlice.reducer;

export const { addAppointment, updateAppointment, removeAppointment } = InventoryAppointmentSlice.actions;

export const getAppointmentList = (state) => state.inventoryAppointment.appointmentList;
