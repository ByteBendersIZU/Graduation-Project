import React from "react";

const PageHeader = ({ header }) => {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="font-bold text-lg">{header}</h2>
      <p>Distributor / {header}</p>
    </div>
  );
};

export default PageHeader;
