import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";

import React from "react";
import Pagination from "../../../../components/ui/pagination";
import PageHeader from "../../../../components/PageHeader";
import Table from "../../../../components/adminComponents/CompanyTable";
import Input from "../../../../components/ui/Input";

const List = (props) => {
  const [inputSearch, setInputSearch] = useState("");
  const [getCompany, setGetCompany] = useState(props.data);
  const inputKeys = ["name", "address", "email",];
  const titles = ["Company name", "Address", "E-mail",];

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostsPerPage] = useState(10);

  const filtredList = getCompany.filter((company) =>
    inputKeys.some((key) =>
      company[key].toLowerCase().includes(inputSearch.toLowerCase())
    )
  );

  const indexOfLastPost = currentPage * postPerPage;
  const indexFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = filtredList.slice(indexFirstPost, indexOfLastPost);

  const changeInput = (value) => {
    setCurrentPage(1);
    setInputSearch(value);
  };

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <PageHeader
        header={"Company List"}
        breadcrumb={["Company", "Company List"]}
      />
      <Input changeInput={changeInput} />
      <Table
        data={currentPosts}
        column={inputKeys}
        titles={titles}
        inputSearch={inputSearch}
      />
      <Pagination
        postsPerPage={postPerPage}
        totalPosts={filtredList.length}
        handleCurrentPage={handleCurrentPage}
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
    url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/company/list-passive/false`,
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
