import React from "react";

const Pagination = ({ postsPerPage, totalPosts, handleCurrentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center">
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className="page-item">
            <button
              onClick={() => {
                handleCurrentPage(pageNumber);
              }}
              className="page-link"
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
