import React, { useState } from "react";
import axios from "axios";

import { getSession, useSession } from "next-auth/react";
import { toast } from "react-toastify";

const ChangingState = ({ id, stateButton }) => {
  const {
    data: {
      session: {
        user: { jwt },
      },
    },
  } = useSession();

  const adminActive = async (id) => {
    const data = await axios({
      method: "post",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/company/company-admin-active/${id}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }).catch(function (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    });
    if (data.data.code) {
      toast.success(data.data.message);
    }
    console.log(data);
    return data;
  };
  const adminPassive = async (id) => {
    console.log(id);
    const data = await axios({
      method: "post",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/company/company-admin-passive/${id}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }).catch(function (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    });
    console.log(data);
    if (data.data.code) {
      toast.success(data.data.message);
    }
    console.log(data);
    return data;
  };
  return (
    <div>
      <form>
        <button onClick={async () => await adminPassive(id)}>
          {stateButton.name}
        </button>
      </form>
    </div>
  );
};

ChangingState.auth = true;

export default ChangingState;
