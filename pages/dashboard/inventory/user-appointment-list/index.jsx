import React, { useEffect, useState } from "react";

import PageHeader from "../../../../components/PageHeader";
import Pagination from "../../../../components/ui/pagination";
import Input from "../../../../components/ui/Input";
import AddAppointment from "../../../../components/modals/inventory/AddAppointmentModal";
import { getSession } from "next-auth/react";
import axios from "axios";
import UpdateAppointment from "../../../../components/modals/inventory/UpdateAppointmentModal";
import RemoveAppointment from "../../../../components/modals/inventory/DeleteAppointmentModal";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentList } from "../../../../redux/slices/inventory/InventoryAppointmentSlice";
import { fetchAppointmentList } from "../../../../redux/services/inventory/InventoryAppointmentService";

const InventoryAppointmentList = ({ data }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAppointmentList());
  }, []);

  const getAppointment = useSelector(getAppointmentList);

  const [inputSearch, setInputSearch] = useState("");
  // const [getAppointment, setAppointment] = useState(data);
  const inputKeys = ["inventoryAppointmentName", "address"];

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostsPerPage] = useState(10);

  const filtredList = getAppointment.data.filter((type) =>
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
      <PageHeader header={"Appointment"} breadcrumb={["Inventory", "Appointment"]} />
      <div className="flex items-center w-full gap-3">
        <div className="flex-auto">
          <Input changeInput={changeInput} />
        </div>
        <AddAppointment />
      </div>
      <div className="flex flex-col overflow-scroll mt-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                  Appointment Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((type) => (
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {type.name}
                    </th>
                    <td className="px-6 py-4 flex justify-end text-xl gap-3">
                      <UpdateAppointment type={type} />

                      <RemoveAppointment id={type.id} />
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

InventoryAppointmentList.auth = true;

export default InventoryAppointmentList;

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
