import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";

import React from "react";
import Pagination from "../../../components/ui/pagination";
import Link from "next/link";
import PageHeader from "../../../components/PageHeader";
import Table from "../../../components/ui/Table";
import Input from "../../../components/ui/Input";

const List = (props) => {
  const [inputSearch, setInputSearch] = useState("");
  const [getDistributor, setGetDistributor] = useState(props.data);
  const inputKeys = ["name", "surname", "email", "phoneNumber"];
  const titles = ["name", "surname", "e-mail", "phone Number", "Edit"];
  const buttons = [
    { name: "update", href: "update-distributor" },
    { name: "delete", href: "#" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostsPerPage] = useState(10);

  const filtredList = getDistributor.filter((distributor) =>
    inputKeys.some((key) =>
      distributor[key].toLowerCase().includes(inputSearch.toLowerCase())
    )
  );

  const indexOfLastPost = currentPage * postPerPage;
  const indexFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = filtredList.slice(indexFirstPost, indexOfLastPost);

  const changeInput = (value) => {
    setCurrentPage(1);
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

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <PageHeader
        header={"Distributeur List"}
        breadcrumb={["Distributeur", "Distributeur List"]}
      />

      <Input />
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
              {currentPosts.map((distributor) => (
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
                    <button className="font-medium text-red-600 dark:text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          postsPerPage={postPerPage}
          totalPosts={filtredList.length}
          handleCurrentPage={handleCurrentPage}
        />
      </div>

      <Table
        data={currentPosts}
        column={inputKeys}
        titles={titles}
        buttons={buttons}
        inputSearch={inputSearch}
      />
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
