import React, { useEffect, useState } from "react";

import PageHeader from "../../../../components/PageHeader";
import Pagination from "../../../../components/ui/pagination";
import Input from "../../../../components/ui/Input";
import UpdateCustomerModal from "../../../../components/modals/UpdateCustomerModal";
import RemoveCustomerModal from "../../../../components/modals/RemoveCustomerModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchPositionList } from "../../../../redux/services/CompanyPositionService";
import AddNewPositionModal from "../../../../components/modals/AddNewPositionModal";
import UpdatePositionModal from "../../../../components/modals/UpdatePositionModal";
import RemovePositionModal from "../../../../components/modals/RemovePositionModal";
import { getPositionList } from "../../../../redux/slices/companyPositionSlice";

const PositionList = ({ data }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPositionList());
  }, []);

  const getPositions = useSelector(getPositionList);

  const [inputSearch, setInputSearch] = useState("");
  // const [getPositions, setgetPositions] = useState(data);
  const inputKeys = ["name"]; //not filter for department name can not use department.name

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostsPerPage] = useState(10);

  const filtredList = getPositions.data.filter((distributor) =>
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
        header={"Positions"}
        breadcrumb={["Organization", "Positions"]}
      />
      <div className="flex items-center w-full gap-3">
        <div className="flex-auto">
          <Input changeInput={changeInput} />
        </div>
        <AddNewPositionModal />
      </div>
      <div className="flex flex-col overflow-scroll mt-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Department
                  </th>

                  <th scope="col" className="px-6 py-3 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((position) => (
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {position.name}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {position.department.name}
                    </th>

                    <td className="px-6 py-4 flex justify-end text-xl gap-3">
                      <UpdatePositionModal position={position} />
                      <RemovePositionModal id={position.id} />
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

PositionList.auth = true;

export default PositionList;
