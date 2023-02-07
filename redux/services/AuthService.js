import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authService = createAsyncThunk(
  "authController/auth",
  async (auth) => {
    const data = await axios({
      method: "post",
      url: "http://54.147.214.160:1453/v1/authenticate",
      headers: {},
      data: {
        email: auth.email, // This is the body part
        password: auth.password, // This is the body part
      },
    }).catch(function (error) {
      if (error.response) {
        return error.response;
      }
    });

    return data;
  }
);
