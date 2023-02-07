import { createSlice } from "@reduxjs/toolkit";
import { authService } from "../services/AuthService";

const initialState = {
  authStatus: "idle",
  jwt: "",
  messageCode: "",
  message: "",
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState:
    typeof window !== "undefined"
      ? localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : initialState
      : initialState,
  reducers: {
    exitAccount: (state) => {
      (state.authStatus = "idle"),
        (state.jwt = ""),
        (state.messageCode = ""),
        (state.message = ""),
        localStorage.removeItem("auth");
    },
  },
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
        localStorage.setItem("auth", JSON.stringify(state));
      })
      .addCase(authService.rejected, (state, action) => {
        console.log("rejected", action.error);
        state.authStatus = "failed";
      });
  },
});
export default AuthSlice.reducer;

export const { exitAccount } = AuthSlice.actions;

export const getJWT = (state) => state.auth.jwt;
export const getAuthMessage = (state) => state.auth.message;
