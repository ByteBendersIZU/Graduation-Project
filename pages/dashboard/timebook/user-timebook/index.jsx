import React, { useEffect, useState } from "react";

import PageHeader from "../../../../components/PageHeader";
import Pagination from "../../../../components/ui/pagination";
import Input from "../../../../components/ui/Input";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../../../redux/slices/timebook/TimebookUserSlice";
import { fetchUserList } from "../../../../redux/services/timebook/TimebookUserService";

import TimebookUpdate from "../../../../components/timbookComponents/timebookUpdate";
import FormButton from "../../../../components/form/FormButton";

const Timebook = ({ data }) => {
  const [newDate, setNewDate] = useState(new Date());

  const selectedDateObject = newDate ? new Date(newDate) : new Date();

  const dates = [...Array(7)].map((_, i) => {
    const date = new Date(selectedDateObject);
    date.setDate(selectedDateObject.getDate() + i);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserList());
  }, []);

  const getUser = useSelector(getUserList);

  const [inputSearch, setInputSearch] = useState("");
  // const [getUser, setType] = useState(data);
  const inputKeys = ["name"];

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostsPerPage] = useState(10);

  const filtredList = getUser.data.slice(1).filter((type) =>
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
      <PageHeader header={"Users"} breadcrumb={["Timebook", "Users"]} />
      <div className="flex items-center w-full gap-3">
        <div className="flex-auto">
          <Input changeInput={changeInput} />
        </div>
        <div>
          <input type="date" onChange={(e) => setNewDate(e.target.value)}  value={newDate}/>
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
                    <th key={date}>{date} </th>
                  ))}
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
                    {dates.map((date) => (
                      <td>
                        <th key={date}>
                          <TimebookUpdate userId={type.id} date={date} />
                        </th>
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
        totalPosts={filtredList.length}
        handleCurrentPage={handleCurrentPage}
      />
    </div>
  );
};

Timebook.auth = true;

export default Timebook;

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
