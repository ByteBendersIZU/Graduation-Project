import React, { useEffect, useState } from "react";
import axios from "axios";

import PageHeader from "../../../../components/PageHeader";
import Pagination from "../../../../components/ui/pagination";
import Input from "../../../../components/ui/Input";
import { getSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTimeList,
  getUserList,
} from "../../../../redux/slices/timebook/TimebookUserSlice";
import {
  fetchTimebookList,
  fetchUserList,
} from "../../../../redux/services/timebook/TimebookUserService";
import TimebookUpdate from "../../../../components/timbookComponents/timebookUpdate";

const Timebook = () => {
  const [newDate, setNewDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTimebookList(newDate));
  }, [newDate]);

  const getTime = useSelector(getTimeList);

  const selectedDateObject = new Date(newDate);

  const dates = [];
  const firstDay = new Date(selectedDateObject);
  const seventhDay = new Date(selectedDateObject);
  seventhDay.setDate(selectedDateObject.getDate() + 6);

  for (let i = 0; i < 7; i++) {
    const date = new Date(firstDay);
    date.setDate(firstDay.getDate() + i);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    dates.push(`${year}-${month}-${day}`);
  }

  const [inputSearch, setInputSearch] = useState("");
  const inputKeys = ["name"];

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostsPerPage] = useState(10);

  const filteredList = getTime.data
    .slice(1)
    .filter((type) =>
      inputKeys.some((key) =>
        type[key].toLowerCase().includes(inputSearch.toLowerCase())
      )
    );

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = filteredList.slice(indexOfFirstPost, indexOfLastPost);

  const changeInput = (value) => {
    setCurrentPage(1);
    setInputSearch(value.toLowerCase());
  };

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <PageHeader header={"Users"} breadcrumb={["Timebook", "Users"]} />
      <div className="flex items-center w-full gap-3">
        <div className="flex-auto">
          <Input changeInput={changeInput} />
        </div>
        <div>
          <input
            type="date"
            onChange={(e) => setNewDate(e.target.value)}
            value={newDate}
          />
        </div>
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
                  {dates.map((date) => (
                    <th key={date}>{date}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((type) => (
                  <tr
                    key={type.id}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {type.name}
                    </th>
                    {type.days.slice(0, 7).map((day) => (
                      <td key={day.date} >
                        <TimebookUpdate
                          userId={type.userId}
                          date={day.date}
                          dateValue={day.value}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        postsPerPage={postPerPage}
        totalPosts={filteredList.length}
        handleCurrentPage={handleCurrentPage}
      />
    </div>
  );
};

Timebook.auth = true;

export default Timebook;

// export const getServerSideProps = async (context, selectedDateObject) => {
//   console.log(selectedDateObject);
//   const {
//     session: {
//       user: { jwt },
//     },
//   } = await getSession(context);

//   const {
//     data: { result },
//   } = await axios({
//     method: "get",
//     url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/timebook/2023-06-05/2023-06-11`,
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
