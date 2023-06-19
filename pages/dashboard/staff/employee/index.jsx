import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeList } from "../../../../redux/services/CompanyEmployeeService";
import { getEmployeeList } from "../../../../redux/slices/CompanyEmployeeSlice";
import PageHeader from "../../../../components/PageHeader";
import Input from "../../../../components/ui/Input";
import AddNewCustomerModal from "../../../../components/modals/AddNewCustomerModal";
import UpdateCustomerModal from "../../../../components/modals/UpdateCustomerModal";
import RemoveCustomerModal from "../../../../components/modals/RemoveCustomerModal";
import { Pagination } from "flowbite-react";
import { getCustomerList } from "../../../../redux/slices/CompanyCustomerSlice";
import { fethcCustomerList } from "../../../../redux/services/CompanyCustomerService";
import UpdateUserModal from "../../../../components/modals/staffModals/UpdateUserModal";
import AddNewUserModal from "../../../../components/modals/staffModals/AddNewUserModal";
import { fetchMe } from "../../../../redux/services/HelperService";
import ChangeUserPasswordModal from "../../../../components/modals/staffModals/ChangeUserPasswordModal";

const Employee = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMe());
    dispatch(fetchEmployeeList());
  }, []);
  const getEmployees = useSelector(getEmployeeList);

  const [inputSearch, setInputSearch] = useState("");
  const inputKeys = ["name", "email"];

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostsPerPage] = useState(10);

  console.log(getEmployees);

  const filtredList = getEmployees.data
    .slice(1)
    .filter((distributor) =>
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
        header={"Customers"}
        breadcrumb={["Organization", "Customers"]}
      />
      <div className="flex items-center w-full gap-3">
        <div className="flex-auto">
          <Input changeInput={changeInput} />
        </div>
        <AddNewUserModal />
      </div>
      <div className="flex flex-col overflow-scroll mt-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>

                  <th scope="col" className="px-6 py-3 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((user) => (
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.name}
                      {user.secondName === "string"
                        ? ""
                        : " " + user.secondName}{" "}
                      {user.surname}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.email}
                    </th>
                    <td className="px-6 py-4 flex justify-end text-xl gap-3">
                      <UpdateUserModal user={user} />

                      <ChangeUserPasswordModal user={user} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <Pagination
        postsPerPage={postPerPage}
        totalPosts={filtredList.length}
        handleCurrentPage={handleCurrentPage}
      /> */}
    </div>
  );
};

Employee.auth = true;
export default Employee;
