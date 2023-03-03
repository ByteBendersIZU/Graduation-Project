import axios from "axios";
import { getSession, useSession } from "next-auth/react";

import React from "react";

const List = (props) => {
  // const session = useSession();
  console.log("out", props.data);
  // console.log("props", props);
  return (
    <div>
      <div className="flex">
        <input
          type="text"
          placeholder="Distributor Ara"
          className=" w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:bg-darkBg "
        />
        <button className=" ml-2 p-2 border border-gray-300 rounded-lg bg-gray-50 sm:text-md dark:bg-darkBg">
          Ara
        </button>
      </div>
      <div>
        {props.data.map((distributor) => (
          <ul key={distributor.id} className="flex justify-around py-5">
            <li>{distributor.name}</li>
            <li>{distributor.surname}</li>
            <li>{distributor.email}</li>
            <li>{distributor.phoneNumber}</li>
            <li>
              {distributor.confirmed ? <span>true</span> : <span>false</span>}
            </li>
            <li>
              {distributor.actived ? <span>true</span> : <span>false</span>}
            </li>
          </ul>
        ))}
      </div>
    </div>
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
