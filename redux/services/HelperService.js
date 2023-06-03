import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getSession } from "next-auth/react";

export const fetchMe = createAsyncThunk(
  "helperController/getMyCompanyId",
  async (context) => {
    const {
      session: {
        user: { jwt },
      },
    } = await getSession(context);
    const {
      data: { result },
    } = await axios({
      method: "get",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/user`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }).catch(function (error) {
      if (error.response) {
        return error.response;
      }
    });

    return result;
  }
);