import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getSession } from "next-auth/react";

export const fetchBranchList = createAsyncThunk(
  "companyBranchController/branchList",
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
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/branch/list`,
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

// export const addBranch = createAsyncThunk(
//   "companyBranchController/addBranch",
//   async (data) => {
//     const {
//       session: {
//         user: { jwt },
//       },
//     } = await getSession(data);
//     const {
//       data: { result },
//     } = await axios({
//       method: "post",
//       url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/branch`,
//       headers: {
//         Authorization: `Bearer ${jwt}`,
//       },
//       data: {
//         ...data,
//       },
//     }).catch(function (error) {
//       if (error.response) {
//         return error.response;
//       }
//     });

//     return result;
//   }
// );
