import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";

import React from "react";
import Pagination from "../../../components/ui/pagination";
import PageHeader from "../../../components/PageHeader";
import Table from "../../../components/distributorComponents/DistributorTable";
import Input from "../../../components/ui/Input";

const List = (props) => {
  const [inputSearch, setInputSearch] = useState("");
  const [getDistributor, setGetDistributor] = useState(props.data);
  const inputKeys = ["name", "surname", "email", "phoneNumber"];
  const titles = [
    "name",
    "surname",
    "e-mail",
    "phone Number",
    "Edit",
    "Change State",
  ];
  const buttons = [
    { name: "update", href: "update-distributor" },
    { name: "password", href: "change-password-distributor" },
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
        header={"Distributor List"}
        breadcrumb={["Distributor", "Distributor List"]}
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
    url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/distributor/list`,
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
