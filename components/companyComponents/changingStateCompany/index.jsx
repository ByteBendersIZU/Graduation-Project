import React, { useEffect, useState } from "react";
import axios from "axios";

import { getSession, useSession } from "next-auth/react";
import { toast } from "react-toastify";

const ChancingStateCompany = ({ id, status }) => {
  const {
    data: {
      session: {
        user: { jwt },
      },
    },
  } = useSession();

  const [state, setState] = useState(status);


  const companyActive = async (id) => {
    const data = await axios({
      method: "post",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/company/set-active/${id}`,
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
  const companyUnactive = async (id) => {
    const data = await axios({
      method: "post",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/company/update-status/${id}`,
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
    if (state === true) {
      companyUnactive(id);
      setState(!state);
    } else {
      companyActive(id);
      setState(!state);
    }
  };

  return (
    <div>
      <button onClick={() => stateController(id)}>
        {state ? "Passive" : "Active"}
      </button>
    </div>
  );
};

ChancingStateCompany.auth = true;

export default ChancingStateCompany;
