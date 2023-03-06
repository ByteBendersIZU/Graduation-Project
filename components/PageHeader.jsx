import React from "react";
import Breadcrumb from "./Breadcrumb";

const PageHeader = ({ header, breadcrumb }) => {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="font-bold text-lg">{header}</h2>
      <Breadcrumb breadcrumb={breadcrumb} />
    </div>
  );
};

export default PageHeader;
