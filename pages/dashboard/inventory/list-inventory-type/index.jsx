import React, { useEffect, useState } from "react";

import PageHeader from "../../../../components/PageHeader";
import Pagination from "../../../../components/ui/pagination";
import Input from "../../../../components/ui/Input";
import AddType from "../../../../components/modals/inventory/AddTypeModal";
import { getSession } from "next-auth/react";
import UpdateType from "../../../../components/modals/inventory/UpdateTypeModal";
import RemoveType from "../../../../components/modals/inventory/DeleteTypeModal";
import { useDispatch, useSelector } from "react-redux";
import { getTypeList } from "../../../../redux/slices/inventory/InventoryTypeSlice";
import { fetchTypeList } from "../../../../redux/services/inventory/InventoryTypeService";

const InventoryTypeList = ({ data }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTypeList());
  }, []);

  const getType = useSelector(getTypeList);

  const [inputSearch, setInputSearch] = useState("");
  const inputKeys = ["inventoryTypeName"];

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostsPerPage] = useState(10);

  const filtredList = getType.data.filter((type) =>
    inputKeys.some((key) =>
      type[key].toLowerCase().includes(inputSearch.toLowerCase())
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
      <PageHeader header={"Types"} breadcrumb={["Inventory", "Types"]} />
      <div className="flex items-center w-full gap-3">
        <div className="flex-auto">
          <Input changeInput={changeInput} />
        </div>
        <AddType />
      </div>
      <div className="flex flex-col overflow-scroll mt-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Type Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((type) => (
                  <tr key={type.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {type.inventoryTypeName}
                    </th>
                    <td className="px-6 py-4 flex justify-end text-xl gap-3">
                      <UpdateType type={type} />

                      <RemoveType id={type.id} />
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

InventoryTypeList.auth = true;

export default InventoryTypeList;
