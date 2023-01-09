import { createSlice } from "@reduxjs/toolkit";
import { authService } from "../services/AuthService";

export const AuthSlice = createSlice({
  name: "weather",
  initialState: {
    authStatus: "idle",
    jwt: "",
    messageCode: "",
  },
  reducers: {},
  extraReducers: {
    //Auth Controller
    [authService.pending]: (state) => {
      state.authStatus = "loading";
    },
    [authService.fulfilled]: (state, action) => {
      console.log("fullfiled", action);
      const {
        data: { code },
      } = action.payload;

      const {
        data: { message_code },
      } = action.payload;
      const {
        data: {
          result: { jwt },
        },
      } = action.payload;
      state.messageCode = message_code;
      state.jwt = jwt;
      state.authStatus = "succeeded";
    },
    [authService.rejected]: (state, action) => {
      console.log("rejected", action.payload);
      state.authStatus = "failed";
    },
  },
});
export default AuthSlice.reducer;
