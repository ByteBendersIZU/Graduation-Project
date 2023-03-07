import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";

import React from "react";
import Pagination from "../../../components/ui/pagination";
import Link from "next/link";
import PageHeader from "../../../components/PageHeader";

const List = (props) => {
  const [inputSearch, setInputSearch] = useState("");
  const [num, setNum] = useState(1);
  const [cur, setCur] = useState(1);
  const [getDistributor, setGetDistributor] = useState(props.data);
  const keys = ["name", "surname", "email", "phoneNumber"];

  const changeInput = (value) => {
    setInputSearch(value);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        "http://54.147.214.160:1453/v1/distributor/list"
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <PageHeader
        header={"Distributeur List"}
        breadcrumb={["Distributeur", "Distributeur List"]}
      />

      <div className="flex">
        <input
          type="text"
          onChange={(e) => changeInput(e.target.value)}
          placeholder="Search"
          className=" w-full p-2 border border-gray-300 rounded-lg dark:text-black bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 s dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <div className="relative my-10 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Distributor name
                </th>
                <th scope="col" className="px-6 py-3">
                  Surname
                </th>
                <th scope="col" className="px-6 py-3">
                  E-mail
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Update
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {getDistributor
                .filter((distributor) =>
                  keys.some((key) =>
                    distributor[key]
                      .toLowerCase()
                      .includes(inputSearch.toLowerCase())
                  )
                )
                .map((distributor) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={distributor.id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {distributor.name}
                    </th>
                    <td className="px-6 py-4">{distributor.surname}</td>
                    <td className="px-6 py-4">{distributor.email}</td>
                    <td className="px-6 py-4">{distributor.phoneNumber}</td>
                    <td className="px-6 py-4">
                      <Link
                        href={`update-distributor/${distributor.id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        // onClick={()=handleDelete(distributor.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
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

  return {
    props: {
      data: result,
    },
  };
};
