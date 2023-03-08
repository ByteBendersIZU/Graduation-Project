import React from "react";

const Pagination = ({ postsPerPage, totalPosts }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="flex justify-between w-100">
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className="page-item">
            <button className="page-link">
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
