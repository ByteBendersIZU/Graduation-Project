import axios from "axios";
import { getSession, useSession } from "next-auth/react";

import React from "react";

const List = (props) => {
  // const session = useSession();
  console.log("out", props.data[0]);
  // console.log("props", props);
  return (
    <ul>
      <li>{props.data[0].activateed}</li>
      <li>{props.data[0].confirmed}</li>
      <li>{props.data[0].email}</li>
      <li>{props.data[0].id}</li>
      <li>{props.data[0].name}</li>
      <li>{props.data[0].phoneNumber}</li>
      <li>{props.data[0].superAdminId}</li>
      <li>{props.data[0].surname}</li>
    </ul>
  );
};

List.auth = true;

export default List;

export const getServerSideProps = async (context) => {
  const {
    session: {
      user: { jwt },
    },
  } = await getSession(context);
  const {
    data: { result },
  } = await axios({
    method: "get",
    url: "http://54.147.214.160:1453/v1/distributor/list",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  console.log(result);

  return {
    props: {
      data: result,
    },
  };
};
