import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";

import React from "react";
import Pagination from "../../../components/ui/pagination";
import PageHeader from "../../../components/PageHeader";
import Input from "../../../components/ui/Input";
import Table from "../../../components/ui/Table";

const CompanyList = (props) => {
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

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <PageHeader
        header={"Organization List"}
        breadcrumb={["Organization", "Organization List"]}
      />
      <Input changeInput={changeInput} />
      <Table
        data={currentPosts}
        column={inputKeys}
        titles={titles}
        buttons={buttons}
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

CompanyList.auth = true;

export default CompanyList;

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
    url: "http://54.147.214.160:1453/v1/company/list/true",
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
