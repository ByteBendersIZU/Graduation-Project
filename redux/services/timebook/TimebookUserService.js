import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getSession } from "next-auth/react";

export const fetchUserList = createAsyncThunk(
  "timebookUserController/userList",
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
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/user/list/working`,
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

export const fetchTimebookList = createAsyncThunk(
  "timebookTimeList/timeList",
  async (context) => {
    const {
      session: {
        user: { jwt },
      },
    } = await getSession(context);

    const lastDay = new Date(context);
    lastDay.setDate(lastDay.getDate() + 6);
    const lastDayFormatted = lastDay.toISOString().split("T")[0];

    const {
      data: { result },
    } = await axios({
      method: "get",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/timebook/${context}/${lastDayFormatted}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }).catch(function (error) {
      if (error.response) {
        return error.response;
      }
    });
    console.log(lastDayFormatted)
    console.log(context)
    return result;
  }
);