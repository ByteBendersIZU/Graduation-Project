import React, { useEffect, useState } from "react";

import PageHeader from "../../../../components/PageHeader";
import Pagination from "../../../../components/ui/pagination";
import Input from "../../../../components/ui/Input";
import NewBranchModal from "../../../../components/modals/AddNewBranchModal";
import { getSession } from "next-auth/react";
import axios from "axios";
import UpdateBranch from "../../../../components/modals/UpdateBranchModel";
import RemoveBranch from "../../../../components/modals/RemoveBranch";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getBranchList } from "../../../../redux/slices/CompanyBranchSlice";
import { fetchBranchList } from "../../../../redux/services/CompanyBranchService";

const BranchList = ({ data }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBranchList());
  }, []);

  const getBranches = useSelector(getBranchList);

  const [inputSearch, setInputSearch] = useState("");
  // const [getBranches, setGetBranches] = useState(data);
  const inputKeys = ["name", "address"];

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostsPerPage] = useState(10);

  const filtredList = getBranches.data.filter((distributor) =>
    inputKeys.some((key) =>
      distributor[key].toLowerCase().includes(inputSearch.toLowerCase())
    )
  );

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
        header={"Branches"}
        breadcrumb={["Organization", "Branches"]}
      />
      <div className="flex items-center w-full gap-3">
        <div className="flex-auto">
          <Input changeInput={changeInput} />
        </div>
        <NewBranchModal />
      </div>
      <div className="flex flex-col overflow-scroll mt-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Branch Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Address
                  </th>

                  <th scope="col" className="px-6 py-3 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((branch) => (
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {branch.name}
                    </th>
                    <td className="px-6 py-4">{branch.address}</td>
                    <td className="px-6 py-4 flex justify-end text-xl gap-3">
                      <UpdateBranch branch={branch} />

                      <RemoveBranch id={branch.id} />
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

BranchList.auth = true;

export default BranchList;

// export const getServerSideProps = async (context) => {
//   const {
//     session: {
//       user: { jwt },
//     },
//   } = await getSession(context);
//   const {
//     data: { result },
//   } = await axios({
//     method: "get",
//     url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/branch/list`,
//     headers: {
//       Authorization: `Bearer ${jwt}`,
//     },
//   });

//   return {
//     props: {
//       data: result,
//     },
//   };
// };
