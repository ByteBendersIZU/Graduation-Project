import React, { useState } from "react";
import axios from "axios";

import { getSession, useSession } from "next-auth/react";
import { toast } from "react-toastify";

const ChancingStateDistributor = ({ id, status, stateButton }) => {
  const {
    data: {
      session: {
        user: { jwt },
      },
    },
  } = useSession();

  const distActive = async (id) => {
    console.log(id);
    const data = await axios({
      method: "put",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/distributor/active/${id}`,
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
    return data;
  };
  const distUnactive = async (id) => {
    const data = await axios({
      method: "put",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/distributor/unactive/${id}`,
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
    return data;
  };
  const stateController = (id) => {
    if (status === true) {
      distActive(id);
    } else {
      distUnactive(id);
    }
  };

  return (
    <div>
      <button onClick={() => stateController(id)}>
        {status ? "Passive" : "Active"}
      </button>
    </div>
  );
};

ChancingStateDistributor.auth = true;

export default ChancingStateDistributor;
