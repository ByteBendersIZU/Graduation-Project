import { createSlice } from "@reduxjs/toolkit";
import { fetchMe } from "../services/HelperService";

const initialState = {
  me: {
    status: "idle",
    data: [],
  },
};

export const HelperSlice = createSlice({
  name: "companyHelper",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Customer List Controller
    builder
      .addCase(fetchMe.pending, (state) => {
        state.me.status = "loading";
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.me.status = "succeeded";
        state.me.data = action.payload;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        console.log("rejected", action.error);
        state.me.status = "failed";
      });
  },
});
export default HelperSlice.reducer;

export const getMyCompanyId = (state) => state.companyHelper.me.data.companyId;
