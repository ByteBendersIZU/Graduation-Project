import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTimebookList,
  fetchUserList,
} from "../../services/timebook/TimebookUserService";

const initialState = {
  userList: {
    status: "idle",
    data: [],
  },
  timeList: {
    status: "idle",
    data: [],
  },
};

export const TimebookUserSlice = createSlice({
  name: "timebookUser",
  initialState,
  reducers: {
    addUser: (state, action) => {
      console.log("action payload", action.payload.data.result);
      state.userList.data.push(action.payload.data.result);
    },
    updateUser: (state, action) => {
      console.log("efefef", action.payload.data.result);
      const updatedCompany = action.payload.data.result;
      const updatedList = state.userList.data.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      );
      state.userList.data = updatedList;
    },
    removeUser: (state, action) => {
      const updatedList = state.userList.data.filter(
        (company) => company.id !== action.payload
      );
      state.userList.data = updatedList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.userList.status = "loading";
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.userList.status = "succeeded";
        state.userList.data = action.payload;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        console.log("rejected", action.error);
        state.userList.status = "failed";
      })
      .addCase(fetchTimebookList.pending, (state) => {
        state.timeList.status = "loading";
      })
      .addCase(fetchTimebookList.fulfilled, (state, action) => {
        state.timeList.status = "succeeded";
        state.timeList.data = action.payload;
      })
      .addCase(fetchTimebookList.rejected, (state, action) => {
        console.log("rejected", action.error);
        state.timeList.status = "failed";
      });
  },
});

export default TimebookUserSlice.reducer;

export const { addUser, updateUser, removeUser } = TimebookUserSlice.actions;

export const getUserList = (state) => state.timebookUser.userList;
export const getTimeList = (state) => state.timebookUser.timeList;
