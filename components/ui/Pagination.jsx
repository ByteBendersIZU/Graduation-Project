import { useState } from "react";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";

const Pagination = () => {
  let [num, setNum] = useState(1);
  let [cur, setCur] = useState(1);

  const pages = [
    { page: num },
    { page: num + 1 },
    { page: num + 2 },
    { page: num + 3 },
  ];
  const Next = () => {
    setNum(++num);
  };
  const Back = () => {
    num > 1 && setNum(--num);
  };
  return (
    <div className="flex rounded-lg font-[Poppins]">
      <button
        onClick={Back}
        className="h-12 border-2 border-r-0 border-indigo-600
               px-4 rounded-l-lg hover:bg-indigo-600 hover:text-white"
      >
        <BiLeftArrow />
      </button>
      {pages.map((pg, i) => (
        <button
          key={i}
          onClick={() => setCur(pg.page)}
          className={`h-12 border-2 border-r-0 border-indigo-600
               w-12 ${cur === pg.page && "bg-indigo-600 text-white"}`}
        >
          {pg.page}
        </button>
      ))}
      <button
        onClick={Next}
        className="h-12 border-2  border-indigo-600
               px-4 rounded-r-lg hover:bg-indigo-600 hover:text-white"
      >
        <BiRightArrow />
      </button>
    </div>
  );
};

export default Pagination;
