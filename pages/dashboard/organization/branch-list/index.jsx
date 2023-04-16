import React from "react";
import PageHeader from "../../../../components/PageHeader";

const BranchList = () => {
  return (
    <div>
      <PageHeader
        header={"Branches"}
        breadcrumb={["Organization", "Branches"]}
      />
    </div>
  );
};

BranchList.auth = true;

export default BranchList;
