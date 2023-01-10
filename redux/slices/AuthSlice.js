import { createSlice } from "@reduxjs/toolkit";
import { authService } from "../services/AuthService";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    authStatus: "idle",
    jwt: "",
    messageCode: "",
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    //Auth Controller
    builder
      .addCase(authService.pending, (state) => {
        state.authStatus = "loading";
      })
      .addCase(authService.fulfilled, (state, action) => {
        const {
          data: { code },
        } = action.payload;
        if (code === 0) {
          const {
            data: { message, message_code },
          } = action.payload;
          state.message = message;
          state.messageCode = message_code;
        }
        if (code === 1) {
          const {
            data: {
              message_code,
              result: { jwt },
            },
          } = action.payload;
          state.jwt = jwt;
          state.messageCode = message_code;
        }
        state.authStatus = "succeeded";
      })
      .addCase(authService.rejected, (state, action) => {
        console.log("rejected", action.error);
        state.authStatus = "failed";
      });
  },
});
export default AuthSlice.reducer;

export const getJWT = (state) => state.auth.jwt;
export const getAuthMessage = (state) => state.auth.message;
