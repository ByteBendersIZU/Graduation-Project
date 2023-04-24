import React, { useState } from "react";

import PageHeader from "../../../../components/PageHeader";
import Pagination from "../../../../components/ui/pagination";
import Input from "../../../../components/ui/Input";
import RemoveDepartmentModal from "../../../../components/modals/RemoveDepartmentModal";
import { getSession } from "next-auth/react";
import axios from "axios";
import UpdateBranch from "../../../../components/modals/UpdateBranchModel";
import { useRouter } from "next/router";
import AddNewDepartmentModal from "../../../../components/modals/AddNewDepartmentModal";
import UpdateDepartmentModal from "../../../../components/modals/UpdateDepartmentModal";

const DepartmentList = ({ data }) => {
  console.log(data);
  // to refresh the page after update or delete
  // const router = useRouter();
  // const refreshData = () => {
  //   console.log("refreshed");
  //   router.replace(router.asPath);
  // };

  const [inputSearch, setInputSearch] = useState("");
  const [getDepartments, setGetDepratments] = useState(data);
  const inputKeys = ["name"];

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostsPerPage] = useState(10);

  const filtredList = getDepartments.filter((distributor) =>
    inputKeys.some((key) =>
      distributor[key].toLowerCase().includes(inputSearch.toLowerCase())
    )
  );
  console.log(filtredList);

  const indexOfLastPost = currentPage * postPerPage;
  const indexFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = filtredList.slice(indexFirstPost, indexOfLastPost);

  const changeInput = (value) => {
    setCurrentPage(1);
    setInputSearch(value.toLowerCase());
  };

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <PageHeader
        header={"Departments"}
        breadcrumb={["Organization", "Departments"]}
      />
      <div className="flex items-center w-full gap-3">
        <div className="flex-auto">
          <Input changeInput={changeInput} />
        </div>
        <AddNewDepartmentModal />
      </div>
      <div className="flex flex-col overflow-scroll mt-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Department Name
                  </th>

                  <th scope="col" className="px-6 py-3 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((department) => (
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {department.name}
                    </th>
                    <td className="px-6 py-4 flex justify-end text-xl gap-3">
                      <UpdateDepartmentModal department={department} />

                      <RemoveDepartmentModal id={department.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        postsPerPage={postPerPage}
        totalPosts={filtredList.length}
        handleCurrentPage={handleCurrentPage}
      />
    </div>
  );
};

DepartmentList.auth = true;

export default DepartmentList;

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
    url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/department/list/me`,
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
